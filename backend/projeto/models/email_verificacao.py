from datetime import datetime, timezone
from extension.extensao import db

class EmailVerificacao(db.Model):
    __tablename__ = "email_verificacao"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    email = db.Column(db.String(255), nullable=False, index=True)

    codigo_hash = db.Column(db.String(64), nullable=False)

    expira_em = db.Column(db.DateTime, nullable=False)

    verificado = db.Column(db.Boolean, default=False)

    tentativas = db.Column(db.Integer, default=0)

    criado_em = db.Column(
        db.DateTime,
        default=lambda: datetime.now(timezone.utc)
    )

    def __repr__(self):
        return f"<EmailVerificacao email={self.email} verificado={self.verificado}>"
