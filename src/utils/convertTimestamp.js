import moment from "moment/moment";

export default function convertTimestamp(timeStamp) {
  return moment.unix(timeStamp / 1000).format("YYYY-MM-DD");
}
