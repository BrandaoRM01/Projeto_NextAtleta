class CriarCurtidaDTO:
    """
    DTO responsável por validar e preparar os dados
    para criação de uma curtida.
    """

    def __init__(self, data: dict):
        self.data = data
        self.data_final = {}


    def validar(self):
        if not self.data:
            raise ValueError("Dados da curtida não enviados")

        postagem_id = self.data.get("postagem_id")
        comentario_id = self.data.get("comentario_id")

        if postagem_id and comentario_id:
            raise ValueError("A curtida deve ser em uma postagem OU em um comentário")

        if not postagem_id and not comentario_id:
            raise ValueError("Informe uma postagem ou um comentário para curtir")

        if postagem_id:
            self.data_final["postagem_id"] = int(postagem_id)

        if comentario_id:
            self.data_final["comentario_id"] = int(comentario_id)

    def build(self):
        return self.data_final