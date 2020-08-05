const cards = document.querySelectorAll('.card');
let background = document.querySelector('.background');
let carButton = document.querySelector('.lilBug');
const cardsFront = document.querySelectorAll('.car-fr');
const body = document.querySelector('body');
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
		// playGame();
	}

	resetBoard();
}

function flashBackground() {
	let cardsArray = Array.from(cards);
	setTimeout(function() {
		for (i = 0; i < cardsArray.length; i++) {
			cardsArray[i].children[0].classList.add('show-background');
			background.classList.add('z-up');
		}
	}, 1000);
	setTimeout(function() {
		for (i = 0; i < cardsArray.length; i++) {
			cardsArray[i].children[0].classList.remove('show-background');
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
	cards.forEach((card) => {
		let randomPosition = Math.floor(Math.random() * 12);
		card.style.order = randomPosition;

		// if (card.classList.contains('flip')) {
		// card.classList.remove('flip');
		// }
	});
}

// function shuffle() {
// 	cards.forEach((card) => {
// 		let randomPosition = Math.floor(Math.random() * 12);
// 		card.style.order = randomPosition;
// 	});
// }

// function setFadeIn() {
// 	document.body.className = 'body fade-in';
// 	setTimeout(setFadeOut, 500);
// }

// function setFadeOut() {
// 	document.body.className = 'body';
// }

carButton.addEventListener('click', (event) => {
	setTimeout(() => {
		shuffle();
	}, 500);
	// window.location.reload();
	cards.forEach((card) => {
		if (card.classList.contains('flip')) {
			card.classList.remove('flip');
		}
	});
	// boardLock = false;
	count = 0;
	resetBoard();
});

function winGame() {
	flashColor();
	turnCounter.innerHTML = 'you win!';
	// start = true;
	win = true;
}

// function resetGame() {
// 	location.reload();
// }
// function playGame() {
cards.forEach((card) => card.addEventListener('click', flipCard));
// }
// playGame();
// shuffle();
