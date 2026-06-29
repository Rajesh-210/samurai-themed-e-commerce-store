from datetime import datetime
from extensions import db


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    slug = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    products = db.relationship('Product', back_populates='category', lazy='dynamic')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'slug': self.slug,
            'description': self.description,
        }

    def __repr__(self):
        return f'<Category {self.name}>'


class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    original_price = db.Column(db.Numeric(10, 2), nullable=True)
    stock = db.Column(db.Integer, nullable=False, default=0)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    image_key = db.Column(db.String(100), nullable=False)
    rating = db.Column(db.Numeric(3, 2), nullable=False, default=0.00)
    review_count = db.Column(db.Integer, nullable=False, default=0)
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    category = db.relationship('Category', back_populates='products')
    order_items = db.relationship('OrderItem', back_populates='product', lazy='dynamic')
    cart_items = db.relationship('CartItem', back_populates='product', lazy='dynamic')

    def to_dict(self, include_category=True):
        data = {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': float(self.price),
            'original_price': float(self.original_price) if self.original_price else None,
            'stock': self.stock,
            'image_key': self.image_key,
            'rating': float(self.rating),
            'review_count': self.review_count,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat(),
        }
        if include_category and self.category:
            data['category'] = self.category.name
            data['category_id'] = self.category_id
        else:
            data['category_id'] = self.category_id
        return data

    def __repr__(self):
        return f'<Product {self.name}>'
