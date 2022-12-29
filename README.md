
User Stories

	Version 1

		1. As a user, I want to have a standard 52 card deck to play with.

			-this will be created using js classes:

				-create a 'deck' class whose constructor takes 1 parameter: cards.

				-create a separate class for 'card' which takes 2 parameters: suit and value.

			-create an array of the 4 different suits and store it in a constant.

				-const suits = [the 4 suits]

			-create an array of the 13 different card values and store it in a constant.

				-const values [13 card values Ace thru King]

			-write a function that will implement .flatmap() and .map() to assign all the values a suit and return 1 array of 52 cards:

				newDeck() {
					return flatmap of the values of a map of the suits of an instance of a new Card
				}

			-in the Deck constructor, set the cards parameter to equal the newDeck() function call:

				class Deck {
					constructor(cards = newDeck()) {
						these cards are equal to the newDeck cards
					}
				}

			-deck.cards now logs a deck of 52 cards each with it's own unique suit.

			-this also allows for the deck to utilize different cards (eg Pinochle rules), although that will not be used in this game.

		2. As a user, I want the deck to shuffle before each round.

			-implement the durstenfeld shuffle algorithm on the created deck and store this in a class method:

				shuffle() {
					for every card in the deck array in descending order {
						store a random integer value inside a variable and set the index of the card to that value
						re-order the cards by index
					}
				}

			-this will be stored in a variable inside the initialize function that will be called on load, so the game starts with a freshly shuffled deck each round:

				const initialize() {
					create a new instance of Deck stored in a constant
					shuffle the deck using the .shuffle() method
					log the shuffled deck to the console
				}

		3. As a user, I want the dealer to deal cards to themself and the player.

			-both hands will be stored in arrays: dealerHand and playerHand, declared globally.

			-there will be a class method called dealCards that will simultaneously remove the first index from the deck and push it into the respective hand:

				dealCards() {
					remove the first index from cards.deck
					add that index to playerHand
					remove the first index from cards.deck
					add that index to dealerHand
					etc until both hands have 2 cards stored in their arrays
				}

		4. As a user, I want working buttons for my options (hit, stand).

			-these will be hardcoded into the html and stored globally as 'hitButton' and 'standButton' using getElementByID().

			-the hit button will trigger a hit() class method on click:

				on hitButton click {
					hit() {
						remove the first index from cards.deck
						add that index to playerHand
					}
				}

			-we will need two variables declared globally to store the userHandValue and dealerHandValue.

			-because the value key of each card is a string, we will need a globally declared object that reassigns the value to a number for computational purposes. We will call this valueConverter. It will give the numbered cards their face value, the face cards a value of 10, and the Ace a value of 11 (for now).  

			-the value of each hand will be determined by another function: computeHandValue.

				-since the "Ace" card can hold the value of either 11 or 1, the game will need to determine which value is more useful:

				function computeHandValue(userHand) {
					the value equals zero
					for each index passed in, value equals itself plus that index
					return the total of all indeces
				}

			-the stand button will trigger a compareHands function that will compare playerHandValue to dealerHandValue:

				function compareHands {
					if playerHandValue is greater than dealerHandValue
					update message board to display "You Won!"
				} else update message board to display "The house always wins."

		5. As a user, I want to know when I bust.

			-a "bust" occurs when the player "hits" and the value of their hand goes over 21. Because the Ace can have a value of 1 if your hand is over 21, we will need to take this into account when there is a "bust". We can assume that if the player has a hand that contains an "Ace" AND is over 21, they will choose to reassign the "Ace" value to 1, and the game will have to do that for them.
			
			-we will use the same computeHandValue function as before, but this time we will need to check for the "Ace"

			-in the controller, we will call the computeHandValue() after each 'hit' and check it against 21:

				if playerHandValue > 21 AND card.value is "A" {
					card.value is changed to 1
					computeHandValue is called again
				} 

			-

		6. As a user, I want to have the ability to submit a wager.

			-we will hardcode a button and textbox into the html.

			-both button and textbox will be stored in global variables.

			-there will be an event listener for a click, which will update a global variable called 'wager' in the controller:

				on submit wager button click {
					wager will equal value typed into textbox
					}
		
		As a user, I want to see the dealer's cards (1 up, 1 down)
		I want to see my cards (2 up)
		I want to be able to see how much money I have to play with
	Version 2
		I want to have the option to double down
		I want to have the option to split my hand
		I want the cards to look like real playing cards
	Version 3
		I want to implement a multiplayer option
        