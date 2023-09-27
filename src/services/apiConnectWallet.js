import { showConnect } from "@stacks/connect";
import userSession from "../utils/userSession";
import store from "../store";
import { updateError, updateResponse } from "./walletSlice";
import { askForAddress } from "../utils/getAddress";
import toast from "react-hot-toast";
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
        store.dispatch(
          updateResponse(
            response?.authResponsePayload?.profile?.btcAddress?.p2tr?.mainnet,
          ),
        );
        toast.success("Wallet Connected");
        askForAddress();
        // Cookies.remove('OrdinalsToken');
        // Cookies.set('OrdinalsToken', response.authResponse, { expires: 7 });
        // console.log(Cookies.get('OrdinalsToken'));
      },
      onCancel: () => {
        toast.error("Authentication cancelled");
        console.log("Authentication canceled");
      },
    });
  } catch (error) {
    toast.error(error.message);
    store.dispatch(updateError(error.message));

    console.error("Authentication error:", error);
    throw new Error(error.message);
  }
}
