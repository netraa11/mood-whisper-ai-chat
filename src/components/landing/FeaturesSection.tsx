
import { MessageSquare, PenLine, UserRound, Heart, ShieldCheck, Sparkles } from "lucide-react";

const features = [
  {
    icon: PenLine,
    title: "Express Yourself",
    description: "Write out your thoughts and feelings in our intuitive notepad interface."
  },
  {
    icon: UserRound,
    title: "Custom AI Personas",
    description: "Create AI personas based on people you trust for meaningful conversations."
  },
  {
    icon: MessageSquare,
    title: "Supportive Conversations",
    description: "Engage in helpful dialogue tailored to your current emotional state."
  },
  {
    icon: Heart,
    title: "Emotional Support",
    description: "Receive empathy, perspective, and guidance when you need it most."
  },
  {
    icon: ShieldCheck,
    title: "Private & Secure",
    description: "Your personal data and conversations remain completely private."
  },
  {
    icon: Sparkles,
    title: "Mood Improvement",
    description: "Track your emotional progress and develop healthier thought patterns."
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Features Designed for Your Wellbeing</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            MoodChat.io combines innovative technology with emotional support techniques to help you process feelings and gain perspective.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
