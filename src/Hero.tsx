import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, Shield, MapPin } from "lucide-react";

interface HeroProps {
  onNavigate: (section: string) => void;
}

const Hero = ({ onNavigate }: HeroProps) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="h-4 w-4" />
              Trusted Local Services
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Your Neighborhood,{" "}
              <span className="text-gradient">Your Services,</span>{" "}
              Connected
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              From home repairs to personal care, find trusted local professionals at your fingertips. 
              AI-powered recommendations for the perfect service match.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button variant="hero" size="xl" onClick={() => onNavigate("services")}>
                Explore Services
                <ArrowRight className="h-5 w-5 ml-1" />
              </Button>
              <Button variant="outline" size="xl" onClick={() => onNavigate("become-provider")}>
                Become a Provider
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 gradient-hero rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">10K+</p>
                  <p className="text-sm text-muted-foreground">Service Providers</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 gradient-accent rounded-xl flex items-center justify-center">
                  <Star className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">4.9/5</p>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">100%</p>
                  <p className="text-sm text-muted-foreground">Verified Pros</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Service Cards Preview */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🔧", title: "Home Repair", color: "from-blue-500/20 to-blue-600/20" },
                { icon: "✨", title: "Cleaning", color: "from-green-500/20 to-green-600/20" },
                { icon: "💇", title: "Beauty", color: "from-pink-500/20 to-pink-600/20" },
                { icon: "🚗", title: "Vehicle Care", color: "from-orange-500/20 to-orange-600/20" },
              ].map((service, index) => (
                <div
                  key={service.title}
                  className={`bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1 animate-fade-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl mb-4`}>
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-foreground">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Expert services</p>
                </div>
              ))}
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-card animate-float">
              🎉 50+ Services
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
