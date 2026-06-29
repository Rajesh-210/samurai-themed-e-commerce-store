from datetime import datetime
from extensions import db


class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    status = db.Column(
        db.Enum('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
        nullable=False, default='pending'
    )
    total = db.Column(db.Numeric(10, 2), nullable=False)
    shipping_address = db.Column(db.String(500), nullable=False)
    shipping_city = db.Column(db.String(100), nullable=False)
    shipping_zip = db.Column(db.String(20), nullable=False)
    shipping_country = db.Column(db.String(10), nullable=False, default='US')
    payment_method = db.Column(db.String(50), nullable=False, default='Credit Card')
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = db.relationship('User', back_populates='orders')
    items = db.relationship('OrderItem', back_populates='order', cascade='all, delete-orphan', lazy='joined')

    def to_dict(self, include_user=False):
        data = {
            'id': self.id,
            'user_id': self.user_id,
            'status': self.status,
            'total': float(self.total),
            'shipping_address': f"{self.shipping_address}, {self.shipping_city}, {self.shipping_zip}, {self.shipping_country}",
            'shipping_city': self.shipping_city,
            'shipping_zip': self.shipping_zip,
            'shipping_country': self.shipping_country,
            'payment_method': self.payment_method,
            'items': [item.to_dict() for item in self.items],
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
        }
        if include_user and self.user:
            data['user_email'] = self.user.email
            data['username'] = self.user.username
        return data

    def __repr__(self):
        return f'<Order {self.id} user={self.user_id} status={self.status}>'


class OrderItem(db.Model):
    __tablename__ = 'order_items'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    product_name = db.Column(db.String(200), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    unit_price = db.Column(db.Numeric(10, 2), nullable=False)

    # Relationships
    order = db.relationship('Order', back_populates='items')
    product = db.relationship('Product', back_populates='order_items')

    def to_dict(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'product_id': self.product_id,
            'name': self.product_name,
            'quantity': self.quantity,
            'unit_price': float(self.unit_price),
            'price': float(self.unit_price),
            'subtotal': float(self.unit_price) * self.quantity,
        }

    def __repr__(self):
        return f'<OrderItem order={self.order_id} product={self.product_id}>'
