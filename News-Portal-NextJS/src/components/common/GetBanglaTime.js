export function getBanglaTimeInDhaka(time) {
  // Create a Date object from the given time
  const date = new Date(time);

  // Use Intl.DateTimeFormat to format the date and time for Dhaka (Asia/Dhaka timezone)
  const options = {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Dhaka",
  };

  const formatter = new Intl.DateTimeFormat("bn-BD", options);
  const parts = formatter?.formatToParts(date);

  const banglaNumbers = "০১২৩৪৫৬৭৮৯";
  const formattedDate = parts.map(({ type, value }) => {
    switch (type) {
      case "day":
      case "year":
        return value
          .split("")
          .map((d) => banglaNumbers[d] || d)
          .join("");
      case "month":
        return value;
      case "hour":
      case "minute":
        return value
          .split("")
          .map((d) => banglaNumbers[d] || d)
          .join("");
      case "dayPeriod":
        return value === "AM" ? "এএম" : "পিএম";
      default:
        return value;
    }
  });

  // Combine date and time parts
  const dateString = `${formattedDate[0]} ${formattedDate[2]} ${formattedDate[4]}, ${formattedDate[6]}:${formattedDate[8]} ${formattedDate[10]}`;

  return dateString;
}
