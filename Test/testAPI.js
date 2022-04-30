// Testing various implementations of the anagram API

// Endpoint A function

function CheckIfAnagram(word1, word2){

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

