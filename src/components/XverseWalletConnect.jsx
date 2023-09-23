import { showConnect } from '@stacks/connect';
import userSession from "../utils/userSession";

function ConnectButton() {
  const myAppName = 'Ordinal Tracker'; // Displayed in wallet pop-up
  const myAppIcon = window.location.origin + '/src/images/Logoicon.png'; // Icon shown in wallet pop-up

  // Function to trigger Xverse wallet authentication
  const connectToXverseWallet = async () => {
    try {
      await showConnect({
        userSession,
        appDetails: {
          name: myAppName,
          icon: myAppIcon,
        },
        onFinish: (response) => {
          console.log(response)//check the response of user in console
          // Handle authentication success (user confirmed in Xverse wallet)
        },
        onCancel: () => {
          // Handle authentication cancellation (user closed the pop-up)
          console.log('Authentication canceled');
        },
      });
    } catch (error) {
      // Handle any errors that may occur during authentication
      console.error('Authentication error:', error);
    }
  };
  return (
    <button type="submit" onClick={connectToXverseWallet}>Connect Wallet</button>
  );
}

export default ConnectButton;