
import { Header } from "@/components/Header";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Chat = () => {
  const navigate = useNavigate();
  
  // Check if user is logged in, has set up personas, and has a current note
  useEffect(() => {
    const user = localStorage.getItem("moodChatUser");
    const personas = localStorage.getItem("moodChatPersonas");
    const currentNote = localStorage.getItem("moodChatCurrentNote");
    
    if (!user) {
      navigate("/signup");
    } else if (!personas) {
      navigate("/onboarding");
    } else if (!currentNote) {
      navigate("/notebook");
    }
  }, [navigate]);
  
  const handleReturnToNotepad = () => {
    navigate("/notebook");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-4 gap-2" 
            onClick={handleReturnToNotepad}
          >
            <ArrowLeft className="h-4 w-4" /> Return to Notepad
          </Button>
        </div>
        <ChatInterface />
      </main>
    </div>
  );
};

export default Chat;
