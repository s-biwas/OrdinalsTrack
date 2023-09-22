import { useEffect, useState } from 'react';
import { buildApprovedNamespaces } from '@walletconnect/utils';
import { web3wallet } from '../utils/auth'; // Assuming this import is correctly configured

function WalletConnectComponent() {
  const [wallet3, setWallet3] = useState(null);

  useEffect(() => {
    // Define the event listener for session proposals
    const handleSessionProposal = async (sessionProposal) => {
      const { id, params } = sessionProposal;

      // Build approved namespaces
      const approvedNamespaces = buildApprovedNamespaces({
        proposal: params,
        supportedNamespaces: {
          eip155: {
            chains: ['eip155:1', 'eip155:137'],
            methods: ['eth_sendTransaction', 'personal_sign'],
            events: ['accountsChanged', 'chainChanged'],
            accounts: [
              'eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb',
              'eip155:137:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb',
            ],
          },
        },
      });

      // Approve the session
      const session = await wallet3.approveSession({
        id,
        namespaces: approvedNamespaces,
      });

      session();
    };

    // Attach the event listener for session proposals
    if (wallet3) {
      wallet3.on('session_proposal', handleSessionProposal);
    }

    return () => {
      // Clean up event listener when the component unmounts
      if (wallet3) {
        wallet3.removeListener('session_proposal', handleSessionProposal);
      }
    };
  }, [wallet3]);

  const handleConnectWallet = async () => {
    try {
      const wallet = await web3wallet;
      setWallet3(wallet);

      // Example: Pair with a DApp using a URI
      const uri = 'http://localhost:5173/'; // Replace with the URI from the DApp
      await wallet.pair({ uri });
    } catch (error) {
      console.error('Error initializing Web3Wallet:', error);
    }
  };

  return (
    <div className="ml-auto">
      <button
        onClick={handleConnectWallet}
        className="rounded-md p-2 font-medium ring-2 ring-green-400 hover:bg-green-300/30"
      >
        Connect Wallet
      </button>
    </div>
  );
}

export default WalletConnectComponent;
