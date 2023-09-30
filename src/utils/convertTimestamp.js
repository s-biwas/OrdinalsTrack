import moment from "moment/moment";

export default function convertTimestamp(timeStamp) {
  return moment.unix(timeStamp / 1000).format("YYYY-MM-DD");
}

export function convertStringDate(string) {
  return moment(string).unix();
}

export function convertTimestampNew(timeStamp) {
  var date = moment(timeStamp);
  return date.utc().format("YYYY-MM-DD");
}
