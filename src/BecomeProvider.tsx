import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, Users, IndianRupee, Calendar } from "lucide-react";

const professionOptions = [
  "Electrician",
  "Plumber",
  "Carpenter",
  "Appliance Technician",
  "Pest Control Expert",
  "Cleaning Professional",
  "Beauty/Salon Expert",
  "Massage Therapist",
  "Makeup Artist",
  "Painter",
  "Interior Designer",
  "Gardener",
  "Packers & Movers",
  "Cook/Chef",
  "Maid/Household Help",
  "Babysitter",
  "Elder Care Provider",
  "Pet Care Specialist",
  "CCTV Technician",
  "Security Guard",
  "Tailor",
  "Photographer/Videographer",
  "Event Decorator",
  "Caterer",
  "Mechanic",
  "Driver",
  "Car Wash Expert",
  "Academic Tutor",
  "Music Teacher",
  "Dance Instructor",
  "Driving Instructor",
  "Pandit/Priest",
  "Delivery Personnel",
  "Other",
];

const experienceOptions = [
  "Less than 1 year",
  "1-2 years",
  "2-5 years",
  "5-10 years",
  "10+ years",
];

const BecomeProvider = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    aadharNumber: "",
    profession: "",
    experience: "",
    priceRange: "",
    availability: "",
    bio: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Application Submitted! 🎉",
      description: "We'll review your application and get back to you within 24-48 hours.",
    });

    setIsSubmitting(false);
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      pincode: "",
      aadharNumber: "",
      profession: "",
      experience: "",
      priceRange: "",
      availability: "",
      bio: "",
    });
  };

  return (
    <section id="become-provider" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Benefits */}
          <div className="lg:sticky lg:top-24">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Join Our Network of <span className="text-gradient">Trusted Providers</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Set your own prices, choose your hours, and grow your business with Local Connect.
            </p>

            <div className="space-y-6">
              {[
                { icon: IndianRupee, title: "Set Your Own Prices", desc: "You decide how much to charge for your services" },
                { icon: Calendar, title: "Flexible Schedule", desc: "Work when you want, accept jobs that fit your schedule" },
                { icon: Users, title: "Reach More Customers", desc: "Get connected with customers in your area instantly" },
                { icon: CheckCircle, title: "Verified Badge", desc: "Build trust with our verification system" },
              ].map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 gradient-hero rounded-xl flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-card border border-border rounded-2xl">
              <p className="text-sm text-muted-foreground">
                "Joining Local Connect was the best decision for my business. I've tripled my customer base in just 3 months!"
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 gradient-accent rounded-full flex items-center justify-center text-accent-foreground font-bold">
                  R
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Ramesh Kumar</p>
                  <p className="text-xs text-muted-foreground">Electrician, 5★ Provider</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-card">
            <h3 className="text-xl font-semibold text-foreground mb-6">Provider Registration Form</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Details */}
              <div className="space-y-4">
                <h4 className="font-medium text-foreground border-b border-border pb-2">Personal Details</h4>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Full Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    placeholder="House/Flat No., Street, Locality"
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      placeholder="Your city"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      value={formData.pincode}
                      onChange={(e) => handleChange("pincode", e.target.value)}
                      placeholder="XXXXXX"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aadhar">Aadhar Number *</Label>
                  <Input
                    id="aadhar"
                    value={formData.aadharNumber}
                    onChange={(e) => handleChange("aadharNumber", e.target.value)}
                    placeholder="XXXX XXXX XXXX"
                    required
                  />
                  <p className="text-xs text-muted-foreground">Required for verification. Your data is secure.</p>
                </div>
              </div>

              {/* Professional Details */}
              <div className="space-y-4">
                <h4 className="font-medium text-foreground border-b border-border pb-2">Professional Details</h4>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="profession">Profession *</Label>
                    <Select 
                      value={formData.profession} 
                      onValueChange={(value) => handleChange("profession", value)}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select your profession" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border border-border max-h-60">
                        {professionOptions.map((prof) => (
                          <SelectItem key={prof} value={prof}>{prof}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience *</Label>
                    <Select 
                      value={formData.experience} 
                      onValueChange={(value) => handleChange("experience", value)}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Years of experience" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border border-border">
                        {experienceOptions.map((exp) => (
                          <SelectItem key={exp} value={exp}>{exp}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priceRange">Your Price Range (₹) *</Label>
                    <Input
                      id="priceRange"
                      value={formData.priceRange}
                      onChange={(e) => handleChange("priceRange", e.target.value)}
                      placeholder="e.g., 300-500 per visit"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability *</Label>
                    <Select 
                      value={formData.availability} 
                      onValueChange={(value) => handleChange("availability", value)}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border border-border">
                        <SelectItem value="weekdays">Weekdays Only</SelectItem>
                        <SelectItem value="weekends">Weekends Only</SelectItem>
                        <SelectItem value="all">All Days</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">About You & Your Work</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleChange("bio", e.target.value)}
                    placeholder="Tell customers about your skills, specialties, and work experience..."
                    rows={4}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By submitting, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeProvider;
