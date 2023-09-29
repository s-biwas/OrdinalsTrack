import moment from "moment/moment";

export default function convertTimestamp(timeStamp) {
  return moment.unix(timeStamp / 1000).format("YYYY-MM-DD");
}

export function convertTimestampNew(timeStamp) {
  return moment.unix(timeStamp).format("YYYY-MM-DD");
}
