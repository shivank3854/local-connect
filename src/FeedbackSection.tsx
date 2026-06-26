import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    service: "Home Cleaning",
    rating: 5,
    comment: "Absolutely amazing service! The cleaning team was professional, thorough, and left my home sparkling. Will definitely book again.",
    avatar: "P",
  },
  {
    name: "Rahul Verma",
    service: "AC Repair",
    rating: 5,
    comment: "Quick response and excellent work. The technician diagnosed the issue immediately and fixed it within an hour. Fair pricing too!",
    avatar: "R",
  },
  {
    name: "Anita Gupta",
    service: "Bridal Makeup",
    rating: 5,
    comment: "Made my wedding day perfect! The makeup artist was talented and understood exactly what I wanted. Highly recommended!",
    avatar: "A",
  },
  {
    name: "Vikram Singh",
    service: "Plumbing",
    rating: 4,
    comment: "Good service overall. Fixed the leaking pipe quickly. Would appreciate if they could arrive on time, but quality work.",
    avatar: "V",
  },
  {
    name: "Meera Patel",
    service: "Tutoring",
    rating: 5,
    comment: "Found an excellent math tutor for my son through Local Connect. His grades have improved significantly in just 2 months!",
    avatar: "M",
  },
  {
    name: "Arjun Reddy",
    service: "Car Service",
    rating: 5,
    comment: "Convenient doorstep car service. They picked up my car, serviced it, and returned it the same day. Great experience!",
    avatar: "A",
  },
];

const FeedbackSection = () => {
  return (
    <section id="feedback" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our <span className="text-gradient">Customers Say</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real reviews from real customers. We take pride in connecting you with the best service providers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="h-8 w-8 text-primary/30 mb-4" />
              
              <p className="text-foreground mb-6 line-clamp-4">"{testimonial.comment}"</p>
              
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? "text-secondary fill-secondary"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 gradient-hero rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
