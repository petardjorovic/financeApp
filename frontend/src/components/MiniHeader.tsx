import logoLarge from "../assets/images/logo-larges.svg";
import UserMenu from "./UserMenu";

function MiniHeader() {
  return (
    <header className="bg-Grey-900 px-[40px] py-[24px] w-full md:hidden rounded-b-[8px] h-[70px] flex justify-between items-center mb-4">
      <img src={logoLarge} alt="logo" />
      <UserMenu />
    </header>
  );
}

export default MiniHeader;
