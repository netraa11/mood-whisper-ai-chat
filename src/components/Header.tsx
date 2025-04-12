
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gradient">MoodChat.io</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-foreground/70 hover:text-foreground transition">Features</a>
          <a href="#how-it-works" className="text-foreground/70 hover:text-foreground transition">How It Works</a>
          <a href="#testimonials" className="text-foreground/70 hover:text-foreground transition">Testimonials</a>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button asChild className="rounded-full">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background z-40 animate-fade-in">
          <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
            <a 
              href="#features" 
              className="text-lg font-medium py-2 border-b border-border"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-lg font-medium py-2 border-b border-border"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#testimonials" 
              className="text-lg font-medium py-2 border-b border-border"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
            <Button asChild className="rounded-full w-full mt-4">
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
