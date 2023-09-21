import { Link } from "react-router-dom";

function ConnectWallet() {
  return (
    <div>
      <Link to="/" className="cursor-pointer text-blue-500 hover:underline">
        &larr; Back to Home
      </Link>
      <p>ConnectWallet</p>
    </div>
  );
}

export default ConnectWallet;
