
import { Pencil, Users, MessageCircle } from "lucide-react";

const steps = [
  {
    icon: Users,
    title: "Sign up & Add Your People",
    description: "Create your account and add details about people whose perspective you value when you need support."
  },
  {
    icon: Pencil,
    title: "Express Your Feelings",
    description: "Write in your private notepad about what you're experiencing - your thoughts, emotions, and situations."
  },
  {
    icon: MessageCircle,
    title: "Chat for Perspective",
    description: "Select a persona to chat with and receive supportive, personalized responses based on your current mood."
  }
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How MoodChat.io Works</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Getting started is simple - follow these steps to begin your journey to emotional clarity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-primary/30 -translate-x-full transform translate-y-4 z-0"></div>
              )}
              <div className="bg-card border border-border rounded-xl p-8 shadow-sm relative z-10">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">{step.title}</h3>
                <p className="text-foreground/70 text-center">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
