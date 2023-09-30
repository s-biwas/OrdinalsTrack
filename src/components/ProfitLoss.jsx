import { useQuery } from "@tanstack/react-query";
import { fetchFees, getUsdEquivalent } from "../hooks/useFetch";
import { useState } from "react";

export default function ProfitLoss({ Transfers, InscribedFee }) {
  const [smallValue, setSmallValue] = useState(null);
  const [profitLoss, setProfitLoss] = useState({
    soldValue: 0,
    mintedValue: 0,
  });

  const { soldValue, mintedValue } = profitLoss;

  let ifProfitLoss, profitLossState, className;
  if (soldValue && mintedValue) {
    ifProfitLoss = soldValue - mintedValue;
  }

  switch (Math.sign(ifProfitLoss)) {
    case -1:
      profitLossState = "negative";
      break;
    case 1:
      profitLossState = "positive";
      break;
    default:
      profitLossState = "zero";
  }

  switch (profitLossState) {
    case "negative":
      className = "text-red-400";
      break;
    case "positive":
      className = "text-green-400";
      break;
    default:
      className = "";
  }

  return (
    <>
      {Transfers?.map((item) => (
        <ProfitLossLayout
          key={item.tx_id}
          Transfers={Transfers}
          transferData={item}
          InscribedFee={InscribedFee}
          smallValue={smallValue}
          setSmallValue={setSmallValue}
          setProfitLoss={setProfitLoss}
        />
      ))}
      <tr className="flex items-center justify-between gap-x-4 border">
        <td className="px-4 text-center">
          {profitLossState === "positive"
            ? "Profit"
            : profitLossState === "negative"
            ? "Loss"
            : "Equal"}
        </td>
        <td className={`px-4 text-center ${className}`}>
          ${Math.abs(ifProfitLoss)}
        </td>
      </tr>
    </>
  );
}

function ProfitLossLayout({
  Transfers,
  transferData,
  InscribedFee,
  smallValue,
  setSmallValue,
  setProfitLoss,
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
    return <h2>Loading...</h2>;
  }

  const BtcToUsd = usdValue?.data?.rates?.BTC || null;
  const BtcFees = fees / 100000000;
  const feeInUsd = (BtcToUsd * BtcFees).toFixed(2);
  if (fees && Transfers.length !== 1) {
    setSmallValue(smallValue == null || fees < smallValue ? fees : smallValue);
  }
  if (fees == smallValue) {
    return null;
  }

  const isInscribed = InscribedFee == fees;
  if (isInscribed) {
    setProfitLoss((v) => ({ ...v, mintedValue: feeInUsd }));
  } else {
    setProfitLoss((v) => ({ ...v, soldValue: feeInUsd }));
  }

  return (
    <>
      <tr className="flex items-center justify-between gap-x-4 border">
        <td className="">{isInscribed ? "Minted Price" : "Sold Price"}</td>
        <td className="">
          <span className="text-green-300">${feeInUsd} &nbsp;</span>
          <span>({fees} sats)</span>
        </td>
        <br />
      </tr>
    </>
  );
}
