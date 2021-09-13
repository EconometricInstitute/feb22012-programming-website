---
path: '/week2/2-programming-errors'
title: 'Programming Errors'
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

 - You know the error classifications and the different approaches to deal with them them.

</text-box>

## Errors
When programming, many errors can occur. You experienced some of them already last year when you took the course Introduction to Programming. We can classify errors in three categories, namely compile time errors, runtime errors and logic errors. In the course Introduction to Programming, we focussed on prevention of logic errors by commenting our code. In this section, we emphasize more on the compile time and runtime errors, which also have been shortly mentioned before.

The compiler finds some of these errors before we even run our code. These errors are called compile times errors. Several examples of compile time errors are syntax errors, type errors, and structural errors.

Examples of **syntax errors**:
- `int number = 3 +* 7; //The two operators +* can't be executed like this.`
- `public int calculate(int a, int b { //The closing parenthesis misses: )`

Examples of **type errors**:
- `int number = "word"; //The type should be String or the value should be a number.`
- `Student student = "John"; //A constructor should be called; this is a String.`

Example of a **Structural error**:
``` java
public int specialProduct(int a, int b) {
   int c = a*a + b*b;
} // There is no return statement.
```

To solve these compile errors, you should just fix your code. Mostly, the Java Virtual Machine provides you with good suggestions.

The errors that are found during or after running your code are called run time errors. Sometimes, these errors are discovered when the user enters invalid, irrelevant or special-case data.

Example of a **Runtime error**:
```java
public static void main(String args[]) {
   int number1 = 233;
   int number2 = 0;
   // When we do integer division by zero,
   // this will cause a ArithmeticException
   int answer = number1/number2;
}
```

Other examples are:
- The ArrayIndexOutOfBoundsException: you request an item from a negative index or an index greater or equal to the size of the array.
- The NullPointerException: you call a method on an object that references to null.
- The OutOfMemoryError: you exceed the memory space allocated to the JVM. Most likely, this is due to an infinite loop. For instance, a `while(true)` without any stopping criterion inside where you create new objects that can not be garbage collected, e.g. by adding them to a `List`.
- The StackOverflowError: you exceed the memory allocated to the stack of the JVM. This is the memory space which keeps track of where you are in your program and local variables. This happens for instance if you let a method call itself too often.
- The InputMismatchException: you expect another type of variable than the user provides you with. For example, the user enters a string, and you call `scanner.nextDouble();`.
- The NumberFormatException: you try to format a number, for instance from string to int, but the string does not contain a (integer) number.

To solve these runtime errors, run, test, and improve your code. Also, you should _handle exceptions_. The topic of exception-handling is covered in the next paragraph.

The third and last type of error is the most challenging and annoying one: the logical error. Your computer can not recognize a logic error for you, since the program compiles and executes as it should. In such a case, the error is that it does the wrong thing or returns an incorrect result (or even no output at all).

Example of a **Logical error**:
```java
public double otherAngle(double angle1, double angle2) {
   return 360 - angle1 - angle2; // The angles of a triangle add up to 180, not 360.
}
```

To solve these logical errors, test, reason and prove your code is correct. By going through all the steps of your code again, you can find your own mistakes. Also, make sure you understand how to use a debugger, as it allows you to go through the execution of your program step-by-step. That is a very convenient way to figure out at what point your program does something that is unexpected.

<Exercise title="Test your knowledge">

In this quiz, you can test your knowledge on the subjects covered in this chapter.

The following code fragments contain a mistake. This could be either a compiler error, runtime error or logic error. Think about what might be the mistake and what kind of mistake it is.

### Fragment 1

This method should filter an array of numbers to a list that only contains the numbers from the input that are divisible by a given divisor.

```java
public static ArrayList<Integer> filterDivisible(int[] numbers, int divisor) {
   ArrayList<Integer> result = new ArrayList<Integer>();
   for (int i=0; i <= numbers.length; i++) {
      if (numbers[i] % divisor == 0) {
         result.add(numbers[i]);
      }
   }
   return result;
}
```

<Solution>

Because arrays start indexing at 0, the index numbers.length does not exist. This will result in an out-of-bounds index in the for-loop, since it uses ≤, and not a strict < sign. When reaching the non-existent index, a runtime exception will occur.

</Solution>

### Fragment 2

The following method should compute the sum of the numbers in a list of `BigInteger` numbers.

```java
public BigInteger sum(List<BigInteger> numbers) {
    BigInteger sum = BigInteger.valueOf(0);
    for (BigInteger number : numbers) {
        sum.add(number);
    }
    return sum;
}
```

<Solution>

If you try to compile and run this program, you see it will always return the value 0. The reason is that a `BigInteger` is an immutable object, and that `add` returns a new object that contains the sum. We should store this new object in the
`sum` variable. Since the program compiles and runs without errors or exceptions, this is a *logical error*.

</Solution>

### Fragment 3

The following fragment should take two `String` arguments `lhs` and `rhs` that contains only digits, and return the sum of the two numbers as an `int`.
Assume that the method is only called with `String` objects that contain only digits that fit within `int` values.

```java
public int convertAndAdd(String lhs, String rhs) {
    Integer.parseInt(lhs);
    Integer.parseInt(rhs);
    return lhs + rhs;
}
```

<Solution>

The expression `lhs + rhs` will result in a `String` value, yet the return type of the method is `int`.  These are incompatible types, and thus the compiler will complain. As a consequence, this is a compiler error.

The following version would work:

```java
public int convertAndAdd(String lhs, String rhs) {
    int lnum = Integer.parseInt(lhs);
    int rnum = Integer.parseInt(rhs);
    return lnum + rnum;
}
```

</Solution>

</Exercise>

