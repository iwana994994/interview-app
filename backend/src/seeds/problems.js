import mongoose from "mongoose";
import Problem from "../models/Problems.js";
import dotenv from "dotenv";

dotenv.config();



const problems = [
  {
    title: "Reverse a String",
    question:
      "Write a function that takes a string as input and returns the string reversed. Do not use built-in reverse methods."
  },
  {
    title: "Find the Maximum Number",
    question:
      "Given an array of numbers, write a function that returns the largest number in the array."
  },
  {
    title: "Check Palindrome",
    question:
      "Write a function that checks whether a given word is a palindrome. A palindrome reads the same forwards and backwards."
  },
  {
    title: "FizzBuzz",
    question:
      "Write a program that prints numbers from 1 to 100. For multiples of 3 print 'Fizz', for multiples of 5 print 'Buzz', and for multiples of both print 'FizzBuzz'."
  },
  {
    title: "Count Vowels",
    question:
      "Write a function that counts how many vowels (a, e, i, o, u) are in a given string."
  }
];

const seedProblems = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    await Problem.deleteMany(); // obriše stare
    await Problem.insertMany(problems);

    console.log("✅ Problems seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedProblems();


