from models import Postagem
from extension.extensao import db

class PostagemRepository:

    @staticmethod
    def criar_postagem(postagem: Postagem):
        db.session.add(postagem)
        db.session.flush()
        return postagem
    
    @staticmethod
    def atualizar_postagem(postagem: Postagem):
        postagem_atualizada = db.session.merge(postagem)
        return postagem_atualizada

    @staticmethod
    def deletar_postagem(postagem: Postagem):
        postagem.ativo = False
        db.session.add(postagem)
        return postagem
    
    @staticmethod
    def buscar_postagem_por_id(postagem_id: int):
        return db.session.get(Postagem, postagem_id)
    
    @staticmethod
    def buscar_todas_postagens():
        return Postagem.query.filter_by(ativo=True).all()