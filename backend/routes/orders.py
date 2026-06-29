from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models.user import User
from models.product import Product
from models.cart import Cart, CartItem
from models.order import Order, OrderItem

orders_bp = Blueprint('orders', __name__, url_prefix='/api/orders')


def error(message, code='ERROR', status=400):
    return jsonify({'error': message, 'code': code}), status


@orders_bp.route('', methods=['POST'])
@jwt_required()
def place_order():
    user_id = int(get_jwt_identity())
    data = request.get_json()
    if not data:
        return error('No data provided', 'NO_DATA')

    shipping_address = (data.get('shipping_address') or '').strip()
    shipping_city = (data.get('shipping_city') or '').strip()
    shipping_zip = (data.get('shipping_zip') or '').strip()
    shipping_country = (data.get('shipping_country') or 'US').strip()
    payment_method = (data.get('payment_method') or 'Credit Card').strip()

    if not shipping_address or not shipping_city or not shipping_zip:
        return error('Shipping address, city, and zip are required', 'MISSING_FIELDS')

    cart = Cart.query.filter_by(user_id=user_id).first()
    if not cart or not cart.items:
        return error('Cart is empty', 'EMPTY_CART')

    # Calculate total and validate stock
    total = 0.0
    for item in cart.items:
        product = item.product
        if not product or not product.is_active:
            return error(f'Product {item.product_id} is no longer available', 'PRODUCT_UNAVAILABLE', 410)
        if product.stock < item.quantity:
            return error(
                f'Only {product.stock} of "{product.name}" in stock',
                'INSUFFICIENT_STOCK'
            )
        total += float(product.price) * item.quantity

    # Create order
    order = Order(
        user_id=user_id,
        status='pending',
        total=round(total, 2),
        shipping_address=shipping_address,
        shipping_city=shipping_city,
        shipping_zip=shipping_zip,
        shipping_country=shipping_country,
        payment_method=payment_method,
    )
    db.session.add(order)
    db.session.flush()

    # Create order items and deduct stock
    for cart_item in cart.items:
        product = cart_item.product
        order_item = OrderItem(
            order_id=order.id,
            product_id=product.id,
            product_name=product.name,
            quantity=cart_item.quantity,
            unit_price=product.price,
        )
        db.session.add(order_item)
        product.stock -= cart_item.quantity

    # Clear cart
    CartItem.query.filter_by(cart_id=cart.id).delete()

    db.session.commit()
    db.session.refresh(order)

    return jsonify(order.to_dict()), 201


@orders_bp.route('', methods=['GET'])
@jwt_required()
def list_orders():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    # Admins can see all orders
    if user and user.role == 'admin':
        orders = Order.query.order_by(Order.created_at.desc()).all()
        return jsonify({'orders': [o.to_dict(include_user=True) for o in orders]})

    orders = Order.query.filter_by(user_id=user_id).order_by(Order.created_at.desc()).all()
    return jsonify({'orders': [o.to_dict() for o in orders]})


@orders_bp.route('/<int:order_id>', methods=['GET'])
@jwt_required()
def get_order(order_id):
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    order = Order.query.get_or_404(order_id)

    # Only the owner or admin can view
    if order.user_id != user_id and (not user or user.role != 'admin'):
        return error('Order not found', 'NOT_FOUND', 404)

    return jsonify(order.to_dict(include_user=True))
