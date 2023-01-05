const cardDictionary = {
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 10,
    "Q": 10,
    "K": 10,
    "A": 11
}
const suits = ["♠", "♦", "♣", "♥"]
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
const hitButton = document.getElementById("hit")
const standButton = document.getElementById("stand")
const submitWager = document.getElementById("submit-wager")
const wagerBox = document.getElementById("wager")
const bankP = document.getElementById("bank")
const userContainer = document.getElementById("user-container")
const dealerContainer = document.getElementById("dealer-container")
const gameBoard = document.getElementById("game-board")
const messageBoard = document.getElementById("message-board")
let message = document.createElement("h2")
let userHand = []
let dealerHand = []
let bank = 300
let wager, userHandValue, dealerHandValue, gameDeck, handValue, numberOfAces
let blackjack = false
let gameStarted = false

class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }
}

class Deck {
    constructor(cards = newDeck()) {
        this.cards = cards
    }

    // implementing durstenfeld shuffle algorithm here (https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }

    deal() {
        return this.cards.pop()
    }
}

const initialize = () => {
    gameDeck = new Deck()
    wager = 0
    return gameDeck.shuffle()
}

const controller = () => {
    if (!gameStarted) {
        initialize()
    }
    hitButton.disabled = true
    standButton.disabled = true
    appendMessage("Please submit a wager")
    hitButton.addEventListener("click", () => {
        userHand.push(gameDeck.deal())
        appendCard(userHand[userHand.length - 1], userContainer)
        userHandValue = computeHandValue(userHand)
        checkForBust(userHand)
    })
    standButton.addEventListener("click", () => {
        document.querySelector(".card").innerText = dealerHand[0].value
        if (dealerHandValue >= 17) {
            compareHands(userHand, dealerHand)
        } else {
            dealerHand.push(gameDeck.deal())
            appendCard(dealerHand[dealerHand.length - 1], dealerContainer)
            dealerHandValue = computeHandValue(dealerHand)
            checkForDealerBust(dealerHand)
        }
    })
    submitWager.addEventListener("click", () => {
        if (wagerBox.value === "") {
            wager = 0
        } else {
            wager = parseInt(wagerBox.value)
        }
        if (wager < 0 || wager > bank) {
            appendMessage("Your wager is invalid, try again.")
        } else {
            hitButton.disabled = false
            standButton.disabled = false
            submitWager.disabled = true
            removeCards(dealerContainer)
            removeCards(userContainer)
            bank -= wager
            bankP.innerText = `Bank: $${bank}`
            userHand.push(gameDeck.deal())
            dealerHand.push(gameDeck.deal())
            userHand.push(gameDeck.deal())
            dealerHand.push(gameDeck.deal())
            dealerHandValue = computeHandValue(dealerHand)
            userHandValue = computeHandValue(userHand)
            appendCard(userHand[0], userContainer)
            appendCard(userHand[1], userContainer)
            appendCard(dealerHand[0], dealerContainer)
            appendCard(dealerHand[1], dealerContainer)
            document.querySelector(".card").innerText = ""
            appendMessage("")
        }
    })
}

controller()

function newDeck() {
    return values.flatMap(value => {
        return suits.map(suit => {
            return new Card(suit, value)
        })
    })
}

function checkForDealerBust(hand) {
    computeHandValue(hand)
    if(handValue > 21) {
        checkForBlackjack(userHand)
        if (blackjack) {
            appendMessage("The dealer busted, and you have Blackjack! House pays 3:2. Submit a wager to play again.")
            bank += (wager * 2)
            bankP.innerText = `Bank: $${bank}`
            newRound()
        } else {
            appendMessage("The dealer busted, you win! Submit a wager to play again.")
            bank += (wager * 2)
            bankP.innerText = `Bank: $${bank}`
            newRound()
        }
    } else if (handValue <= 21 && handValue >= 17) {
        compareHands(userHand, dealerHand)
    } else {
        dealerHand.push(gameDeck.deal())
        appendCard(dealerHand[dealerHand.length - 1], dealerContainer)
        checkForDealerBust(hand)
    }
}

function checkForBust(hand) {
    computeHandValue(hand)
    if (handValue > 21) {
        appendMessage("Bust, you lose. Submit a wager to play again.")
        wager = 0
        newRound()
    } else return
}

function compareHands(userHand, dealerHand) {
    checkForBlackjack(userHand)
    if (computeHandValue(userHand) > computeHandValue(dealerHand)) {
        if (blackjack) {
            bank += (wager * 2.5)
            bankP.innerText = `Bank: $${bank}`
            appendMessage("Blackjack! House pays 3:2. Submit a wager to play again.")
            newRound()
        } else {
            appendMessage(`${computeHandValue(userHand)} beats ${computeHandValue(dealerHand)}. You Win! Submit a wager to play again.`)
            bank += (wager * 2)
            bankP.innerText = `Bank: $${bank}`
            newRound()
            }
    } else if (computeHandValue(userHand) < computeHandValue(dealerHand)) {
        appendMessage(`${computeHandValue(dealerHand)} beats ${computeHandValue(userHand)}. The house always wins. Submit a wager to play again.`)
        newRound()
    } else if (computeHandValue(userHand) === computeHandValue(dealerHand)) {
        appendMessage("Push. Submit a wager to play again.")
        bank += wager
        bankP.innerText = `Bank: $${bank}`
        newRound()
    }
}

function checkForBlackjack(hand) {
    computeHandValue(hand)
    if (handValue === 21 && hand.length === 2) {
        blackjack = true
    } else return
}

function newRound() {
    userHand = []
    dealerHand = []
    gameStarted = true
    blackjack = false
    submitWager.disabled = false
    hitButton.disabled = true
    standButton.disabled = true
    initialize()
}

function appendCard(card, container) {
    const newCard = document.createElement('div')
    newCard.innerText = card.value
    newCard.classList.add('card')
    container.appendChild(newCard)
}

function removeCards(container) {
    let cleanupContainer = container.querySelectorAll('.card')
    cleanupContainer.forEach(card => {
        container.removeChild(card)
    })
}

function appendMessage(text) {
    while (messageBoard.firstChild) {
            messageBoard.removeChild(messageBoard.firstChild)
        }
    let message = document.createElement("h2")
    message.classList.add("message")
    message.innerText = text
    messageBoard.appendChild(message)
}

function computeHandValue(hand) {
    handValue = 0
    numberOfAces = 0
    hand.forEach(index => {
       if (index.value === "A") {
        numberOfAces++
       }
       handValue += cardDictionary[index.value]
       if (handValue > 21 && numberOfAces > 0) {
        handValue -= 10
        numberOfAces--
       }
    })
    return handValue
}