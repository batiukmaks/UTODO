from flask import redirect
from flask_jwt_extended import JWTManager
from models import *
from schemas import *
from db import get_session


jwt = JWTManager()


@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    db = get_session()
    res = db.query(User).filter(User.id == identity).first()
    db.close()
    return res
