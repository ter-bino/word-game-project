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

const shuffleLetterButtons = function(letterWrapperID) {
    let letterWrapperObj = document.getElementById(letterWrapperID);
    let existingButtons = Array.from(letterWrapperObj.children);
    existingButtons.sort(() => Math.random() - 0.5);
    existingButtons.forEach(element => {
        letterWrapperObj.appendChild(element);
    });
}

const resetLetterButtons = function (letterWrapperID) {
    let letterWrapperObj = document.getElementById(letterWrapperID);
    let letters = letterWrapperObj.children;
    for (letterObj of letters) {
        letterObj.classList.remove("used");
        letterObj.disabled = null;
    }
}

const checkFoundWords = function () {
    showPopup('found-words');
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

const showPopup = function (popupIdToShow) {
    let popupId = document.getElementById(popupIdToShow);
    if (popupId) {
        document.getElementById('popup').style.display = "block";
        for (popupChildren of popup.children) {
            popupChildren.style.display = "none";
        }
        popupId.style.display = "block";
    } else {
        alert("Invalid popup ID!");
    }
}

const hidePopup = function () {
    popup = document.getElementById('popup');
    popup.style.display = "none";
    for (popupChildren of popup.children) {
        popupChildren.style.display = "none";
    }
}

function loadSavedGames() {
    var savedGames = document.getElementById("load-game-popup");
    let saves = getSavedGames();
    let loadMenu = '<h1>SELECT SAVE GAME TO LOAD:</h1>';
    for(let save of saves) {
        loadMenu = loadMenu +
        `<a class='button bouncy-button' onclick='loadGame("${save}"); hidePopup();'>${save.toUpperCase()}</a>`
    }
    savedGames.querySelector("div div.menu").innerHTML = loadMenu;
}