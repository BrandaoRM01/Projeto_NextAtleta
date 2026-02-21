from models import Curtida
from extension.extensao import db

class CurtidaRepository:

    @staticmethod
    def gerar_curtida(curtida: Curtida):
        db.session.add(curtida)
        db.session.flush()
        return curtida
    
    @staticmethod
    def atualizar_curtida(curtida: Curtida):
        curtida_atualizada = db.session.merge(curtida)
        return curtida_atualizada

    @staticmethod
    def deletar_curtida(curtida: Curtida):
        curtida.ativo = False
        db.session.add(curtida)
        return curtida
        
    @staticmethod
    def buscar_todas_curtidas():
        return Curtida.query.filter_by(ativo=True).all()