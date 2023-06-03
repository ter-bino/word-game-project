var completedLevels = {
    "easy": [],
    "medium": [],
    "hard": [],
    "hasCompleted": function(level) {
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
}

var currentLevel;
var wordsFound = [];
var currentPoints = 0;

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
    } else {alert("All levels are already completed"); return;}
        
    wordsFound = [];
    currentPoints = 0;
    currentLevel = randomLevel;
    updateScoreboard();
    updateLetterButtons(currentLevel['letterSet']);
}

changeCurrentLevel();

const attemptWord = function(word) {
    if(!wordFollowsLetterSet(currentLevel['letterSet'], word)) {
        alert("Invalid selection of characters");
        return;
    }
    if(wordsFound.includes(word))
        alert(`${word} is already found!`);
    else if(word.length > 0 && wordsByLetter[word.charAt(0).toUpperCase()].includes(word)) {
        let pointsEarned = (word.length - 2)*1000;
        wordsFound.push(word);
        currentPoints += pointsEarned;
        updateScoreboard();
        if(currentPoints>=currentLevel['goalScore']) {
            alert(`You have completed this level!`);
            currentPoints = 0;
            completedLevels[currentLevel['difficulty']].push(currentLevel);
            changeCurrentLevel();
        } else {
            alert(`You earned ${pointsEarned} points!`);
        }
    } else {
        alert("Unknown word!")
    }
    updateLetterButtons(currentLevel['letterSet']);
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