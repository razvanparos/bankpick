import { generateId } from "../common/utils.ts";
import NotificationActions from "../context/actions/notificationActions.ts";
import dbRequest from "./dbRequest.ts";
import { getCurrentUserData } from "./usersService.ts";

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
            cardColor: card.cardColor,
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
  