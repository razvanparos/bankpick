import { or, where } from "firebase/firestore";
import {
  calculateDaysDifference,
  formatDateInTwoParts,
  generateId,
  getToday,
  months,
  nextDay,
  previousDay,
} from "../common/utils.ts";
import { auth } from "../firebase-config.ts";
import dbRequest from "./dbRequest.ts";
import NotificationActions from "../context/actions/notificationActions.ts";

export const getCurrentUserData = async () => {
  let response = await dbRequest.queryDb({
    table: "UsersDetails",
    whereCondition: [where("id", "==", localStorage.getItem("currentUser"))],
  });
  return response;
};

export const getTotalBalance = async () => {
  let currentUserData: any = await getCurrentUserData();
  let totalBalance = currentUserData[0].accountUSD;
  return totalBalance;
};

export const getChartData = async () => {
  let currentUserData: any = await getCurrentUserData();
  let totalBalance = currentUserData[0]?.accountUSD;
  let userChartData = currentUserData[0]?.statsData;
  const daysDiff = calculateDaysDifference(getToday(), userChartData[6].date);
  const slicedData = userChartData?.slice(daysDiff, userChartData.length);
  if (daysDiff > 0) {
    for (let i = 0; i < daysDiff; i++) {
      slicedData.push({
        pv: slicedData[slicedData.length - 1].pv,
        date: nextDay(slicedData[slicedData.length - 1].date),
      });
    }
    updateUserStatsData({
      statsData: slicedData,
    });
  }
  slicedData[6].pv = totalBalance;

  let finalChartData = slicedData.map((d) => {
    return { pv: d.pv, date: formatDateInTwoParts(d.date) };
  });

  return finalChartData;
};

export const addNewUser = async (name, email) => {
  let newId = auth.currentUser?.uid || "";
  let initialStats = initialStatsData(7, getToday(), []).reverse();
  await dbRequest.setDb(newId, "UsersDetails", {
    id: newId,
    fullName: name,
    email: email,
    joined: `${new Date().getFullYear()}-${months[new Date().getMonth()]}-${
      new Date().getDate() < 10
        ? "0" + new Date().getDate()
        : new Date().getDate()
    }`,
    myCards: [],
    transactions: [],
    statsData: initialStats,
  });
};

export const initialStatsData = (nr, date, arr) => {
  if (nr === 0) {
    return arr;
  }
  arr.push({ pv: 0, date: date });
  return initialStatsData(nr - 1, previousDay(date), arr);
};

export const updateUserStatsData = async (updateParams) => {
  await dbRequest.updateDb(
    localStorage.getItem("currentUser") || "",
    "UsersDetails",
    updateParams
  );
};

export const sendMoney = async (to = "", amt) => {
  if (amt < 1) {
    NotificationActions.showNotification("Minimum transfer is 1$", "danger");
    return false;
  }
  const currentBalance = await getTotalBalance();
  const finalAmount = currentBalance - parseFloat(amt);
  if (finalAmount < 0) {
    NotificationActions.showNotification("Insufficient funds", "danger");
    return false;
  }
  let currentUserData: any = await getCurrentUserData();
  if (to === localStorage.getItem('currentUser')|| to ===currentUserData[0].email) {
    NotificationActions.showNotification("Cannot send money to your own account", "danger");
    return false;
  }
  let response: any = await dbRequest.queryDb({
    table: "UsersDetails",
    whereCondition: [or(where("id", "==", to), where("email", "==", to))],
  });
  if (!response[0]) {
    NotificationActions.showNotification("User not found", "danger");
    return false;
  }
  let finalAmountReceiver = response[0]?.accountUSD + parseFloat(amt);
  await dbRequest.updateDb(
    localStorage.getItem("currentUser") || "",
    "UsersDetails",
    { accountUSD: finalAmount }
  );
  await dbRequest.updateDb(response[0].id || to, "UsersDetails", {
    accountUSD: finalAmountReceiver,
  });
  NotificationActions.showNotification("Transaction successfull", "normal");
  return true;
};

export const addMoney = async (amt) => {
  if (amt < 1) {
    NotificationActions.showNotification("Minimum topup is $1", "danger");
    return false;
  }
  if (amt > 100000) {
    NotificationActions.showNotification("Maximum topup is $100.000", "danger");
    return false;
  }
  const currentBalance = await getTotalBalance();
  const finalAmount = currentBalance + parseFloat(amt);
  await dbRequest.updateDb(
    localStorage.getItem("currentUser") || "",
    "UsersDetails",
    { accountUSD: finalAmount }
  );
  NotificationActions.showNotification(
    `$${amt} added to your account`,
    "normal"
  );
  return true;
};

export const addNewCard = async (card) => {
  if (
    card.cardName &&
    card.cardNumber &&
    card.cvv &&
    card.expireMonth &&
    card.expireYear
  ) {
    if (
      card.cardNumber.length === 16 &&
      card.cvv.length === 3 &&
      card.expireMonth.length === 2 &&
      card.expireMonth < 13 &&
      card.expireMonth > 0 &&
      card.expireYear.length === 2 &&
      card.expireYear > 25
    ) {
      try {
        let newId = generateId();
        let userdata: any = await getCurrentUserData();
        let userCards = userdata[0]?.myCards;
        userCards.push({
          id: newId,
          cardName: card.cardName,
          cardNumber: card.cardNumber,
          cardCvv: card.cvv,
          expireMonth: card.expireMonth,
          expireYear: card.expireYear,
        });
        await dbRequest.updateDb(
          localStorage.getItem("currentUser") || "",
          "UsersDetails",
          {
            myCards: userCards,
          }
        );
        NotificationActions.showNotification("Card added", "normal");
        return true;
      } catch (err) {
        throw err;
      }
    } else {
      NotificationActions.showNotification("Invalid card data", "danger");
      return false;
    }
  } else {
    NotificationActions.showNotification("Incomplete card details", "danger");
    return false;
  }
};

export const addTransaction = async (user, transaction) => {
  let response: any = await dbRequest.queryDb({
    table: "UsersDetails",
    whereCondition: [or(where("id", "==", user), where("email", "==", user))],
  });
  const transactions = response[0]?.transactions;
  transactions.push(transaction);
  await dbRequest.updateDb(response[0].id || user, "UsersDetails", {
    transactions: transactions,
  });
  return true;
};
