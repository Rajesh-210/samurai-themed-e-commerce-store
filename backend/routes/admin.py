from functools import wraps
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models.user import User
from models.product import Product, Category
from models.order import Order
from models.bundle import Bundle, BundleItem

admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')


def error(message, code='ERROR', status=400):
    return jsonify({'error': message, 'code': code}), status


def admin_required(fn):
    """Decorator that ensures the authenticated user has admin role."""
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        user_id = int(get_jwt_identity())
        user = User.query.get(user_id)
        if not user or user.role != 'admin':
            return error('Admin access required', 'FORBIDDEN', 403)
        return fn(*args, **kwargs)
    return wrapper


# ─── STATS ────────────────────────────────────────────────────────────

@admin_bp.route('/stats', methods=['GET'])
@admin_required
def get_stats():
    from sqlalchemy import func

    total_users = User.query.count()
    total_orders = Order.query.count()
    total_products = Product.query.count()
    pending_orders = Order.query.filter_by(status='pending').count()
    low_stock = Product.query.filter(Product.stock <= 10, Product.stock > 0, Product.is_active == True).count()

    revenue_result = db.session.query(func.sum(Order.total)).filter(
        Order.status.in_(['delivered', 'shipped'])
    ).scalar()
    total_revenue = float(revenue_result) if revenue_result else 0.0

    return jsonify({
        'total_users': total_users,
        'total_orders': total_orders,
        'total_revenue': total_revenue,
        'total_products': total_products,
        'pending_orders': pending_orders,
        'low_stock_products': low_stock,
    })


# ─── ADMIN PRODUCTS ───────────────────────────────────────────────────

@admin_bp.route('/products', methods=['GET'])
@admin_required
def list_products():
    products = Product.query.order_by(Product.id.asc()).all()
    return jsonify({'products': [p.to_dict() for p in products]})


@admin_bp.route('/products', methods=['POST'])
@admin_required
def create_product():
    data = request.get_json()
    if not data:
        return error('No data provided', 'NO_DATA')

    name = (data.get('name') or '').strip()
    if not name:
        return error('Product name is required', 'MISSING_NAME')

    price = data.get('price')
    if price is None:
        return error('Price is required', 'MISSING_PRICE')

    category_id = data.get('category_id') or data.get('category')
    if not category_id:
        return error('Category is required', 'MISSING_CATEGORY')

    # If category_id is a string (name), try to find/create the category
    if isinstance(category_id, str):
        category = Category.query.filter_by(name=category_id).first()
        if category:
            category_id = category.id
        else:
            return error(f'Category "{category_id}" not found', 'INVALID_CATEGORY')

    product = Product(
        name=name,
        description=data.get('description', ''),
        price=price,
        original_price=data.get('original_price'),
        stock=int(data.get('stock', 0)),
        category_id=int(category_id),
        image_key=data.get('image_key', name.lower().replace(' ', '-').replace("'", '')),
        rating=float(data.get('rating', 0)),
        review_count=int(data.get('review_count', 0)),
        is_active=data.get('is_active', True),
    )
    db.session.add(product)
    db.session.commit()
    db.session.refresh(product)

    return jsonify(product.to_dict()), 201


@admin_bp.route('/products/<int:product_id>', methods=['PUT'])
@admin_required
def update_product(product_id):
    product = Product.query.get_or_404(product_id)
    data = request.get_json()
    if not data:
        return error('No data provided', 'NO_DATA')

    if 'name' in data:
        product.name = data['name']
    if 'description' in data:
        product.description = data['description']
    if 'price' in data:
        product.price = data['price']
    if 'original_price' in data:
        product.original_price = data['original_price']
    if 'stock' in data:
        product.stock = int(data['stock'])
    if 'category_id' in data:
        product.category_id = int(data['category_id'])
    if 'image_key' in data:
        product.image_key = data['image_key']
    if 'rating' in data:
        product.rating = float(data['rating'])
    if 'is_active' in data:
        product.is_active = bool(data['is_active'])

    db.session.commit()
    db.session.refresh(product)
    return jsonify(product.to_dict())


@admin_bp.route('/products/<int:product_id>', methods=['DELETE'])
@admin_required
def delete_product(product_id):
    product = Product.query.get_or_404(product_id)
    product.is_active = False  # Soft delete
    db.session.commit()
    return jsonify({'message': 'Product deactivated'})


# ─── ADMIN BUNDLES ────────────────────────────────────────────────────

@admin_bp.route('/bundles', methods=['GET'])
@admin_required
def list_bundles():
    bundles = Bundle.query.order_by(Bundle.id.asc()).all()
    return jsonify({'bundles': [b.to_dict() for b in bundles]})


@admin_bp.route('/bundles', methods=['POST'])
@admin_required
def create_bundle():
    data = request.get_json()
    if not data:
        return error('No data provided', 'NO_DATA')

    name = (data.get('name') or '').strip()
    if not name:
        return error('Bundle name is required', 'MISSING_NAME')

    bundle_price = float(data.get('bundle_price', 0))
    retail_price = float(data.get('retail_price', 0))
    savings = retail_price - bundle_price

    bundle = Bundle(
        name=name,
        description=data.get('description', ''),
        bundle_price=bundle_price,
        retail_price=retail_price,
        savings=round(savings, 2),
        is_active=data.get('is_active', True),
    )
    db.session.add(bundle)
    db.session.flush()

    # Add products to bundle
    product_ids = data.get('product_ids', [])
    for pid in product_ids:
        if Product.query.get(pid):
            bi = BundleItem(bundle_id=bundle.id, product_id=int(pid))
            db.session.add(bi)

    db.session.commit()
    db.session.refresh(bundle)
    return jsonify(bundle.to_dict()), 201


@admin_bp.route('/bundles/<int:bundle_id>', methods=['PUT'])
@admin_required
def update_bundle(bundle_id):
    bundle = Bundle.query.get_or_404(bundle_id)
    data = request.get_json()
    if not data:
        return error('No data provided', 'NO_DATA')

    if 'name' in data:
        bundle.name = data['name']
    if 'description' in data:
        bundle.description = data['description']
    if 'bundle_price' in data:
        bundle.bundle_price = float(data['bundle_price'])
    if 'retail_price' in data:
        bundle.retail_price = float(data['retail_price'])
    if 'bundle_price' in data or 'retail_price' in data:
        bundle.savings = round(bundle.retail_price - bundle.bundle_price, 2)
    if 'is_active' in data:
        bundle.is_active = bool(data['is_active'])

    # Update product list if provided
    if 'product_ids' in data:
        BundleItem.query.filter_by(bundle_id=bundle.id).delete()
        for pid in data['product_ids']:
            if Product.query.get(pid):
                bi = BundleItem(bundle_id=bundle.id, product_id=int(pid))
                db.session.add(bi)

    db.session.commit()
    db.session.refresh(bundle)
    return jsonify(bundle.to_dict())


@admin_bp.route('/bundles/<int:bundle_id>', methods=['DELETE'])
@admin_required
def delete_bundle(bundle_id):
    bundle = Bundle.query.get_or_404(bundle_id)
    bundle.is_active = False  # Soft delete
    db.session.commit()
    return jsonify({'message': 'Bundle deactivated'})


# ─── ADMIN ORDERS ─────────────────────────────────────────────────────

@admin_bp.route('/orders', methods=['GET'])
@admin_required
def list_orders():
    orders = Order.query.order_by(Order.created_at.desc()).all()
    return jsonify({'orders': [o.to_dict(include_user=True) for o in orders]})


@admin_bp.route('/orders/<int:order_id>/status', methods=['PUT'])
@admin_required
def update_order_status(order_id):
    order = Order.query.get_or_404(order_id)
    data = request.get_json()
    if not data or 'status' not in data:
        return error('Status field required', 'MISSING_STATUS')

    valid_statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
    new_status = data['status'].lower()
    if new_status not in valid_statuses:
        return error(f'Invalid status. Must be one of: {", ".join(valid_statuses)}', 'INVALID_STATUS')

    order.status = new_status
    db.session.commit()
    db.session.refresh(order)
    return jsonify(order.to_dict(include_user=True))


# ─── ADMIN USERS ──────────────────────────────────────────────────────

@admin_bp.route('/users', methods=['GET'])
@admin_required
def list_users():
    users = User.query.order_by(User.created_at.desc()).all()
    return jsonify({'users': [u.to_dict_full() for u in users]})


@admin_bp.route('/users/<int:user_id>/role', methods=['PUT'])
@admin_required
def update_user_role(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    if not data or 'role' not in data:
        return error('Role field required', 'MISSING_ROLE')

    new_role = data['role'].lower()
    if new_role not in ('user', 'admin'):
        return error('Role must be "user" or "admin"', 'INVALID_ROLE')

    user.role = new_role
    db.session.commit()
    db.session.refresh(user)
    return jsonify(user.to_dict_full())
