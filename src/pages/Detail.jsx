import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchFees, fetchInscriptionDetail, fetchInscriptionTransfer } from "../hooks/useFetch";
import ContentDisplay from "../components/Dashboard/Content";
import CopyIcon from "../images/Copy.svg";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

// import { useEffect } from "react";
// import moment from "moment/moment";



const copyToClipboard = async (textToCopy) => {
    try {
        await navigator.clipboard.writeText(textToCopy);
        toast.success("Copied to clipboard");
    } catch (error) {
        toast.error("failed to copy")
    }
};

const fetchBTCtoUSDExchangeRate = async () => {
    try {
        const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch exchange rate");
        }

        const data = await response.json();
        return data.bitcoin.usd;
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        return null;
    }
};

export default function Detail() {
    const { id } = useParams();

    const { data: Transfers } = useQuery({
        queryKey: ["Transfers", id],
        queryFn: () => fetchInscriptionTransfer(id),
    });

    const { data: Details } = useQuery({
        queryKey: ["OrdinalsInscription", id],
        queryFn: () => fetchInscriptionDetail(id),
    });

    const [btcToUsdExchangeRate, setBtcToUsdExchangeRate] = useState(null);

    useEffect(() => {
        // Fetch BTC to USD exchange rate
        fetchBTCtoUSDExchangeRate().then((rate) => {
            if (rate !== null) {
                setBtcToUsdExchangeRate(rate);
            }
        });
    }, []);




    //let timeStamp = Transfers?.results[0]?.timestamp;

    // useEffect(() => {
    //     const fetchPrice = async () => {
    //         const date = moment.unix(timeStamp / 1000).format("YYYY-MM-DD");
    //         const response = await fetch(`http://localhost:3000/coindesk-data`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 date: date,
    //             }),
    //         });
    //         const data = await response.json();
    //         console.log(data);
    //     };

    //     { Transfers && fetchPrice(); }
    // }, [Transfers]);

    return (
        <div className="max-w-screen-xl min-h-[70vh] mx-auto flex flex-col md:flex-row my-14 gap-5 ">
            <div className="w-full lg:w-1/2 h-fit rounded-md flex flex-col items-center bg-[#222] p-3 ">
                {Details && (
                    <ContentDisplay
                        id={Details.id}
                        content_type={Details.content_type}
                        className="object-cover w-full h-full"
                    />
                )}
                {Details && (
                    <div className="text-center mt-2  rounded p-3">
                        <p>
                            {/* BTC Value */}
                            {/* <strong className="text-green-500 title">BTC Value:</strong>{" "}
                            <span className="break-all">
                                {Details.genesis_fee / 100000000} BTC
                            </span> */}
                            <strong className="text-green-500 title">Sats:</strong>{" "}
                            <span className="break-all">
                                {Details.genesis_fee}
                            </span>
                        </p>

                        {/* Current USD */}
                        <p>
                            <strong className="text-green-500 title">Current USD:</strong>{" "}
                            <span className="break-all">
                                ${btcToUsdExchangeRate !== null
                                    ? (Details.genesis_fee / 100000000) * btcToUsdExchangeRate
                                    : "null"}
                            </span>
                        </p>
                    </div>
                )}
            </div>



            <div className="w-full lg:w-1/2 h-fit rounded-md bg-black-400 text-white p-2 shadow-lg  border-gray-300">
                <div className="flex flex-col gap-10 md:gap-6 lg:gap-8 details-div">
                    {Details && (
                        <div className="flex flex-col border p-4 rounded border-gray-400 bg-[#222]">
                            <h2 className="text-2xl font-bold mb-4 uppercase">Inscription #{Details.number}</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="border rounded-md p-4">
                                    <p>
                                        <strong className="text-green-500 title">Type:</strong>{" "} <br />
                                        <span style={{ wordBreak: "break-all" }}>{Details.content_type}</span>
                                    </p>
                                </div>
                                <div className="border rounded-md p-4">
                                    <p>
                                        <strong className="text-green-500 title">ID:</strong>{" "} <br />
                                        <span style={{ wordBreak: "break-all" }}>{Details.id.slice(0, 6)}...<CopyButton copyText={Details.id} /></span>
                                    </p>
                                </div>
                                <div className="border rounded-md p-4">
                                    <p>
                                        <strong className="text-green-500 title">Content Length:</strong>{" "} <br />
                                        <span style={{ wordBreak: "break-all" }}>{Details.content_length}</span>
                                    </p>
                                </div>
                                <div className="border rounded-md p-4">
                                    <p>
                                        <strong className="text-green-500 title">Address:</strong>{" "} <br />
                                        <span style={{ wordBreak: "break-all" }}>{Details.address.slice(0, 6)}...<CopyButton copyText={Details.address} /></span>
                                    </p>
                                </div>
                                <div className="border rounded-md p-4">
                                    <p>
                                        <strong className="text-green-500 title">Inscription TXID:</strong>{" "} <br />
                                        <span style={{ wordBreak: "break-all" }}>{Details.tx_id.slice(0, 6)}...<CopyButton copyText={Details.tx_id} /></span>
                                    </p>
                                </div>
                                <div className="border rounded-md p-4">
                                    <p>
                                        <strong className="text-green-500 title">Sat Ordinal:</strong>{" "} <br />
                                        <span style={{ wordBreak: "break-all" }}>{Details.sat_ordinal}</span>
                                    </p>
                                </div>
                                <div className="border rounded-md p-4">
                                    <p>
                                        <strong className="text-green-500 title">Sat Rarity:</strong>{" "} <br />
                                        <span style={{ wordBreak: "break-all" }}>{Details.sat_rarity}</span>
                                    </p>
                                </div>
                                <div className="border rounded-md p-4">
                                    <p>
                                        <strong className="text-green-500 title">Sat Coinbase Height:</strong>{" "} <br />
                                        <span style={{ wordBreak: "break-all" }}>{Details.sat_coinbase_height}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}


                    {Transfers && Transfers.results.length > 0 ? (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Transfer Details</h2>
                            {Transfers.results.map((transfer) => {
                                const fetch = async () => {
                                    console.log(await fetchFees(transfer.tx_id));
                                }
                                fetch();
                                return (
                                    <div key={transfer.tx_id} className="flex flex-col mb-6 details-div">
                                        <p className="border rounded m-2 p-1 border-[#666]" ><strong className="text-blue-500 title ">Transfer ID:</strong><br /> <span style={{ wordBreak: 'break-all' }}>{transfer.tx_id}<CopyButton copyText={transfer.tx_id} /></span></p>
                                        <p className="border rounded m-2 p-1 border-[#666]"><strong className="text-blue-500 title">Block Height:</strong> <br /> <span style={{ wordBreak: 'break-all' }}>{transfer.block_height}</span></p>
                                        <p className="border rounded m-2 p-1 border-[#666]"><strong className="text-blue-500 title">Block Height:</strong> <br /> <span style={{ wordBreak: 'break-all' }}>{transfer.block_height}</span></p>
                                        <p className="border rounded  m-2 p-1  border-[#666] "><strong className="text-blue-500 title">Block Hash:</strong> <br /> <span style={{ wordBreak: 'break-all' }}>{transfer.block_hash}<CopyButton copyText={transfer.block_hash} /></span></p>
                                        <p className="border rounded  m-2 p-1  border-[#666]"><strong className="text-blue-500 title">Address:</strong> , <br /><span style={{ wordBreak: 'break-all' }}>{transfer.address}<CopyButton copyText={transfer.address} /></span>
                                        </p>
                                        <p className="border rounded  m-2 p-1  border-[#666]"><strong className="text-blue-500 title">Value:</strong> <br /> <span style={{ wordBreak: 'break-all' }}>{transfer.value}</span></p>
                                        <p className="border rounded  m-2 p-1  border-[#666]"><strong className="text-blue-500 title">Timestamp:</strong> <br /> <span style={{ wordBreak: 'break-all' }}>{new Date(transfer.timestamp).toLocaleString()}</span></p>
                                        <hr className="my-2" />
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <p>No transfers available</p>
                    )}
                </div>
            </div>
        </div>
    );
}

function CopyButton({ copyText }) {
    return (<button
        className=" text-white md:px-2 md:py-1 rounded  cursor-pointer w-5 md:w-fit md:h-fit basis-1/12"
        onClick={() => copyToClipboard(copyText)}
        title="Copy to clipboard"
    >
        <img src={CopyIcon} alt="Copy" className="w-4 h-4 copy-image" />
    </button>)
}