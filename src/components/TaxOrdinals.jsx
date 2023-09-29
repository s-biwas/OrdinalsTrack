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

  const csvData = [
    [
      "Account Number",
      "Tax Year",
      "Date Ordinals Acquired",
      "Price Ordinals Acquired (Usd)",
      "Price Ordinals Acquired (sats)",
      "Date Ordinals Sold",
      "Price Ordinals Sold (Usd)",
      "Price Ordinals Sold (sats)",
      "Net Profit/Loss (sats)",
      "Net Profit/Loss (Usd)",
    ],
  ];

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
          address,
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
      <div>
        {csvData?.map((item, index) => {
          return (
            <div className="flex " key={index}>
              {item.map((content, index) => (
                <p
                  className="w-28 overflow-hidden px-4 py-2 text-center"
                  key={index}
                >
                  {content}
                </p>
              ))}
            </div>
          );
        })}
      </div>
      <CSVLink data={csvData}>Download me</CSVLink>;
    </div>
  );
}

export default TaxOrdinals;
