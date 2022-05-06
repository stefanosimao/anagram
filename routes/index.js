var express = require('express');
var router = express.Router();

/**
 * Endpoint A
 * 
 * @param {string} word1 - A single word
 * @param {string} word2 - A single word
 * @return {Boolean} A boolean that tells us whether or not the two words sent in the body are anagrams
 */
function CheckIfAnagram(word1, word2) {

  // check if the input is valid, not null, and not empty
  if (word1 === undefined || word2 === undefined || word1 === null || word2 === null || word1 === '' || word2 === '') {
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
/**
 * Endpoint B
 * 
 * @param {string} word - A single word
 * @param {string} sentence - A sentence
 * @return {string[]} An array containing all unique word anagrams of the word in the sentence
 */
function FindAnagrams(word, sentence) {

  // check if the input is valid, not null, and not empty
  if (word === undefined || sentence === undefined || word === null || sentence === null || word === '' || sentence === '') {
    return undefined;
  }

  // split the sentence into an array of words 
  var sentenceArray = sentence.split(' ');

  // create an array to store the anagrams
  var anagrams = [];

  // loop through the array of words
  for (var i = 0; i < sentenceArray.length; i++) {

    // check if the anagram is already in the array
    if (anagrams.indexOf(sentenceArray[i]) === -1) {

      /// check if the word is an anagram of the word in the body
      if (CheckIfAnagram(word, sentenceArray[i])) {

        // add the anagram to the array and remove all punctuation from the word
        anagrams.push(sentenceArray[i].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase());
      }
    }
  }

  // return the array of anagrams if there are any
  return (anagrams.length > 0) ? anagrams : "No anagrams found!";
}
/**
 * Endpoint C
 * 
 * @param {string} sentence - A sentence
 * @return {string[[]]} An array of arrays containing all anagram groups present in the string
 */
function FindAnagramGroups(sentence){
    
        // check if the input is valid, not null, and not empty
        if(sentence === undefined || sentence === null || sentence === ''){
          return "Invalid input!";
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
                
                // remove the anagrams from the sentence and from the array to prevent looping through words that are not in the sentence anymore
                for (var j = 0; j < anagrams.length; j++) {

                    sentence = sentence.replace(new RegExp(anagrams[j], 'g'), ""); 
                    sentenceArray = sentenceArray.filter((w) => w !== anagrams[j]);
                }
            }
        }
    
        // return the array of anagram groups if there are any
        return (anagramGroups.length > 0) ? anagramGroups : "No anagram groups found!";
}

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

  const map1 = new Map();

  // loop through the array of words
  for (var i = 0; i < sentenceArray.length; i++) {

    let key = sentenceArray[i].split('').sort().join('');

    if (map1.has(key) && map1.get(key).indexOf(sentenceArray[i]) === -1) {

      map1.get(key).push(sentenceArray[i]);

    } else if (!map1.has(key)) {

      map1.set(key, [sentenceArray[i]]);

    }
  }

  for (var [key, value] of map1) {

    if (value.length > 1) {
      anagramGroups.push(value);
    }
  }

  // return the array of anagram groups if there are any
  return (anagramGroups.length > 0) ? anagramGroups : "No anagram groups found!";

}

/* ------------------------------------------------- */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ANAGRAM API' });
});
/* ------------------------------------------------- */


/* ------------------------------------------------- */
router.post('/:endpoint', function (req, res) {

  var string1 = req.body.string1;
  var string2 = req.body.string2;

  if (req.params.endpoint === 'A') {

    var outcome = CheckIfAnagram(string1, string2);

  } else if (req.params.endpoint === 'B') {

    var outcome = FindAnagrams(string1, string2);

  } else if (req.params.endpoint === 'C') {
  
    var outcome = FindAnagramGroups(string1);

  } else if (req.params.endpoint === 'C2') {

    var outcome = FindAnagramGroups2(string1);

  } else {

    var outcome = "Invalid endpoint!";

  }

  let outcome_json = { 'outcome': outcome };

  res.type("application/json");
  res.status(200).send(outcome_json).end();

});
/* ------------------------------------------------- */


module.exports = router;
