import { showConnect } from "@stacks/connect";
import userSession from "../utils/userSession";
import store from "../store";
import { updateError, updateResponse } from "./walletSlice";
import { askForAddress } from "../utils/getAddress";
// import Cookies from "js-cookie";

export default async function apiConnectWallet() {
  const myAppIcon = window.location.origin + "/src/images/Logoicon.png";

  try {
    await showConnect({
      userSession,
      appDetails: {
        name: "Ordinals Tracker",
        icon: myAppIcon,
      },
      onFinish: (response) => {
        store.dispatch(updateResponse(response));
        askForAddress();
        // Cookies.remove('OrdinalsToken');
        // Cookies.set('OrdinalsToken', response.authResponse, { expires: 7 });
        // console.log(Cookies.get('OrdinalsToken'));
      },
      onCancel: () => {
        console.log("Authentication canceled");
      },
    });
  } catch (error) {
    store.dispatch(updateError(error.message));

    console.error("Authentication error:", error);
    throw new Error(error.message);
  }
}
