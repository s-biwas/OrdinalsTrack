import { Link } from "react-router-dom";
import hamMenu from "../images/hammenu.svg";
import { Profile } from "../components/walletConnector";
function Nav() {
  return (
    <nav className=" flex items-center justify-between max-w-screen-xl mx-auto">
      <h1
        className="text-gradient font-serif text-2xl font-bold uppercase"
        style={{
          fontFamily: "Paytone One",
        }}
      >
        MonkeyNft
      </h1>

      <ul className="hidden items-center justify-center gap-x-6 sm:flex">
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

      <button className="sm:hidden">
        <img src={hamMenu} alt="hammenu" />
      </button>
    </nav>
  );
}

export default Nav;
