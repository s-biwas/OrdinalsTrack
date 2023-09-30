import { CSVLink } from "react-csv";
import convertTimestamp, {
  convertTimestampNew,
} from "../utils/convertTimestamp";
import { checkSale, fetchOrdinals, getWholeTransfers } from "../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function TaxOrdinals({ address }) {
  const { data: ordinalData } = useQuery({
    queryKey: ["Ordinals"],
    queryFn: () => fetchOrdinals(address),
  });
  const [csvData, setCsvData] = useState([]);



  useEffect(() => {
    async function fetchData() {
      if (!ordinalData) return;

      const newCsvData = [];

      for (const ordinalItem of ordinalData.results) {
        const { address, genesis_timestamp: timestamp, genesis_fee } = ordinalItem;
        const sale = await checkSale(ordinalItem.id);
        let newRow = []
        if (sale.length > 0) {
          let containPurchase = false;
          sale.forEach(saleItem => {
            if (saleItem.event_type === 'PURCHASED') {
              newRow = [
                address,
                2023,
                convertTimestamp(timestamp),
                null,
                genesis_fee,
                saleItem.event_timestamp,
                null,
                saleItem.total_price_sats_amount,
                parseInt(saleItem.total_price_sats_amount, 10) - parseInt(genesis_fee, 10),
              ];
              containPurchase = true;
              return;
            }
          });
          if (!containPurchase) {
            newRow = [
              address,
              2023,
              convertTimestamp(timestamp),
              null,
              genesis_fee,
              null,
              null,
              null,
              null,
            ];
          }
        }
        else {
          newRow = [
            address,
            2023,
            convertTimestamp(timestamp),
            null,
            genesis_fee,
            null,
            null,
            null,
            null,
          ];
        }
        newCsvData.push(newRow);
      }

      setCsvData(newCsvData);
    }

    fetchData();
  }, [ordinalData]);

  if (!ordinalData) {
    return;
  }

  return (
    <div>
      <div className="mb-4 ">
        {csvData.length > 0 && (
          <div className="flex">
            <p className="w-28 overflow-hidden border border-gray-300 bg-gray-700 px-4 py-2 text-center font-bold text-black dark:text-white">
              Account Number
            </p>
            <p className="w-28 overflow-hidden border border-gray-300 bg-gray-700  px-4 py-2 text-center font-bold text-black dark:text-white">
              Tax Year
            </p>
            <p className="w-28 overflow-hidden border border-gray-300 bg-gray-700  px-4 py-2 text-center font-bold text-black dark:text-white">
              Date Ordinals Acquired
            </p>
            <p className="w-28 overflow-hidden border border-gray-300 bg-gray-700  px-4 py-2 text-center font-bold text-black dark:text-white">
              Price Ordinals Acquired (Usd)
            </p>
            <p className="w-28 overflow-hidden border border-gray-300 bg-gray-700  px-4 py-2 text-center font-bold text-black dark:text-white">
              Price Ordinals Acquired (sats)
            </p>
            <p className="w-28 overflow-hidden border border-gray-300 bg-gray-700  px-4 py-2 text-center font-bold text-black dark:text-white">
              Date Ordinals Sold
            </p>
            <p className="w-28 overflow-hidden border border-gray-300 bg-gray-700  px-4 py-2 text-center font-bold text-black dark:text-white">
              Price Ordinals Sold (Usd)
            </p>
            <p className="w-28 overflow-hidden border border-gray-300 bg-gray-700  px-4 py-2 text-center font-bold text-black dark:text-white">
              Price Ordinals Sold (sats)
            </p>
            <p className="w-28 overflow-hidden border border-gray-300 bg-gray-700  px-4 py-2 text-center font-bold text-black dark:text-white">
              Net Profit/Loss (sats)
            </p>
          </div>
        )}

        {csvData.length > 0 ? csvData?.map((item, index) => {
          return (
            <div className="flex" key={index}>
              {item.map((content, index) => (
                <p
                  className="w-28 overflow-hidden border border-gray-300 bg-white px-4 py-2 text-center text-black dark:bg-gray-800 dark:text-white"
                  key={index}
                >
                  {content == address ? content.slice(0, 8) + "..." : content}
                </p>
              ))}
            </div>
          );
        }) : <span>Loading Form 1099...</span>
        }
      </div>
      <CSVLink
        data={csvData}
        className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
      >
        Download Form 1099
      </CSVLink>
    </div>
  );
}

export default TaxOrdinals;

