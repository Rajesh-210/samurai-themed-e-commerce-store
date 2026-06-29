from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from extensions import db
from models.user import User

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')


def error(message, code='ERROR', status=400):
    return jsonify({'error': message, 'code': code}), status


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data:
        return error('No data provided', 'NO_DATA')

    username = (data.get('username') or '').strip()
    email = (data.get('email') or '').strip().lower()
    password = data.get('password') or ''

    if not username or len(username) < 2:
        return error('Username must be at least 2 characters', 'INVALID_USERNAME')
    if not email or '@' not in email:
        return error('Valid email required', 'INVALID_EMAIL')
    if not password or len(password) < 6:
        return error('Password must be at least 6 characters', 'INVALID_PASSWORD')

    if User.query.filter_by(email=email).first():
        return error('Email already registered', 'EMAIL_EXISTS', 409)
    if User.query.filter_by(username=username).first():
        return error('Username already taken', 'USERNAME_EXISTS', 409)

    user = User(username=username, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    token = create_access_token(identity=str(user.id))
    return jsonify({
        'access_token': token,
        'user': user.to_dict_full(),
    }), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return error('No data provided', 'NO_DATA')

    email = (data.get('email') or '').strip().lower()
    password = data.get('password') or ''

    if not email or not password:
        return error('Email and password required', 'MISSING_FIELDS')

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return error('Invalid email or password', 'INVALID_CREDENTIALS', 401)

    token = create_access_token(identity=str(user.id))
    return jsonify({
        'access_token': token,
        'user': user.to_dict_full(),
    })


@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def me():
    user_id = int(get_jwt_identity())
    user = User.query.get_or_404(user_id)
    return jsonify({'user': user.to_dict_full()})
