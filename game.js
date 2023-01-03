const deck = [
    {value: "2", suit: "♥"},
    {value: "3", suit: "♥"},
    {value: "4", suit: "♥"},
    {value: "5", suit: "♥"},
    {value: "6", suit: "♥"},
    {value: "7", suit: "♥"},
    {value: "8", suit: "♥"},
    {value: "9", suit: "♥"},
    {value: "10", suit: "♥"},
    {value: "J", suit: "♥"},
    {value: "Q", suit: "♥"},
    {value: "K", suit: "♥"},
    {value: "A", suit: "♥"},
    {value: "2", suit: "♦"},
    {value: "3", suit: "♦"},
    {value: "4", suit: "♦"},
    {value: "5", suit: "♦"},
    {value: "6", suit: "♦"},
    {value: "7", suit: "♦"},
    {value: "8", suit: "♦"},
    {value: "9", suit: "♦"},
    {value: "10", suit: "♦"},
    {value: "J", suit: "♦"},
    {value: "Q", suit: "♦"},
    {value: "K", suit: "♦"},
    {value: "A", suit: "♦"},
    {value: "2", suit: "♠"},
    {value: "3", suit: "♠"},
    {value: "4", suit: "♠"},
    {value: "5", suit: "♠"},
    {value: "6", suit: "♠"},
    {value: "7", suit: "♠"},
    {value: "8", suit: "♠"},
    {value: "9", suit: "♠"},
    {value: "10", suit: "♠"},
    {value: "J", suit: "♠"},
    {value: "Q", suit: "♠"},
    {value: "K", suit: "♠"},
    {value: "A", suit: "♠"},
    {value: "2", suit: "♣"},
    {value: "3", suit: "♣"},
    {value: "4", suit: "♣"},
    {value: "5", suit: "♣"},
    {value: "6", suit: "♣"},
    {value: "7", suit: "♣"},
    {value: "8", suit: "♣"},
    {value: "9", suit: "♣"},
    {value: "10", suit: "♣"},
    {value: "J", suit: "♣"},
    {value: "Q", suit: "♣"},
    {value: "K", suit: "♣"},
    {value: "A", suit: "♣"},
]
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
const hitButton = document.getElementById("hit")
const standButton = document.getElementById("stand")
const submitWager = document.getElementById("submit-wager")
const wagerBox = document.getElementById("wager")
const userHand = []
const dealerHand = []
let bank = 300
let wager, userHandValue, dealerHandValue

const initialize = () => {
    shuffle(deck)
    dealCards()
    wager = 0
}

const controller = () => {
    dealerHandValue = computeHandValue(dealerHand)
    userHandValue = computeHandValue(userHand)
    hitButton.addEventListener("click", () => {
        hit(userHand)
        userHandValue = computeHandValue(userHand)
        console.log(userHandValue)
    })
    standButton.addEventListener("click", () => {
        if (dealerHandValue > 17) {
            compareHands(userHand, dealerHand)
        } else {
            hit(dealerHand)
            dealerHandValue = computeHandValue(dealerHand)
            console.log(dealerHandValue)
            checkForDealerBust(dealerHand)
        }
    })
    console.log(`user: ${userHandValue}`)
    console.log(`dealer: ${dealerHandValue}`)
}

initialize()
controller()

// implementing durstenfeld shuffle algorithm here (https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function dealCards() {
    userHand.push(deck.shift())
    dealerHand.push(deck.shift())
    userHand.push(deck.shift())
    dealerHand.push(deck.shift())
}

function hit(hand) {
    hand.push(deck.shift())
    checkForBust(hand)
}

function computeHandValue(hand) {
    handValue = 0
    hand.forEach(index => {
       handValue += cardDictionary[index.value]
    })
    return handValue
}

function checkForDealerBust(hand) {
    computeHandValue(hand)
    if(handValue > 21) {
        console.log("The dealer busted, you Win!")
    } else return
}

function checkForBust(hand) {
    computeHandValue(hand)
    if (handValue > 21) {
        console.log("BUST!")
    } else return
}

function compareHands(userHand, dealerHand) {
    if (computeHandValue(userHand) > computeHandValue(dealerHand)) {
        console.log(`${computeHandValue(userHand)} beats ${computeHandValue(dealerHand)}. You Win!`)
        bank += (wager * 2)
    } else if (computeHandValue(userHand) < computeHandValue(dealerHand)) {
        console.log(`${computeHandValue(dealerHand)} beats ${computeHandValue(userHand)}. The house always wins.`)
    } else {
        console.log("Tie, wager returned.")
        bank += wager
    }
}

function checkForBlackjack(hand) {
    computeHandValue(hand)
    if (handValue === 21) {
        bank += (wager * 1.5)
        console.log("Blackjack!")
    }
}