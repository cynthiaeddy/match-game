// console.log(cards);
const cards = document.querySelectorAll('.card');

let hasCardFlipped = false;
let boardLock = false;
let firstCard;
let secondCard;

function flipCard() {
	if (boardLock) return;

	if (this === firstCard) return;
	this.classList.toggle('flip');

	if (!hasCardFlipped) {
		hasCardFlipped = true;
		firstCard = this;
		// console.log(hasCardFlipped, firstCard);
	} else {
		hasCardFlipped = false;
		// resetBoard();
		secondCard = this;
		console.log(firstCard, secondCard);
		//do cards match?
		if (firstCard.dataset.image === secondCard.dataset.image) {
			// if cards match do this
			setTimeout(() => {
				// firstCard.removeEventListener('click', flipCard);
				// secondCard.removeEventListener('click', flipCard);
				//or below if want to hide
				firstCard.classList.add('hide');
				secondCard.classList.add('hide');
			}, 1500);
			resetBoard();
			//if cards don't match do this
		} else {
			boardLock = true;
			setTimeout(() => {
				firstCard.classList.remove('flip');
				secondCard.classList.remove('flip');
				// boardLock = false;
				resetBoard();
			}, 1500);
		}
		function resetBoard() {
			hasCardFlipped, (boardLock = [ false, false ]);
			firstCard, (secondCard = [ null, null ]);
		}
	}
}

cards.forEach((card) => card.addEventListener('click', flipCard));
