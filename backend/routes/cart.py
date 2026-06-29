from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models.user import User
from models.product import Product
from models.cart import Cart, CartItem
from models.bundle import Bundle

cart_bp = Blueprint('cart', __name__, url_prefix='/api/cart')


def error(message, code='ERROR', status=400):
    return jsonify({'error': message, 'code': code}), status


def get_or_create_cart(user_id: int) -> Cart:
    cart = Cart.query.filter_by(user_id=user_id).first()
    if not cart:
        cart = Cart(user_id=user_id)
        db.session.add(cart)
        db.session.flush()
    return cart


@cart_bp.route('', methods=['GET'])
@jwt_required()
def get_cart():
    user_id = int(get_jwt_identity())
    cart = get_or_create_cart(user_id)
    db.session.commit()
    return jsonify(cart.to_dict())


@cart_bp.route('/items', methods=['POST'])
@jwt_required()
def add_item():
    user_id = int(get_jwt_identity())
    data = request.get_json()
    if not data:
        return error('No data provided', 'NO_DATA')

    product_id = data.get('product_id')
    quantity = int(data.get('quantity', 1))

    if not product_id:
        return error('product_id required', 'MISSING_FIELD')
    if quantity < 1:
        return error('Quantity must be at least 1', 'INVALID_QTY')

    product = Product.query.get(product_id)
    if not product or not product.is_active:
        return error('Product not found', 'NOT_FOUND', 404)
    if product.stock < quantity:
        return error(f'Only {product.stock} in stock', 'INSUFFICIENT_STOCK')

    cart = get_or_create_cart(user_id)

    # Check if item already in cart
    existing = CartItem.query.filter_by(cart_id=cart.id, product_id=product_id).first()
    if existing:
        new_qty = existing.quantity + quantity
        if product.stock < new_qty:
            return error(f'Only {product.stock} in stock', 'INSUFFICIENT_STOCK')
        existing.quantity = new_qty
    else:
        item = CartItem(cart_id=cart.id, product_id=product_id, quantity=quantity)
        db.session.add(item)

    db.session.commit()
    db.session.refresh(cart)
    return jsonify(cart.to_dict()), 201


@cart_bp.route('/items/<int:item_id>', methods=['PUT'])
@jwt_required()
def update_item(item_id):
    user_id = int(get_jwt_identity())
    data = request.get_json()
    quantity = int(data.get('quantity', 1))

    cart = Cart.query.filter_by(user_id=user_id).first()
    if not cart:
        return error('Cart not found', 'NOT_FOUND', 404)

    item = CartItem.query.filter_by(id=item_id, cart_id=cart.id).first()
    if not item:
        return error('Cart item not found', 'NOT_FOUND', 404)

    if quantity <= 0:
        db.session.delete(item)
    else:
        if item.product.stock < quantity:
            return error(f'Only {item.product.stock} in stock', 'INSUFFICIENT_STOCK')
        item.quantity = quantity

    db.session.commit()
    db.session.refresh(cart)
    return jsonify(cart.to_dict())


@cart_bp.route('/items/<int:item_id>', methods=['DELETE'])
@jwt_required()
def remove_item(item_id):
    user_id = int(get_jwt_identity())

    cart = Cart.query.filter_by(user_id=user_id).first()
    if not cart:
        return error('Cart not found', 'NOT_FOUND', 404)

    item = CartItem.query.filter_by(id=item_id, cart_id=cart.id).first()
    if not item:
        return error('Cart item not found', 'NOT_FOUND', 404)

    db.session.delete(item)
    db.session.commit()
    db.session.refresh(cart)
    return jsonify(cart.to_dict())


@cart_bp.route('/bundle/<int:bundle_id>', methods=['POST'])
@jwt_required()
def add_bundle(bundle_id):
    user_id = int(get_jwt_identity())

    bundle = Bundle.query.get(bundle_id)
    if not bundle or not bundle.is_active:
        return error('Bundle not found', 'NOT_FOUND', 404)

    cart = get_or_create_cart(user_id)

    for bundle_item in bundle.bundle_items:
        product = bundle_item.product
        if not product or not product.is_active:
            continue
        existing = CartItem.query.filter_by(cart_id=cart.id, product_id=product.id).first()
        if existing:
            if product.stock >= existing.quantity + 1:
                existing.quantity += 1
        else:
            if product.stock >= 1:
                item = CartItem(cart_id=cart.id, product_id=product.id, quantity=1)
                db.session.add(item)

    db.session.commit()
    db.session.refresh(cart)
    return jsonify(cart.to_dict()), 201


@cart_bp.route('', methods=['DELETE'])
@jwt_required()
def clear_cart():
    user_id = int(get_jwt_identity())
    cart = Cart.query.filter_by(user_id=user_id).first()
    if cart:
        CartItem.query.filter_by(cart_id=cart.id).delete()
        db.session.commit()
        db.session.refresh(cart)
    return jsonify({'items': [], 'total': 0, 'count': 0})
