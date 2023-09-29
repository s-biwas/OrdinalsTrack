import { useQuery } from "@tanstack/react-query";
import { fetchFees, getUsdEquivalent } from "../hooks/useFetch";
import { useState } from "react";

export default function ProfitLoss({ Transfers, InscribedFee }) {
  const [smallValue, setSmallValue] = useState(null);
  return (
    <>
      <h2>Profit and Loss</h2>
      {Transfers?.map((item) => (
        <ProfitLossLayout
          key={item.tx_id}
          transferData={item}
          InscribedFee={InscribedFee}
          smallValue={smallValue}
          setSmallValue={setSmallValue}
        />
      ))}
    </>
  );
}

function ProfitLossLayout({
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
    return <h2>Loading...</h2>;
  }

  const BtcToUsd = usdValue.data.rates.BTC;
  const BtcFees = fees / 100000000;
  const feeInUsd = (BtcToUsd * BtcFees).toFixed(2);
  if (fees) {
    setSmallValue(smallValue == null || fees < smallValue ? fees : smallValue);
  }
  if (fees === smallValue) {
    return null;
  }

  return (
    <section className="flex items-center justify-between border border-red-300 px-6 py-3 ">
      <div>{InscribedFee == fees ? "Inscribed Fee" : "Sold Fee"}</div>
      <div className="inline-block">
        {fees} sat&nbsp;
        <span className="text-green-300">{feeInUsd}</span>
      </div>
    </section>
  );
}
