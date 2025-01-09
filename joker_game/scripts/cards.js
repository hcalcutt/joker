const cardContainer = document.getElementById('card-container');
const shuffleBtn = document.getElementById('shuffle-btn');

const suits = ['hearts', 'spades', 'diamonds', 'clubs'];
const values = [ '5', '6', '7', '2', '3', '4', '8', '9', '10', 'J', 'Q', 
'K', 'A', 'joker1', 'joker2'];

// Function to generate a random card back
function getRandomCardBack() {
    const cardBackIndex = Math.floor(Math.random() * 5) + 1; // Assuming 5 
card back images
    return `./images/card_backs/back${cardBackIndex}.jpg`;
}

// Function to shuffle the cards
function shuffleCards() {
    const deck = [];
    suits.forEach(suit => {
        values.forEach(value => {
            deck.push({
                front: `./images/card_fronts/${suit}${value}.jpg`,
                back: getRandomCardBack(),
            });
        });
    });
    return deck.sort(() => Math.random() - 0.5);
}

// Function to render cards
function renderCards(deck) {
    cardContainer.innerHTML = '';
    deck.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `
            <div class=\"card-inner\">
                <div class=\"card-front\">
                    <img src=\"${card.front}\" alt=\"Card Front\">
                </div>
                <div class=\"card-back\" style=\"background-image: 
url('${card.back}')\"></div>
            </div>
        `;
        cardContainer.appendChild(cardElement);
    });
}

// Shuffle and render on button click
shuffleBtn.addEventListener('click', () => {
    const shuffledDeck = shuffleCards();
    renderCards(shuffledDeck);
});

// Initial shuffle and render
const initialDeck = shuffleCards();
renderCards(initialDeck);

