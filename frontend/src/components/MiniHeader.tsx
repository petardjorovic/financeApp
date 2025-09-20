// import logoLarge from "../assets/images/logo-larges.svg";
import UserMenu from "./UserMenu";
import pdfinanceLogo from "../assets/images/pdfinance logo.svg";

function MiniHeader() {
  return (
    <header className="bg-Grey-900 px-4 sm:px-10 py-[24px] w-full md:hidden rounded-b-[8px] h-[70px] flex justify-between items-center">
      <img src={pdfinanceLogo} alt="logo" />
      <UserMenu />
    </header>
  );
}

export default MiniHeader;
