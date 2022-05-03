/**
 * Testing various implementations of the anagram API
 *
 *  Stefano Gonçalves Simao
 */


/**
 * Endpoint A
 * 
 * @param {string} word1 - A single word
 * @param {string} word2 - A single word
 * @return {Boolean} A boolean that tells us whether or not the two words sent in the body are anagrams
 */

function CheckIfAnagram(word1, word2){

    // check if the input is valid, not null, and not empty
    if(word1 === undefined || word2 === undefined || word1 === null || word2 === null || word1 === '' || word2 === ''){
        return undefined;
    }

    // remove all punctuation from the words
    word1 = word1.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    word2 = word2.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")

    // check if the words are the same length
    if (word1.length != word2.length) {
        return false;
    }

    // sort the characters in each word
    var firstWord = word1.toLowerCase().split('').sort().join('');
    var secondWord = word2.toLowerCase().split('').sort().join('');

    // compare the two words and return the result
    return firstWord === secondWord;
}
//console.log(CheckIfAnagram('Elvis', 'Lives'));

/**
 * Endpoint B
 * 
 * @param {string} word - A single word
 * @param {string} sentence - A sentence
 * @return {string[]} An array containing all unique word anagrams of the word in the sentence
 */

function FindAnagrams(word, sentence){

    // check if the input is valid, not null, and not empty
    if(word === undefined || sentence === undefined || word === null || sentence === null || word === '' || sentence === ''){
        return undefined;
    }

    // split the sentence into an array of words 
    var sentenceArray = sentence.split(' ');

    // create an array to store the anagrams
    var anagrams = [];

    // loop through the array of words
    for(var i = 0; i < sentenceArray.length; i++){

        // check if the anagram is already in the array
        if (anagrams.indexOf(sentenceArray[i]) === -1) {

            /// check if the word is an anagram of the word in the body
            if (CheckIfAnagram(word, sentenceArray[i])) {

                // add the anagram to the array and remove all punctuation from the word
                anagrams.push(sentenceArray[i].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""));
            }
        }
    }

    // return the array of anagrams if there are any
    return (anagrams.length > 0) ? anagrams : "No anagrams found!";
}
// console.log(FindAnagrams("elvis", "elvis lives"));






/**
 * Endpoint C
 * 
 * @param {string} sentence - A sentence
 * @return {string[[]]} An array of arrays containing all anagram groups present in the string
 */

function FindAnagramGroups(sentence){
    
        // check if the input is valid, not null, and not empty
        if(sentence === undefined || sentence === null || sentence === ''){
            return undefined;
        }
    
        // split the sentence into an array of words 
        var sentenceArray = sentence.split(' ');
    
        // create an array to store the anagram groups
        var anagramGroups = [];
    
        // loop through the array of words
        for(var i = 0; i < sentenceArray.length; i++){
    
            // create an array to store the anagrams by calling the FindAnagrams function
            var anagrams = FindAnagrams(sentenceArray[i], sentence);

            // check if the anagram array is an array and if the length is greater than 1
            if (anagrams instanceof Array && anagrams.length > 1) {
                
                // add the anagram group to the array
                anagramGroups.push(anagrams);
                sentenceArray.splice(sentenceArray.indexOf(sentenceArray[i]),1);
                console.log(sentenceArray);
            }
        }
    
        // return the array of anagram groups if there are any
        return (anagramGroups.length > 0) ? anagramGroups : "No anagram groups found!";
}
//console.log(FindAnagramGroups('Elvis lives in a house. His cat can act. He has a study that’s dusty'));

