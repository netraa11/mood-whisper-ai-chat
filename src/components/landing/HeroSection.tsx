
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Your Personal <span className="text-gradient">Emotional</span> Support Companion
            </h1>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl">
              Express your feelings in a safe space, and chat with AI personas 
              styled after people you trust to help you process emotions and find clarity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="rounded-full text-lg group">
                <Link to="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full text-lg">
                <a href="#how-it-works">
                  Learn More
                </a>
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/40 rounded-3xl blur-3xl opacity-70"></div>
              <div className="relative bg-card border border-border shadow-xl rounded-2xl p-6 overflow-hidden">
                <div className="flex flex-col gap-4">
                  <div className="rounded-xl bg-secondary p-4">
                    <p className="text-foreground/80">I'm feeling overwhelmed with work deadlines...</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-mood-calm flex items-center justify-center text-white font-medium">M</div>
                    <div className="flex-1 rounded-xl bg-primary/10 p-4">
                      <p className="text-foreground/80">I know you can handle this. Remember how you managed that big project last month? Let's break this down into smaller tasks.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
