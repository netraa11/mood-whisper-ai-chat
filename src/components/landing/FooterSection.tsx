
import { Link } from "react-router-dom";

export const FooterSection = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-gradient">MoodChat.io</span>
            </Link>
            <p className="text-foreground/70 mb-6 max-w-md">
              Your personal emotional support companion. Express yourself, chat, and gain perspective to improve your mood.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-foreground/70 hover:text-primary transition">Features</a></li>
              <li><a href="#how-it-works" className="text-foreground/70 hover:text-primary transition">How It Works</a></li>
              <li><a href="#testimonials" className="text-foreground/70 hover:text-primary transition">Testimonials</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-foreground/70 hover:text-primary transition">Privacy Policy</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-primary transition">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 text-center text-foreground/60 text-sm">
          <p>© {new Date().getFullYear()} MoodChat.io. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
