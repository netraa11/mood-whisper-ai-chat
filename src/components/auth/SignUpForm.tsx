
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

const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  age: z.string()
    .refine((val) => !isNaN(parseInt(val)), { message: "Age must be a number." })
    .refine((val) => parseInt(val) >= 13, { message: "You must be at least 13 years old." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      age: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    setIsLoading(true);
    try {
      // Here we would normally connect to Supabase for authentication
      console.log("Sign up data:", data);
      toast.success("Account created successfully!");
      
      // Store user data in localStorage for demo purposes
      localStorage.setItem("moodChatUser", JSON.stringify({
        name: data.name,
        email: data.email,
        age: data.age,
      }));
      
      setTimeout(() => {
        navigate("/onboarding");
      }, 1000);
    } catch (error) {
      console.error("Sign up error:", error);
      toast.error("There was an error creating your account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
        <p className="text-foreground/70">Sign up to get started with MoodChat.io</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="25" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
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
            {isLoading ? "Creating Account..." : "Sign Up"}
            {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
          </Button>
          
          <div className="text-center mt-4">
            <p className="text-sm text-foreground/70">
              Already have an account?{" "}
              <Link to="/signin" className="text-primary font-medium hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};
