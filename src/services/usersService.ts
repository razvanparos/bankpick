import { or, where } from "firebase/firestore";
import {
  calculateDaysDifference,
  formatDateInThreeParts,
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
    accountUSD: 0,
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
  if (
    to === localStorage.getItem("currentUser") ||
    to === currentUserData[0].email
  ) {
    NotificationActions.showNotification(
      "Cannot send money to your own account",
      "danger"
    );
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
    card.cardCvv &&
    card.expireMonth &&
    card.expireYear
  ) {
    if (
      card.cardNumber.length === 16 &&
      card.cardCvv.length === 3 &&
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
          cardCvv: card.cardCvv,
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

export const addTransaction = async (user,amt,type,from) => {
  let response: any = await dbRequest.queryDb({
    table: "UsersDetails",
    whereCondition: [or(where("id", "==", user), where("email", "==", user))],
  });
  const transactions = response[0]?.transactions;
  let newId = generateId();
  transactions.push({
    id: newId,
    amount: amt,
    transactionDate: formatDateInThreeParts(new Date()),
    transactionTime: `${
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : new Date().getHours()
    }:${
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : new Date().getMinutes()
    }`,
    type: type,
    from: from,
  });
  await dbRequest.updateDb(response[0].id || user, "UsersDetails", {
    transactions: transactions,
  });
  return true;
};

export const updateCard = async (id, updateParams) => {
  if (
    updateParams.cardName &&
    updateParams.cardNumber &&
    updateParams.cardCvv &&
    updateParams.expireMonth &&
    updateParams.expireYear
  ) {
    if (
      updateParams.cardNumber.length === 16 &&
      updateParams.cardCvv.length === 3 &&
      updateParams.expireMonth.length === 2 &&
      updateParams.expireMonth < 13 &&
      updateParams.expireMonth > 0 &&
      updateParams.expireYear.length === 2 &&
      updateParams.expireYear > 25
    ) {
      let userdata: any = await getCurrentUserData();
      let userCards = userdata[0]?.myCards;
      let remainingCards = userCards.filter((c) => c.id !== id);
      remainingCards.unshift({
        ...updateParams,
      });
      await dbRequest.updateDb(
        localStorage.getItem("currentUser") || "",
        "UsersDetails",
        {
          myCards: remainingCards,
        }
      );
      NotificationActions.showNotification("Card updated", "normal");
    } else NotificationActions.showNotification("Invalid card data", "danger");
  } else NotificationActions.showNotification("Incomplete card data", "danger");
};

export const deleteCard = async (id) => {
  let userdata: any = await getCurrentUserData();
  let userCards = userdata[0]?.myCards;
  let remainingCards = userCards.filter((c) => c.id !== id);
  await dbRequest.updateDb(
    localStorage.getItem("currentUser") || "",
    "UsersDetails",
    {
      myCards: remainingCards,
    }
  );
  NotificationActions.showNotification("Card deleted", "warning");
};
