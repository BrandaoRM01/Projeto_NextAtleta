from flask import jsonify, request
from flask_login import current_user, login_required
# O código só funciona quando current_user e login_required forem implementados,
# caso Flask-Login, JWT ou algo parecido seja usado
from services.feed import ComentarioPostagemService

class ComentarioPostagemController:
    """
    Controller responsável por lidar com requisições relacionadas
    aos comentários de uma postagem.
    """

    @staticmethod
    @login_required
    def criar_comentario(postagem_id: int):
        """
        Cria um comentário em uma postagem específica.

        O comentário será associado:
        - ao usuário autenticado
        - à postagem informada
        """

        # Obtém os dados enviados no corpo da requisição (JSON)
        dados = request.get_json() or {}

        comentario = ComentarioPostagemService.criar_comentario(
            dados=dados,
            postagem_id=postagem_id,
            usuario_id=current_user.id
        )

        # Retorna o comentário criado
        return jsonify(comentario), 201

    @staticmethod
    @login_required
    def atualizar_comentario(comentario_id: int):
        """
        Atualiza um comentário existente.

        Apenas o autor do comentário pode editá-lo.
        """

        # Dados enviados para atualização
        dados = request.get_json() or {}

        comentario = ComentarioPostagemService.atualizar_comentario(
            comentario_id=comentario_id,
            dados=dados,
            usuario_id=current_user.id
        )

        return jsonify(comentario), 200

    @staticmethod
    @login_required
    def remover_comentario(comentario_id: int):
        """
        Remove (desativa) um comentário.

        A exclusão é lógica (ativo = False),
        mantendo o histórico no banco de dados.
        """

        ComentarioPostagemService.remover_comentario(
            comentario_id=comentario_id,
            usuario_id=current_user.id
        )

        return jsonify({"message": "Comentário removido com sucesso"}), 200