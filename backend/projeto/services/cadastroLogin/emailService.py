import random
from flask_mail import Message
from app import mail
from smtplib import SMTPException
import hashlib
from datetime import datetime, timedelta, timezone
from repositories.querysCadastroLogin.email_verificadoRepository import EmailRepository

class EmailService:

    @staticmethod
    def enviar_email_cadastro(email: str) -> int:
      
        codigo = random.randint(1000, 9999)

        codigo_hash = hashlib.sha256(str(codigo).encode()).hexdigest()

        expira_em = datetime.now(timezone.utc) + timedelta(minutes=1)

        msg = Message(
                subject="Confirmação de Cadastro – Código de Verificação",
                recipients=[email],
                body=(
                    "Olá,\n\n"
                    "Recebemos uma solicitação de criação de conta utilizando este endereço de e-mail.\n\n"
                    "Para confirmar que o e-mail informado é válido e que você possui acesso a ele, "
                    "utilize o código de verificação abaixo:\n\n"
                    f"Código de verificação: {codigo}\n\n"
                    "Este código é válido por tempo limitado e deve ser utilizado para concluir o seu cadastro.\n"
                    "Caso você não tenha iniciado este processo, recomendamos que ignore este e-mail.\n\n"
                    "Se precisar de suporte ou tiver alguma dúvida, nossa equipe está à disposição.\n\n"
                    "Atenciosamente,\n"
                    "Equipe NextAtleta\n"
                    "Suporte ao Usuário"
                )
            )
        try:
            mail.send(msg)
            EmailRepository.invalidar_todos(email)
            EmailRepository.salvar_codigo(
                email=email,
                codigo_hash = codigo_hash,
                expira_em = expira_em
            )
            
            return True
        except SMTPException as e:
            # erro específico de envio
            raise RuntimeError("Falha ao enviar o e-mail de verificação.") from e

        except Exception as e:
            # erro inesperado
            raise RuntimeError("Erro inesperado no serviço de e-mail.") from e
        
    @staticmethod
    def validar_codigo(email: str, codigo: int):
        registro = EmailRepository.buscar_codigo(email)

        if not registro:
            raise ValueError("Código expirado ou inexistente.")
        
        codigo_hash = hashlib.sha256(str(codigo).encode()).hexdigest()

        if registro.tentativas >= 5:
            raise ValueError("Muitas tentativas. Gere um novo código.")

        if registro.codigo_hash != codigo_hash:
            EmailRepository.incrementar_tentativas(registro.id)
            raise ValueError("Código inválido!")
        
        EmailRepository.marcar_verificado(registro.id)
        return True
        



