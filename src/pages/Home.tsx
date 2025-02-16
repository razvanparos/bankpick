import React, { useState, useEffect } from "react";
import HomeHeader from "../components/HomeHeader.tsx";
import Balance from "../components/Balance.tsx";
import CardActions from "../components/CardActions.tsx";
import TransactionsViewer from "../components/TransactionsViewer.tsx";
import { Slide } from "react-awesome-reveal";
import Card from "../components/Card.tsx";
import { getCurrentUserData } from "../services/usersService.ts";
import AddCardPrompt from "../components/AddCardPrompt.tsx";
import Loader from "../components/Loader.tsx";

function Home() {
  let [homeCard, setHomeCard] = useState();

  const getHomeCard = async () => {
    let data: any = await getCurrentUserData();
    let card = data[0]?.myCards[0];
    setHomeCard([card]);
  };

  useEffect(() => {
    getHomeCard()
  }, []);

  return (
    <article className="flex flex-col gap-y-2 p-4 w-full max-w-[460px] my-8 overflow-hidden">
      <Slide duration={300} triggerOnce={true}>
        <HomeHeader />
        <Balance text="Personal USD" />
        {homeCard ? (
          homeCard.length > 0 ? (
            <div>
              <h2 className="text-sm text-gray mb-2">
                Tap the card to reveal information
              </h2>
              <Card card={homeCard[0]} />
            </div>
          ) : (
            <AddCardPrompt />
          )
        ) : (
          <div className="w-full flex justify-center p-4">
            <Loader />
          </div>
        )}
        <CardActions />
        <TransactionsViewer header={true} transactionsRendered={5} />
      </Slide>
    </article>
  );
}

export default Home;
