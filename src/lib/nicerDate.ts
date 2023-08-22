const nicerDate = (date: Date) => {
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
