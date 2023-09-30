import { CSVLink } from "react-csv";
import convertTimestamp from "../utils/convertTimestamp";
import { checkSale, fetchOrdinals, getUsdFromTs } from "../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function TaxOrdinals({ address }) {
  const { data: ordinalData } = useQuery({
    queryKey: ["Ordinals"],
    queryFn: () => fetchOrdinals(address),
  });
  const [csvData, setCsvData] = useState([
    [
      "Account Number",
      "Tax Year",
      "Date Ordinals Acquired",
      "Price Ordinals Acquired (Usd)",
      "Price Ordinals Acquired (sats)",
      "Date Ordinals Sold",
      "Price Ordinals Sold (Usd)",
      "Price Ordinals Sold (sats)",
      "Net Profit/Loss (Usd)",
    ],
  ]);

  useEffect(() => {
    async function fetchData() {
      if (!ordinalData) return;

      const newCsvData = [];

      for (const ordinalItem of ordinalData.results) {
        const {
          address,
          genesis_timestamp: timestamp,
          genesis_fee,
        } = ordinalItem;
        const sale = await checkSale(ordinalItem.id);

        let newRow = [
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

        if (sale.length > 0) {
          for (const saleItem of sale) {
            if (saleItem.event_type === "PURCHASED") {
              try {
                const usdAtInscription = await getUsdFromTs(timestamp);
                const usdI = (
                  parseFloat(usdAtInscription) *
                  parseFloat(genesis_fee / 100000000)
                ).toFixed(2);
                const unixTimestamp = Date.parse(saleItem.event_timestamp);
                const usdAtTransaction = await getUsdFromTs(unixTimestamp);
                const usdT = (
                  parseFloat(usdAtTransaction) *
                  parseFloat(saleItem.total_price_sats_amount / 100000000)
                ).toFixed(2);
                newRow[3] = usdI + " $";
                newRow[5] = convertTimestamp(unixTimestamp);
                newRow[6] = usdT + " $";
                newRow[7] = saleItem.total_price_sats_amount;
                newRow[8] = (usdT - usdI).toFixed(2) + " $";
              } catch (error) {
                throw new Error("Error fetching data:", error);
              }
              break;
            }
          }
        }
        setCsvData((v) => [...v, newRow]);

        newCsvData.push(newRow);
      }
    }

    fetchData();
  }, [ordinalData]);

  if (!ordinalData) {
    return;
  }

  return (
    <div className="flex flex-col justify-center items-start w-full mx-auto overflow-scroll">
      <div className="mb-4 mx-auto">
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
              Net Profit/Loss (Usd)
            </p>
          </div>
        )}

        {csvData.length > 0 ? (
          csvData?.map((item, index) => {
            if (item === csvData[0]) {
              return null;
            }
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
          })
        ) : (
          <span>Loading Form 1099...</span>
        )}
      </div>

      {csvData.length > 0 ? (
        <CSVLink
          data={csvData}
          className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 mx-auto"
        >
          Download Csv Report
        </CSVLink>
      ) : null}
    </div>
  );
}

export default TaxOrdinals;
