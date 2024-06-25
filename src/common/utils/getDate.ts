export const getDate = (addedDate: string) => {
  const dateObject = new Date(addedDate);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const dayOfWeek = days[dateObject.getDay()];
  const day = dateObject.getDate().toString().padStart(2, '0');
  const month = months[dateObject.getMonth()];

  return {dayOfWeek, day, month}
};