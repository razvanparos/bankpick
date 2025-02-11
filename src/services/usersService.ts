import { where } from "firebase/firestore";
import {
  calculateBalance,
  calculateDaysDifference,
  formatDateInTwoParts,
  getToday,
  months,
  nextDay,
} from "../common/utils.ts";
import { auth } from "../firebase-config.ts";
import dbRequest from "./dbRequest.ts";

export const getCurrentUserData = async () => {
  let response = await dbRequest.queryDb({
    table: "UsersDetails",
    whereCondition: [where("id", "==", localStorage.getItem("currentUser"))],
  });
  return response;
};

export const getTotalBalance = async () => {
  let currentUserData: any = await getCurrentUserData();
  let totalBalance = calculateBalance(currentUserData[0]?.myCards);
  return totalBalance;
};

export const getChartData = async () => {
  let currentUserData: any = await getCurrentUserData();
  let totalBalance = await getTotalBalance();
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

export const addNewUser = async (user) => {
  let newId = auth.currentUser?.uid || "";
  await dbRequest.setDb(newId, "UsersDetails", {
    id: newId,
    fullName: user.registerName,
    email: user.registerEmail,
    joined: `${new Date().getFullYear()}-${months[new Date().getMonth()]}-${
      new Date().getDate() < 10
        ? "0" + new Date().getDate()
        : new Date().getDate()
    }`,
    myCards: [],
    transactions: [],
  });
};

export const updateUserStatsData = async (updateParams) => {
  await dbRequest.updateDb(
    localStorage.getItem("currentUser") || "",
    "UsersDetails",
    updateParams
  );
};
