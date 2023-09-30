import { useEffect, useState } from "react";
import { checkSale, getUsdFromTs } from "../hooks/useFetch";
import convertTimestamp from "../utils/convertTimestamp";

export default function ProfitLoss({ InscribedDetails }) {
    const [usdAtIns, setUsdAtIns] = useState(null);
    const [usdAtSol, setUsdAtSol] = useState(null);
    const [satAtSol, setSatAtSol] = useState(null);
    const [timeStampSol, setTimeStampSol] = useState(null);

    useEffect(() => {
        async function fetchData() {
            if (!InscribedDetails) return;
            try {
                const usdAtInscription = await getUsdFromTs(InscribedDetails.genesis_timestamp);
                const usdI = (
                    parseFloat(usdAtInscription) *
                    parseFloat(InscribedDetails.genesis_fee / 100000000)
                ).toFixed(2);
                setUsdAtIns(usdI);
                const saleData = await checkSale(InscribedDetails.id);
                const result = await saleData.filter(
                    (item) => item.event_type === "PURCHASED",
                );

                if (result.length > 0) {
                    setSatAtSol(result[0].total_price_sats_amount);

                    const unixTimestamp = Date.parse(result[0].event_timestamp);
                    setTimeStampSol(unixTimestamp);

                    const usdAtSale = await getUsdFromTs(unixTimestamp);
                    const usdS = (
                        parseFloat(usdAtSale) *
                        parseFloat(result[0].total_price_sats_amount / 100000000)
                    ).toFixed(2);
                    setUsdAtSol(usdS);
                }
            }
            catch (err) {
                console.log(err);
            }
        }

        fetchData();
    }, [InscribedDetails]);

    if (!InscribedDetails) {
        return;
    }

    let profitLossState, className;
    const ifProfitLoss = usdAtSol - usdAtIns;

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
                <td>Inscribed Price (sats) : {InscribedDetails.genesis_fee}</td>

                <td>
                    Inscribed Date (YYYY-MM-DD) : {convertTimestamp(InscribedDetails.genesis_timestamp)}
                </td>
                <td>Inscribed Price (usd) : {usdAtIns} $</td>
                <br />
                {usdAtSol ?
                    <>
                        <td>Sold Price (sats) : {satAtSol}</td>
                        <td>Sold Date (YYYY-MM-DD) : {convertTimestamp(timeStampSol)}</td>
                        <td>Sold Price (usd) : {usdAtSol} $</td>
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
    )

}