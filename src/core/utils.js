export function formatDateTime(dateString) {
  const dateObject = new Date(dateString);
  const dateFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat(
    "tr-TR",
    dateFormatOptions
  ).format(dateObject);

  return formattedDate;
}
