import HeroAuth from "@/components/HeroAuth";
import RegisterForm from "@/components/RegisterForm";

function Register() {
  return (
    <div className="bg-Beige-100 flex flex-col md:flex-row min-h-screen pt-0 pb-4 md:p-5">
      <HeroAuth />
      <RegisterForm />
    </div>
  );
}

export default Register;
