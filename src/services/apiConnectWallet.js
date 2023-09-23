import { showConnect } from "@stacks/connect";
import userSession from "../utils/userSession";
import Cookies from 'js-cookie';

export default async function apiConnectWallet() {
  const myAppIcon = window.location.origin + "/src/images/Logoicon.png"; // Icon shown in wallet pop-up
  try {
    await showConnect({
      userSession, // UserSession instance from ./userSession.js
      appDetails: {
        name: "Ordinals Tracker",
        icon: myAppIcon,
      },
      onFinish: (response) => {
        console.log(response); //check the response of user in console
        // Handle authentication success (user confirmed in Xverse wallet)
        Cookies.remove('OrdinalToken');
        Cookies.set('OrdinalToken', response.authResponse, { expires: 7 });
        window.location = "/profile";
      },
      onCancel: () => {
        // Handle authentication cancellation (user closed the pop-up)
        console.log("Authentication canceled");
      },
    });
  } catch (error) {
    // Handle any errors that may occur during authentication
    console.error("Authentication error:", error);
    throw new Error(error.message);
  }
}
