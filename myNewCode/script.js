let cards = document.querySelectorAll('.card');
cards = [ ...cards ];

let background = document.querySelector('.background');
let carButton = document.querySelector('.lilBug');
const cardsFront = document.querySelectorAll('.car-fr');
const body = document.querySelector('body');
matchedCards = document.querySelectorAll('.match');
let cardsFrontArray = [ ...cardsFront ];
let hasCardFlipped = false;
let boardLock = false;
let firstCard;
let secondCard;
let count = 0;
let start = false;
let win;
let cardsFlipped = [];

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

// document.body.onload = startGame();

function startGame() {
	//shuffle cards

	cardsFlipped = [];
	shuffle();
	cards.forEach((card) => {
		card.classList.remove('show', 'open', 'match', 'disabled');
	});

	cards.forEach((card) => {
		card.addEventListener('click', displayCard);
	});
}

function shuffle() {
	cards.forEach((card) => {
		let randomPosition = Math.floor(Math.random() * 12);
		card.style.order = randomPosition;

		// if (card.classList.contains('flip')) {
		// card.classList.remove('flip');
		// }
	});
}
function displayCard() {
	this.classList.toggle('open');
	this.classList.toggle('show');
	this.classList.toggle('disabled');
}

function cardFlip() {
	cardsFlipped.push(this);
	if (cardsFlipped.length === 2) {
		let isMatch = cardsFlipped[0].dataset.image === cardsFlipped[1].dataset.image;
		isMatch ? cardsMatch() : cardsDontMatch();
	}
}

function cardsMatch() {
	cardsFlipped[0].classList.add('match', 'disabled');
	cardsFlipped[1].classList.add('match', 'disabled');
	cardsFlipped[0].classList.remove('show', 'open');
	cardsFlipped[1].classList.remove('show', 'open');

	// count++;
	// if (count === 2) {
	// 	flashBackground();
	// 	// playGame();
	// }
	cardsFlipped = [];

	// resetBoard();
}

function cardsDontMatch() {
	cardsFlipped[0].classList.add('unmatched');
	cardsFlipped[1].classList.add('unmatched');
	disable();
	// boardLock = true;
	setTimeout(() => {
		cardsFlipped[0].classList.remove('show', 'open', 'unmatched');
		cardsFlipped[1].classList.remove('show', 'open', 'unmatched');
		enable();
		cardsFlipped = [];
		// resetBoard();
	}, 1500);
}

const disable = () => {
	cards.filter((card) => {
		card.classList.add('disabled');
	});
};

const enable = () => {
	cards.filter((card) => {
		card.classList.remove('disabled');
		matchedCards.forEach((card) => {
			card.classList.add('disabled');
		});
	});
};

cards.forEach((card) => {
	card.addEventListener('click', cardFlip);
	card.addEventListener('click', displayCard);
});
//
