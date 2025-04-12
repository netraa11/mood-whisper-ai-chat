
import { Header } from "@/components/Header";
import { NoteEditor } from "@/components/notebook/NoteEditor";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Notebook = () => {
  const navigate = useNavigate();
  
  // Check if user is logged in and has set up personas
  useEffect(() => {
    const user = localStorage.getItem("moodChatUser");
    const personas = localStorage.getItem("moodChatPersonas");
    
    if (!user) {
      navigate("/signup");
    } else if (!personas) {
      navigate("/onboarding");
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-20">
        <NoteEditor />
      </main>
    </div>
  );
};

export default Notebook;
