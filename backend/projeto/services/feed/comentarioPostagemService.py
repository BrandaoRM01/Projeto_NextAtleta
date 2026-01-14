from extension.extensao import db
from repositories.querysFeed import ComentarioPostagemRepository
from DTOs.feed import CriarComentarioDTO
from DTOs.feed import AtualizarComentarioDTO
from models.comentarioPostagem import ComentarioPostagem

class ComentarioPostagemService:

    @staticmethod
    def criar_comentario(dados: dict, usuario_id: int, postagem_id: int):
        """
        Cria um comentário ou resposta em uma postagem
        """
        DTO = CriarComentarioDTO(dados, usuario_id, postagem_id)
        DTO.validar()

        try:
            comentario = ComentarioPostagem(**DTO.build())
            ComentarioPostagemRepository.criar_comentario(comentario)

            db.session.commit()
            return comentario.to_dict()

        except Exception:
            db.session.rollback()
            raise

    @staticmethod
    def atualizar_comentario(comentario_id: int, dados: dict, usuario_id: int):
        """
        Atualiza um comentário existente
        """
        comentario = ComentarioPostagemRepository.buscar_comentario_por_id(comentario_id)

        if not comentario or not comentario.ativo:
            raise ValueError("Comentário não encontrado")

        if comentario.usuario_id != usuario_id:
            raise PermissionError("Você não pode editar este comentário")

        DTO = AtualizarComentarioDTO(dados)
        DTO.validar()

        try:
            for campo, valor in DTO.build().items():
                setattr(comentario, campo, valor)

            ComentarioPostagemRepository.atualizar_comentario(comentario)
            db.session.commit()

            return comentario.to_dict()

        except Exception:
            db.session.rollback()
            raise

    @staticmethod
    def remover_comentario(comentario_id: int, usuario_id: int):
        """
        'Deleta' o comentário
        (comentários e respostas)
        """
        comentario = ComentarioPostagemRepository.buscar_comentario_por_id(comentario_id)

        if not comentario or not comentario.ativo:
            raise ValueError("Comentário não encontrado")

        if comentario.usuario_id != usuario_id:
            raise PermissionError("Você não pode remover este comentário")

        try:
            comentario.ativo = False
            ComentarioPostagemRepository.atualizar_comentario(comentario)

            db.session.commit()

        except Exception:
            db.session.rollback()
            raise

    @staticmethod
    def listar_comentarios_da_postagem(postagem_id: int):
        """
        Retorna todos os comentários ativos de uma postagem
        (comentários e respostas)
        """
        comentarios = ComentarioPostagem.query.filter_by(
            postagem_id=postagem_id,
            ativo=True
        ).all()

        return [comentario.to_dict() for comentario in comentarios]