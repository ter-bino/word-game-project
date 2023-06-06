const updateLetterButtons = function(letterSet, shuffle = true, reset = true) {
    let newButtons = '';
    if (shuffle) letterSet.sort(() => Math.random() - 0.5);
    if (reset) {
        for(letter of letterSet) {
            newButtons +=
                `<button onclick='clickLetter(this)' value=${letter}>
                ${letter}
                </button>`;
        }
        document.querySelector("#letter-set").innerHTML = newButtons;
    } else {
        let existingButtons = Array.from(document.querySelector("#letter-set").children);
        existingButtons.sort(() => Math.random() - 0.5);
        existingButtons.forEach(element => {
            document.querySelector("#letter-set").appendChild(element);
        });
    }
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

function showSettingsPopup() {
    var popup = document.getElementById("settings-popup");
    popup.style.display = "block";
}

function hideSettingsPopup() {
    var popup = document.getElementById("settings-popup");
    popup.style.display = "none";
}

function showSaveGamePopup() {
    var popup = document.getElementById("save-game-popup");
    popup.style.display = "block";
}

function hideSaveGamePopup() {
    var popup = document.getElementById("save-game-popup");
    popup.style.display = "none";
}

function showLoadGamePopup() {
    var popup = document.getElementById("load-game-popup");
    let saves = getSavedGames();
    let loadMenu = '<h1>SELECT SAVE GAME TO LOAD:</h1>';
    for(let save of saves) {
        loadMenu = loadMenu +
        `<a class='button bouncy-button' onclick='loadGame("${save}"); hideLoadGamePopup()'>${save.toUpperCase()}</a>`
    }
    popup.querySelector("div div.menu").innerHTML = loadMenu;
    popup.style.display = "block";
}

function hideLoadGamePopup() {
    var popup = document.getElementById("load-game-popup");
    popup.style.display = "none";
}