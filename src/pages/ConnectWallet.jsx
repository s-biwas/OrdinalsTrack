import { Link } from "react-router-dom";
import ConnectButton from "../components/XverseWalletConnect2";

function ConnectWallet() {
  return (
    <div>
      <Link to="/" className="cursor-pointer text-blue-500 hover:underline">
        &larr; Back to Home
      </Link>
      <ConnectButton />
    </div>
  );
}

export default ConnectWallet;
