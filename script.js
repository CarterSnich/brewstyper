const phrases = [
	"oh so were feeding the whole goddamn neighborhood are we",
	"i beg your pardon kayla but if you could avert your eyes from the crevice of my rump i would just be over joyous for your patronage",
	"michael get your ass in here youre getting ten across the ass",
	"super amazing one of a kind jaw dropping holy shit hay ride super duper mega monster holy hell corn maze",
	"bitter bear gets a bitter divorce planned parenthood blues substance abuse sally",
	"a fifth of scotch a day keeps your family away i didnt hit you the belt did learn how to knock eric",
	"methamphetamine shmethamphetamine grandpas probably gonna die if i cant have her nobody can",
	"how to poop when youre poor what to wipe with what to flush with",
	"roses are red violets are blue i used to play with toys now i shoot smack",
	"one of this days little babies imma eat cha one of this days",
	"i said i kissed your sister last night while you are spooning that goddamn paint roller",
	"bitch you only talk to me when you need something you should got the corn dog dumbass",
	"titties and beer titties and beer titties and beer titties and beer titties and beer",
	"filled with fuckin trading with pokemon cards and talking about pokemon cards and pokemon cards and more fuckin pokemon cards",
	"ima twenty two yr ol big butty weman adn im lukin for big butty biches to takl to",
	"i know you are but what am i i know you are but what am i i know you are but what am i betch",
	"yo might as well fuckin throw this thing in the garbage can yoyo",
	"sometimes your brain is just stupid i guess i dont know what do i look like a doctor",
	"just got on the boat jerry rum thatll be sure to put your dick in the dirt",
	"what the hell is that is it the russians are the russians attacking",
	"jesus christ michael i am so sick of looking at your stupid fuckin face you know that with your dumb haircut and your stupid scottin pipin jersey",
	"his glasses he cant see without his glasses",
	"im gonna get you im gonna suck you silly",
	"uno dos trees cuatro sinko says siete ouch nine catorce",
	"pico de gallo por favor grassy ass la biblioteca es roja",
	"new york city california americaland",
	"i wanted to rip out all your teeth with pliers after thirty seconds of this video",
	"alright alright alright alright alright alright alright alright alright alright alright alright alright alright",
	"so when you turn down that street just ah keep going until you see the ahh stupid ass cotton blue drive way you really cant miss it",
];

const elMain = document.querySelector("main")
const elTimeDisplay = document.getElementById("time-display")
const elTyper = document.getElementById("typer");
const elText = document.getElementById("text");
const elDuration = document.getElementById("duration");
const elCharacterCount = document.getElementById("character-count");
const elCorrectCount = document.getElementById("correct-count");
const elMistakeCount = document.getElementById("mistake-count");
const elAccuracy = document.getElementById("accuracy");
const elPlayAgain = document.getElementById("play-again");
const elRandomPhrase = document.getElementById("random-phrase")

let phrase;
let index = 0;
let startTime;
let endTime;
let timeDisplayDaemon;

elTyper.addEventListener("keydown", function (e) {
	let timeOfPress = new Date();

	if (e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode == 32 || e.keyCode == 8) {
		if (e.keyCode == 8 && index == 0) return
			
		if (index == 0) {
			startTime = timeOfPress;
			timeDisplayDaemon = setInterval(() => {
				const currentTime = new Date();
				elTimeDisplay.innerText = `${currentTime - startTime}ms`;
			}, 10);
		}

		if (e.keyCode == 8) {	
			if (index) {
				elText.children[index].classList.remove("current");
				index--;
				elText.children[index].classList.add("current");
			}
			return;
		}
	
		if(elText.children[index].textContent == e.key) {
			elText.children[index].classList.remove("wrong");
			elText.children[index].classList.add("correct");
		} else {
			elText.children[index].classList.add("wrong");
			elText.children[index].classList.remove("correct");
		}
		
		elText.children[index].classList.remove("current");
		index++;
			
		if (index >= phrase.length) {
			endTime = timeOfPress;
			clearInterval(timeDisplayDaemon);

			const correctCount = document.querySelectorAll("span.correct").length;
			const wrongCount = document.querySelectorAll("span.wrong").length;
			const totalCount = correctCount + wrongCount;
			
			elDuration.innerText = `${endTime - startTime}ms`;
			elCharacterCount.innerText = phrase.length;
			elCorrectCount.innerText = correctCount;
			elMistakeCount.innerText = wrongCount;
			elAccuracy.innerText = `${Math.round(((correctCount / phrase.length) * 100) * 100) / 100}%`;
			elMain.classList.add("show-results");
			elPlayAgain.disabled = false
			elTyper.blur();
		} else {
			elText.children[index].classList.add("current");
		}
	}
});

elPlayAgain.addEventListener("click", reset);

elRandomPhrase.addEventListener("click", reset)

function randomPhrase() {
	const randomInteger = (function (min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	})(0, phrases.length - 1);

	return phrases[randomInteger]
}

function updatePhrase() {
	for (let i  = 0; i < phrase.length; i++) {
		const span = document.createElement("span");
		if (i == 0) span.classList.add("current");
		span.textContent = phrase[i];
		elText.appendChild(span);
	}
}

function reset() {
	clearInterval(timeDisplayDaemon);
	index = 0;
	elText.innerHTML = '';
	elTimeDisplay.innerText = "0ms";
	phrase = randomPhrase()
	updatePhrase()
	elMain.classList.remove("show-results")
	elPlayAgain.disabled = true;
	elTyper.focus()
}

(function () {
	phrase = randomPhrase()
	updatePhrase()
	elTyper.focus()
})();



