// console.log(cards);
const cards = document.querySelectorAll('.card');
let background = document.querySelector('.background');
const carButton = document.querySelector('.lilBug');
let hasCardFlipped = false;
let boardLock = false;
let firstCard;
let secondCard;
let count = 0;

//////////// nav functions //////////////

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

//////////// card functions //////////////

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
	});
}

carButton.addEventListener('click', shuffle);

cards.forEach((card) => card.addEventListener('click', flipCard));

// function addShow() {
// 	cards.forEach((card) => {
// 		if(card.flip)
// 			card.classList.remove('flip')
// 		}
// 	}
