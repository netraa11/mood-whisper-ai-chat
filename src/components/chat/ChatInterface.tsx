
import { useState, useEffect, useRef } from "react";
import { SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { toast } from "sonner";

interface Persona {
  name: string;
  age: string;
  relationship: string;
  description: string;
}

interface Message {
  id: string;
  sender: "user" | "persona";
  content: string;
  timestamp: Date;
}

// Helper function to get the first letter of a name
const getInitial = (name: string) => {
  return name ? name.charAt(0).toUpperCase() : "?";
};

// Helper to generate a simple response based on persona and user message
const generateResponse = (persona: Persona, userMessage: string, note: string) => {
  // In a real app, this would be handled by an AI model
  const responses = [
    `I understand you're feeling that way. When you say "${userMessage.slice(0, 30)}..." I hear that you're processing some emotions. Remember that time when you faced something similar?`,
    `It sounds like you're going through a lot. Based on what you've written in your note about "${note.slice(0, 30)}...", let me share what I think might help...`,
    `I'm here for you. When you mention "${userMessage.slice(0, 30)}..." I want you to know that your feelings are valid. Let's think about some steps forward.`,
    `From my perspective, what you're describing seems challenging. Let's break down what you've said about "${userMessage.slice(0, 30)}..." and think about it differently.`,
    `I've known you for a while, and when I hear you talk about "${userMessage.slice(0, 30)}...", I think about your strengths and how you've overcome things before.`
  ];
  
  // Return a random response
  return responses[Math.floor(Math.random() * responses.length)];
};

export const ChatInterface = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [currentNote, setCurrentNote] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load personas and current note
  useEffect(() => {
    const loadedPersonas = localStorage.getItem("moodChatPersonas");
    const loadedNote = localStorage.getItem("moodChatCurrentNote");
    
    if (loadedPersonas) {
      const parsedPersonas = JSON.parse(loadedPersonas);
      setPersonas(parsedPersonas);
      
      // Select the first persona by default
      if (parsedPersonas.length > 0 && !selectedPersona) {
        setSelectedPersona(parsedPersonas[0]);
      }
    }
    
    if (loadedNote) {
      setCurrentNote(loadedNote);
    }
  }, []);

  // When selected persona changes, add a welcome message
  useEffect(() => {
    if (selectedPersona) {
      // Clear previous messages when changing personas
      setMessages([]);
      
      // Add welcome message
      setTimeout(() => {
        const welcomeMessage: Message = {
          id: Date.now().toString(),
          sender: "persona",
          content: `Hi there! I'm ${selectedPersona.name}. I've read your note, and I'm here to chat about it. How are you feeling right now?`,
          timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
      }, 500);
    }
  }, [selectedPersona]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedPersona) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: newMessage,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Generate AI response after a delay
    setTimeout(() => {
      const personaMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "persona",
        content: generateResponse(selectedPersona, newMessage, currentNote),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, personaMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const changePersona = (persona: Persona) => {
    if (persona.name !== selectedPersona?.name) {
      setSelectedPersona(persona);
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col">
      <div className="flex border-b border-border">
        <div className="hidden md:flex w-64 border-r border-border p-4 overflow-y-auto">
          <div className="w-full">
            <h3 className="font-semibold text-sm text-foreground/60 mb-2">YOUR PEOPLE</h3>
            <div className="space-y-1">
              {personas.map((persona, index) => (
                <button
                  key={index}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    selectedPersona?.name === persona.name 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-secondary"
                  }`}
                  onClick={() => changePersona(persona)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    selectedPersona?.name === persona.name 
                      ? "bg-primary-foreground text-primary" 
                      : "bg-secondary text-foreground"
                  }`}>
                    {getInitial(persona.name)}
                  </div>
                  <div className="overflow-hidden">
                    <div className="font-medium truncate">{persona.name}</div>
                    <div className="text-xs truncate opacity-80">{persona.relationship}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col">
          <div className="flex items-center p-4 border-b border-border">
            <div className="md:hidden mr-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <span className="sr-only">Open menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </Button>
            </div>
            
            {selectedPersona && (
              <div className="flex items-center gap-3">
                <Avatar>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {getInitial(selectedPersona.name)}
                  </div>
                </Avatar>
                <div>
                  <div className="font-medium">{selectedPersona.name}</div>
                  <div className="text-xs text-foreground/60">{selectedPersona.relationship}</div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary"
                  }`}
                >
                  <p className="break-words">{message.content}</p>
                  <div
                    className={`text-xs mt-1 ${
                      message.sender === "user" ? "text-primary-foreground/70" : "text-foreground/60"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex mb-4 justify-start">
                <div className="max-w-[80%] rounded-2xl p-3 bg-secondary">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                className="rounded-full"
                disabled={!selectedPersona || isTyping}
              />
              <Button
                size="icon"
                className="rounded-full"
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || !selectedPersona || isTyping}
              >
                <SendHorizonal className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
