const endScore = localStorage.getItem("endScore");
const finalScore = document.getElementById("finalScore");
const playerName =  localStorage.getItem("playerName");
const selectedTopic = localStorage.getItem("selectedTopic");
const maxQuestions = localStorage.getItem("maxQuestions");

finalScore.innerText = playerName + ", you chose the topic " + selectedTopic + " and got " + endScore + " out of " + maxQuestions + " questions correct";

startOver = e => {
	window.location.assign("index.html");
	e.preventDefault();
}