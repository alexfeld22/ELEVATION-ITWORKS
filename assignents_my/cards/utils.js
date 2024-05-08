export function buildDeck() {
  const fullSuites = ['♠', '♥', '♦', '♣'];

  const deck = [];

  for (let i = 0; i < 4; i++) {
    for (let j = 2; j <= 10; j++) {
      deck.push({ type: fullSuites[i], score: j, value: j.toString() });
    }
    deck.push({ type: fullSuites[i], score: 10, value: 'J' });
    deck.push({ type: fullSuites[i], score: 10, value: 'Q' });
    deck.push({ type: fullSuites[i], score: 10, value: 'K' });
    deck.push({ type: fullSuites[i], score: 11, value: 'A' });
  }

  return deck;
}

// a fn thats shuffles the deck
export function shuffleDeck(deck) {
  return deck.sort(() => Math.random() - 0.5);
}
