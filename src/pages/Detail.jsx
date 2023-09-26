import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchInscriptionDetail, fetchInscriptionTransfer } from "../hooks/useFetch";
import ContentDisplay from "../components/Dashboard/Content";
import CopyIcon from "../images/Copy.svg";
// import { useEffect } from "react";
// import moment from "moment/moment";

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

    const copyToClipboard = async (textToCopy) => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            alert("Address copied to clipboard!");
        } catch (error) {
            console.error("Error copying text: ", error);
        }
    };

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
        <div className="max-w-screen-xl min-h-[70vh] mx-auto flex flex-col lg:flex-row my-14 gap-5">
            <div className="w-full lg:w-1/2 h-fit rounded-md">
                {Details && (
                    <ContentDisplay
                        id={Details.id}
                        content_type={Details.content_type}
                        className="object-cover w-full h-full"
                    />
                )}
            </div>
            <div className="w-full lg:w-1/2 h-fit rounded-md bg-black-400 text-white p-2 shadow-lg">
                <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
                    {Details && (
                        <div className="flex flex-col">
                            <h2 className="text-xl font-semibold mb-4">Ordinal&apos;s Inscription Details</h2>
                            <p><strong className="text-green-500">Ordinal&apos;s Inscription ID:</strong> <span style={{ wordBreak: 'break-all' }}>{Details.id}</span></p>
                            <p><strong className="text-green-500">Number:</strong> <span style={{ wordBreak: 'break-all' }}>{Details.number}</span></p>
                            <p><strong className="text-green-500">Address:</strong> <span style={{ wordBreak: 'break-all' }}>{Details.address}
                                <button
                                    className=" text-white px-2 py-1 rounded  cursor-pointer"
                                    onClick={() => copyToClipboard(Details.address)}
                                    title="Copy Address to Clipboard"
                                >
                                    <img src={CopyIcon} alt="Copy" className="w-4 h-4" />
                                </button></span>
                            </p>
                            <p><strong className="text-green-500">Sat Ordinal:</strong> <span style={{ wordBreak: 'break-all' }}>{Details.sat_ordinal}</span></p>
                            <p><strong className="text-green-500">Sat Rarity:</strong> <span style={{ wordBreak: 'break-all' }}>{Details.sat_rarity}</span></p>
                            <p><strong className="text-green-500">Sat Coinbase Height:</strong> <span style={{ wordBreak: 'break-all' }}>{Details.sat_coinbase_height}</span></p>
                            <p><strong className="text-green-500">Timestamp:</strong> <span style={{ wordBreak: 'break-all' }}>{new Date(Details.timestamp).toLocaleString()}</span></p>
                        </div>
                    )}
                    {Transfers && Transfers.results.length > 0 ? (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Transfer Details</h2>
                            {Transfers.results.map((transfer) => (
                                <div key={transfer.tx_id} className="flex flex-col mb-6">
                                    <p><strong className="text-blue-500">Transfer ID:</strong> <span style={{ wordBreak: 'break-all' }}>{transfer.tx_id}</span></p>
                                    <p><strong className="text-blue-500">Block Height:</strong> <span style={{ wordBreak: 'break-all' }}>{transfer.block_height}</span></p>
                                    <p><strong className="text-blue-500">Block Hash:</strong> <span style={{ wordBreak: 'break-all' }}>{transfer.block_hash}</span></p>
                                    <p><strong className="text-blue-500">Address:</strong> <span style={{ wordBreak: 'break-all' }}>{transfer.address} <button
                                        className=" text-white px-1 py-1 rounded  cursor-pointer"
                                        onClick={() => copyToClipboard(transfer.address)}
                                        title="Copy Address to Clipboard"
                                    >
                                        <img src={CopyIcon} alt="Copy" className="w-4 h-4" />
                                    </button></span>
                                    </p>
                                    <p><strong className="text-blue-500">Value:</strong> <span style={{ wordBreak: 'break-all' }}>{transfer.value}</span></p>
                                    <p><strong className="text-blue-500">Timestamp:</strong> <span style={{ wordBreak: 'break-all' }}>{new Date(transfer.timestamp).toLocaleString()}</span></p>
                                    <hr className="my-2" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No transfers available</p>
                    )}
                </div>
            </div>
        </div>
    );
}
