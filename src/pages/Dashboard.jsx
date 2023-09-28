import { useSelector } from "react-redux";
import UserProfile from "../components/Dashboard/UserProfile";
import Ordinals from "../components/Dashboard/Ordinals";
import apiConnectWallet from "../services/apiConnectWallet";
import Taxtable from "./Taxtable";

function Dashboard() {
  const { response } = useSelector((state) => state.wallet);
  // const walletAddress =
  //   "bc1p8njewpwlqdfcp68npcwkg0ctdpruq875m7a76tkkavgpl4nnqpzqun8ajx";
  // bc1p9zya5s96q4eyg3urtp3gurekqpk9tkgkqny9skqrysld9hjvc92q2eq4g6
  const tableData = [
    //these are the data
    {
      id: 1,
      taxYear: 2022,
      ordinalAcuired: "January 15, 2022",
      acquiredSats: 50000,
      acquiredDollor: 100,
      soldSats: 75000,
      soldDollor: 150,
      netSats: 25000,
      netDollor: 50,
    },
    {
      id: 2,
      taxYear: 2022,
      ordinalAcuired: "March 20, 2022",
      acquiredSats: 60000,
      acquiredDollor: 120,
      soldSats: 80000,
      soldDollor: 160,
      netSats: 20000,
      netDollor: 40,
    },
    // ... more data objects
  ];

  return (
    <div
      className={`mx-auto grid  min-h-[70vh] max-w-screen-xl place-items-center `}
    >
      {response ? (
        <>
          <UserProfile address={response} />
          <Ordinals address={response} />
          <Taxtable data={tableData} />
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
