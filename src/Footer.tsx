import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="help" className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">L</span>
              </div>
              <span className="text-xl font-bold">
                Local<span className="text-primary">Connect</span>
              </span>
            </div>
            <p className="text-background/70 text-sm mb-6">
              Your trusted platform for local services. Connecting neighborhoods with skilled professionals since 2024.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <Button key={index} variant="ghost" size="icon" className="text-background/70 hover:text-primary hover:bg-background/10">
                  <Icon className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Popular Services</h4>
            <ul className="space-y-2 text-sm text-background/70">
              {["Home Maintenance", "Cleaning Services", "Beauty & Wellness", "Vehicle Care", "Tutoring", "Events & Catering"].map((service) => (
                <li key={service}>
                  <a href="#services" className="hover:text-primary transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-background/70">
              {["About Us", "Become a Provider", "Careers", "Blog", "Terms of Service", "Privacy Policy"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-background/70 mb-6">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Service Street, Mumbai, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@localconnect.in</span>
              </li>
            </ul>

            <h5 className="font-medium text-sm mb-3">Subscribe to Newsletter</h5>
            <div className="flex gap-2">
              <Input 
                placeholder="Your email" 
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
              />
              <Button variant="hero" size="sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">
            © {currentYear} Local Connect. All rights reserved.
          </p>
          <p className="text-sm text-background/60">
            Made with ❤️ for local communities
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
