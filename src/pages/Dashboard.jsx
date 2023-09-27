import { useSelector } from "react-redux";
import UserProfile from "../components/Dashboard/UserProfile";
import Ordinals from "../components/Dashboard/Ordinals";
import apiConnectWallet from "../services/apiConnectWallet";

function Dashboard() {
  const { response } = useSelector((state) => state.wallet);
  // const walletAddress =
  //   "bc1p8njewpwlqdfcp68npcwkg0ctdpruq875m7a76tkkavgpl4nnqpzqun8ajx";
  return (
    <div
      className={`mx-auto grid  min-h-[70vh] max-w-screen-xl place-items-center `}
    >
      {response ? (
        <>
          <UserProfile address={response} />
          <Ordinals address={response} />
        </>
      ) : (
        <div className="mt-5  flex flex-col items-center justify-center gap-y-10">
          <p className="font-paytone text-2xl font-medium">
            Seems like your wallet is not Connected
          </p>
          <small className="text-base">Connect your wallet right here:</small>
          <button
            onClick={apiConnectWallet}
            className=" rounded-full bg-gradient-to-r from-orange-400 to-orange-600 px-4 py-2 font-semibold text-white transition duration-300 ease-in-out hover:to-orange-700"
          >
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

// const tokenFR = response?.authResponse;
// if (!tokenFR)
//   return;
// const profile = extractProfile(tokenFR);
// console.log(profile);
// const profileObject = new Profile(profile);
// console.log(profileObject);
