
from extension.extensao import db
from sqlalchemy.exc import IntegrityError
from services.cadastroLogin.cadastrarUsuarios import CadastroService
from services.cadastroLogin.emailService import EmailService
from flask import jsonify



class CadastroController:

   @staticmethod
   def cadastrar_usuario_com_atleta(dados):
       try:
           print(dados)
           usuario = CadastroService.cadastrar_atleta(dados)
   
           return usuario
   
       except IntegrityError as e: # Captura erros de violação de contraints, como email duplicado ou violação de unique
           db.session.rollback()
           print(str(e))
           raise ValueError("Email já cadastrado")
   
       except KeyError as e: # Captura quando dados['campo'] não existe
           db.session.rollback()
           print(str(e))
           raise ValueError(f"Campo ausente: {e}")
   
       except Exception as e: # Captura erros inesperados
           db.session.rollback()
           print(str(e))
           raise ValueError("Erro interno ao cadastrar atleta")
       
   @staticmethod
   def cadastro_usuario_com_agente(dados):
       try:
           
           return CadastroService.cadastrar_agente(dados)

       except IntegrityError as e: # Captura erros de violação de contraints, como email duplicado ou violação de unique
           db.session.rollback()
           print(str(e))
           raise ValueError("Email já cadastrado")
   
       except KeyError as e: # Captura quando dados['campo'] não existe
           db.session.rollback()
           print(str(e))
           raise ValueError(f"Campo ausente: {e}")
   
       except Exception as e: # Captura erros inesperados
           db.session.rollback()
           print(str(e))
           raise ValueError("Erro interno ao cadastrar agente")
       
   @staticmethod
   def enviar_codigo(email: str):
    try:
        codigo = EmailService.enviar_email_cadastro(email)
        return jsonify({
            "success": True,
            "message": "Se o e-mail informado for válido, você receberá um código de verificação."
        }), 200
    except RuntimeError:
        return jsonify({
            "success": False,
            "message": "Não foi possível enviar o código de verificação no momento."
        }), 500
    
   @staticmethod
   def validar_codigo(email: str, codigo: int):
       try:
           EmailService.validar_codigo(email, codigo)

           return jsonify({
               "success": True, 
               "message": "Codigo validado com sucesso!"
           }), 200
       
       except ValueError as e:
            return jsonify({"success": False, "message": str(e)}), 400
       except RuntimeError:
            return jsonify({"success": False, "message": "Erro interno"}), 500

           



   