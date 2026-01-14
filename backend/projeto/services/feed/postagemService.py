from extension.extensao import db
from repositories.querysFeed import PostagemRepository
from DTOs.feed import CriarPostagemDTO
from DTOs.feed import AtualizarPostagemDTO
from DTOs.feed import FeedPostagemDTO
from DTOs.feed import DetalharPostagemDTO
from models.postagem import Postagem

class PostagemService:

    @staticmethod
    def criar_postagem(dados: dict, usuario_id: int):
        """
        Cria uma nova postagem no feed
        """
        DTO = CriarPostagemDTO(dados, usuario_id)
        DTO.validar()

        try:
            postagem = Postagem(**DTO.build())
            PostagemRepository.criar_postagem(postagem)

            db.session.commit()
            return DetalharPostagemDTO(postagem).build()

        except Exception:
            db.session.rollback()
            raise

    @staticmethod
    def atualizar_postagem(postagem_id: int, dados: dict, usuario_id: int):
        """
        Atualiza uma postagem existente
        """
        postagem = PostagemRepository.buscar_postagem_por_id(postagem_id)

        if not postagem or not postagem.ativo:
            raise ValueError("Postagem não encontrada")

        if postagem.usuario_id != usuario_id:
            raise PermissionError("Você não pode editar esta postagem")

        DTO = AtualizarPostagemDTO(dados)
        DTO.validar()

        try:
            for campo, valor in DTO.build().items():
                setattr(postagem, campo, valor)

            PostagemRepository.atualizar_postagem(postagem)
            db.session.commit()

            return DetalharPostagemDTO(postagem).build()

        except Exception:
            db.session.rollback()
            raise

    @staticmethod
    def remover_postagem(postagem_id: int, usuario_id: int):
        """
        'Deleta' a postagem
        """
        postagem = PostagemRepository.buscar_postagem_por_id(postagem_id)

        if not postagem or not postagem.ativo:
            raise ValueError("Postagem não encontrada")

        if postagem.usuario_id != usuario_id:
            raise PermissionError("Você não pode remover esta postagem")

        try:
            postagem.ativo = False
            PostagemRepository.atualizar_postagem(postagem)

            db.session.commit()

        except Exception:
            db.session.rollback()
            raise

    @staticmethod
    def listar_feed():
        """
        Retorna o feed de postagens
        """
        postagens = PostagemRepository.buscar_todas_postagens()

        return [
            FeedPostagemDTO(postagem).build()
            for postagem in postagens
            if postagem.ativo
        ]

    @staticmethod
    def detalhar_postagem(postagem_id: int):
        """
        Retorna os detalhes de uma postagem
        """
        postagem = PostagemRepository.buscar_postagem_por_id(postagem_id)

        if not postagem or not postagem.ativo:
            raise ValueError("Postagem não encontrada")

        return DetalharPostagemDTO(postagem).build()