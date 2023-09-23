import { useSelector } from "react-redux";
import UserProfile from "../components/Dashboard/UserProfile";

function Dashboard() {
  const { response } = useSelector((state) => state.wallet);
  const btcAddress = response?.authResponsePayload.iss.split(":")[2];
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-screen-xl flex-col">
      {btcAddress && <UserProfile address={btcAddress} />}
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
