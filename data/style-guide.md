---
path: "/style-guide"
title: "Style guide"
hidden: false
information_page: true
---

This page contains a style guide that we want you to follow during the course. For the graded assignments, we will deduct points if you don't use good style.

### What is good style and why is it important?

When writing text in a ‘human’ language, you may structure your text into paragraphs and start your sentences with capital letters. Although following these rules is not strictly necessary to ensure that a text can be read, they do make it much easier for others to read. Similar formatting rules exist in programming languages. Following such rules is not neccessary in order for a computer to 'understand' your code. However, following a 'good style' makes it much easier for others (and future-you) to read your code. For this reason, style guides are often used by companies to make it easier for programmers to collaborate. Furhermore, although it may seem that following a styleguide takes more time, it will often actually save you time as it makes mistakes much easier to spot.

During this course we will also be using a style guide. This style guide will only contain some basic principles, as we do not want to overload you with too many things to learn at the same time. Most of them are 'common sense' rules, and IntelliJ will often already help you along by doing some things for you. Note that we may decide to stray slightly from the guide in case someone hands in something terrible that is not covered here.

In the course FEB22012 Programming in the second year, you will face a [much stricter and more extensive style guide](https://erasmusuniversityautolab.github.io/FEB22012-StyleGuide).

## The guidelines


### Filenames
Use the filenames as specified in the code templates you find on Canvas. If you use a different filename, CodeGrade will not accept your files.


### Naming things
In case a name consists of multiple words, use camelCase. To distinguish classes from other things, we start them with a capital letter.

```java
// Good
int smallestPrime
String myName
public class PrimeNumbers

// Bad
int smallestprime
String my_Name
public class primeNumbers
```
 
Be sure to use meaningful and descriptive names. This will help you to prevent making mistakes and makes it easier for us to understand what you are doing. Do not hesitate to use variable names consisting of multiple words if you believe that it makes things more clear, but try to be concise. One exception for short names are in a mathematical context, where the 'actual' name is often just a letter.

```java
// Good
numElements
numberOfElements

// Bad
num
thing
n
numberOfElementsInTheSetOfIntegers
```

Although it does not always make sense, it is good practice to use *nouns* for variables and *verbs* for methods.

```java
// Good
public static integer sumPrimesUntil(int n)
public static integer getNextPrime(int n)
int nextPrime
int sumOfPrimes

// Bad
public static integer prime(int n)
int sumPrimes
```


### Spacing
Like in English, every comma should be followed by a space, and there should be no space before a comma. Use a single space to separate tokens. One exception is the use of spaces to align similar statements across multiple lines.

```java
// Good
public static void printNumbers(int num1, int num2)
1 + 2
int number = 4;

if (number > 1)   doSomething();
if (number < 333) doSomethingElse();

// Bad
public static void printNumbers(int num1 ,int num2)
1+ 2
1  +     2
int  number = 7;
```

Place a space after control statements (`if`, `while`, `else`). Do not place a space between a method and its arguments. Do not put spaces around code in parentheses

```java
// Good
if (a < b) 
public static integer getNextPrime(int n)
getNextPrime(myPrime)

// Bad
if(a < b) 
public static integer getNextPrime (int n)
getNextPrime( myPrime )
```


### Curly braces
An opening curly brace should never go on its own line and should always be followed by a new line. A closing curly brace should always go on its own line, unless it’s followed by an else statement. Always indent code inside curly braces. The keybinding ctrl + alt + L (Windows) or cmd + alt + L (Mac OS) does this for you automatically.

```java
if (a < d) {  
	a = b + e;
} else { 
	a = d;
}

if (importantSecurityCheck) {
	grantAccessSecretDocuments();
	grantAccessNuclearLaunchCodes();
}

// Bad
if (a < d) 
{
a = b + e} else a = d;

/* The following actually does not do what the user
 * likely intended, and shows the danger of
 * omitting curly braces 
 */ 
if (importantSecurityCheck)
	grantAccessSecretDocuments();
	grantAccessNuclearLaunchCodes();
```


### Comments

You should use comments in order to indicate what certain segments of your code do, and to explain more difficult parts of your code. Comments can be on their own line, or even span multiple lines, but very short comments are also allowed after code (inline comment). Do not use comments if they are not necessary.
 
Note that the following example contains an excessive amount of comments for the sake of the example. In practice, **no comments would be necessary here because the naming makes it obvious what the code does**.

```java
/* Method that prints its two arguments
 * also prints "The numbers are:"
 */
public static void printNumbers(int num1, int num2) {
	// print the numbers
	System.out.println("The numbers are:");
	System.out.println(num1 + " and " + num2 + "."); // this is where the magic happens
}
```

For clarity, the following is considered bad, as the comments only make the code less readable.
```java
// Bad
x = 5; // I assign 5 to x
y = x + 7; // y becomes seven larger than x
return x * y; // I return the result
```

###  Blank lines
Use blank lines between parts of your code to improve readability. A good rule of thumb is to use a blank line whenever the code is "semantically" different. For example, two assignment statement can be beneath each other. However, a subsequent method call should be seperated by a blank line.

```java
// Good
int a = 1;
int b = 2

int c = add(a, b);

// Bad
int a = 1  
int b = 2  
int c = add(a, b);
```

###  No magic numbers
With the exception of the additive and multiplicative identities (0 and 1), there should be no numbers appearing in the middle of your code. The reason for this is that those number are almost always tied to a specific application of your code, so that if the application changes the numbers must also change. If these number appear everywhere throughout your code, then you must replace it at every location. This is a lot of work and prone to errors. Instead, create a variable to store the number, which you can then easily change if the application changes.

```java
// Good
int maxValue = 8;

for (int i; i < maxValue; i++) {
	System.out.println(i + maxValue);
}

// Bad

for (int i; i < 8; i++) {
	System.out.println(i + 8);
}
```

###  Readability over compactness
The goal of programming is not to write your code as compactly as possible, but to write it as readable (for humans) as possible. *Writing your code very compactly will not make it run faster in most cases*, but it will cause you to make more mistakes and it will make it more difficult for others to understand what you are doing. On the other hand, excessive code can also make it hard to understand what's going on. It is important to strike the right balance to make easy to understand for a human what your code does.

```java
// Good
int a = 5;
int b = 3;
int c = 3;
int d = 1;

int numerator = a + b;
int denominator = a - b + c - d;
int result = numerator / denominator;

// Bad
int a = 5; int b = 3; int c = 3; int d = 1;
int result = (a + b) / (a - b + c - d);

// Also bad
int diffab = a - b;
int diffcd = c - d;
int denominator = diffab + diffcd;
int firstpart = a / denominator;
int secondpart = b / denominator;
int result = firstpart + secondpart;
```