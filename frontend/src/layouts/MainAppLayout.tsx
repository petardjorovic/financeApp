import MainNavigation from "@/components/MainNavigation";
import { Outlet } from "react-router-dom";

function MainAppLayout() {
  return (
    <div className="flex flex-col md:flex-row">
      <MainNavigation />
      <Outlet />
    </div>
  );
}

export default MainAppLayout;
