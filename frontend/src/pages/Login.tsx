import HeroAuth from "@/components/HeroAuth";
import LoginForm from "@/components/LoginForm";

function Login() {
  return (
    <div className="bg-Beige-100 flex flex-col md:flex-row min-h-screen pt-0 pb-4 md:p-5">
      <HeroAuth />
      <LoginForm />
    </div>
  );
}

export default Login;
