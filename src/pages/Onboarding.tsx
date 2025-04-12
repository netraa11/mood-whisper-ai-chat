
import { Header } from "@/components/Header";
import { PersonaForm } from "@/components/auth/PersonaForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("moodChatUser");
    if (!user) {
      navigate("/signup");
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-20">
        <PersonaForm />
      </main>
    </div>
  );
};

export default Onboarding;
