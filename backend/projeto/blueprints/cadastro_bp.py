from flask import jsonify, request, Blueprint
from controller.cadastroController import CadastroController
from services.preProcessador_img import Preprocessador_img
from services.ocrService import OCRservices
from services.rg_parser import RGparse
from services.tratamento_dados import Tratamento_dados
from DTOs.cadastroDTO.atletaDTO import CadastroAtletaDTO
from DTOs.cadastroDTO.agenteDTO import CadastroAgenteDTO
from DTOs.cadastroDTO.emailDTO import EmailDTO
from DTOs.cadastroDTO.codigoDTO import CodigoDTO

cadastro_bp = Blueprint("cadastro", __name__)
controller = CadastroController()


@cadastro_bp.route('/atleta', methods=['POST'])
def cadastrar_atleta ():
    try:
       dto = CadastroAtletaDTO(
           form_data=request.form.to_dict(),
           files= request.files
       )
       dto.validar()
       dto.processar_documentos(Tratamento_dados)
       dto.validar_cpf(Tratamento_dados)
       data = dto.build()
       
        
       usuario = controller.cadastrar_usuario_com_atleta(data)

       return jsonify({
           "sucess": True,
           "user": usuario.to_dict()
       }), 200

    except ValueError as e:
        print(str(e))
        return jsonify({
            "sucess": False,
            "message": str(e)
        }), 400
    
    except Exception as e:
        print(str(e))
        return jsonify({
            "success": False,
            "message": "Erro interno no servidor!!!!"
        }), 500

@cadastro_bp.route('/agente', methods=['POST'])
def cadastro_agente():
    try: 
        dto = CadastroAgenteDTO(
            form_data = request.form.to_dict(),
            files = request.files
        )

        dto.validar()
        dto.processar_documentos(Tratamento_dados)
        dto.validar_cpf()
        dados = dto.build()
 
        print("dados: ",dados, "\n")
        usuario = controller.cadastro_usuario_com_agente(dados)
        
        return jsonify(usuario), 200

        
    except ValueError as e:
        print(str(e))
        return jsonify({
            "sucesso": False,
            "erro": str(e)
        }), 400
    
    except Exception as e:
        print(e)
        return jsonify({
            "success": False,
            "error": "Erro interno no servidor"
        }), 500

@cadastro_bp.route('/enviar_codigo', methods=['POST'])
def enviar_codigo():
    try:
        data = request.get_json(silent=True)
        dto = EmailDTO(data['email'])
        dto.validar_email()
        dto = dto.build()

        return CadastroController.enviar_codigo(dto)

    except ValueError as e:
        print(str(e))
        return jsonify({
            "success": False,
            "message": str(e),
            "error": str(e),
        }), 400
    
    except Exception as e:
        print(e)
        return jsonify({
            "success": False,
            "message": "Erro interno no servidor",
            "error": "Erro interno no servidor",
        }), 500

@cadastro_bp.route('/verificar_codigo', methods=['POST'])
def verificar_codigo():
    try:
        data = request.get_json(silent=True)

        dtoCodigo = CodigoDTO(data['codigo'])
        dtoCodigo.validar_codigo()
        codigo = dtoCodigo.build()

        dtoEmail = EmailDTO(data['email'])
        dtoEmail.validar_email()
        email = dtoEmail.build()

        return CadastroController.validar_codigo(email, codigo)
    
    except ValueError as e:
        print(str(e))
        return jsonify({
            "success": False,
            "message": str(e),
            "error": str(e),
        }), 400
    
    except Exception as e:
        print(e)
        return jsonify({
            "success": False,
            "message": "Erro interno no servidor",
            "error": "Erro interno no servidor",
        }), 500
