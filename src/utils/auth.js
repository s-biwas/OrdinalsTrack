import { Core } from '@walletconnect/core'
import { Web3Wallet } from '@walletconnect/web3wallet'

const core = new Core({
    projectId: import.meta.env.VITE_PROJECT_ID
})

export const web3wallet = await Web3Wallet.init({
    core, // <- pass the shared `core` instance
    metadata: {
        name: 'Ordinals Tracker',
        description: 'Connect your wallet to get all your transactions containing ordinals and check if you make profilt or loss from it in USD.',
        url: 'http://localhost:5173/',
        icons: []
    }
})