//Filter duplicates / Remove duplicates
const nums = [1, 2, 3, 1, 2, 4, 5, 6];

//Old way
// const unique = nums.filter((val, i) => nums.indexOf(val) === i);
// console.log(unique); //Slow and complex 'cause of iterator

//Set
const uniqueSet = [...new Set(nums)]; //=> new Set() to filter duplicates and wrap it in [... ] to convert into array
console.log(uniqueSet); //Short and faster