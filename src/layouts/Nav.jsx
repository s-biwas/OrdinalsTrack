/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import hamMenu from "../images/hammenu.svg";
import logo from "../images/logo.svg";
import { useState } from "react";
import { response } from "../utils/getAddress";

import { Profile } from "../components/walletConnector";

function Nav() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <nav className="shadow-x sticky top-0 z-50 mx-auto flex max-w-screen-xl items-center justify-between bg-stone-800/80 py-4">
      <h1 className="text-gradient font-paytone text-2xl font-bold uppercase">
        MonkeyNft
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
        <Link to="/" className="font-medium text-white">
          Home
        </Link>
      </li>
      <li>
        <Link to="/" className="text-slate-300">
          Marketplace
        </Link>
      </li>
      <li>
        <Link to="/" className="text-slate-300">
          Creators
        </Link>
      </li>
      <Profile embedOn={"nav"} />
    </ul>
  );
}
