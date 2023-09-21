# Blackjack Game

This is a simple implementation of a Blackjack game in JavaScript. The game includes basic logic for dealing cards, player actions (hit, stand), and determining the winner.

## Table of Contents

- [Getting Started](#getting-started)
- [Game Rules](#game-rules)
- [Usage](#usage)
- [Game Logic](#game-logic)

## Getting Started

To get started, you can clone this repository:

```bash
git clone https://github.com/NathanielMention/jsCards.gi

```

## Game Rules

```
1.The goal of the game is to have a hand value as close to 21 as possible without exceeding it.
2.Aces can be counted as 1 or 11, face cards (King, Queen, Jack) are counted as 10, and the numbered cards are counted at their face value.
3.Each player (including the dealer) is dealt two initial cards.
4.Players can choose to "hit" (draw another card) or "stand" (end their turn).
5.The dealer follows a rule to hit until their hand value is 17 or higher.
```

## Usage

```
1.Open the index.html file in a web browser.
2.Click the "Deal" button to start a new round.
3.Click the "Hit" button to draw another card during your turn.
4.Click the "Stand" button to end your turn and let the dealer play.
5.The winner will be determined, and the result will be displayed.
```

## Game logic

```
The game logic is implemented using JavaScript classes:

Card: Represents a playing card with a suit and rank.
Deck: Manages the deck of cards, shuffles it, and deals cards.
Player: Represents a player in the game.
BlackjackGame: Manages the game flow, including dealing cards and determining the winner.
```
