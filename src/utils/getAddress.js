import { getAddress } from 'sats-connect'

const getAddressOptions = {
    payload: {
        purposes: ['ordinals', 'payment'],
        message: 'Address for receiving Ordinals and payments',
        network: {
            type: 'Mainnet'
        },
    },
    onFinish: (response) => {
        console.log(response)
    },
    onCancel: () => alert('Request canceled'),
}


export const response = async () => {
    await getAddress(getAddressOptions);
}