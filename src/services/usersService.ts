import { where } from "firebase/firestore";
import { getToday, months, previousDay } from "../common/utils.ts";
import { auth } from "../firebase-config.ts";
import dbRequest from "./dbRequest.ts";

export const getCurrentUserData = async () => {
  let response = await dbRequest.queryDb({
    table: "UsersDetails",
    whereCondition: [where("id", "==", localStorage.getItem("currentUser"))],
  });
  return response;
};

export const getUserBalance = async () => {
  let currentUserData: any = await getCurrentUserData();
  let totalBalance = currentUserData[0].accountUSD;
  return totalBalance;
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
