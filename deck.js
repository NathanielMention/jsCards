// Define a Card class
class Card {
    constructor(suit, rank) {
      this.suit = suit;
      this.rank = rank;
    }
    // returns the numerical value of the card
    getValue() {
      if (this.rank === "Ace") {
        return 11; // Aces can be 1 or 11, default to 11 for simplicity
      } else if (["King", "Queen", "Jack"].includes(this.rank)) {
        return 10;
      } else {
        return parseInt(this.rank);
      }
    }
  }
  
  // Define a Deck class
  class Deck {
    constructor() {
      this.cards = [];
      const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
      const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
  
      for (const suit of suits) {
        for (const rank of ranks) {
          this.cards.push(new Card(suit, rank));
        }
      }
    }
    // randomly shuffles the cards
    shuffle() {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
    }
  
    draw() {
      return this.cards.pop();
    }
  }
  
  // Define a Player class
  class Player {
    constructor(name) {
      this.name = name;
      this.hand = [];
    }
  
    addToHand(card) {
      this.hand.push(card);
    }
    // calculates the total value of the cards in hand
    getHandValue() {
      return this.hand.reduce((total, card) => total + card.getValue(), 0);
    }
  }
  
  // Define a BlackjackGame class
  class BlackjackGame {
    constructor(playerName) {
      this.deck = new Deck();
      this.deck.shuffle();
      this.player = new Player(playerName);
      this.dealer = new Player("Dealer");
    }
  
    dealInitialCards() {
      this.player.addToHand(this.deck.draw());
      this.dealer.addToHand(this.deck.draw());
      this.player.addToHand(this.deck.draw());
      this.dealer.addToHand(this.deck.draw());
    }
  }
  

  const playerName = "Player 1";
  const blackjackGame = new BlackjackGame(playerName);
  blackjackGame.dealInitialCards();
  
  console.log(`Player's hand: ${playerName}`, blackjackGame.player.hand);
  console.log(`Dealer's hand:`, blackjackGame.dealer.hand);