import { CSVLink } from "react-csv";

function TaxOrdinals() {
  const csvData = [
    [
      "Account Number",
      "Tax Year",
      "Date Ordinals Acquired",
      "Price Ordinals Acquired (Usd)",
      "Price Ordinals Sold (sats)",
      "Price Ordinals Sold (Usd)",
      "Net Profit/Loss (sats)",
      "Net Profit/Loss (Usd)",
    ],
  ];
  return <CSVLink data={csvData}>Download me</CSVLink>;
}

export default TaxOrdinals;
