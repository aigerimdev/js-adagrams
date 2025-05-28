const letterPool = {
    'A': 9, 'B': 2, 'C': 2, 'D': 4, 'E': 12, 'F': 2, 'G': 3, 'H': 2, 'I': 9, 
    'J': 1, 'K': 1, 'L': 4, 'M': 2, 'N': 6, 'O': 8, 'P': 2, 'Q': 1, 'R': 6, 
    'S': 4, 'T': 6, 'U': 4, 'V': 2, 'W': 2, 'X': 1, 'Y': 2, 'Z': 1
}
// Helper function that builds an array of letters based on their frequency in letterPool.
const buildSackOfLetters = () => {
  let letters = [];
  for (const letter in letterPool) {
    const count = letterPool[letter];
    for (let i = 0; i < count; i++) {
      letters.push(letter);
    }
  }
  return letters;
};


export const drawLetters = () => {
  const sackOfLetters = buildSackOfLetters();
  const drawnLetters = [];
  const letterCounts = {};

  while (drawnLetters.length < 10) {
    const index = Math.floor(Math.random() * sackOfLetters.length);
    const letter = sackOfLetters[index];

    letterCounts[letter] = (letterCounts[letter] || 0) + 1;

    // Ensure we don't exceed the allowed count of any letter
    if (letterCounts[letter] <= letterPool[letter]) {
      drawnLetters.push(letter);
    }
  }
  return drawnLetters;
};

// Helper function that counts how many times each letter appears in a list.
// ['A', 'B', 'A'] → {'A': 2, 'B': 1}
const buildCountLetters = (letterList) => {
  const letterCounter = {};
  for (let letter of letterList){
    letterCounter[letter] = (letterCounter[letter] || 0) + 1;
  }
  return letterCounter
}

export const usesAvailableLetters = (input, lettersInHand) => {
  const letterCounts = buildCountLetters(lettersInHand);

  for (let letter of input.toUpperCase()){
    if (!(letter in letterCounts) || letterCounts[letter] === 0) {
      return false;
    }
    letterCounts[letter] -= 1;
  }
  return true;
};

export const scoreWord = (word) => {
  if (!word) return 0;
  
  const letterScores = {
  'A': 1, 'E': 1, 'I': 1, 'O': 1, 'U': 1, 'L': 1, 'N': 1, 'R': 1, 'S': 1, 'T': 1,
  'D': 2, 'G': 2,
  'B': 3, 'C': 3, 'M': 3, 'P': 3,
  'F': 4, 'H': 4, 'V': 4, 'W': 4, 'Y': 4,
  'K': 5,
  'J': 8, 'X': 8,
  'Q': 10, 'Z': 10
};
  word = word.toUpperCase();
  if (!word) return 0;

  // Calculate the total score by summing the values of each letter in the word
  let totalScore = 0;
  for (let letter of word) {
    totalScore += letterScores[letter] || 0;
  }
  // Add extra points for 7 or more letters
  if (word.length >= 7){
    totalScore += 8;
  }
  return totalScore;
};

export const highestScoreFrom = (words) => {
  let highestScore = 0;
  let winningWord = '';

  for (let word of words) {
    const score = scoreWord(word);

    // If the current word has a higher score, update the highest score and best word
    if (score > highestScore) {
      highestScore = score;
      winningWord = word;

    } else if (score === highestScore) {
      // Tie-breaker 1: If one word is exactly 10 letters, it wins
      if (winningWord.length !== 10) {
        if (word.length === 10) {
          winningWord = word;
          // Tie-breaker 2: If no 10-letter word, prefer the shorter word
        } else if (word.length < winningWord.length){
          winningWord = word;
        }
      }
    }
  }

  return { word: winningWord, score: highestScore };
};
