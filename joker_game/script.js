// Array of card fronts (hearts2.jpg to hearts10.jpg)
const cardFronts = [
    './images/card_fronts/heart2.jpg',
    './images/card_fronts/heart3.jpg',
    './images/card_fronts/heart4.jpg',
    './images/card_fronts/heart5.jpg',
    './images/card_fronts/heart6.jpg',
    './images/card_fronts/heart7.jpg',
    './images/card_fronts/heart8.jpg',
    './images/card_fronts/heart9.jpg',
    './images/card_fronts/heart10.jpg',
  ];
  
  // Array of available back images
  const backImages = [
    './images/card_backs/back1.jpg',
    './images/card_backs/back2.jpg',
    './images/card_backs/back3.jpg',
    './images/card_backs/back4.jpg',
    './images/card_backs/back5.jpg',
    './images/card_backs/back6.jpg',
    './images/card_backs/back7.jpg',
    './images/card_backs/back8.jpg',
  ];
  
  // Flip card function
  function flipCard(card) {
    card.classList.toggle('flipped');
  }
  
  // Shuffle cards function
  function shuffleCards() {
    const container = document.getElementById('cardContainer');
    const cards = Array.from(container.children);
  
    // Reset flipped state
    cards.forEach(cardContainer => {
      const card = cardContainer.querySelector('.card');
      if (card.classList.contains('flipped')) {
        card.classList.remove('flipped');
      }
    });
  
    // Shuffle positions
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      container.appendChild(cards[j]);
    }
  
    // Change back images randomly
    cards.forEach(cardContainer => {
      const backImage = cardContainer.querySelector('.card-back img');
      const randomBackImage = backImages[Math.floor(Math.random() * backImages.length)];
      backImage.src = randomBackImage;
    });
  
    // Add animation effect
    cards.forEach(card => {
      card.style.transform = 'scale(1.1)';
      setTimeout(() => {
        card.style.transform = 'scale(1)';
      }, 200);
    });
  }
  
  // Generate cards dynamically
  function generateCards() {
    const container = document.getElementById('cardContainer');
  
    cardFronts.forEach(frontImage => {
      const cardHtml = `
        <div class="card-container">
          <div class="card" onclick="flipCard(this)">
            <div class="card-face card-front">
              <img src="${frontImage}" alt="Card Front">
            </div>
            <div class="card-face card-back">
              <img src="${backImages[0]}" alt="Card Back">
            </div>
          </div>
        </div>
      `;
      container.innerHTML += cardHtml;
    });
  }
  
  // Initialize cards on page load
  generateCards();
  