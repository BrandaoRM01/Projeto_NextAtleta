import os
import datetime
import secrets
import cloudinary

BASE_DIR = os.path.abspath(os.path.dirname(__file__))


class Config:
  
    SECRET_KEY = os.getenv("SECRET_KEY", secrets.token_hex(32))
    PERMANENT_SESSION_LIFETIME = datetime.timedelta(hours=2)

    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "mysql+pymysql://root:105192119@localhost:3306/sportlink"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", secrets.token_hex(32))
    JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(hours=2)

  
    CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME")
    CLOUDINARY_API_KEY = os.getenv("CLOUDINARY_API_KEY")
    CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET")

    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_USE_TLS = False
    MAIL_USERNAME = 'joaovictorvalentim.m@gmail.com'
    MAIL_PASSWORD = 'wxvi hzwz xmmu odaj'
    MAIL_DEFAULT_SENDER = 'jvt.oliveira@gmail.com'

    cloudinary.config(
        cloud_name=CLOUDINARY_CLOUD_NAME,
        api_key=CLOUDINARY_API_KEY,
        api_secret=CLOUDINARY_API_SECRET,
        secure=True
    )
