import { or, where } from "firebase/firestore";
import dbRequest from "./dbRequest.ts";
import { formatDateInThreeParts, generateId } from "../common/utils.ts";
import NotificationActions from "../context/actions/notificationActions.ts";
import { getCurrentUserData, getUserBalance } from "./usersService.ts";

export const addTransaction = async (user, amt, type, from) => {
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
    }:${
      new Date().getSeconds() < 10
        ? `0${new Date().getSeconds()}`
        : new Date().getSeconds()
    }`,
    type: type,
    from: from,
  });
  await dbRequest.updateDb(response[0].id || user, "UsersDetails", {
    transactions: transactions,
  });
  return true;
};

export const sendMoney = async (to = "", amt) => {
  if (amt < 1) {
    NotificationActions.showNotification("Minimum transfer is 1$", "danger");
    return false;
  }
  const currentBalance = await getUserBalance();
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
  const currentBalance = await getUserBalance();
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
