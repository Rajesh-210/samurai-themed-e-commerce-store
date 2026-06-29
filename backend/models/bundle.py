from datetime import datetime
from extensions import db


class Bundle(db.Model):
    __tablename__ = 'bundles'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    bundle_price = db.Column(db.Numeric(10, 2), nullable=False)
    retail_price = db.Column(db.Numeric(10, 2), nullable=False)
    savings = db.Column(db.Numeric(10, 2), nullable=False)
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    bundle_items = db.relationship('BundleItem', back_populates='bundle', cascade='all, delete-orphan', lazy='joined')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'bundle_price': float(self.bundle_price),
            'retail_price': float(self.retail_price),
            'savings': float(self.savings),
            'is_active': self.is_active,
            'items': [bi.to_dict() for bi in self.bundle_items],
            'created_at': self.created_at.isoformat(),
        }

    def __repr__(self):
        return f'<Bundle {self.name}>'


class BundleItem(db.Model):
    __tablename__ = 'bundle_items'

    id = db.Column(db.Integer, primary_key=True)
    bundle_id = db.Column(db.Integer, db.ForeignKey('bundles.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)

    # Relationships
    bundle = db.relationship('Bundle', back_populates='bundle_items')
    product = db.relationship('Product')

    def to_dict(self):
        p = self.product
        return {
            'id': self.id,
            'bundle_id': self.bundle_id,
            'product_id': self.product_id,
            'product_name': p.name if p else 'Unknown',
            'product_price': float(p.price) if p else 0,
            'image_key': p.image_key if p else '',
        }

    def __repr__(self):
        return f'<BundleItem bundle={self.bundle_id} product={self.product_id}>'
