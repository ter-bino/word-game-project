/**
 * This part runs on-load of this js file.
 * Creates the 'savedGames' object in the
 * local storage if it does not exist yet.
 */
if(!localStorage.getItem("savedGames")) {
    localStorage.setItem("savedGames", '{}');
}

/**
 * Returns an array of all the saved game names.
 */
const getSavedGames = function() {
    let saves = localStorage.getItem("savedGames");
    return Object.keys(JSON.parse(saves));
}

/**
 * Adds the current game progress to the savedGames
 * of the localStorage.
 * 
 * @param {*} saveGameName - identifier of the save game
 */
const saveGame = function(saveGameName) {
    //Confirm to overwrite save if saveGameName is already used
    if(getSavedGames().includes(saveGameName))
        if(!confirm(`${saveGameName} is an existing save name. Do you want to overwrite?`))
            return;
    
    
    let existingSaves = JSON.parse(localStorage.getItem("savedGames"));
    newSave = {};
    newSave.compL = completedLevels;
    newSave.currL = currentLevel;
    newSave.wordF = wordsFound;
    newSave.currP = currentPoints;
    existingSaves[saveGameName] = newSave;

    localStorage.setItem("savedGames", JSON.stringify(existingSaves));
}

/**
 * Load a game given the identifier of the save game.
 * @param {*} saveGameName - identifier of the save game
 */
const loadGame = function(saveGameName) {
    if(!getSavedGames().includes(saveGameName)) {
        alert(`${saveGameName} is not a valid save game.`);
        return;
    }

    let saveToLoad = JSON.parse(localStorage.getItem("savedGames"))[saveGameName];
    
    completedLevels = saveToLoad.compL;
    currentLevel = saveToLoad.currL;
    wordsFound = saveToLoad.wordF;
    currentPoints = saveToLoad.currP;

    alert("Loaded ")

    updateScoreboard();
    updateLetterButtons(currentLevel.letterSet);
}