const cardDictionary = {
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
let userHand = []
let dealerHand = []
let bank = 300
let wager, userHandValue, dealerHandValue, gameDeck
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
        for (var i = this.cards.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }

    deal() {
        return this.cards.pop()
    }
}

const initialize = () => {
    gameDeck = new Deck
    wager = 0
    console.log("Please submit a wager")
    return gameDeck.shuffle()
}

const controller = () => {
    if (!gameStarted) {
        initialize()
    }
    hitButton.addEventListener("click", () => {
        userHand.push(gameDeck.deal())
        console.log(userHand)
        userHandValue = computeHandValue(userHand)
        checkForBust(userHand)
    })
    standButton.addEventListener("click", () => {
        if (dealerHandValue >= 17) {
            compareHands(userHand, dealerHand)
        } else {
            dealerHand.push(gameDeck.deal())
            dealerHandValue = computeHandValue(dealerHand)
            console.log(dealerHand)
            checkForDealerBust(dealerHand)
        }
    })
    submitWager.addEventListener("click", () => {
        wager = parseInt(wagerBox.value)
        bank -= wager
        bankP.innerText = `Bank: $${bank}`
        console.log(`wager: ${wager}`)
        userHand.push(gameDeck.deal())
        dealerHand.push(gameDeck.deal())
        userHand.push(gameDeck.deal())
        dealerHand.push(gameDeck.deal())
        dealerHandValue = computeHandValue(dealerHand)
        userHandValue = computeHandValue(userHand)
        console.log(userHand)
        console.log(dealerHand)
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

function computeHandValue(hand) {
    let hasAce = hand.some(x => x.value === "A")
    handValue = 0
    hand.forEach(index => {
       handValue += cardDictionary[index.value]
    })
    if (handValue > 21 && hasAce) {
        cardDictionary["A"] = 1
        handValue = 0
        hand.forEach(index => {
            handValue += cardDictionary[index.value]
         })
    }
    return handValue
}

function checkForDealerBust(hand) {
    computeHandValue(hand)
    if(handValue > 21) {
        console.log("The dealer busted, you win!")
        bank += (wager * 2)
        bankP.innerText = `Bank: $${bank}`
        newRound()
    } else if (handValue <= 21 && handValue >= 17) {
        compareHands(userHand, dealerHand)
    } else {
        dealerHand.push(gameDeck.deal())
        console.log(dealerHand)
        checkForDealerBust(hand)
    }
}

function checkForBust(hand) {
    computeHandValue(hand)
    if (handValue > 21) {
        console.log("Bust, you lose")
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
            console.log("Blackjack! House pays 3:2")
            newRound()
        } else {
            console.log(`${computeHandValue(userHand)} beats ${computeHandValue(dealerHand)}. You Win!`)
            bank += (wager * 2)
            bankP.innerText = `Bank: $${bank}`
            newRound()
            }
    } else if (computeHandValue(userHand) < computeHandValue(dealerHand)) {
        console.log(`${computeHandValue(dealerHand)} beats ${computeHandValue(userHand)}. The house always wins.`)
        newRound()
    } else if (computeHandValue(userHand) === computeHandValue(dealerHand)) {
        console.log("Push")
        bank += wager
        bankP.innerText = `Bank: $${bank}`
        newRound()
    }
}

function checkForBlackjack(hand) {
    computeHandValue(hand)
    if (handValue === 21) {
        blackjack = true
    } else return
}

function newRound() {
    userHand = []
    dealerHand = []
    gameStarted = true
    initialize()
}