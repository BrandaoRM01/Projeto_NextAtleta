import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trophy, Users, Target, Zap, ChevronRight, Star, Shield, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-athletes.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Atletas em ação"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/60 to-background" />
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between p-6 lg:px-12">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-glow">
              <Trophy className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-primary-foreground">NextAtleta</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link to="/explore" className="text-primary-foreground/80 transition-colors hover:text-primary-foreground">
              Explorar
            </Link>
            <Link to="/tryouts" className="text-primary-foreground/80 transition-colors hover:text-primary-foreground">
              Peneiras
            </Link>
            <Link to="/feed" className="text-primary-foreground/80 transition-colors hover:text-primary-foreground">
              Feed
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="hero-outline" className="hidden md:flex">
              Entrar
            </Button>
            <Button variant="hero" asChild>
              <a href="http://localhost:8080/" target="_blank">
                Começar agora
              </a>
              
            </Button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex min-h-[calc(100vh-88px)] flex-col items-center justify-center px-6 text-center">
          <div className="animate-fade-in max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 backdrop-blur-sm">
              <Star className="h-4 w-4 text-premium" />
              <span className="text-sm font-medium text-primary-foreground">A maior rede esportiva do Brasil</span>
            </div>

            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-primary-foreground md:text-6xl lg:text-7xl">
              Conecte seu
              <span className="block gradient-text bg-clip-text">talento ao mundo</span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-primary-foreground/80 md:text-xl">
              A plataforma que conecta atletas a oportunidades, clubes, olheiros e empresários. 
              Mostre seu potencial e alcance novos horizontes na sua carreira esportiva.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button variant="hero" size="xl" asChild>
                <Link to="/feed">
                  Criar meu perfil
                  <ChevronRight className="ml-1 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/explore">
                  Explorar atletas
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {[
              { value: "50k+", label: "Atletas" },
              { value: "2k+", label: "Clubes" },
              { value: "500+", label: "Peneiras/mês" },
              { value: "98%", label: "Satisfação" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold text-primary-foreground md:text-4xl">{stat.value}</p>
                <p className="text-sm text-primary-foreground/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="h-14 w-8 rounded-full border-2 border-primary-foreground/30 p-1">
            <div className="h-3 w-full rounded-full bg-primary-foreground/60 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Por que escolher a <span className="gradient-text">NextAtleta</span>?
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Uma plataforma completa para impulsionar sua carreira esportiva
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Users,
                title: "Networking Esportivo",
                description: "Conecte-se com clubes, olheiros e empresários do esporte. Amplie sua rede de contatos.",
              },
              {
                icon: Target,
                title: "Peneiras e Oportunidades",
                description: "Acesse peneiras exclusivas, testes e vagas de clubes de todo o Brasil.",
              },
              {
                icon: TrendingUp,
                title: "Visibilidade Premium",
                description: "Destaque seu perfil e seja visto por quem realmente importa na sua carreira.",
              },
              {
                icon: Zap,
                title: "Currículo Esportivo",
                description: "Crie um portfólio completo com vídeos, conquistas e histórico de clubes.",
              },
              {
                icon: Shield,
                title: "Perfis Verificados",
                description: "Clubes e olheiros verificados garantem oportunidades reais e confiáveis.",
              },
              {
                icon: Star,
                title: "Comunidade Ativa",
                description: "Faça parte de uma comunidade engajada de atletas e profissionais do esporte.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="card-elevated group p-6 hover:border-primary/30"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-all group-hover:gradient-primary">
                  <feature.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="bg-muted/50 py-20 lg:py-32">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Escolha seu <span className="gradient-text">plano</span>
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Comece grátis e evolua conforme sua carreira cresce
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            {/* Basic Plan */}
            <div className="card-elevated p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold">Atleta Basic</h3>
                <p className="text-muted-foreground">Perfeito para começar</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">Grátis</span>
              </div>
              <ul className="mb-8 space-y-3">
                {[
                  "Perfil completo",
                  "Feed de publicações",
                  "Curtidas e comentários",
                  "Candidatura a peneiras",
                  "Direct limitado (5/dia)",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/10">
                      <ChevronRight className="h-3 w-3 text-success" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" size="lg" className="w-full">
                Começar grátis
              </Button>
            </div>

            {/* Premium Plan */}
            <div className="card-elevated relative overflow-hidden border-premium/30 p-8">
              <div className="absolute right-0 top-0 gradient-premium px-4 py-1 text-sm font-semibold text-premium-foreground">
                Popular
              </div>
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">Atleta Premium</h3>
                  <span className="premium-badge">PRO</span>
                </div>
                <p className="text-muted-foreground">Máxima visibilidade</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">R$ 29</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <ul className="mb-8 space-y-3">
                {[
                  "Tudo do Basic +",
                  "Selo Premium no perfil",
                  "Direct ilimitado",
                  "Destaque na busca",
                  "Estatísticas avançadas",
                  "Suporte prioritário",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full gradient-premium">
                      <ChevronRight className="h-3 w-3 text-premium-foreground" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="premium" size="lg" className="w-full">
                Assinar Premium
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 gradient-primary opacity-10" />
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
              Pronto para dar o próximo passo na sua carreira?
            </h2>
            <p className="mb-10 text-lg text-muted-foreground">
              Junte-se a milhares de atletas que já estão transformando suas carreiras através da NextAtleta.
            </p>
            <Button variant="gradient" size="xl" asChild>
              <Link to="/feed">
                Criar conta gratuita
                <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <Trophy className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">NextAtleta</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              © 2024 NextAtleta. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Termos
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacidade
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contato
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
