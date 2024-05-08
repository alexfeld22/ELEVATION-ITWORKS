import { useState } from 'react'
import { buildDeck, shuffleDeck } from '../../utils'

function Cards (props) {
  console.log(props.cards)
  return <div>
    {/* {props.cards.map(c => {
      <div className='card'></div>
    })} */}
  </div>
}


function App() {

    const [cards, setCards] = useState(shuffleDeck(buildDeck()));

    const [playerCards, setPlayerCards] = useState([]);
    const [dealerCards, setDealerCards] = useState([]);

    const player = 'player';

    const getCard  = () => {
      const newCards = [... cards];
      const card = newCards.pop();
      setCards(newCards);
      return card;
    }

    const dealHandler = (e) => {
      const card = getCard();
      const playerCardsCopy = [... playerCards, card];
      setPlayerCards(playerCardsCopy);
    }

  return (
    <>
      <button onClick={dealHandler}>Deal</button>
      <button>Stop</button>

      <Cards cards = {playerCards} />
      <Cards cards = {dealerCards} />

    </>
  )
}

export default App
