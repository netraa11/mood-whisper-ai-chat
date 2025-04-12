
import { Header } from "@/components/Header";
import { SignInForm } from "@/components/auth/SignInForm";

const SignIn = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-20">
        <SignInForm />
      </main>
    </div>
  );
};

export default SignIn;
