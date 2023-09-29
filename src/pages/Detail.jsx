import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  fetchFees,
  fetchInscriptionDetail,
  fetchInscriptionTransfer,
} from "../hooks/useFetch";
import ContentDisplay from "../components/Dashboard/Content";
import CopyIcon from "../images/Copy.svg";
import toast from "react-hot-toast";
import ProfitLoss from "../components/ProfitLoss";
// import { useEffect } from "react";
// import moment from "moment/moment";

const copyToClipboard = async (textToCopy) => {
  try {
    await navigator.clipboard.writeText(textToCopy);
    toast.success("Copied to clipboard");
  } catch (error) {
    toast.error("failed to copy");
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

  return (
    <div className="mx-auto my-14 flex min-h-[70vh] max-w-screen-xl flex-col gap-5 md:flex-row ">
      <div className="flex h-fit w-full flex-col items-center rounded-md bg-[#222] p-3 lg:w-1/2 ">
        {Details && (
          <ContentDisplay
            id={Details.id}
            content_type={Details.content_type}
            className="h-full w-full object-cover"
          />
        )}

        <div className="mt-5">
          <ProfitLoss
            Transfers={Transfers?.results}
            InscribedFee={Details?.genesis_fee}
          />
          {/* <p className="opacity-[0.5]">*Profit and loss are shown only if the ordinals is purchased or sold!</p> */}
        </div>
      </div>

      <div className="bg-black-400 h-fit w-full rounded-md border-gray-300 p-2 text-white shadow-lg  lg:w-1/2">
        <div className="details-div flex flex-col gap-10 md:gap-6 lg:gap-8">
          {Details && (
            <div className="flex flex-col rounded border border-gray-400 bg-[#222] p-4">
              <h2 className="mb-4 text-2xl font-bold uppercase">
                Inscription #{Details.number}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-md border p-4">
                  <p>
                    <strong className="title text-green-500">Type:</strong>{" "}
                    <br />
                    <span style={{ wordBreak: "break-all" }}>
                      {Details.content_type}
                    </span>
                  </p>
                </div>
                <div className="rounded-md border p-4">
                  <p>
                    <strong className="title text-green-500">ID:</strong> <br />
                    <span style={{ wordBreak: "break-all" }}>
                      {Details.id.slice(0, 6)}...
                      <CopyButton copyText={Details.id} />
                    </span>
                  </p>
                </div>
                <div className="rounded-md border p-4">
                  <p>
                    <strong className="title text-green-500">
                      Content Length:
                    </strong>{" "}
                    <br />
                    <span style={{ wordBreak: "break-all" }}>
                      {Details.content_length}
                    </span>
                  </p>
                </div>
                <div className="rounded-md border p-4">
                  <p>
                    <strong className="title text-green-500">Address:</strong>{" "}
                    <br />
                    <span style={{ wordBreak: "break-all" }}>
                      {Details.address.slice(0, 6)}...
                      <CopyButton copyText={Details.address} />
                    </span>
                  </p>
                </div>
                <div className="rounded-md border p-4">
                  <p>
                    <strong className="title text-green-500">
                      Inscription TXID:
                    </strong>{" "}
                    <br />
                    <span style={{ wordBreak: "break-all" }}>
                      {Details.tx_id.slice(0, 6)}...
                      <CopyButton copyText={Details.tx_id} />
                    </span>
                  </p>
                </div>
                <div className="rounded-md border p-4">
                  <p>
                    <strong className="title text-green-500">
                      Sat Ordinal:
                    </strong>{" "}
                    <br />
                    <span style={{ wordBreak: "break-all" }}>
                      {Details.sat_ordinal}
                    </span>
                  </p>
                </div>
                <div className="rounded-md border p-4">
                  <p>
                    <strong className="title text-green-500">
                      Sat Rarity:
                    </strong>{" "}
                    <br />
                    <span style={{ wordBreak: "break-all" }}>
                      {Details.sat_rarity}
                    </span>
                  </p>
                </div>
                <div className="rounded-md border p-4">
                  <p>
                    <strong className="title text-green-500">
                      Sat Coinbase Height:
                    </strong>{" "}
                    <br />
                    <span style={{ wordBreak: "break-all" }}>
                      {Details.sat_coinbase_height}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {Transfers && Transfers.results.length > 0 ? (
            <div>
              <h2 className="mb-4 text-xl font-semibold">Transfer Details</h2>
              {Transfers.results.map((transfer) => {
                const fetch = async () => {
                  console.log(await fetchFees(transfer.tx_id));
                };
                fetch();
                return (
                  <div
                    key={transfer.tx_id}
                    className="details-div mb-6 flex flex-col"
                  >
                    <p className="m-2 rounded border border-[#666] p-1">
                      <strong className="title text-blue-500 ">
                        Transfer ID:
                      </strong>
                      <br />{" "}
                      <span style={{ wordBreak: "break-all" }}>
                        {transfer.tx_id}
                        <CopyButton copyText={transfer.tx_id} />
                      </span>
                    </p>
                    <p className="m-2 rounded border border-[#666] p-1">
                      <strong className="title text-blue-500">
                        Block Height:
                      </strong>{" "}
                      <br />{" "}
                      <span style={{ wordBreak: "break-all" }}>
                        {transfer.block_height}
                      </span>
                    </p>
                    <p className="m-2 rounded border border-[#666] p-1">
                      <strong className="title text-blue-500">
                        Block Height:
                      </strong>{" "}
                      <br />{" "}
                      <span style={{ wordBreak: "break-all" }}>
                        {transfer.block_height}
                      </span>
                    </p>
                    <p className="m-2 rounded  border border-[#666]  p-1 ">
                      <strong className="title text-blue-500">
                        Block Hash:
                      </strong>{" "}
                      <br />{" "}
                      <span style={{ wordBreak: "break-all" }}>
                        {transfer.block_hash}
                        <CopyButton copyText={transfer.block_hash} />
                      </span>
                    </p>
                    <p className="m-2 rounded  border border-[#666]  p-1">
                      <strong className="title text-blue-500">Address:</strong>{" "}
                      , <br />
                      <span style={{ wordBreak: "break-all" }}>
                        {transfer.address}
                        <CopyButton copyText={transfer.address} />
                      </span>
                    </p>
                    <p className="m-2 rounded  border border-[#666]  p-1">
                      <strong className="title text-blue-500">Value:</strong>{" "}
                      <br />{" "}
                      <span style={{ wordBreak: "break-all" }}>
                        {transfer.value}
                      </span>
                    </p>
                    <p className="m-2 rounded  border border-[#666]  p-1">
                      <strong className="title text-blue-500">
                        Timestamp:
                      </strong>{" "}
                      <br />{" "}
                      <span style={{ wordBreak: "break-all" }}>
                        {new Date(transfer.timestamp).toLocaleString()}
                      </span>
                    </p>
                    <hr className="my-2" />
                  </div>
                );
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
  return (
    <button
      className=" w-5 basis-1/12 cursor-pointer rounded  text-white md:h-fit md:w-fit md:px-2 md:py-1"
      onClick={() => copyToClipboard(copyText)}
      title="Copy to clipboard"
    >
      <img src={CopyIcon} alt="Copy" className="copy-image h-4 w-4" />
    </button>
  );
}
