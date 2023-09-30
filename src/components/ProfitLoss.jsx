import { useQuery } from "@tanstack/react-query";
import { checkSale, fetchFees, getUsdEquivalent } from "../hooks/useFetch";
import convertTimestamp, {
  convertStringDate,
  convertTimestampNew,
} from "../utils/convertTimestamp";
import { useState } from "react";

export default function ProfitLoss({ Transfers, InscribedDetails }) {
  const {
    id,
    genesis_fee: InscribedFee,
    genesis_block_height: InscribedBlockHeight,
  } = InscribedDetails;

  const [soldValue, setSoldValue] = useState({
    event_timestamp: null,
    total_price_sats_amount: null,
  });

  const { data: fullEvents } = useQuery({
    queryKey: ["checkSale", id],
    queryFn: () => checkSale(id),
  });

  const result = fullEvents?.filter(
    (item) => item.event_type === "PURCHASED",
  );

  if (!result) {
    return;
  }

  if (soldValue.length > 0) {
    setSoldValue(result[0])
  }

  const { timestamp: InscribedTimestamp } = Transfers.filter(
    (item) => item?.block_height === InscribedBlockHeight,
  )[0];

  return (
    <>
      <ProfitLossLayout
        InscribedFee={InscribedFee}
        InscribedTimestamp={InscribedTimestamp}
        soldValues={soldValue}
      />
    </>
  );
}

function ProfitLossLayout({ InscribedFee, InscribedTimestamp, soldValues }) {
  const {
    event_timestamp: soldTimestamp,
    total_price_sats_amount: soldFeeSats,
  } = soldValues;

  const { data: inscribedUsd, isLoading: loaderA } = useQuery({
    queryKey: ["inscribedUsd", InscribedTimestamp],
    queryFn: () => getUsdEquivalent(InscribedTimestamp),
  });
  const { data: soldUsd, isLoading: loaderB } = useQuery({
    queryKey: ["soldUsd", convertStringDate(soldTimestamp) * 1000],
    queryFn: () => getUsdEquivalent(convertStringDate(soldTimestamp) * 1000),
  });

  if (loaderA || loaderB) {
    return <h2>Loading...</h2>;
  }

  const finalInscribedUsd = convertSatToUsd(inscribedUsd, InscribedFee);
  const finalSoldUsd = convertSatToUsd(soldUsd, soldFeeSats);

  let profitLossState, className;
  const ifProfitLoss = finalSoldUsd - finalInscribedUsd;

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
      <tr className="flex flex-col items-start justify-between gap-x-4 border p-2">
        <td>Inscribed Price (sats) : {InscribedFee}</td>

        <td>
          Inscribed Date (YYYY-MM-DD) : {convertTimestamp(InscribedTimestamp)}
        </td>
        <td>Inscribed Price (usd) : {finalInscribedUsd}</td>
        <br />
        {soldTimestamp ?
          <>
            <td>Sold Price (sats) : {soldFeeSats}</td>
            <td>Sold Date (YYYY-MM-DD) : {convertTimestampNew(soldTimestamp)}</td>
            <td>Sold Price (usd) : {finalSoldUsd}</td>
            <td>
              {profitLossState === "positive"
                ? "Profit"
                : profitLossState === "negative"
                  ? "Loss"
                  : "Equal"}
              &nbsp;&nbsp;
              <span className={`${className}`}>
                ${Math.abs(ifProfitLoss).toFixed(2)}
              </span>
            </td>
          </> : <td>Not sold yet</td>
        }
      </tr>
    </>
  );
}

function convertSatToUsd(usdValue, satsValue) {
  const BtcToUsd = usdValue?.data?.rates?.BTC || null;
  const BtcFees = satsValue / 100000000;
  return (BtcToUsd * BtcFees).toFixed(2);
}
