import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Send, Bot, User, Clock, IndianRupee, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface SuggestedProvider {
  name: string;
  rating: number;
  experience: string;
  price: string;
  available: string;
}

const AISuggestion = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hello! I'm your AI service assistant. Tell me what you need help with, and I'll suggest the best services and providers based on your requirements. For example: 'I need my AC repaired urgently' or 'Looking for a cook for a party of 50 people'.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedProviders, setSuggestedProviders] = useState<SuggestedProvider[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    // Simulate AI response (will be connected to actual AI later)
    setTimeout(() => {
      const aiResponse = generateMockResponse(userMessage);
      setMessages(prev => [...prev, { role: "assistant", content: aiResponse.message }]);
      setSuggestedProviders(aiResponse.providers);
      setIsLoading(false);
    }, 1500);
  };

  const generateMockResponse = (query: string): { message: string; providers: SuggestedProvider[] } => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("ac") || lowerQuery.includes("air conditioner")) {
      return {
        message: "Based on your AC repair needs, I recommend these verified technicians. AC servicing typically costs ₹400-800 for basic service and ₹800-2000 for repairs. For urgent same-day service, choose providers marked with '⚡'.",
        providers: [
          { name: "Rajesh Kumar", rating: 4.9, experience: "8 years", price: "₹500-1500", available: "Today, 2 PM ⚡" },
          { name: "Amit Sharma", rating: 4.8, experience: "5 years", price: "₹400-1200", available: "Tomorrow, 10 AM" },
          { name: "Suresh Patel", rating: 4.7, experience: "10 years", price: "₹600-1800", available: "Today, 5 PM ⚡" },
        ]
      };
    } else if (lowerQuery.includes("cook") || lowerQuery.includes("chef") || lowerQuery.includes("party")) {
      return {
        message: "For catering/cooking services, pricing depends on the number of guests and menu complexity. For 50 people, expect ₹150-300 per plate. Here are top-rated chefs available:",
        providers: [
          { name: "Chef Anita Devi", rating: 4.9, experience: "12 years", price: "₹200/plate", available: "Available weekends" },
          { name: "Masterchef Ravi", rating: 4.8, experience: "15 years", price: "₹250/plate", available: "Any day" },
          { name: "Priya's Kitchen", rating: 4.7, experience: "6 years", price: "₹180/plate", available: "Weekdays" },
        ]
      };
    } else if (lowerQuery.includes("clean") || lowerQuery.includes("cleaning")) {
      return {
        message: "For cleaning services, here's what I suggest based on your needs. Deep cleaning for a 2BHK typically costs ₹1500-2500. Regular cleaning services range ₹200-400 per visit.",
        providers: [
          { name: "SparkClean Team", rating: 4.9, experience: "5 years", price: "₹1800/deep clean", available: "Today available" },
          { name: "Priti Home Services", rating: 4.8, experience: "3 years", price: "₹1500/deep clean", available: "Tomorrow" },
        ]
      };
    }
    
    return {
      message: "I understand you need assistance. Could you please provide more details about the service you're looking for? For example, mention the specific service type, urgency, or any special requirements.",
      providers: []
    };
  };

  const handleBookProvider = (providerName: string) => {
    toast({
      title: "Booking Request Sent!",
      description: `Your request has been sent to ${providerName}. They'll contact you shortly.`,
    });
  };

  return (
    <section id="ai-suggestion" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            AI-Powered Recommendations
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Smart Service <span className="text-gradient">Suggestions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Describe what you need, and our AI will recommend the best services, pricing, and top-rated providers based on your specific requirements.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "user" ? "bg-primary" : "gradient-hero"
                  }`}>
                    {message.role === "user" ? (
                      <User className="h-4 w-4 text-primary-foreground" />
                    ) : (
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    )}
                  </div>
                  <div className={`max-w-[80%] p-4 rounded-2xl ${
                    message.role === "user" 
                      ? "bg-primary text-primary-foreground rounded-tr-sm" 
                      : "bg-muted text-foreground rounded-tl-sm"
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 gradient-hero rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted p-4 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Providers */}
            {suggestedProviders.length > 0 && (
              <div className="border-t border-border p-6 bg-muted/50">
                <h4 className="font-semibold text-foreground mb-4">Recommended Providers</h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {suggestedProviders.map((provider, index) => (
                    <div key={index} className="bg-card border border-border rounded-xl p-4">
                      <h5 className="font-semibold text-foreground">{provider.name}</h5>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 text-secondary fill-secondary" />
                        <span>{provider.rating}</span>
                        <span>•</span>
                        <span>{provider.experience}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="flex items-center gap-1 text-primary">
                          <IndianRupee className="h-3 w-3" />
                          {provider.price}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {provider.available}
                        </span>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full mt-3"
                        onClick={() => handleBookProvider(provider.name)}
                      >
                        Book Now
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="border-t border-border p-4 flex gap-3">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe what service you need..."
                className="min-h-[50px] max-h-[100px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <Button type="submit" variant="hero" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISuggestion;
