class Config:
    def __init__(self, environment):
        self.environment = environment

    def get_backend_url(self):
        if self.environment == 'development':
            return 'http://127.0.0.1:3000'
        elif self.environment == 'production':
            return 'http://backend.example.com'
        else:
            raise ValueError('Nieznane środowisko. Dostępne opcje: development, production')

config = Config(environment='development')