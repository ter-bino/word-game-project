const updateLetterButtons = function(letterSet) {
    let newButtons = '';
    letterSet.sort(() => Math.random() - 0.5);
    for(letter of letterSet) {
        newButtons +=
            `<button onclick='clickLetter(this)' value=${letter}>
            ${letter}
            </button>`;
    }
    document.querySelector("#letter-set").innerHTML = newButtons;
}

const updateScoreboard = function() {
    document.querySelector("#current-score").innerHTML = currentPoints;
    document.querySelector("#target-score").innerHTML = currentLevel['goalScore'];
}

const clickLetter = function(letterButton) {
    letterButton.classList.add('used');
    letterButton.disabled = true;
    document.querySelector("#answer-box")["answer"].value += letterButton.value;
}