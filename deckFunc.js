const dealButton = document.getElementById('deal-button');
const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');
const resultMessageElement = document.getElementById('result-message');

// Function to determine the winner and end the round
function determineWinner() {
  const playerHandValue = blackjackGame.player.getHandValue();
  const dealerHandValue = blackjackGame.dealer.getHandValue();
  

  if (playerHandValue > 21) {
      resultMessageElement.textContent = "Player busts. Dealer wins!";
  } else if (dealerHandValue > 21) {
      resultMessageElement.textContent = "Dealer busts. Player wins!"
  } else if (playerHandValue > dealerHandValue) {
      resultMessageElement.textContent = "Player wins!";
  } else if (dealerHandValue > playerHandValue) {
      resultMessageElement.textContent = "Dealer wins!";
  } else {
      resultMessageElement.textContent = "It's a tie!";
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

  resultMessageElement.textContent = ''

  // Shuffle the deck for a new round
  blackjackGame.deck = new Deck();
  blackjackGame.deck.shuffle();

  // Deal initial cards and update the display
  dealInitialCards();

  hitButton.disabled = false;
  standButton.disabled = false;
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