from models.perfilEsportivo import PerfilEsportivo
from extension.extensao import db

class AgenteRepository:

    @staticmethod
    def buscar_agente_usuario_id(id):
        agente = PerfilEsportivo.query.filter_by(usuario_id = id).first()

        return agente
    
    @staticmethod
    def criar(agente: PerfilEsportivo):
        db.session.add(agente)
        db.session.commit()

        return agente