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
 * @returns whether or not save was successful (boolean)
 */
const saveGame = function(saveGameName) {
    //Confirm to overwrite save if saveGameName is already used
    if(getSavedGames().includes(saveGameName))
        if(!confirm(`${saveGameName} is an existing save name. Do you want to overwrite?`))
            return false;
    
    
    let existingSaves = JSON.parse(localStorage.getItem("savedGames"));
    newSave = {};
    newSave.compL = completedLevels;
    newSave.currL = currentLevel;
    newSave.wordF = wordsFound;
    newSave.currP = currentPoints;
    existingSaves[saveGameName] = newSave;

    localStorage.setItem("savedGames", JSON.stringify(existingSaves));
    blockPage(disappear = true, `"${saveGameName}" has been saved.`, "💾", ["🥰", "💕", "😘", "💞", "😍"]);
    return true;
}

/**
 * Load a game given the identifier of the save game.
 * @param {*} saveGameName - identifier of the save game
 */
const loadGame = function(saveGameName) {
    if(!getSavedGames().includes(saveGameName)) {
        blockPage(disappear = true, `"${saveGameName}" is not a valid save game!`, "❌", ["😔", "😭", "💔", "😞", "😖"]);
        return;
    }
    
    let saveToLoad = JSON.parse(localStorage.getItem("savedGames"))[saveGameName];
    let gameVariables = JSON.parse(sessionStorage.getItem("gameVariables"));

    if(!gameVariables) {
        gameVariables = {};
        gameVariables.completedLevels = {};
    }
    
    gameVariables.completedLevels.easy = saveToLoad.compL.easy;
    gameVariables.completedLevels.medium = saveToLoad.compL.medium;
    gameVariables.completedLevels.hard = saveToLoad.compL.hard;
    gameVariables.currentLevel = saveToLoad.currL;
    gameVariables.wordsFound = saveToLoad.wordF;
    gameVariables.currentPoints = saveToLoad.currP;

    sessionStorage.setItem("gameVariables", JSON.stringify(gameVariables));

    blockPage(disappear = true, `"${saveGameName}" will be loaded...`, "💾", ["🥰", "💕", "😘", "💞", "😍"]);

    window.setTimeout(()=>window.location= "./text-twist.html", 750);
}

/**
 * Fetch high scores from save games
 */
const getHighscores = function() {
    
    let saves = JSON.parse(localStorage.getItem("savedGames"));
    let highscores = {};    

    for(let save in saves) {
        let score = 0;
        for(let level of saves[save].compL.easy)
            score = score + level.goalScore;
        for(let level of saves[save].compL.medium)
            score = score + level.goalScore;
        for(let level of saves[save].compL.hard)
            score = score + level.goalScore;
        highscores[save] = score + saves[save].currP;
    }

    console.log(Object.fromEntries(
    Object.entries(highscores).sort(([, value1], [, value2]) => value2 - value1)
    ))
}