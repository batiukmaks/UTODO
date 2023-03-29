from flask import Blueprint, request, jsonify, abort
from flask_jwt_extended import jwt_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from db import get_session
from models import *
from schemas import *

user = Blueprint("user", __name__, url_prefix="/user")


@user.route("/", methods=["PUT"])
@jwt_required()
def user_update():
    session = get_session()

    user = session.query(User).filter(User.id == current_user.id).first()
    if not user:
        abort(404)

    if check_password_hash(user.password, request.json.get('old_password')):
        user.password = generate_password_hash(request.json.get('password'))

    for key, val in request.json.items():
        if not key in ['password', 'old_password']:
            session.query(User).filter(User.id == user.id).update({key: val})
    session.commit()
    return jsonify(
        UserFullInfoSchema().dump(
            session.query(User).filter(User.id == user.id).first()
        )
    )


@user.route("/<user_id>", methods=["GET", "DELETE"])
@jwt_required()
def user_by_id(user_id):
    session = get_session()
    if not user_id.isnumeric():
        abort(400)

    user = session.query(User).filter(User.id == user_id).first()
    if not user:
        abort(404)

    if request.method == "GET":
        return jsonify(UserPublicInfoSchema().dump(user))
    elif request.method == "DELETE":
        session.query(User).filter(User.id == user_id).delete()
        session.commit()
        return jsonify({"Message": "Successfully deleted =)"})


@user.route('/me', methods=['GET'])
@jwt_required()
def me():
    return jsonify(UserPublicInfoSchema().dump(current_user))


@user.route("/tasks", methods=["GET"])
@jwt_required()
def get_user_tasks():
    session = get_session()
    user_tasks = (
        session.query(UserTask).filter(UserTask.user_id == current_user.id).all()
    )

    tasks = []
    for user_task in user_tasks:
        group_task = (
            session.query(GroupTask)
            .filter(GroupTask.id == user_task.groupTask_id)
            .first()
        )
        tasks.append(UserTaskInfoSchema().dump(user_task))
        tasks[-1]["group_id"] = group_task.group_id
        tasks[-1]["task_id"] = group_task.id
        tasks[-1]["name"] = group_task.name
        tasks[-1]["description"] = group_task.description
        tasks[-1]["group_name"] = session.query(Group).filter(Group.id == group_task.group_id).first().name
    return jsonify(tasks)


@user.route("/tasks/<task_id>", methods=["GET", "PUT"])
@jwt_required()
def change_user_task_status(task_id):
    session = get_session()

    user_task = session.query(UserTask).filter(UserTask.id == task_id).first()
    if not user_task:
        abort(404)

    def get_fullinfo_task(user_task):
        group_task = (
            session.query(GroupTask)
            .filter(GroupTask.id == user_task.groupTask_id)
            .first()
        )
        task = UserTaskInfoSchema().dump(user_task)
        task["task_id"] = group_task.id
        task["name"] = group_task.name
        task["description"] = group_task.description
        return task

    if request.method == "GET":
        return jsonify(get_fullinfo_task(user_task))
    elif request.method == "PUT":
        status = request.json.get("status")
        if status not in ["done", "undone", "in_progress", "switch"]:
            abort(400)
        if status == "switch" and user_task.status == "done":
            user_task.status = "undone"
        elif status == "switch" and user_task.status == "undone":
            user_task.status = "done"
        else:
            user_task.status = status
        session.commit()
        return jsonify(get_fullinfo_task(user_task))


@user.route("/byname/<user_name>", methods=["GET"])
def get_user(user_name):
    session = get_session()
    user = session.query(User).filter(User.name == user_name).first()
    if user:
        return jsonify(UserPublicInfoSchema().dump(user))
    else:
        abort(404)


@user.route(f"/all", methods=["GET"])
def get_users():
    session = get_session()
    users = []
    for user in session.query(User).all():
        users.append(UserFullInfoSchema().dump(user))
    return jsonify(users)
