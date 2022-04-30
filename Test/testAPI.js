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

        // check if the word is an anagram of the word in the body
        if(CheckIfAnagram(word, sentenceArray[i])){

            // check if the anagram is already in the array
            if(anagrams.indexOf(sentenceArray[i]) === -1){

                // add the anagram to the array
                anagrams.push(sentenceArray[i]);
            }
        }
    }

    // return the array of anagrams if there are any
    return (anagrams.length > 0) ? anagrams : "No anagrams found!";
}


console.log(FindAnagrams('Elvis', 'Elivs lives in a house'));