from flask import jsonify, request
from flask_login import current_user, login_required
# O código só funciona quando current_user e login_required forem implementados,
# caso Flask-Login, JWT ou algo parecido seja usado
from services.feed import CurtidaService

class CurtidaController:
    """
    Controller responsável por lidar com requisições relacionadas
    às curtidas em postagens.
    """

    @staticmethod
    @login_required
    def curtir_postagem(postagem_id: int):
        """
        Cria uma curtida para uma postagem.

        Um usuário só pode curtir uma postagem uma única vez.
        """

        curtida = CurtidaService.curtir_postagem(
            postagem_id=postagem_id,
            usuario_id=current_user.id
        )

        # Retorna a curtida criada
        return jsonify(curtida), 201

    @staticmethod
    @login_required
    def remover_curtida(postagem_id: int):
        """
        'Remove' a curtida do usuário em uma postagem.
        """

        CurtidaService.remover_curtida(
            postagem_id=postagem_id,
            usuario_id=current_user.id
        )

        return jsonify({"message": "Curtida removida com sucesso"}), 200