### 1. What is the difference between var, let, and const?
> Ans: If we declare var inside a function it becomes available througout the function. If we declared outside of function it becomes global. It ignores block scope. On the other hand let and const only avaliable within the curly braces where they defined . Var variables are hoisted top of their scope initialized as undefined. On the other hand using let and const early causing a reference error. We can reassign value on var and let but not in const. We can redeclare in var. 
### 2.  What is the spread operator (...)?
>Ans: Spread operator allows us to spread or expand an array or object or other iterables into its individiual element. 
### 3.  What is the difference between map(), filter(), and forEach()?
>Ans: forEach() => We can use foreach when we want to do action on every element of array.
map() => We can use map when we want to transform every element of the array into something else and store the results in a new array.
filter()=>We use this method when we want to substract some element from an array based on a specific condition. 
### 4.  What is an arrow function?
> Ans: An arrow function allow us to skip the function keyword. If the function has only one line of code that returns a value we cam skip return keyword . ***Example***: 
```javascript
const add = (a, b) => a + b;
```


### 5. What are template literals?
>Ans: String wraped in backticks that allow us to easily put in variables using ${} and write text across multiple lines without errors. 