/* eslint-disable react/prop-types */
import { Link, NavLink } from "react-router-dom";
import hamMenu from "../images/hammenu.svg";
import logo from "../images/logo.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdLogout, MdOutlineDashboardCustomize } from "react-icons/md";
// import { useDisconnect } from "wagmi";
import { clearResponse } from "../services/walletSlice";
import apiConnectWallet from "../services/apiConnectWallet";
import createAvatar from "../utils/generateWeb3Avatar";

// import { Profile } from "../components/walletConnector";

function Nav() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <nav className="shadow-x sticky top-0 z-50 mx-auto flex max-w-screen-xl items-center justify-between bg-stone-800/80 py-4">
      <h1 className="text-gradient font-paytone text-2xl font-bold uppercase ">
        Ordinal`Scan
      </h1>

      <NavPages type="hr-nav" />
      {showMenu ? <NavPages type="vr-nav" setShowMenu={setShowMenu} /> : null}
      {!showMenu ? (
        <button onClick={() => setShowMenu((v) => !v)} className="sm:hidden">
          <img src={hamMenu} alt="hammenu" />
        </button>
      ) : null}
    </nav>
  );
}

export default Nav;

function NavPages({ type = "hr-nav", setShowMenu }) {
  let classNames;
  const { response } = useSelector((state) => state.wallet);
  useEffect(() => {
    response && createAvatar("profile", response);
  }, [response]);

  if (type === "hr-nav") {
    classNames = "hidden items-center justify-center gap-x-6 sm:flex";
  } else if (type === "vr-nav") {
    classNames =
      "sm:hidden fixed right-0 top-0 flex h-screen w-full flex-col items-center pt-10 px-10 gap-y-16 bg-stone-800/90";
  }

  return (
    <ul className={`${classNames}  `}>
      <li className="flex w-full items-center justify-between self-end sm:hidden">
        <button className="">
          <img src={logo} alt="logo" />
        </button>
        <button onClick={() => setShowMenu((v) => !v)} className="">
          <img src={hamMenu} alt="hammenu" />
        </button>
      </li>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-bold text-white" : "text-slate-300"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/explore"
          className={({ isActive }) =>
            isActive ? "font-bold text-white" : "text-slate-300"
          }
        >
          Explore
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "font-bold text-white" : "text-slate-300"
          }
        >
          Dashboard
        </NavLink>
      </li>

      {/* lassName="text-slate-300" */}

      <div className="md:ml-auto">
        {!response ? (
          <button
            onClick={apiConnectWallet}
            className="rounded-md p-2 font-medium ring-2 ring-green-400 hover:bg-green-300/30 "
          >
            Connect Wallet
          </button>
        ) : (
          <WalletUser />
        )}
      </div>
    </ul>
  );
}

// When Wallet is Connected
function WalletUser() {
  const [openOptions, setOpenOptions] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="relative">
      <div
        id="profile"
        onClick={() => setOpenOptions((v) => !v)}
        className="h-12 w-12 cursor-pointer border-4 ring-2 hover:border-lime-400"
      ></div>

      {/* show on Click profile icon */}
      {openOptions ? (
        <div
          onMouseLeave={() => {
            setOpenOptions(false);
          }}
          className="absolute left-[-250%] top-[110%] rounded-md bg-stone-600 shadow-xl "
        >
          <Link
            onClick={() => {
              setOpenOptions(false);
            }}
            to="/dashboard"
            className="text-md flex items-center gap-x-2 rounded-md p-4 hover:bg-green-400 hover:text-slate-800"
          >
            <span>See Dashboard</span>
            <MdOutlineDashboardCustomize />
          </Link>
          <Link
            onClick={dispatch(clearResponse)}
            to="/"
            className="text-md flex items-center gap-x-2 rounded-md p-4 hover:bg-green-400 hover:text-slate-800"
          >
            <span>Log out</span>
            <MdLogout />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
