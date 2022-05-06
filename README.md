# API which identifies SINGLE word anagrams

## Introduction
I built an API which identifies single word anagrams.

### Endpoint A
Receives two strings in the body of the request. Each string will be a single word.


Returns a JSON with the key “outcome” whose value is a boolean. Outcome must tell us whether or not the two words sent in the body are anagrams.


Example:  

i. Input:
1. String 1: “Elvis”
2. String 2: “Lives”  

ii. Output:    { outcome: true }


### Endpoint B
Receives two strings in the body of the request. The two strings will be a single word (string1) and a sentence (string2).

Returns a JSON with the key “outcome” whose value is an array of strings. Outcome must identify all unique single word anagrams of string1 in string2.


Example:  

i. Input:
1. String 1: “Elvis”
2. String 2: “Elvis lives in a house”  

ii. Output:    { outcome: [“elvis”, “lives”] }


### Endpoint C
Receives one string in the body of the request. The string will be a sentence.

Returns a JSON with the key “outcome” whose value is an array of arrays of strings. Outcome must identify all anagram groups present in the string. Every anagram
must be a single unique word.


Example:  

i. Input:
1. String 1: “Elvis lives in a house. His cat can act. He has a study that’s dusty.”  

ii. Output:  {outcome: [ [“elvis”, “lives” ], [“cat”, “act”], [“study”, “dusty” ]]}


## Implementation
This API is built using the [Express](https://expressjs.com/) framework.


### Endpoint C
Endpoint C has two implementations (endpoint C and endpoint C2). The first one is my first implementation and it uses the FindAnagrams function. The second one uses an hash table like data structure to reduce the time complexity on avarage. Further explanation is provided in the code.