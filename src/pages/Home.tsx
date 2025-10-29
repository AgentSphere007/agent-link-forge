import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Zap, Shield } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.jpg';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* background image (muted) */}
        <div
          className="absolute inset-0 bg-cover bg-center filter grayscale opacity-20"
          style={{ backgroundImage: `url(${heroBanner})` }}
        />
        {/* dark hero overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-indigo-950/85 to-slate-900/95" />

        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight leading-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                AgentSphere
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-200/85 mb-8 leading-relaxed">
              Discover, deploy, and manage intelligent agents that transform the way you work
            </p>

            <div className="flex items-center justify-center gap-4">
              <Button
                variant="hero"
                size="lg"
                onClick={() => navigate('/auth')}
                className="text-lg px-8 py-4 h-auto bg-gradient-to-r from-cyan-500 to-indigo-600 hover:scale-[1.02] transform transition-all duration-200 shadow-[0_8px_30px_-6px_rgba(56,189,248,0.25)]"
              >
                Get Started
              </Button>

              <Button
                variant="ghost"
                size="lg"
                onClick={() => navigate('/about')}
                className="text-lg px-6 py-4 h-auto border border-slate-700 text-slate-200/90 hover:bg-slate-800/60"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-100 mb-12">
            Why Choose AgentSphere?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-slate-800/60 backdrop-blur-sm border border-slate-700 shadow-[0_6px_30px_-10px_rgba(56,189,248,0.04)] hover:shadow-[0_10px_40px_-8px_rgba(56,189,248,0.12)] transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-tr from-cyan-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_8px_30px_-12px_rgba(56,189,248,0.35)]">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-100">Discover Agents</h3>
              <p className="text-slate-300">
                Explore a curated marketplace of intelligent agents tailored to your needs.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-slate-800/60 backdrop-blur-sm border border-slate-700 shadow-[0_6px_30px_-10px_rgba(99,102,241,0.04)] hover:shadow-[0_10px_40px_-8px_rgba(99,102,241,0.12)] transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_8px_30px_-12px_rgba(99,102,241,0.35)]">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-100">Deploy Instantly</h3>
              <p className="text-slate-300">
                Get your agents up and running in seconds with one-click activation.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-slate-800/60 backdrop-blur-sm border border-slate-700 shadow-[0_6px_30px_-10px_rgba(236,72,153,0.04)] hover:shadow-[0_10px_40px_-8px_rgba(236,72,153,0.08)] transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-tr from-pink-600 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_8px_30px_-12px_rgba(236,72,153,0.35)]">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-100">Enterprise Ready</h3>
              <p className="text-slate-300">
                Built with security, scalability, and reliability at the core.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-950/80 to-cyan-900/80">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users and developers who trust AgentSphere.
          </p>
          <Button
            variant="hero"
            size="lg"
            onClick={() => navigate('/auth')}
            className="text-lg px-8 py-5 h-auto bg-gradient-to-r from-cyan-400 to-indigo-500 hover:scale-[1.02] shadow-[0_20px_50px_-20px_rgba(99,102,241,0.45)] transition-transform"
          >
            Start Your Journey
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
