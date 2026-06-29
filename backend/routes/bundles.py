from flask import Blueprint, jsonify
from extensions import db
from models.bundle import Bundle

bundles_bp = Blueprint('bundles', __name__, url_prefix='/api/bundles')


def error(message, code='ERROR', status=400):
    return jsonify({'error': message, 'code': code}), status


@bundles_bp.route('', methods=['GET'])
def list_bundles():
    bundles = Bundle.query.filter_by(is_active=True).order_by(Bundle.id.asc()).all()
    return jsonify({'bundles': [b.to_dict() for b in bundles]})


@bundles_bp.route('/<int:bundle_id>', methods=['GET'])
def get_bundle(bundle_id):
    bundle = Bundle.query.get_or_404(bundle_id)
    if not bundle.is_active:
        return error('Bundle not found', 'NOT_FOUND', 404)
    return jsonify(bundle.to_dict())
