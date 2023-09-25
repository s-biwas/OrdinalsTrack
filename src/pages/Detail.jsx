import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchInscriptionDetail, fetchInscriptionTransfer } from "../hooks/useFetch";
import ContentDisplay from "../components/Dashboard/Content";
import CopyIcon from "../images/Copy.svg";

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

    return (
        <div className="max-w-screen-xl min-h-[70vh] mx-auto flex flex-col md:flex-row my-14 gap-5">
            <div className="basis-3/12 h-fit rounded-md">
                {Details && (
                    <ContentDisplay
                        id={Details.id}
                        content_type={Details.content_type}
                    />
                )}
            </div>
            <div className="basis-3/12 h-fit rounded-md bg-[#222] p-2">
                {Transfers && Transfers.results.length > 0 ? (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Transfer Details</h2>
                        {Transfers.results.map((transfer) => (
                            <div key={transfer.tx_id} className="mb-6">
                                <p><strong className="text-blue-500">Transfer ID:</strong> {transfer.tx_id}</p>
                                <p><strong   className="text-blue-500">Block Height:</strong> {transfer.block_height}</p>
                                <p><strong  className="text-blue-500">Block Hash:</strong> {transfer.block_hash}</p>
                                <p><strong  className="text-blue-500">Address:</strong> {transfer.address}</p>
                                <p><strong  className="text-blue-500">Value:</strong> {transfer.value}</p>
                                <p><strong  className="text-blue-500">Timestamp:</strong> {new Date(transfer.timestamp).toLocaleString()}</p>
                                <hr className="my-2" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No transfers available</p>
                )}
            </div>
            <div className="basis-3/12 h-fit rounded-md bg-[#333] p-2 text-gray-200">
                {Details && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">OrdinasInscription Details</h2>
                        <p><strong className="text-green-500">OrdinasInscription ID:</strong> {Details.id}</p>
                        <p><strong className="text-green-500">Number:</strong> {Details.number}</p>
                        <p><strong className="text-green-500">Address:</strong> {Details.address}</p>
                        <p><strong className="text-green-500">Sat Ordinal:</strong> {Details.sat_ordinal}</p>
                        <p><strong className="text-green-500">Sat Rarity:</strong> {Details.sat_rarity}</p>
                        <p><strong className="text-green-500">Sat Coinbase Height:</strong> {Details.sat_coinbase_height}</p>
                        <p><strong className="text-green-500">Timestamp:</strong> {new Date(Details.timestamp).toLocaleString()}</p>
                      
                        <button
                            className=" text-white px-2 py-1 rounded  cursor-pointer mt-4"
                            onClick={() => copyToClipboard(Details.address)}
                            title="Copy Address to Clipboard"
                        >
                            <img src={CopyIcon} alt="Copy" className="w-4 h-4 mr-1" />
                         
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
