var completedLevels = {}, currentLevel, wordsFound, currentPoints;

completedLevels.hasCompleted = function(level) {
    for(easy of this['easy'])
        if (easy['id'] == level['id'])
                return true;
    for(medium of this['medium'])
        if (medium['id'] == level['id'])
            return true;
    for(hard of this['hard'])
        if (hard['id'] == level['id'])
            return true;
    return false;
}

/**
 * Method to call to change the current level
 */
const changeCurrentLevel = function() {
    let randomLevel;
    if(completedLevels["easy"].length < easyLevels.length) {
        do{
            randomLevel = getRandomLevel("easy");
        } while(completedLevels.hasCompleted(randomLevel))
        currentLevel = randomLevel;
    } else if(completedLevels["medium"].length < mediumLevels.length) {
        do{
            randomLevel = getRandomLevel("medium");
        } while(completedLevels.hasCompleted(randomLevel))
        currentLevel = randomLevel;
    } else if(completedLevels["hard"].length < hardLevels.length) {
        do{
            randomLevel = getRandomLevel("hard");
        } while(completedLevels.hasCompleted(randomLevel))
        currentLevel = randomLevel;
    } else {
        blockPage(disappear = true, "All levels are<br>already completed!", "💯", ["🥰", "💕", "😘", "💞", "😍"]);
        return;
    }
        
    wordsFound = [];
    currentPoints = 0;
    currentLevel = randomLevel;
    updateScoreboard();
    updateLetterButtons(currentLevel['letterSet']);
    document.querySelector("#current-level").innerHTML = getCurrentLevel();
    updateGameVariables();
}

/**
 * Method to call for a user attempt
 * @param {*} word - user's input
 * @returns null
 */
const attemptWord = function(word) {
    if(!wordFollowsLetterSet(currentLevel['letterSet'], word)) {
        blockPage(disappear = true, "Invalid selection of characters!", "❌", ["😔", "😭", "💔", "😞", "😖"]);
        return;
    }
    if(wordsFound.includes(word))
        blockPage(disappear = true, `${word} is already found!`, "❌", ["😔", "😭", "💔", "😞", "😖"]);
    else if(word.length > 0 && wordsByLetter[word.charAt(0).toUpperCase()].includes(word)) {
        let pointsEarned = (word.length - 2)*1000;
        wordsFound.push(word);
        currentPoints += pointsEarned;
        updateScoreboard();
        if(currentPoints>=currentLevel['goalScore']) {
            blockPage(disappear = true, "You have<br>completed<br>this level!", "💯", ["🥰", "💕", "😘", "💞", "😍"]);
            currentPoints = 0;
            completedLevels[currentLevel['difficulty']].push(currentLevel);
            changeCurrentLevel();
        } else {
            blockPage(disappear = true, `You earned ${pointsEarned} points!`, "🎊", ["🥳", "👏", "🥂", "🎉", "⭐"]);
        }
    } else {
        blockPage(disappear = true, "Unknown word!", "❓", ["😵", "😕", "⁉️", "🤔", "😖"]);
    }
    updateLetterButtons(currentLevel['letterSet']);
    updateGameVariables();
}

/** Cheks if the word uses each letter in the
 * letter set a maximum of one time **/
const wordFollowsLetterSet = function(letterSet, word) {
    const usedLetters = [];
    
    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
    
      // Check if the letter is included in the array
      if (!letterSet.includes(letter)) {
        return false; // Letter not included in the array
      }
    
      // Check if the letter is already used more than once
      if (usedLetters.filter(usedLetter => usedLetter === letter).length >= letterSet.filter(setLetter => setLetter === letter).length) {
        return false; // Letter used more than allowed
      }
    
      usedLetters.push(letter);
    }
    
    return true; // Word is valid
}

/**
 * Method that loads game variables from the sessionStorage
 *  - completedLevels
 *  - currentLevel
 *  - wordsFound
 *  - currentPoints
 * 
 * If the game variables or not yet in sessionStorage, it will
 * be created first.
 */
const loadGameVariables = function() {

    let sessionExists = sessionStorage.getItem("gameVariables") != null;
    //create the game variables if they do not exist in sessionStorage yet
    if(!sessionExists) {
        let gameVariables = {};
        gameVariables.completedLevels = completedLevels;
        gameVariables.completedLevels.easy = [];
        gameVariables.completedLevels.medium = [];
        gameVariables.completedLevels.hard = [];
        gameVariables.currentLevel = null;
        gameVariables.wordsFound = [];
        gameVariables.currentPoints = 0;

        sessionStorage.setItem("gameVariables", JSON.stringify(gameVariables));
    }

    let gameVariables = JSON.parse(sessionStorage.getItem("gameVariables"));
    completedLevels.easy = gameVariables.completedLevels.easy;
    completedLevels.medium = gameVariables.completedLevels.medium;
    completedLevels.hard = gameVariables.completedLevels.hard;
    currentLevel = gameVariables.currentLevel;
    wordsFound = gameVariables.wordsFound;
    currentPoints = gameVariables.currentPoints;

    if(!currentLevel) {
    changeCurrentLevel();
    } else {
    updateScoreboard();
    updateLetterButtons(currentLevel['letterSet']);
    document.querySelector("#current-level").innerHTML = getCurrentLevel();
    }
    
}

/**
 * Updates the game variables in the sessionStorage.
 * 
 * MUST BE CALLED whenever any of the game variables are changed:
 *  - completedLevels
 *  - currentLevel
 *  - wordsFound
 *  - currentPoints
 */
const updateGameVariables = function() {
    let gameVariables = JSON.parse(sessionStorage.getItem("gameVariables"));
    gameVariables.completedLevels.easy = completedLevels.easy;
    gameVariables.completedLevels.medium = completedLevels.medium;
    gameVariables.completedLevels.hard = completedLevels.hard;
    gameVariables.currentLevel = currentLevel;
    gameVariables.wordsFound = wordsFound;
    gameVariables.currentPoints = currentPoints;
    
    sessionStorage.setItem("gameVariables", JSON.stringify(gameVariables));
}

/**
 * Get info on current game level
 * 
 * @returns current game level
 */
const getCurrentLevel = function() {
    return completedLevels.easy.length +
            completedLevels.medium.length +
            completedLevels.hard.length;
}

/**
 * Get info on current level difficulty
 * 
 * @returns current level difficulty
 */
const getCurrentDifficulty = function() {
    return currentLevel.difficulty;
}

loadGameVariables();