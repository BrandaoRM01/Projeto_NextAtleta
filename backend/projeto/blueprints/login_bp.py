from flask import Blueprint, request, jsonify, make_response
from DTOs.loginDTO.loginResquest import LoginRequestDTO
from controller.loginController import LoginController


login_bp = Blueprint("login", __name__)


@login_bp.route('/', methods=['POST'])
def login():
    try:
        data = request.get_json(silent=True)
        dto = LoginRequestDTO(data)

        resultado = LoginController.autenticacao(dto)

        if not resultado:
            return jsonify({"message": "Email ou senha invalidos!"}), 401

        response = make_response(jsonify({
            "success": True,
            "user": resultado.user
        }))

        response.set_cookie(
            "access_token",
            resultado.token,
            httponly=True,
            secure=False,          
            samesite="Lax",    
            max_age=90000          
        )

        return response, 200

    except ValueError as e:
        return jsonify({"erro": str(e)}), 400