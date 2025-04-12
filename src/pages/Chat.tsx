
import { Header } from "@/components/Header";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <ChatInterface />
      </main>
    </div>
  );
};

export default Chat;
