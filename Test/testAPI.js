// Testing various implementations of the anagram API



/**
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

    console.log(firstWord);
    console.log(secondWord);

    // compare the two words and return the result
    return firstWord === secondWord;
}

console.log(CheckIfAnagram('hel,lo*ç%&.', 'olelh.,*ç%&'));