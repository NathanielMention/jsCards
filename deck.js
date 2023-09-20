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
  
  const dealButton = document.getElementById('deal-button');
  const hitButton = document.getElementById('hit-button');
  const standButton = document.getElementById('stand-button');

  // Function to determine the winner and end the round
function determineWinner() {
    const playerHandValue = blackjackGame.player.getHandValue();
    const dealerHandValue = blackjackGame.dealer.getHandValue();

    if (playerHandValue > 21) {
        // Player busts, dealer wins
        console.log("Player busts. Dealer wins!");
    } else if (dealerHandValue > 21) {
        // Dealer busts, player wins
        console.log("Dealer busts. Player wins!");
    } else if (playerHandValue > dealerHandValue) {
        // Player has a higher hand value, player wins
        console.log("Player wins!");
    } else if (dealerHandValue > playerHandValue) {
        // Dealer has a higher hand value, dealer wins
        console.log("Dealer wins!");
    } else {
        // It's a tie (push)
        console.log("It's a tie!");
    }

    // Enable the "Deal" button to start a new round
    dealButton.disabled = false;
}


  function updateHandDisplay(hand, elementId) {
    const handElement = document.getElementById(elementId);
    handElement.innerHTML = ''; // Clear previous cards

    for (const card of hand) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.textContent = `${card.rank} of ${card.suit}`;
        handElement.appendChild(cardElement);
    }
}

// Example: Update the display when dealing initial cards
function dealInitialCards() {
    blackjackGame.dealInitialCards();
    
    // Update the display for player and dealer hands
    updateHandDisplay(blackjackGame.player.hand, 'player-hand');
    updateHandDisplay(blackjackGame.dealer.hand, 'dealer-hand');
}

  function startNewRound() {
    // Clear the player's and dealer's hands
    blackjackGame.player.hand = [];
    blackjackGame.dealer.hand = [];

    // Shuffle the deck for a new round
    blackjackGame.deck = new Deck();
    blackjackGame.deck.shuffle();

    // Deal initial cards and update the display
    dealInitialCards();
}

  dealButton.addEventListener('click', startNewRound);

  function playerHit() {
    if (blackjackGame.player.hand.length < 5) { // Limit to 5 cards per player
        const card = blackjackGame.deck.draw();
        blackjackGame.player.addToHand(card);

        // Update the display for the player's hand
        updateHandDisplay(blackjackGame.player.hand, 'player-hand');

        // Check if the player has busted (exceeded 21)
        if (blackjackGame.player.getHandValue() > 21) {
            // Implement logic for player bust (end of turn)
            console.log("Player busts!");
            // Add your logic for the player's turn ending
        }
    }
}

  hitButton.addEventListener('click', playerHit);

// Function to handle a player standing (ending their turn)
function playerStand() {
    // Disable the "Hit" and "Stand" buttons to end the player's turn
    hitButton.disabled = true;
    standButton.disabled = true;

    // Implement logic for the dealer's actions
    while (blackjackGame.dealer.getHandValue() < 17) {
        const card = blackjackGame.deck.draw();
        blackjackGame.dealer.addToHand(card);

        // Update the display for the dealer's hand
        updateHandDisplay(blackjackGame.dealer.hand, 'dealer-hand');
    }

    // Determine the winner and end the round
    determineWinner();
}

    standButton.addEventListener('click', playerStand);

  const playerName = "Player 1";
  const blackjackGame = new BlackjackGame(playerName);
  blackjackGame.dealInitialCards();
  
  console.log(`Player's hand: ${playerName}`, blackjackGame.player.hand);
  console.log(`Dealer's hand:`, blackjackGame.dealer.hand);