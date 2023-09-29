import { useQuery } from "@tanstack/react-query";
import { fetchFees, getUsdEquivalent } from "../hooks/useFetch";
import { useState } from "react";

export default function ProfitLoss({ Transfers, InscribedFee }) {
  const [smallValue, setSmallValue] = useState(null);

  return (
    <>
      <table className="min-w-full bg-black border-collapse ]">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Sold Price</th>
            <th className="py-2 px-4 border">Minted Price</th>
            <th className="py-2 px-4 border">Profit/Loss</th>
          </tr>
        </thead>
        <tbody>
          {Transfers?.map((item) => (
            <ProfitLossLayout
              key={item.tx_id}
              Transfers={Transfers}
              transferData={item}
              InscribedFee={InscribedFee}
              smallValue={smallValue}
              setSmallValue={setSmallValue}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

function ProfitLossLayout({
  Transfers,
  transferData,
  InscribedFee,
  smallValue,
  setSmallValue,
}) {
  const { data: usdValue, isLoading: loaderA } = useQuery({
    queryKey: ["usdEquivalent", transferData.timestamp],
    queryFn: () => getUsdEquivalent(transferData.timestamp),
    refetchOnWindowFocus: true,
  });

  const { data: fees, isLoading: loaderB } = useQuery({
    queryKey: ["fetchfees", transferData.tx_id],
    queryFn: () => fetchFees(transferData.tx_id),
  });

  if (loaderA || loaderB) {
    return (
      <tr>
        <td className="py-2 px-4 border">Loading...</td>
        <td className="py-2 px-4 border"></td>
        <td className="py-2 px-4 border"></td>

      </tr>
    );
  }

  const BtcToUsd = usdValue.data.rates?.BTC || null;
  const BtcFees = fees / 100000000;
  const feeInUsd = (BtcToUsd * BtcFees).toFixed(2);

  if (fees && Transfers.length !== 1) {
    setSmallValue(
      smallValue == null || fees < smallValue ? fees : smallValue
    );
  }
  if (fees == smallValue) {
    return null;
  }

  if (InscribedFee == null || fees == null) {
    return (
      <tr>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    );
  }

  const feeDifference = fees - InscribedFee;
  const isProfit = feeDifference > 0;
  const isLoss = feeDifference < 0;
  if (feeDifference === 0) {
    return null; // Don't render the row if feeDifference is 0
  }
  const profitLossInUsd = ((feeDifference * BtcToUsd) / 100000000).toFixed(2);
  const InscribedFeeInUsd = ((InscribedFee * BtcToUsd) / 100000000).toFixed(2);



  return (
    <tr>
      <td className="py-2 px-4 border">
        {fees} sats (${feeInUsd})
      </td>
      <td className="py-2 px-4 border">{InscribedFee} sats (${InscribedFeeInUsd})</td>
      <td className="py-2 px-4 border" style={{ color: isProfit ? 'green' : isLoss ? 'red' : 'gray' }}>
        {isProfit && "Profit"}
        {isLoss && "Loss"}

        {feeDifference > 0 ? "+" : ""}
        {feeDifference} sats (${profitLossInUsd})
      </td>
    </tr>
  );
}
