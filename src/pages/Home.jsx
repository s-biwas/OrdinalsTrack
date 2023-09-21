import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <p>Home</p>
      <Link
        to="/addwallet"
        className="cursor-pointer text-blue-500 hover:underline"
      >
        Connect Wallet
      </Link>
    </div>
  );
}

export default Home;
