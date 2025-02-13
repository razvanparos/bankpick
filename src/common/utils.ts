export let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

let monthsName = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDateInTwoParts = (d) => {
  let date = new Date(d);
  return `${date.getDate()} ${monthsName[date.getMonth()]}`;
};

export const formatDateInThreeParts = (d) => {
  let date = new Date(d);
  let day = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  return `${year}-${month}-${day > 9 ? day : "0" + day}`;
};

export const getToday = () => {
  let now = new Date();
  let day = now.getDate();
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  return `${year}-${month}-${day}`;
};

export const calculateDaysDifference = (d1, d2) => {
  const date1: any = new Date(d1);
  const date2: any = new Date(d2);
  const diffTime = Math.abs(date1 - date2);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
export const nextDay = (date) => {
  const day = new Date(date);
  return formatDateInThreeParts(new Date(day.getTime() + 86400000));
};
export const previousDay = (date) => {
  const day = new Date(date);
  return formatDateInThreeParts(new Date(day.getTime() - 86400000));
};
export const generateId = () => {
  let newId = "id" + Math.random().toString(16).slice(2);
  return newId;
};
export const sortTransactions = (transactions) => {
  let sorted = transactions.sort((a: any, b: any) => {
    let dateA = new Date(`${a.transactionDate}T${a.transactionTime}`);
    let dateB = new Date(`${b.transactionDate}T${b.transactionTime}`);
    return dateB.getTime() - dateA.getTime();
  });
  return sorted
};
