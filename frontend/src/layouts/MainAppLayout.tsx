import MainNavigation from "@/components/MainNavigation";
import MiniHeader from "@/components/MiniHeader";
import MiniNavigation from "@/components/MiniNavigation";
import { Outlet } from "react-router-dom";

function MainAppLayout() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-Beige-100">
      <MainNavigation />
      <MiniHeader />
      <Outlet />
      <MiniNavigation />
    </div>
  );
}

export default MainAppLayout;
