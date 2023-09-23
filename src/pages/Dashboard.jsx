import { extractProfile } from '@stacks/profile';
import { useSelector } from 'react-redux';

function Dashboard() {
  const { response } = useSelector((state) => state.wallet);
  const tokenFR = response?.authResponse;
  if (!tokenFR)
    return;
  const profile = extractProfile(tokenFR);
  console.log(profile);
  // const profileObject = new Profile(profile);
  // console.log(profileObject);
  return <div className='min-h-[70vh]'>hi</div>;
}

export default Dashboard;
