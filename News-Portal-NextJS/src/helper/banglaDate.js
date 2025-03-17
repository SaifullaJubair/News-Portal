export const BanglaDate = (date) => {
  return new Intl.DateTimeFormat("bn", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date(date));
};
