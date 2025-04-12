
import { Header } from "@/components/Header";
import { SignUpForm } from "@/components/auth/SignUpForm";

const SignUp = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-20">
        <SignUpForm />
      </main>
    </div>
  );
};

export default SignUp;
