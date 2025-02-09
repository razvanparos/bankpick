import { where } from "firebase/firestore";
import { months } from "../common/utils.ts";
import { auth } from "../firebase-config.ts";
import dbRequest from "./dbRequest.ts";

export const getCurrentUserData = async () => {
  let response = await dbRequest.queryDb({
    table: "UsersDetails",
    whereCondition: [where("id", "==", localStorage.getItem("currentUser"))],
  });
  return response;
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
          : new Date().getDate()}`,
    myCards:[],
    transactions:[]
  });
};
