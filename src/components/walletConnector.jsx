import { useAccount, useConnect, useEnsName } from "wagmi";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router";

export function Profile({ embedOn }) {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const navigate = useNavigate();
  const { connect } = useConnect({
    connector: new WalletConnectConnector({
      options: {
        projectId: import.meta.env.VITE_PROJECT_ID,
      },
    }),
  });
  if (embedOn === "nav") {
    if (isConnected) {
      return (
        <div className="group relative cursor-pointer bg-transparent">
          <div className="flex items-center justify-center gap-2 text-sm">
            <CgProfile size={"22px"} /> Signed In
          </div>
          <div className="absolute inset-x-0 -bottom-8 flex items-end justify-center text-clip text-sm font-semibold text-white opacity-0 duration-150 group-hover:opacity-100">
            {ensName ?? address}
          </div>
        </div>
      );
    }
    return (
      <div className="ml-auto">
        <button
          onClick={() => {
            connect();
            navigate("/addwallet");
          }}
          className="rounded-md p-2 font-medium ring-2 ring-green-400 hover:bg-green-300/30"
        >
          Connect Wallet
        </button>
      </div>
    );
  } else {
    if (isConnected) return <></>;
    return (
      <button
        onClick={() => connect()}
        className="mt-4 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 px-4 py-2 font-semibold text-white transition duration-300 ease-in-out hover:to-orange-700"
      >
        Connect Wallet
      </button>
    );
  }
}
