import { useSelector } from "react-redux";
import UserProfile from "../components/Dashboard/UserProfile";
import Ordinals from "../components/Dashboard/Ordinals";

function Dashboard() {
  const { addresses } = useSelector((state) => state.wallet);
  // const walletAddress = addresses?.addresses[0].address;
  const walletAddress =
    "bc1p8njewpwlqdfcp68npcwkg0ctdpruq875m7a76tkkavgpl4nnqpzqun8ajx";
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-screen-xl flex-col">
      {walletAddress && (
        <>
          <UserProfile address={walletAddress} />
          <Ordinals address={walletAddress} />
        </>
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
