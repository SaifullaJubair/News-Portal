import moment from "moment/moment";
import "moment/locale/bn"; // Import the Bangla locale

export const getTime = (createdAt) => {
  moment.locale("bn"); // Set the locale to Bangla
  const formattedTime = moment(createdAt).fromNow();
  return formattedTime;
};
