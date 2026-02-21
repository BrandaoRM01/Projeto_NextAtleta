import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/auth/FormField';
import { useToast } from '@/hooks/use-toast';
import authService from '@/services/auth.service';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !senha) {
      setError('Preencha todos os campos');
      return;
    }

    setLoading(true);

    try {
      const response = await authService.login({ email, senha });

      if (response.success) {
        toast({
          title: 'Login realizado!',
          description: 'Bem-vindo de volta ao SportLink',
        });
        window.location.href = ('http://localhost:8081/');
      } else {
        setError(response.error || 'Erro ao fazer login');
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-24">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="mb-10">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center [background:var(--gradient-primary)] shadow-glow">
                <span className="text-2xl font-bold text-primary-foreground">N</span>
              </div>
              <span className="text-2xl font-bold text-foreground">
                Next<span className="text-primary">Atleta</span>
              </span>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Bem-vindo de volta!
            </h1>
            <p className="text-muted-foreground">
              Faça login para acessar sua conta
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-3 animate-fade-in">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-5 h-5" />}
              required
            />

            <div className="relative">
              <FormField
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                icon={<Lock className="w-5 h-5" />}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[42px] text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center justify-end">
              <Link
                to="/recuperar-senha"
                className="text-sm text-primary hover:underline font-medium"
              >
                Esqueci minha senha
              </Link>
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>

          {/* Sign up link */}
          <p className="mt-8 text-center text-muted-foreground">
            Não tem uma conta?{' '}
            <Link to="/cadastro" className="text-primary font-semibold hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden [background:var(--gradient-hero)]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        
        <div className="relative z-10 flex flex-col justify-center items-center text-center px-12">
          <div className="w-24 h-24 rounded-3xl flex items-center justify-center bg-primary-foreground/10 backdrop-blur-sm mb-8 shadow-elevated">
            <span className="text-5xl font-bold text-primary-foreground">N</span>
          </div>
          
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            NextAtleta
          </h2>
          
          <p className="text-lg text-primary-foreground/80 max-w-md">
            Conectando atletas, clubes e agentes esportivos. Sua carreira no esporte começa aqui.
          </p>

          {/* Decorative elements */}
          <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-primary-foreground/5 blur-2xl"></div>
          <div className="absolute bottom-32 left-16 w-48 h-48 rounded-full bg-primary-foreground/5 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
