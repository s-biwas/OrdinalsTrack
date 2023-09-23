import { useSelector } from 'react-redux';
import UserProfile from '../components/Dashboard/UserProfile';

function Dashboard() {
  const { response } = useSelector((state) => state.wallet);
  console.log(response);
  return (
    <div className='min-h-[70vh] max-w-screen-xl mx-auto flex flex-col'>
      <UserProfile />
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