const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice"));
const progressBarFill = document.getElementById("progressBarFill");
const topicText = document.getElementById("topicText");

const playerName = localStorage.getItem("playerName");
const selectedTopic = localStorage.getItem("selectedTopic");

topicText.innerText = selectedTopic;

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questionList = [

	{
		question: "How many oscars did the Titanic movie got?",
		choice1: "6",
		choice2: "11",
		choice3: "13",
		choice4: "7",
		topic: "Film/TV",
		answer: 2
	},
	{
		question: "Who did play the role of Peter Pan in the Peter Pan movie?",
		choice1: "Johnny Depp",
		choice2: "Tom Hanks",
		choice3: "Robin Williams",
		choice4: "Mel Gibson",
		topic: "Film/TV",
		answer: 3
	},
	{
		question: "Who is the protagonist in the Last Action Hero film?",
		choice1: "Arnold Schwarzenegger",
		choice2: "Tom Cruise",
		choice3: "Jackie Chan",
		choice4: "Sylvester Stallone",
		topic: "Film/TV",
		answer: 1
	},
	{
		question: "What is the name of the little dragon in the animated movie Mulan?",
		choice1: "Goku",
		choice2: "Jet Li",
		choice3: "Mushu",
		choice4: "Pikachu",
		topic: "Film/TV",
		answer: 3
	},

	{
		question: "Who was the first president of the USA?",
		choice1: "Abraham Lincoln",
		choice2: "George Washington",
		choice3: "Edward Norton",
		choice4: "Lil Wayne",
		topic: "History",
		answer: 2
	},
	{
		question: "What was the former name of New York?",
		choice1: "Newport",
		choice2: "Little London",
		choice3: "New Amsterdam",
		choice4: "Georgetown",
		topic: "History",
		answer: 3
	},
	{
		question: "What was the name of the Protestant revolution against the domination of the Pope?",
		choice1: "Reformation",
		choice2: "The Luther rebellion",
		choice3: "Reconquista",
		choice4: "The Christian wars",
		topic: "History",
		answer: 1
	},
	{
		question: "Which city was the capital of Australia from 1901 to 1927?",
		choice1: "Adelaide",
		choice2: "Wellington",
		choice3: "Sydney",
		choice4: "Melbourne",
		topic: "History",
		answer: 4
	},
	{
		question: "Which country was formerly called Ceylon?",
		choice1: "Nepal",
		choice2: "Sri Lanka",
		choice3: "India",
		choice4: "Bangladesh",
		topic: "History",
		answer: 2
	},

	{
		question: "Which country did once have the name Rhodesia?",
		choice1: "Botswana",
		choice2: "Mali",
		choice3: "Uganda",
		choice4: "Zimbabwe",
		topic: "Geography",
		answer: 4
	},
	{
		question: "What is the largest state of the United States?",
		choice1: "Alaska",
		choice2: "Texas",
		choice3: "North Dakota",
		choice4: "Nevada",
		topic: "Geography",
		answer: 1
	},
	{
		question: "How many continents are there?",
		choice1: "5",
		choice2: "6",
		choice3: "7",
		choice4: "4",
		topic: "Geography",
		answer: 3
	},
	{
		question: "What is the longest river in Europe?",
		choice1: "Dnieper",
		choice2: "Daugava",
		choice3: "Elbe",
		choice4: "Volga",
		topic: "Geography",
		answer: 4
	},
	{
		question: "Which is the largest desert on earth?",
		choice1: "Sahara",
		choice2: "Gobi",
		choice3: "Kalahari",
		choice4: "Karakum",
		topic: "Geography",
		answer: 1
	},
	{
		question: "Through which capital does the Liffey river flow?",
		choice1: "Dublin",
		choice2: "Glasgow",
		choice3: "Paris",
		choice4: "Amsterdam",
		topic: "Geography",
		answer: 1
	},

	{
		question: "In which sport can you win the Davis Cup?",
		choice1: "Basketball",
		choice2: "Tennis",
		choice3: "Snooker",
		choice4: "Rugby",
		topic: "Sports",
		answer: 2
	},
	{
		question: "How long is an Olympic swimming pool?",
		choice1: "50",
		choice2: "25",
		choice3: "75",
		choice4: "100",
		topic: "Sports",
		answer: 1
	},
	{
		question: "Which car won Fernando Alonso his first tittle in Formula 1 with?",
		choice1: "Ferrari",
		choice2: "McLaren",
		choice3: "Renault",
		choice4: "BMW",
		topic: "Sports",
		answer: 3
	},
	{
		question: "What is the nickname of the Belgian national soccer team?",
		choice1: "The Red Fury",
		choice2: "Kiwis",
		choice3: "The Rainbow Warriors",
		choice4: "The Red Devils",
		topic: "Sports",
		answer: 4
	}
];

let questions = questionList.filter(function(questionList) {
			return questionList.topic == selectedTopic;
		});

const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 4;

localStorage.setItem('maxQuestions', MAX_QUESTIONS);

startGame = () => {
	questionCounter = 0;
	score = 0;
	availableQuestions = [...questions];

	getNewQuestion();
}

getNewQuestion = () => {
	if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
		localStorage.setItem("endScore", score);
		return window.location.assign("end.html");
	}

	questionCounter++;

	const questionIndex = Math.floor(Math.random() * availableQuestions.length);
	currentQuestion = availableQuestions[questionIndex];
	question.innerText = currentQuestion.question;

	choices.forEach( choice => {
		const number = choice.dataset["number"];
		choice.innerText = currentQuestion["choice" + number];
	});

	availableQuestions.splice(questionIndex, 1);

	acceptingAnswers = true;
}

choices.forEach( choice => {
	choice.addEventListener( "click", e => {
		if(!acceptingAnswers) return;

		acceptingAnswers = false;
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset["number"];

		const styleToApply = selectedAnswer == currentQuestion.answer ? "#28a745" : "#dc3545";

		if(styleToApply === "#28a745") {
			incrementScore(CORRECT_BONUS);
		}

		selectedChoice.style.backgroundColor = styleToApply;

		setTimeout( () => {
			selectedChoice.style.backgroundColor = "#17a2b8";
			getNewQuestion();
		}, 1000);

		progressBarFill.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
	})
});

incrementScore = num => {
	score += num;
}

startGame();
