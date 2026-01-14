from flask import jsonify, request
from flask_login import current_user, login_required 
#O código só funciona quando current_user e login_required forem implementados, caso Flask-Login, JWT ou algo parecido seja usado
from services.feed import PostagemService

class PostagemController:
    """
    Controller responsável por lidar com requisições relacionadas a postagens.
    """
    @staticmethod
    @login_required
    def criar_postagem():
        """
        Cria uma nova postagem para o usuário autenticado.
        """

        # Obtém os dados enviados no corpo da requisição (JSON)
        dados = request.get_json() or {}

        # Encaminha os dados para o service responsável
        postagem = PostagemService.criar_postagem(
            dados=dados,
            usuario_id=current_user.id
        )

        # Retorna a postagem criada
        return jsonify(postagem), 201

    @staticmethod
    def detalhar_postagem(postagem_id: int):
        """
        Retorna os detalhes de uma postagem específica.

        Inclui:
        - dados da postagem
        - informações do autor
        - quantidade de curtidas
        - lista de comentários (e respostas)
        """

        # Tenta obter o usuário logado
        # Caso não esteja autenticado, o usuário será tratado como visitante
        try:
            usuario_id = current_user.id
        except Exception:
            usuario_id = 0

        # Chama o service responsável por montar a postagem completa
        postagem = PostagemService.detalhar_postagem(
            postagem_id=postagem_id,
            usuario_id=usuario_id
        )

        return jsonify(postagem), 200

    @staticmethod
    def listar_feed():
        """
        Retorna o feed de postagens.

        Pode receber filtros via query params, como:
        - pagina
        - limite
        - usuario
        - categoria
        """

        # Usuário autenticado (ou visitante)
        try:
            usuario_id = current_user.id
        except Exception:
            usuario_id = 0

        # Captura filtros enviados via URL (?pagina=1&limite=10)
        filtros = request.args.to_dict()

        # Busca o feed no service
        feed = PostagemService.listar_feed(
            usuario_id=usuario_id,
            filtros=filtros
        )

        return jsonify(feed), 200

    @staticmethod
    @login_required
    def atualizar_postagem(postagem_id: int):
        """
        Atualiza uma postagem existente.

        Somente o autor da postagem pode editá-la.
        """

        # Dados enviados para atualização
        dados = request.get_json() or {}

        postagem = PostagemService.atualizar_postagem(
            postagem_id=postagem_id,
            dados=dados,
            usuario_id=current_user.id
        )

        return jsonify(postagem), 200

    @staticmethod
    @login_required
    def remover_postagem(postagem_id: int):
        """
        Remove (desativa) uma postagem.

        Apenas o dono da postagem pode removê-la.
        """

        PostagemService.remover_postagem(
            postagem_id=postagem_id,
            usuario_id=current_user.id
        )

        return jsonify({"message": "Postagem removida com sucesso"}), 200