// console.log(cards);
const cards = document.querySelectorAll('.card');

let hasCardFlipped = false;
let firstCard;
let secondCard;

function flipCard() {
	this.classList.toggle('flip');

	if (!hasCardFlipped) {
		hasCardFlipped = true;
		firstCard = this;
		// console.log(hasCardFlipped, firstCard);
	} else {
		hasCardFlipped = false;
		secondCard = this;
		console.log(firstCard, secondCard);
		if (firstCard.dataset.image === secondCard.dataset.image) {
			firstCard.removeEventListener('click', flipCard);
			// firstCard.classList.add('hide');
			secondCard.removeEventListener('click', flipCard);
			// secondCard.classList.add('hide');
		} else {
			setTimeout(() => {
				firstCard.classList.remove('flip');
				secondCard.classList.remove('flip');
			}, 1500);
		}
		console.log('hi');
	}
}

cards.forEach((card) => card.addEventListener('click', flipCard));
