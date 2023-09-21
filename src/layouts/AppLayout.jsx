import { Outlet } from "react-router";
import Nav from "./Nav";
import Footer from "./Footer";

function AppLayout() {
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AppLayout;
