from functools import wraps
from flask import request, jsonify, current_app, g
import jwt

def jwt_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        auth = request.headers.get("Authorization")

        if auth or auth.startswith("Bearer "):
            token = auth.split(" ")[1]
            
        else: 
            token = request.cookies.get("acess_token")
        try:
            payload = jwt.decode(
                token,
                current_app.config["JWT_SECRET_KEY"],
                algorithms=["HS256"]
            )

        except jwt.ExpiredSignatureError:
            return jsonify({"erro": "Token expirado!"}), 401

        except jwt.InvalidTokenError:
            return jsonify({"erro": "Token inválido!"}), 401

        user_id = payload.get("sub")
        if not user_id:
            return jsonify({"erro": "Token inválido: subject ausente"}), 401

        g.user_id = user_id

        return fn(*args, **kwargs)

    return wrapper