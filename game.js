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
const userHand = []
const dealerHand = []

const initialize = () => {
    shuffle(deck)
    dealCards()
}

initialize()

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
    console.log(userHand)
    console.log(dealerHand)
}

function hit() {
    userHand.push(deck.shift())
    computeHandValue(userHand)
}

function computeHandValue(hand) {
    let handValue = 0
    hand.forEach(index => {
        handValue += cardDictionary[index.value]
    })
    return handValue
}

// function checkForBust(hand) {
//     if (computeHandValue(hand) > 21) {
//         hand.
//     }
// }