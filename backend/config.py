import os
from datetime import timedelta


class Config:
    # Database
    MYSQL_HOST = os.environ.get('MYSQL_HOST', 'localhost')
    MYSQL_PORT = int(os.environ.get('MYSQL_PORT', 3306))
    MYSQL_DATABASE = os.environ.get('MYSQL_DATABASE', 'samurai_db')
    MYSQL_USER = os.environ.get('MYSQL_USER', 'samurai_user')
    MYSQL_PASSWORD = os.environ.get('MYSQL_PASSWORD', 'samurai_pass_2026')

    SQLALCHEMY_DATABASE_URI = (
        f"mysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DATABASE}"
        "?charset=utf8mb4"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_POOL_RECYCLE = 280
    SQLALCHEMY_POOL_PRE_PING = True
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_pre_ping": True,
        "pool_recycle": 280,
    }

    # JWT
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'super-secret-bushido-key-change-me')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)

    # App
    SECRET_KEY = os.environ.get('SECRET_KEY', 'another-secret-key')
    DEBUG = os.environ.get('FLASK_ENV') == 'development'
    ITEMS_PER_PAGE = 12
