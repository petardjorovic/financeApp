import LoginForm from "@/components/LoginForm";
import authImage from "../assets/images/illustration-authentication.svg";
import logoLarge from "../assets/images/logo-larges.svg";

function Login() {
  return (
    <div className="bg-Beige-100 flex">
      <div className="h-screen p-[20px] hidden md:block md:w-[42%]">
        <div
          className="bg-cover rounded-md w-full h-full p-[40px] relative"
          style={{ backgroundImage: `url(${authImage})` }}
        >
          <img
            src={logoLarge}
            alt="logo"
            className="absolute top-[20px] left-[20px]"
          />
        </div>
      </div>
      <LoginForm />
    </div>
  );
}

export default Login;
