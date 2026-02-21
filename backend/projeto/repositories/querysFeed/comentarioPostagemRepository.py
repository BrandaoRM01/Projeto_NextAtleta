from models import ComentarioPostagem
from extension.extensao import db

class ComentarioPostagemRepository:

    @staticmethod
    def criar_comentario(comentario: ComentarioPostagem):
        db.session.add(comentario)
        db.session.flush()
        return comentario
    
    @staticmethod
    def atualizar_comentario(comentario: ComentarioPostagem):
        comentario_atualizado = db.session.merge(comentario)
        return comentario_atualizado

    @staticmethod
    def deletar_comentario(comentario: ComentarioPostagem):
        comentario.ativo = False
        db.session.add(comentario)
        return comentario
    
    @staticmethod
    def buscar_comentario_por_id(comentario_id: int):
        return db.session.get(ComentarioPostagem, comentario_id)
    
    @staticmethod
    def buscar_todos_comentarios():
        return ComentarioPostagem.query.filter_by(ativo=True).all()