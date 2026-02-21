from models.usuario import Usuario
from models.atleta import Atleta
from models.perfilAtleta import PerfilAtleta
from extension.extensao import db
from werkzeug.security import generate_password_hash
from sqlalchemy.exc import IntegrityError
from datetime import datetime, timezone
from repositories.querysCadastroLogin.usuarioRepository import UsuarioRepository
from repositories.querysCadastroLogin.atletaRepository import AtletaRepository
from repositories.querysCadastroLogin.perfilAtletaRepository import PerfilAtletaRepository
from repositories.querysCadastroLogin.agenteRepository import AgenteRepository
from models.perfilEsportivo import PerfilEsportivo
import re
from services.formador_mensagem import FormadorMensagem
from services.tratamento_dados import Tratamento_dados

class CadastroService:

    @staticmethod
    def cadastrar_atleta(dados):
        try:
            data_doc = dados['data_nascimento_documento']
            data_form = datetime.strptime(
                dados['data_nascimento'], "%Y-%m-%d"
            ).strftime("%d/%m/%Y")

            if data_doc != data_form:
                raise ValueError("Datas não coincidem")

            maior_idade = Tratamento_dados.maior_idade(data_doc)

            senha_hash = generate_password_hash(dados['senha'])

            usuario = Usuario(
                nome=dados['nome'].title().strip(),
                email=dados['email'].strip().lower(),
                senha_hash=senha_hash,
                tipo_usuario='atleta',
                status='ativo'
            )

            UsuarioRepository.criar(usuario)

            atleta = Atleta(
                usuario_id=usuario.id,
                data_nascimento=datetime.strptime(
                    dados['data_nascimento'], "%Y-%m-%d"
                ).date(),
                cpf = dados['cpf_documento'],
                documento_validado = True,
                maior_idade=maior_idade,
                cidade=dados['cidade'],
                estado=dados['estado'],
                altura_cm=dados['altura_cm'],
                peso_kg=dados['peso_kg'],
                sexo=dados['sexo'],
                disponivel= dados['disponivel_oportunidades'] == "true"
            )

            AtletaRepository.criar(atleta)

            perfil = PerfilAtleta(
                atleta_id=atleta.id,
                esporte=dados['esporte'],
                posicao=dados['posicao'],
                bio=dados['bio']
            )

            PerfilAtletaRepository.criar(perfil)

            db.session.commit()
            return usuario

        except IntegrityError:
            db.session.rollback()
            raise ValueError("Email já cadastrado")

        except Exception as e:
            db.session.rollback()
            raise e
        
    @staticmethod
    def cadastrar_agente(dados):
      try:
           documento_form = re.sub(r"\D", "", dados['numero_documento'])
           documento_img = re.sub(r"\D", "", dados['cpf_documento'])

           if documento_form != documento_img:
               return {
                   "sucess": False,
                   "message": f"O numero do {dados['tipo_documento']} digitado e o da imagem enviada são diferentes!"
               }
               
           print(dados)
           senha_hash = generate_password_hash(
               dados['senha'], method="pbkdf2:sha256", salt_length=16
           )
   
           usuario = Usuario(
               nome=dados['nome'].title().strip(),
               email=dados['email'].strip().lower(),
               senha_hash=senha_hash,
               tipo_usuario=dados['tipo_usuario'],
               status='ativo',
               email_verificado=False,
               telefone=dados['telefone'],
               foto_perfil=dados['foto_perfil']
           )

           UsuarioRepository.criar(usuario)
   
           novo_agente = PerfilEsportivo(
               usuario_id = usuario.id,
               tipo_perfil = dados['tipo_usuario'],
               nome_publico = dados['nome_publico'],
               descricao = dados['descricao'],
               cidade = dados['cidade'],
               estado = dados['estado'],
               site = dados['site'],
               telefone = dados['telefone_contato'],
               email_contato = dados['email_contato'],
               logo = None,
               documento_tipo = dados['tipo_documento'].upper(),
               documento_numero = dados['numero_documento'],
               documento_validado = False,
               data_validacao = None,
               status_verificacao = 'pendente',
               motivo_rejeicao = "Fase de teste ainda",
               verificado_em = datetime.now(timezone.utc)

           )

           AgenteRepository.criar(novo_agente)

           return {
                   "sucess": False,
                   "user": usuario.to_dict(),
                   "message": FormadorMensagem.formar_texto_cadastro_agente(novo_agente.status_verificacao)
               }

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

