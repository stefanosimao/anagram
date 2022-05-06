/**
 * File used to develop and test various implementations of the anagram API
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
    word1 = word1.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"]/g, "")
    word2 = word2.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"]/g, "")

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

                // add the anagram to the array, remove all punctuation from the word and convert it to lowercase
                anagrams.push(sentenceArray[i].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"]/g, "").toLowerCase());
            }
        }
    }

    // return the array of anagrams if there are any
    return (anagrams.length > 0) ? anagrams : "No anagrams found!";
}
//console.log(FindAnagrams("elvis", "Elvis lives lives elvis"));




/**
 * Endpoint C
 * 
 * @param {string} sentence - A sentence
 * @return {string[[]]} An array of arrays containing all anagram groups present in the string
 * 
 * This is the first implementation of the Endpoint C. We are able to reduce time complexity by removing the anagrams that we encounter in the sentence.
 * If a sentence has no anagrams, we will loop through all the words in the sentence. If we find an anagram, we don't need to check it again, effectively 
 * reducing the number of times we need to loop. At the same time, we need to loop through the array of anagrams that we find, in the inside loop.
 * 
 * In order to find the anagrams, we use the FindAnagrams. For this reason the time complexity is O(n^2).
 * 
 */

function FindAnagramGroups(sentence){
    
        // check if the input is valid, not null, and not empty
        if(sentence === undefined || sentence === null || sentence === ''){
            return undefined;
        }

        // remove all punctuation from the sentence and convert it to lowercase
        sentence = sentence.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"]/g, "");
    
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
                
                // loop through the array of anagrams
                for (var j = 0; j < anagrams.length; j++) {

                    // remove the anagram from the sentence to avoid duplicates
                    sentence = sentence.replace(new RegExp(anagrams[j], 'g'), ""); 

                    // remove the anagram from the array
                    sentenceArray = sentenceArray.filter((w) => w !== anagrams[j]);
                }
            }
        }
    
        // return the array of anagram groups if there are any
        return (anagramGroups.length > 0) ? anagramGroups : "No anagram groups found!";
}




/**
 * Endpoint C2
 * 
 * @param {string} sentence - A sentence
 * @return {string[[]]} An array of arrays containing all anagram groups present in the string
 * 
 * This function is the same as the previous one, but it uses a hash table to store the anagrams. There are no calls to the FindAnagrams function or any other function.
 * The use of a hash table is a way to reduce the time complexity to O(n).
 * 
 */

function FindAnagramGroups2(sentence) {

    // check if the input is valid, not null, and not empty
    if (sentence === undefined || sentence === null || sentence === '') {
        return undefined;
    }

    // remove all punctuation from the sentence and convert it to lowercase
    sentence = sentence.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"]/g, "");

    // split the sentence into an array of words 
    var sentenceArray = sentence.split(' ');

    // create an array to store the anagram groups
    var anagramGroups = [];

    // create a hash table to store the anagrams
    const map1 = new Map();

    // loop through the array of words
    for (var i = 0; i < sentenceArray.length; i++) {

        // sort the characters in the word to use it as a key in the hash table
        let key = sentenceArray[i].split('').sort().join('');

        // check if the key is already in the hash table and if the word is already in the hash table corresponding to the key
        if (map1.has(key) && map1.get(key).indexOf(sentenceArray[i]) === -1) {

            // add the word to the hash table corresponding to the key
            map1.get(key).push(sentenceArray[i]);

        // if the key is not in the hash table, add it to the hash table and add the word to the hash table corresponding to the key
        } else if(!map1.has(key)) {

            // add the key to the hash table and add the word to the hash table corresponding to the key
            map1.set(key, [sentenceArray[i]]);
        }
    }

    // loop through the pairs of keys and values in the hash table
    for (var [key, value] of map1) {

        // add the anagram group to the array if the length of the array is greater than 1
        if(value.length > 1){
            anagramGroups.push(value);
        }
    }

    // return the array of anagram groups if there are any
    return (anagramGroups.length > 0) ? anagramGroups : "No anagram groups found!";
}
//console.log(FindAnagramGroups2('Elvis lives in a house. His cat can act. He has a study that’s dusty'));

