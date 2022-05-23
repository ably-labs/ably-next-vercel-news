import DateUtils from "date-and-time";

export function formatDate(date) {
  const dateToFormat = new Date(date);
  let formattedDate = "";
  if (dateToFormat.getDate() === new Date().getDate()) {
    formattedDate = `Today ${DateUtils.format(dateToFormat, "HH:mm:ss")}`;
  } else {
    formattedDate = DateUtils.format(dateToFormat, "ddd HH:mm:ss");
  }
  return formattedDate;
}
