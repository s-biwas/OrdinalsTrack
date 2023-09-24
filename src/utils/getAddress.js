import { getAddress } from 'sats-connect'
import store from '../store';
import { updateAddresses } from '../services/walletSlice';

const getAddressOptions = {
    payload: {
        purposes: ['ordinals', 'payment'],
        message: 'Address for receiving Ordinals and payments',
        network: {
            type: 'Mainnet'
        },
    },
    onFinish: (response) => {
        store.dispatch(updateAddresses(response));
    },
    onCancel: () => alert('Request canceled'),
}


export const askForAddress = async () => {
    await getAddress(getAddressOptions);
}