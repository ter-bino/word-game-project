const wordsByLetter = {};

categorizeWords = function(words) {
    for (const word in words) {
        if (words.hasOwnProperty(word)) {
            if(word.length <3) continue;
            const firstLetter = word.charAt(0).toUpperCase();
        
            // Create an array for the first letter if it doesn't exist
            if (!wordsByLetter[firstLetter]) {
                wordsByLetter[firstLetter] = [];
            }
        
            // Push the word into the corresponding array
            wordsByLetter[firstLetter].push(word);
        }
    }
}

$.ajax({
    url: './json/english_words.json',
    async: false,
    dataType: 'json',
    success: (json) => {categorizeWords(json)}
});