
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    setIsLoading(true);
    try {
      // Here we would normally connect to Supabase for authentication
      console.log("Sign in data:", data);
      toast.success("Signed in successfully!");
      
      // Check if user has created personas before redirecting
      const personas = localStorage.getItem("moodChatPersonas");
      
      // Store basic user data in localStorage for demo purposes
      localStorage.setItem("moodChatUser", JSON.stringify({
        email: data.email
      }));
      
      setTimeout(() => {
        if (personas) {
          navigate("/notebook");
        } else {
          navigate("/onboarding");
        }
      }, 1000);
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-foreground/70">Sign in to continue with MoodChat.io</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full rounded-full" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
            {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
          </Button>

          <div className="text-center mt-4">
            <p className="text-sm text-foreground/70">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary font-medium hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};
