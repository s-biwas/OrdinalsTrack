import { Outlet } from "react-router";
import Nav from "./Nav";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import Status from "../ui/Status";

function AppLayout() {
  const wallet = useSelector((state) => state.wallet);

  return (
    <>
      {wallet.response ? <Status> Wallet Connected </Status> : null}
      <div>
        <Nav />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default AppLayout;
