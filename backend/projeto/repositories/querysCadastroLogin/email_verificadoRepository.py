from extension.extensao import db
from models.email_verificacao import EmailVerificacao
from datetime import datetime, timezone

class EmailRepository:

    @staticmethod
    def salvar_codigo(email: str, codigo_hash: str, expira_em):
        verificacao = EmailVerificacao(
            email=email,
            codigo_hash=codigo_hash,
            expira_em=expira_em
        )
        db.session.add(verificacao)
        db.session.commit()
        return verificacao


    @staticmethod
    def buscar_codigo(email: str):
        return(
            EmailVerificacao.query.filter(
                EmailVerificacao.email == email,
                EmailVerificacao.verificado == False,
                EmailVerificacao.expira_em > datetime.now(timezone.utc)
            ).order_by(EmailVerificacao.criado_em.desc()).first()
        )
    @staticmethod
    def incrementar_tentativas(id: int):
        codigo = EmailVerificacao.query.get(id)
        if codigo:
            codigo.tentativas += 1
            db.session.commit()

    @staticmethod
    def invalidar_todos(email):
        (
            EmailVerificacao.query
            .filter(
                EmailVerificacao.email == email,
                EmailVerificacao.verificado == False
            ).update({"verificado": True})
        )
        db.session.commit()

    @staticmethod
    def marcar_verificado(verificacao_id: int):
        verificacao = EmailVerificacao.query.get(verificacao_id)
        if verificacao:
            verificacao.verificado = True
            db.session.commit()

