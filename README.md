# API which identifies SINGLE word anagrams

## Introduction
I built an API which identifies SINGLE word anagrams.

### Endpoint A
Receive two strings in the body of the request. Each string will be a single word.


Returns a JSON with the key “outcome” whose value is a boolean. Outcome must tell us whether or not the two words sent in the body are anagrams.


Example:  

i. Input:
1. String 1: “Elvis”
2. String 2: “Lives”  

ii. Output:    { outcome: true }