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

function startGame() {
	//shuffle cards
	let shuffledImages = shuffle(imgElementsArray);

	for (i = 0; i < shuffledImages.length; i++) {
		//remove all images from previous games from each card (if any)
		cardElements[i].innerHTML = '';

		//add the shuffled images to each card
		cardElements[i].appendChild(shuffledImages[i]);
		cardElements[i].type = `${shuffledImages[i].alt}`;

		//remove all extra classes for game play
		cardElements[i].classList.remove('show', 'open', 'match', 'disabled');
		cardElements[i].children[0].classList.remove('show-img');
	}

	//listen for events on the cards
	for (let i = 0; i < cardElementsArray.length; i++) {
		cardElementsArray[i].addEventListener('click', displayCard);
	}

	//when game starts show all the cards for a split second
	flashCards();

	//reset moves
	moves = 0;
	counter.innerText = `${moves} move(s)`;
	//reset star rating
	for (let i = 0; i < starElementsArray.length; i++) {
		starElementsArray[i].style.opacity = 1;
	}

	//Reset Timer on game reset
	timer.innerHTML = '0 mins 0 secs';
	clearInterval(interval);
}
