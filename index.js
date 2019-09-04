const playerName = document.getElementById("playerName");
const topicSelect = document.getElementById("topicSelect");
const startQuizBtn = document.getElementById("startQuizBtn");

startQuizBtn.classList.add("btn-danger");

playerName.addEventListener('keyup', () => {
	formValidation();
})

topicSelect.addEventListener('click', () => {
	formValidation();
})

formValidation = () => {
	if(playerName.value != "" && topicSelect.value != "") {
		startQuizBtn.disabled = false;
		startQuizBtn.classList.remove("btn-danger");
		startQuizBtn.classList.add("btn-success");
	}
}

savePlayerAndTopic = e => {
	localStorage.setItem('playerName', playerName.value);
	localStorage.setItem('selectedTopic', topicSelect.value);
	window.location.assign("quiz.html");
	e.preventDefault();
}