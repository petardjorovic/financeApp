// import logoLarge from "../assets/images/logo-larges.svg";
import pdfinanceLogo from "../assets/images/pdfinance logo.svg";

function HeroAuth() {
  return (
    <div className="min-h-screen p-5 hidden md:block md:w-[42%]">
      <div
        className={`rounded-md bg-no-repeat bg-[url("/src/assets/images/illustration-authentication.svg")] flex flex-col justify-end bg-cover w-full h-full p-[40px] relative overflow-hidden`}
      >
        <img
          // src={logoLarge}
          src={pdfinanceLogo}
          alt="logo"
          className="absolute top-[40px] left-[40px]"
          // className="absolute top-[20px] left-[20px]"
        />
        <div className="">
          <h2 className="font-bold text-[32px] text-White leading-[38.4px] max-w-[400px] mb-5">
            Keep track of your money and save for the future
          </h2>
          <p className="text-White text-sm max-w-[450px]">
            Personal finance app puts you in control of your spending. Track
            transactions, set budgets, and add to savings pots easily.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HeroAuth;
