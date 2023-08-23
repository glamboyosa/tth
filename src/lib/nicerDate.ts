import { parseISO, format } from "date-fns";
import { formatWithOptions } from "date-fns/fp";
const nicerDate = (date: string | Date) => {
  if (typeof date === "string" && date.includes("Z")) {
    console.log("date string is", date);
    const parsedDate = parseISO(date);
    console.log(parsedDate, "PARSED DATE");
    formatWithOptions({});
    return parsedDate.toLocaleString(undefined, {
      year: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      month: "long",
    });
  }
  return date.toLocaleString(undefined, {
    year: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    month: "long",
  });
};
export { nicerDate };
