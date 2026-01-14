from extension.extensao import db
from repositories.querysFeed import CurtidaRepository
from DTOs.feed import CriarCurtidaDTO
from DTOs.feed import RemoverCurtidaDTO
from models.curtida import Curtida


class CurtidaService:

    @staticmethod
    def curtir(dados: dict, usuario_id: int):
        """
        Cria ou reativa uma curtida (postagem ou comentário)
        """
        DTO = CriarCurtidaDTO(dados, usuario_id)
        DTO.validar()

        dados_curtida = DTO.build()

        try:
            # Verifica se já existe curtida (mesmo inativa)
            curtida_existente = Curtida.query.filter_by(
                usuario_id=usuario_id,
                postagem_id=dados_curtida.get("postagem_id"),
                comentario_id=dados_curtida.get("comentario_id")
            ).first()

            if curtida_existente:
                if curtida_existente.ativo:
                    raise ValueError("Item já curtido")

                curtida_existente.ativo = True
                CurtidaRepository.atualizar_curtida(curtida_existente)
                db.session.commit()
                return curtida_existente.to_dict()

            curtida = Curtida(**dados_curtida)
            CurtidaRepository.gerar_curtida(curtida)

            db.session.commit()
            return curtida.to_dict()

        except Exception:
            db.session.rollback()
            raise

    @staticmethod
    def remover_curtida(dados: dict, usuario_id: int):
        """
        'Remove' (desativa) uma curtida (postagem ou comentário)
        """
        DTO = RemoverCurtidaDTO(dados, usuario_id)
        DTO.validar()

        filtros = DTO.build()

        curtida = Curtida.query.filter_by(
            usuario_id=usuario_id,
            postagem_id=filtros.get("postagem_id"),
            comentario_id=filtros.get("comentario_id"),
            ativo=True
        ).first()

        if not curtida:
            raise ValueError("Curtida não encontrada")

        try:
            curtida.ativo = False
            CurtidaRepository.atualizar_curtida(curtida)

            db.session.commit()

        except Exception:
            db.session.rollback()
            raise