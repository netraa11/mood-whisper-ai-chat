
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Trash2, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

// Define schema for a single persona
const personaSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  age: z.string()
    .refine((val) => !isNaN(parseInt(val)), { message: "Age must be a number." }),
  relationship: z.string().min(2, { message: "Please specify your relationship." }),
  description: z.string().min(10, { message: "Please provide more details about how they respond to you." }),
});

// Schema for the form with multiple personas
const personasSchema = z.object({
  personas: z.array(personaSchema).min(1, { message: "Add at least one person." }),
});

type PersonaFormValues = z.infer<typeof personasSchema>;

export const PersonaForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Initialize form with one empty persona
  const form = useForm<PersonaFormValues>({
    resolver: zodResolver(personasSchema),
    defaultValues: {
      personas: [
        { name: "", age: "", relationship: "", description: "" }
      ],
    },
  });

  const { fields, append, remove } = form.control._formValues.personas;

  const onSubmit = async (data: PersonaFormValues) => {
    setIsLoading(true);
    try {
      // Here we would normally connect to Supabase
      console.log("Personas data:", data);
      
      // Store personas in localStorage for demo purposes
      localStorage.setItem("moodChatPersonas", JSON.stringify(data.personas));
      
      toast.success("Your trusted people have been added!");
      setTimeout(() => {
        navigate("/notebook");
      }, 1000);
    } catch (error) {
      console.error("Persona save error:", error);
      toast.error("There was an error saving your information. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const addPersona = () => {
    if (form.getValues().personas.length < 5) {
      append({ name: "", age: "", relationship: "", description: "" });
    } else {
      toast.warning("You can add a maximum of 5 personas.");
    }
  };

  const removePersona = (index: number) => {
    if (form.getValues().personas.length > 1) {
      remove(index);
    } else {
      toast.warning("You need at least one persona.");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Add Your Trusted People</h1>
        <p className="text-foreground/70">
          Add details about people whose perspective you value. 
          Our AI will create chat personas based on these details.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {form.getValues().personas.map((_, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-6 relative">
              <div className="absolute top-4 right-4">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon"
                  onClick={() => removePersona(index)}
                  disabled={form.getValues().personas.length <= 1}
                >
                  <Trash2 className="h-5 w-5 text-destructive" />
                </Button>
              </div>
              
              <h3 className="text-lg font-semibold mb-4">Person {index + 1}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`personas.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`personas.${index}.age`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="30" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`personas.${index}.relationship`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship</FormLabel>
                      <FormControl>
                        <Input placeholder="Friend, Parent, Mentor, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name={`personas.${index}.description`}
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>How do they typically respond when you need support?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe how they talk, what advice they give, or how they help you when you're feeling different emotions..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}

          <div className="flex justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={addPersona}
              className="rounded-full"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Add Another Person
            </Button>
          </div>

          <Button type="submit" className="w-full rounded-full" disabled={isLoading}>
            {isLoading ? "Saving..." : "Continue to Notebook"}
            {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
          </Button>
        </form>
      </Form>
    </div>
  );
};
