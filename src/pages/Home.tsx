import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Zap, Shield } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.jpg';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroBanner})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Welcome to <span className="bg-gradient-accent bg-clip-text text-transparent">AgentSphere</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Discover, deploy, and manage intelligent agents that transform the way you work
            </p>
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => navigate('/auth')}
              className="text-lg px-8 py-6 h-auto"
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose AgentSphere?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-card shadow-card hover:shadow-elevated transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover Agents</h3>
              <p className="text-muted-foreground">
                Explore a vast marketplace of intelligent agents tailored to your needs
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-card shadow-card hover:shadow-elevated transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Deploy Instantly</h3>
              <p className="text-muted-foreground">
                Get your agents up and running in seconds with one-click activation
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-card shadow-card hover:shadow-elevated transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enterprise Ready</h3>
              <p className="text-muted-foreground">
                Built with security, scalability, and reliability at the core
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users and developers who trust AgentSphere
          </p>
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => navigate('/auth')}
            className="text-lg px-8 py-6 h-auto bg-white text-primary hover:bg-white/90"
          >
            Start Your Journey
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
