class EmailDTO:
    
    DOMINIOS_PERMITIDOS = {"gmail.com", "hotmail.com", "aluno.ifsp.edu.br"}

    def __init__(self, email: str):
        self.email = email



    def validar_email(self):
        print(self.email)
        if not self.email or '@' not in self.email:
            raise ValueError("formato de email invalido!")
        
        usuario, dominio = self.email.split("@", 1)

        if not usuario or not dominio:
            raise ValueError("formato de email invalido")

        if dominio not in self.DOMINIOS_PERMITIDOS:
            raise ValueError("formato de email invalido ou dominio não aceito!")
        
    def build(self):
        email = self.email.replace(" ", "")
        return email
        
