// console.log(cards);
const cards = document.querySelectorAll('.card');
let background = document.querySelector('.background');
let hasCardFlipped = false;
let boardLock = false;
let firstCard;
let secondCard;
let count = 0;

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
	if (count === 6) {
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

(function shuffle() {
	cards.forEach((card) => {
		let randomPosition = Math.floor(Math.random() * 12);
		card.style.order = randomPosition;
	});
})();

cards.forEach((card) => card.addEventListener('click', flipCard));
