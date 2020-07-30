// console.log(cards);
const cards = document.querySelectorAll('.card');
let background = document.querySelector('.background');
let carButton = document.querySelector('.lilBug');
const cardsFront = document.querySelectorAll('.car-fr');
let cardsFrontArray = [ ...cardsFront ];
let hasCardFlipped = false;
let boardLock = false;
let firstCard;
let secondCard;
let count = 0;
let start = false;
let win;
let intervalId;

console.log(cardsFront, cardsFrontArray);
/////////  nav  ///////////

const hamburger = {
	navToggle: document.querySelector('.nav-toggle'),
	nav: document.querySelector('nav'),

	doToggle: function(e) {
		e.preventDefault();
		this.navToggle.classList.toggle('expanded');
		this.nav.classList.toggle('expanded');
	}
};
hamburger.navToggle.addEventListener('click', function(e) {
	hamburger.doToggle(e);
});
hamburger.nav.addEventListener('click', function(e) {
	hamburger.doToggle(e);
});

/////////  game ///////////

function flipCard() {
	if (boardLock) return;
	if (this === firstCard) return;
	// this.classList.toggle('flip');
	this.classList.add('flip');

	if (!hasCardFlipped) {
		hasCardFlipped = true;
		firstCard = this;
		return;
	}
	// console.log(hasCardFlipped, firstCard);

	secondCard = this;
	// console.log(firstCard, secondCard);
	checkForMatch();
}
//do cards match?
function checkForMatch() {
	let isMatch = firstCard.dataset.image === secondCard.dataset.image;

	isMatch ? cardsMatch() : cardsDontMatch();
}

function cardsMatch() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);

	count++;
	if (count === 2) {
		flashBackground();
		// start = false;
	}

	resetBoard();
}

function flashBackground() {
	let cardsArray = Array.from(cards);
	setTimeout(function() {
		for (i = 0; i < cardsArray.length; i++) {
			// for (i = 0; i < cardsFrontArray.length; i++) {
			cardsArray[i].children[0].classList.add('show-background');
			// cardsFrontArray[i].children[0].classList.add('show-background');
			background.classList.add('z-up');
		}
	}, 1000);
	setTimeout(function() {
		for (i = 0; i < cardsArray.length; i++) {
			// for (i = 0; i < cardsFrontArray.length; i++) {
			cardsArray[i].children[0].classList.remove('show-background');
			// cardsFrontArray[i].children[0].classList.remove('show-background');
		}
	}, 10000);
}

function cardsDontMatch() {
	boardLock = true;
	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');
		resetBoard();
	}, 1500);
}

function resetBoard() {
	[ hasCardFlipped, boardLock ] = [ false, false ];
	[ firstCard, secondCard ] = [ null, null ];
}

// (function shuffle() {
// 	cards.forEach((card) => {
// 		let randomPosition = Math.floor(Math.random() * 12);
// 		card.style.order = randomPosition;
// 	});
// })();

function shuffle() {
	cardsFrontArray.forEach((card) => {
		let randomPosition = Math.floor(Math.random() * 12);
		card.style.order = randomPosition;
		// if (card.classList.contains('flip')) {
		// 	card.classList.remove('flip');
		// }
	});
}

carButton.addEventListener('click', (event) => {
	cards.forEach((card) => {
		if (card.classList.contains('flip')) {
			card.classList.remove('flip');
			count = 0;
			resetBoard();
		}
	});
	if (carButton) {
		shuffle();
	}
	// 	}
});

function winGame() {
	flashBackground();
	start = false;
	win = true;
}

cards.forEach((card) => card.addEventListener('click', flipCard));
