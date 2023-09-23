import { showConnect } from "@stacks/connect";
import userSession from "../pages/userSession";
import store from "../store";
import { updateError, updateResponse } from "./walletSlice";

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
        console.log(response);
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
