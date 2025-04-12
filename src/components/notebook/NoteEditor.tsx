
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const NoteEditor = () => {
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  // Load any existing notes
  useEffect(() => {
    const notes = localStorage.getItem("moodChatNotes");
    if (notes) {
      setSavedNotes(JSON.parse(notes));
    }
  }, []);

  const saveNote = () => {
    if (!note.trim()) {
      toast.warning("Please write something before saving.");
      return;
    }

    setIsSaving(true);
    
    try {
      // Add the new note to the existing notes
      const updatedNotes = [...savedNotes, note];
      setSavedNotes(updatedNotes);
      
      // Save to localStorage (would be Supabase in production)
      localStorage.setItem("moodChatNotes", JSON.stringify(updatedNotes));
      localStorage.setItem("moodChatCurrentNote", note);
      
      toast.success("Your note has been saved!");
      
      // Navigate to chat after a short delay
      setTimeout(() => {
        navigate("/chat");
      }, 1000);
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("There was an error saving your note. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Notebook</h1>
        <p className="text-foreground/70">
          Express your thoughts and feelings freely. What's on your mind today?
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <Textarea
          placeholder="Start writing here... How are you feeling today? What's been on your mind?"
          className="min-h-[300px] text-lg focus:ring-0 resize-none border-none shadow-none"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        
        <div className="mt-6 flex justify-end">
          <Button 
            onClick={saveNote} 
            className="rounded-full" 
            disabled={isSaving || !note.trim()}
          >
            {isSaving ? "Saving..." : "Save & Chat"}
            {!isSaving && <Send className="ml-2 h-5 w-5" />}
          </Button>
        </div>
      </div>

      {savedNotes.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">Previous Notes</h3>
          <div className="space-y-3">
            {savedNotes.map((savedNote, index) => (
              <div 
                key={index} 
                className="bg-secondary/30 border border-border rounded-lg p-4 cursor-pointer hover:bg-secondary/50 transition"
                onClick={() => setNote(savedNote)}
              >
                <p className="line-clamp-2 text-foreground/70">{savedNote}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
