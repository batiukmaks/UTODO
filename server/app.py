from flask import Flask, jsonify
from datetime import timedelta
from db import get_session
from api import auth, user, group
from flask_cors import CORS
from api.authentication import jwt


def create_app(test_config=None):
    app = Flask(__name__)
    CORS(app)

    app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=900)

    app.register_blueprint(auth.auth)
    app.register_blueprint(user.user)
    app.register_blueprint(group.group)

    jwt.init_app(app)

    return app

app = create_app()


from db import get_session
@app.teardown_request
def teardown_request(exception=None):
    session = get_session()
    try:
        session.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()

@app.after_request
def after_request(response):        
    response.headers['Access-Control-Allow-Origin']= '*'
    response.headers['Access-Control-Allow-Headers']= 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods']= 'GET,PUT,POST,DELETE,OPTIONS'
    return response


@app.errorhandler(400)
def BadRequest(e):
    return jsonify({'Error': 'Invalid input'}), 400

@app.errorhandler(401)
def Unauthorized(e):
    return jsonify({'Error': 'Unauthorized user'}), 401

@app.errorhandler(403)
def Forbidden(e):
    return jsonify({'Error': 'The user does not have the necessary permissions for the resource'}), 403

@app.errorhandler(404)
def NotFound(e):
    return jsonify({'Error': f'The resourse is not found.\n{e}'}), 404
