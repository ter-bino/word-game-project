var easyLevels, mediumLevels, hardLevels;

/**
 * Load all levels from the files:
 * 
 * level_easy.json
 * level_medium.json
 * level_hard.json
 */
const loadLevels = function() {
    $.ajax({
        url: './json/level_easy.json',
        async: false,
        dataType: 'json',
        success: (json) => easyLevels = json
      });
    $.ajax({
        url: './json/level_medium.json',
        async: false,
        dataType: 'json',
        success: (json) => mediumLevels = json
      });
    $.ajax({
        url: './json/level_hard.json',
        async: false,
        dataType: 'json',
        success: (json) => hardLevels = json
    });
};
loadLevels();

/**
 * Gets a random level from all avaialable levels
 * 
 * @param {*} difficulty of the level to get
 * @returns a level object
 */
const getRandomLevel = function(difficulty) {
    switch(difficulty.toLowerCase()) {
        case "easy":
            return easyLevels[Math.floor(Math.random() * easyLevels.length)];
        case "medium":
            return mediumLevels[Math.floor(Math.random() * mediumLevels.length)];
        case "hard":
            return hardLevels[Math.floor(Math.random() * hardLevels.length)];
    }
}