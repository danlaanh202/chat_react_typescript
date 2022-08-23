export const dateToTele = (date: Date) => {
  const d1 = new Date(date);
  const d2 = new Date();

  if (isTheSameDay(d1, d2)) {
    return `${d1.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;
  }
  if (isTheSameWeek(d1, d2)) {
    return `${`${d1}`.substring(0, 3)}`;
  }
  if (isTheSameYear(d1, d2)) {
    return `${`${d1}`.substring(4, 7)} ${d1.getDate()}`;
  }
};
const isTheSameDay = (d1: Date, d2: Date) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};
const isTheSameYear = (d1: Date, d2: Date) => {
  return d1.getFullYear() === d2.getFullYear();
};
const getWeek = (date: Date) => {
  const janFirst = new Date(date.getFullYear(), 0, 1);

  return Math.ceil(
    ((date.getTime() - janFirst.getTime()) / 86400000 + janFirst.getDay() + 1) /
      7
  );
};
const isTheSameWeek = (d1: Date, d2: Date) => {
  return getWeek(d1) === getWeek(d2);
};
