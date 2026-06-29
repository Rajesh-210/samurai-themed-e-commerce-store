from datetime import datetime
from extensions import db


class Cart(db.Model):
    __tablename__ = 'carts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = db.relationship('User', back_populates='cart')
    items = db.relationship('CartItem', back_populates='cart', cascade='all, delete-orphan', lazy='joined')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'items': [item.to_dict() for item in self.items],
            'total': sum(item.product.price * item.quantity for item in self.items if item.product),
            'count': sum(item.quantity for item in self.items),
        }

    def __repr__(self):
        return f'<Cart user_id={self.user_id}>'


class CartItem(db.Model):
    __tablename__ = 'cart_items'

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    added_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    # Relationships
    cart = db.relationship('Cart', back_populates='items')
    product = db.relationship('Product', back_populates='cart_items')

    def to_dict(self):
        p = self.product
        return {
            'id': self.id,
            'cart_id': self.cart_id,
            'product_id': self.product_id,
            'name': p.name if p else 'Unknown',
            'price': float(p.price) if p else 0,
            'image_key': p.image_key if p else '',
            'stock': p.stock if p else 0,
            'quantity': self.quantity,
            'subtotal': float(p.price) * self.quantity if p else 0,
        }

    def __repr__(self):
        return f'<CartItem cart={self.cart_id} product={self.product_id} qty={self.quantity}>'
