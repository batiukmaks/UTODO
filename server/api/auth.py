# https://flask.palletsprojects.com/en/2.2.x/tutorial/views/

from flask import Blueprint, request
from flask_jwt_extended import jwt_required, current_user, create_access_token, set_access_cookies

from werkzeug.security import check_password_hash, generate_password_hash
from db import get_session
from models import *
from schemas import *

from flask import jsonify, request, abort
from marshmallow import ValidationError

auth = Blueprint("auth", __name__, url_prefix="/")


@auth.route("/user/signup", methods=["POST"])
def user():
    session = get_session()
    try:
        new_user = CreateUserSchema().load(request.json)
        is_unique_email = (
            not session.query(User).filter(User.email == new_user.email).first()
        )
        assert is_unique_email
    except (ValidationError, AssertionError):
        abort(400)

    new_user.password = generate_password_hash(new_user.password)
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return jsonify(UserFullInfoSchema().dump(new_user))


@auth.route("/user/login", methods=["POST"])
def login():
    session = get_session()
    email = request.json.get("email")
    password = request.json.get("password")

    user = session.query(User).filter(User.email == email).first()
    if user and check_password_hash(user.password, password):
        # return UserFullInfoSchema().dump(user)
        access_token = create_access_token(identity=user)
        user_schema = UserFullInfoSchema().dump(user)
        user_schema['access_token'] = access_token
        response = jsonify(user_schema)
        # set_access_cookies(response, access_token)
        return response
    else:
        abort(401)


@auth.route("/user/logout", methods=["GET"])
@jwt_required()
def logout():
    return jsonify({"Message": "Successfully logged out =)"})
