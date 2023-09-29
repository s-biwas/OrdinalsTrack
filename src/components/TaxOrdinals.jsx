import React from "react";
import { CSVLink } from "react-csv";
import convertTimestamp, {
  convertTimestampNew,
} from "../utils/convertTimestamp";
import { fetchOrdinals, getWholeTransfers } from "../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";

function TaxOrdinals({ address }) {
  const { data: ordinalData } = useQuery({
    queryKey: ["Ordinals"],
    queryFn: () => fetchOrdinals(address),
  });
  const { data: wholeTransfer } = useQuery({
    queryKey: ["wholeTransfer", address],
    queryFn: () => getWholeTransfers(address),
  });

  const csvData = [];

  ordinalData?.results.forEach((ordinalItem) => {
    wholeTransfer?.data.forEach((transferItem) => {
      const { address, timestamp, genesis_fee, tx_id } = ordinalItem;
      const {
        txid,
        fee,
        status: { block_time },
      } = transferItem;

      const ifSold = fee == genesis_fee;

      if (tx_id === txid) {
        let newRow = [
          address.slice(0, 5),
          2023,
          convertTimestamp(timestamp),
          null,
          genesis_fee,
          ifSold ? null : convertTimestampNew(block_time),
          null,
          ifSold ? null : fee,
          null,
        ];

        csvData.push(newRow);
      }
      return null;
    });
  });

  return (
    <div>
      <div className="mb-4 ">
        {csvData.length > 0 && (
          <div className="flex">
            <p className="w-28 overflow-hidden px-4 py-2 text-center bg-gray-700 border border-gray-300 font-bold text-black dark:text-white">
              Account Number
            </p>
            <p className="w-28 overflow-hidden px-4 py-2 text-center  bg-gray-700 border border-gray-300 font-bold text-black dark:text-white">
              Tax Year
            </p>
            <p className="w-28 overflow-hidden px-4 py-2 text-center  bg-gray-700 border border-gray-300 font-bold text-black dark:text-white">
              Date Ordinals Acquired
            </p>
            <p className="w-28 overflow-hidden px-4 py-2 text-center  bg-gray-700 border border-gray-300 font-bold text-black dark:text-white">
              Price Ordinals Acquired (Usd)
            </p>
            <p className="w-28 overflow-hidden px-4 py-2 text-center  bg-gray-700 border border-gray-300 font-bold text-black dark:text-white">
              Price Ordinals Acquired (sats)
            </p>
            <p className="w-28 overflow-hidden px-4 py-2 text-center  bg-gray-700 border border-gray-300 font-bold text-black dark:text-white">
              Date Ordinals Sold
            </p>
            <p className="w-28 overflow-hidden px-4 py-2 text-center  bg-gray-700 border border-gray-300 font-bold text-black dark:text-white">
              Price Ordinals Sold (Usd)
            </p>
            <p className="w-28 overflow-hidden px-4 py-2 text-center  bg-gray-700 border border-gray-300 font-bold text-black dark:text-white">
              Price Ordinals Sold (sats)
            </p>
            <p className="w-28 overflow-hidden px-4 py-2 text-center  bg-gray-700 border border-gray-300 font-bold text-black dark:text-white">
              Net Profit/Loss (sats)
            </p>
          </div>
        )}
        {csvData?.map((item, index) => {
          return (
            <div className="flex" key={index}>
              {item.map((content, index) => (
                <p
                  className="w-28 overflow-hidden px-4 py-2 text-center border border-gray-300 bg-white dark:bg-gray-800 text-black dark:text-white"
                  key={index}
                >
                  {content}
                </p>
              ))}
            </div>
          );
        })}
      </div>
      <CSVLink
        data={csvData}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
      >
        Download CSV
      </CSVLink>
    </div>
  );
}

export default TaxOrdinals;
