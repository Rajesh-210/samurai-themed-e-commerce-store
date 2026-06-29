from flask import Blueprint, request, jsonify
from extensions import db
from models.product import Product, Category

products_bp = Blueprint('products', __name__, url_prefix='/api')

ITEMS_PER_PAGE = 12


def error(message, code='ERROR', status=400):
    return jsonify({'error': message, 'code': code}), status


@products_bp.route('/products', methods=['GET'])
def list_products():
    category = request.args.get('category')
    sort = request.args.get('sort', 'default')
    page = int(request.args.get('page', 1))
    search = request.args.get('search', '').strip()

    query = Product.query.filter_by(is_active=True).join(Category)

    if category:
        query = query.filter(Category.name == category)

    if search:
        query = query.filter(Product.name.ilike(f'%{search}%'))

    if sort == 'price_asc':
        query = query.order_by(Product.price.asc())
    elif sort == 'price_desc':
        query = query.order_by(Product.price.desc())
    elif sort == 'rating':
        query = query.order_by(Product.rating.desc())
    elif sort == 'name':
        query = query.order_by(Product.name.asc())
    else:
        query = query.order_by(Product.id.asc())

    total = query.count()
    products = query.offset((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE).all()

    return jsonify({
        'products': [p.to_dict() for p in products],
        'total': total,
        'page': page,
        'pages': (total + ITEMS_PER_PAGE - 1) // ITEMS_PER_PAGE,
        'per_page': ITEMS_PER_PAGE,
    })


@products_bp.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    if not product.is_active:
        return error('Product not found', 'NOT_FOUND', 404)
    return jsonify(product.to_dict())


@products_bp.route('/products/<int:product_id>/related', methods=['GET'])
def get_related(product_id):
    product = Product.query.get_or_404(product_id)
    related = (Product.query
               .filter(Product.category_id == product.category_id)
               .filter(Product.id != product_id)
               .filter(Product.is_active == True)
               .limit(4)
               .all())
    return jsonify({'products': [p.to_dict() for p in related]})


@products_bp.route('/categories', methods=['GET'])
def list_categories():
    categories = Category.query.all()
    return jsonify({'categories': [c.to_dict() for c in categories]})
