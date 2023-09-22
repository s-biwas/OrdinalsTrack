import { Link } from "react-router-dom";
import Xversewallet from'./Xversewallet'
function ConnectWallet() {
  return (
    <div>
      <Link to="/" className="cursor-pointer text-blue-500 hover:underline">
        &larr; Back to Home
      </Link>
      <Xversewallet/>
    </div>
  );
}

export default ConnectWallet;
