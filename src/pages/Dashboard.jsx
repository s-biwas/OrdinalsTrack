import { useSelector } from "react-redux";
import UserProfile from "../components/Dashboard/UserProfile";

function Dashboard() {
  const { addresses } = useSelector((state) => state.wallet);
  const walletAddress = addresses?.addresses[0].address;
  return (
    <div className="mx-auto flex max-h-[70vh] max-w-screen-xl flex-col">
      {walletAddress && <UserProfile address={walletAddress} />}
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
