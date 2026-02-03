import mongoose from "mongoose";
import Problem from "../models/Problems.js";
import dotenv from "dotenv";

dotenv.config();

const problems = [
  {
    title: "Reverse a String",
    question:
      "Write a function that takes a string as input and returns the string reversed. Do not use built-in reverse methods.",
    starterCode: {
      javascript: `function reverseString(str) {
  // Write your solution here
  
  return "";
}

// Test
console.log(reverseString("hello")); // Expected: "olleh"
`,
    },
  },
  {
    title: "Find the Maximum Number",
    question:
      "Given an array of numbers, write a function that returns the largest number in the array.",
    starterCode: {
      javascript: `function findMax(numbers) {
  // Write your solution here
  
  return null;
}

// Test
console.log(findMax([1, 5, 3, 9, 2])); // Expected: 9
`,
    },
  },
  {
    title: "Check Palindrome",
    question:
      "Write a function that checks whether a given word is a palindrome. A palindrome reads the same forwards and backwards.",
    starterCode: {
      javascript: `function isPalindrome(word) {
  // Write your solution here
  
  return false;
}

// Test
console.log(isPalindrome("racecar")); // Expected: true
console.log(isPalindrome("hello"));   // Expected: false
`,
    },
  },
  {
    title: "FizzBuzz",
    question:
      "Write a program that prints numbers from 1 to 100. For multiples of 3 print 'Fizz', for multiples of 5 print 'Buzz', and for multiples of both print 'FizzBuzz'.",
    starterCode: {
      javascript: `function fizzBuzz() {
  // Write your solution here
}

// Test
fizzBuzz(); // Expected: 1, 2, Fizz, 4, Buzz, ...
`,
    },
  },
  {
    title: "Count Vowels",
    question:
      "Write a function that counts how many vowels (a, e, i, o, u) are in a given string.",
    starterCode: {
      javascript: `function countVowels(str) {
  // Write your solution here
  
  return 0;
}

// Test
console.log(countVowels("hello")); // Expected: 2
`,
    },
  },
];

const seedProblems = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    await Problem.deleteMany();
    await Problem.insertMany(problems);

    console.log("✅ Problems seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedProblems();
