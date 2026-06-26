import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, Phone, Users, HelpCircle, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const serviceCategories = [
  "Home Maintenance",
  "Cleaning Services",
  "Beauty & Wellness",
  "Home Essentials",
  "Daily Needs",
  "Security Services",
  "Events & Design",
  "Vehicle Care",
  "Tutoring",
  "Information Services",
  "Religious Services",
  "Delivery Services",
];

interface NavbarProps {
  onNavigate: (section: string) => void;
}

const Navbar = ({ onNavigate }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => onNavigate("hero")}
          >
            <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">L</span>
            </div>
            <span className="text-xl font-bold text-foreground">
              Local<span className="text-primary">Connect</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="navlink" className="gap-1">
                  Services <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-popover border border-border shadow-card">
                {serviceCategories.map((category) => (
                  <DropdownMenuItem 
                    key={category} 
                    onClick={() => onNavigate("services")}
                    className="cursor-pointer hover:bg-muted"
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="navlink" onClick={() => onNavigate("ai-suggestion")}>
              <Sparkles className="h-4 w-4 mr-1" />
              AI Suggestion
            </Button>

            <Button variant="navlink" onClick={() => onNavigate("become-provider")}>
              <Users className="h-4 w-4 mr-1" />
              Become a Provider
            </Button>

            <Button variant="navlink" onClick={() => onNavigate("help")}>
              <HelpCircle className="h-4 w-4 mr-1" />
              Help & Contact
            </Button>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-1" />
              Contact Us
            </Button>
            <Button variant="hero" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-up">
            <div className="flex flex-col gap-2">
              <Button variant="ghost" className="justify-start" onClick={() => { onNavigate("services"); setIsOpen(false); }}>
                Services
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => { onNavigate("ai-suggestion"); setIsOpen(false); }}>
                <Sparkles className="h-4 w-4 mr-2" />
                AI Suggestion
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => { onNavigate("become-provider"); setIsOpen(false); }}>
                <Users className="h-4 w-4 mr-2" />
                Become a Provider
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => { onNavigate("help"); setIsOpen(false); }}>
                <HelpCircle className="h-4 w-4 mr-2" />
                Help & Contact
              </Button>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1">Contact Us</Button>
                <Button variant="hero" className="flex-1">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
