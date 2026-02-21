class CodigoDTO:

    def __init__(self, codigo: str):
        self.codigo = codigo

    
    def validar_codigo(self):
        if not self.codigo:
            raise ValueError("Codigo não enviado")
        
        if not int(self.codigo) and len(self.codigo) != 4:
            raise ValueError("Formato do codigo invalido!")
        
    
    def build(self):
        return int(self.codigo)