import { useAccount, useConnect, useEnsName } from 'wagmi'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { CgProfile } from "react-icons/cg";

export function Profile({ embedOn }) {
    const { address, isConnected } = useAccount()
    const { data: ensName } = useEnsName({ address })
    const { connect } = useConnect({
        connector: new WalletConnectConnector({
            options: {
                projectId: import.meta.env.VITE_PROJECT_ID,
            },
        }),
    })
    if (embedOn === "nav") {
        if (isConnected) {
            return <div className="bg-transparent relative group cursor-pointer">
                <div className='text-sm flex gap-2 items-center justify-center'><CgProfile size={"22px"} /> Signed In</div>
                <div className="opacity-0 group-hover:opacity-100 duration-150 absolute inset-x-0 -bottom-8 flex justify-center items-end text-sm text-white font-semibold text-clip">{ensName ?? address}</div>
            </div>;
        }
        return <div className="ml-auto">
            <button
                onClick={() => {
                    connect()
                }}
                className="rounded-md p-2 font-medium ring-2 ring-green-400 hover:bg-green-300/30"
            >
                Connect Wallet
            </button>
        </div>
    } else {
        if (isConnected) return <></>;
        return <button
            onClick={() => connect()}
            className="mt-4 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 px-4 py-2 font-semibold text-white transition duration-300 ease-in-out hover:to-orange-700">
            Connect Wallet
        </button>
    }
}
