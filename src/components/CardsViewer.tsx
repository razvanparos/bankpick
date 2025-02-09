import * as React from 'react';
import Card from './Card.tsx';
function CardsViewer({cards}) {
    return ( 
        <article className='flex flex-col gap-y-4'>
            <p className='text-sm text-gray'>Tap the card to reveal information</p>
            {
                cards.map((card)=>{
                    return <Card key={card.id} card={card}/>
                })
            }
        </article>
     );
}

export default CardsViewer;