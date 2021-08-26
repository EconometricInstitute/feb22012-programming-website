---
path: '/week2/2-errors-and-exceptions'
title: 'Errors and Exceptions'
hidden: false
---

<text-box variant='learningObjectives' name='Learning Objectives'>

 - You know the error classifications and how to solve them.

 - You know what exceptions are and how to handle them

 - You can throw exceptions

 - You know that some exceptions have to be handled and that some exceptions do not have to be handled.

</text-box>

## Errors
When programming, many errors can occur. You experienced some of them already last year when you took the course Introduction to Programming. We can classify errors in three rubrics, namely compile time errors, runtime errors and logic errors. In the course Introduction to Programming, we focussed on prevention of logic errors by commenting our code. In this section, we emphasize more on the compile time and runtime errors, which also have been shortly mentioned before.

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
- The ArrayIndexOutOfBoundsException: you request an item from a negative index or an index greater or equal the size of the array.
- The NullPointerException: you call a method on an object that references to null.
- The OutOfMemoryError: you exceed the memory space allocated to the JVM. Most likely, this is due to an infinite loop. For instance a `while(true)` without any stopping criterion inside where you create new objects that can not be garbage collected, e.g. by adding them to a `List`.
- The StackOverflowError: you exceed the memory allocated to the stack of the JVM. This is the memory space which keeps track of where you are in your program and local variables. This happens for instance if you let a method call itself too often.
- The InputMismatchException: you expect another type of variable than the user provides you with. For example, the user enters a string and you call `scanner.nextDouble();`.
- The NumberFormatException: you try to format a number, for instance from string to int, but the string does not contain a (integer) number.

To solve these runtime errors, run, test, and improve your code. Also, you should _handle exceptions_. The topic of exception-handling is covered in the next paragraph.

The third and last type of error is the most challenging and annoying one: the logical error. Your computer can not recognize a locic error for you, since the program compiles and executes as it should. In such a case, the error is that it does the wrong thing or returns an incorrect result (or even no output at all).

Example of a **Logical error**:
```java
public double otherAngle(double angle1, double angle2) {
   return 360 - angle1 - angle2; // The angles of a triangle add up to 180, not 360.
}
```

To solve these logical errors, test, reason and prove your code is correct. By going through all the steps of your code again, you can find your own mistakes. Also, make sure you understand how to use a debugger, as it allows you to go through the execution of your program step-by-step. That is a very convenient way to figure out at what point your program does something that is unexpected.

## Exceptions
When program execution ends with an error, an exception is thrown. For example, a program might call a method with a *null* reference and throw a `NullPointerException`, or the program might try to refer to an element outside an array and result in an `IndexOutOfBoundsException`, and so on.
Some exceptions we have to always prepare for, such as errors when reading from a file or errors related to problems with a network connection. On the other hand, we do not have to prepare for runtime exceptions, such as the NullPointerException, beforehand. Java will always let you know if your code has a statement or an expression which can throw an error you have to prepare for.
Java has special features incorporated into the language that can pass control to a handler, from the point a runtime error was detected.

## Handling exceptions
You can raise an exception with the `throw` keyword. It is good to indicate that something can go wrong in your method by defining throws in the method signature.
Here is an example:
```java
public void withdrawMoney(int amount) throws IllegalArgumentException {
   if (amount > balance) {
      throw new IllegalArgumentException("Balance too low");
   }
   balance -= amount;
}
```

In the example above, you don't need an 'else' because the exception will stop the method, like a return statement does, in case the if-statement is met.

### Try - catch
We use the `try {} catch (Exception e) {}` block structure to handle exceptions. The keyword `try` starts a block containing the code which *might* throw an exception. The block starting with the keyword `catch` defines what happens if an exception is thrown within the `try` block. We use the keyword `catch`, because causing an exception is referred to as `throw`ing an exception. The keyword `catch` is followed by the type of the exception handled by that block, for example:

```java
boolean ask = true;
Scanner scan = new Scanner(System.in);
while(ask) {
   try {
      System.out.println("Please enter the amount to withdraw.");
      String line = s.nextLine();
      int amount = Integer.parseInt(line);
      withdrawMoney(amount);
      ask = false;
   }
   catch (NumberFormatException e) {
      System.out.println("Input was not a valid number. Please try again.");
   }
   catch (IllegalArgumentException e) {
      System.out.println("Amount exceeds balance of " + balance + ". Please try again.");
   }
}
System.out.println("Balance is now: " + balance);
```

Possible output could be:

<sample-output>

_Please enter the amount to withdraw._

**Twenty**

_Input was not a valid number. Please try again._

**80**

_Amount exceeds balance of 50. Please try again._

**20**

_Balance is now: 30_

</sample-output>

You can also choose to catch all exceptions at once with the general statement `catch (Exception e)`. Here is an example in which we look at the situation of parsing strings to integers.
The method throws a `NumberFormatException` if the string it has been given cannot be parsed into an integer.

```java
Scanner reader = new Scanner(System.in);

System.out.print("Give a number: ");
int readNumber = -1;

try {
    readNumber = Integer.parseInt(reader.nextLine());
    System.out.println("Good job!");
} catch (Exception e) {
    System.out.println("User input was not a number.");
}
```

<sample-output>

Give a number: **5**

Good job!

</sample-output>

<sample-output>

Give a number: **no!**

User input was not a number.

</sample-output>

The code in the `catch` block is executed immediately if the code in the `try` block throws an exception. This can be seen from the above example, because the print statement below the line calling the `Integer.parseInt` method in the `try` block was executed if and only if no exception was thrown. The user input, in this case the string `no!`, is given to the `Integer.parseInt` method as a parameter. The method throws an error if the string cannot be parsed into an integer. Note, that the code within the `catch` block is executed *only* if an exception is thrown.

<text-box variant='hint' name='Do not ignore exceptions!'>

Nobody likes errors, and it might be tempting to always write code similar to this:

```java
try {
    doSomething();
}
catch (Exception e) {}
```

However, in this case the program just continues, even if something problematic that requires further investigation happens.
If you do this a lot in your code, very likely at some point you will start seeing logical errors: your program runs without
any exceptions, but the output is incorrect. Debugging code where all exceptions that occur are ignored is very very
difficult. It is thus a good idea to at least print that something went wrong. A common way to do this is as follows:

```java
try {
    doSomething();
}
catch (Exception e) {
    e.printStackTrace();
}
```

This way, the error and the location where the error is printed when something goes wrong, but the program exits the
`catch` block and continues running. This can make debugging your program a lot easier.

</text-box>

### Try - with resources
There is separate exception handling for reading operating system resources such as files. Certain resources, such as files and network connections, need to be closed when we are finished with them. Traditionally, the `finally` clause was very useful for this, but since Java 7 we can use `Try - with resources` by declaring resources that need to be closed immediately after try. Simply put, to be auto-closed, a resource has to be both declared and initialized inside the try. With so called try-with-resources exception handling, the resource to be opened is added to a non-compulsory part of the try block declaration in brackets. Here is an example:
```java
ArrayList<String> lines =  new ArrayList<>();

public void readFile(File f) throws FileNotFoundException {
   try (Scanner scan = new Scanner(f)) {
     while (scan.hasNext()) {
         lines.add(scan.nextLine());
     }
   }
   catch (Exception e) {
      System.out.println("Error: " + e.getMessage());
   }
}
```

In the above example, the recourse is right behind the try statement. Now the resource is automatically closed when block exits. Now references to files can "disappear", because we do not need them anymore. If the resources are not closed, the operating system sees them as being in use until the program is closed.
Also, no `catch` is required, since the `FileNotFoundException` is thrown by the method. However, you can still add a catch block like is done here, to get information if an exception was thrown anyways.


<text-box variant='hint' name='Blast from the past: try - finally'>

A language construct that was used before the better option of the try-with-resources was introduced, is the try-finally, that combines a `try` block with a `finally` block. The `finally` block is always executed as soon as the try block is exited, no matter the reason; whether the end was just reached, an exception was raised or even when a value was returned.
Here is an example:
```java
String s = "hello over there.";
try {
   if (s.contains("hello")) {
      return true;
   }
}
finally {
   System.out.println("This will always be printed.");
}
```

The main use case for the finally block was to make sure that resources, such as files or network connections, are released when the program is done with them.
For example, you would call the `close()` method on a `Scanner` in a finally block. Since the try-with-resources block does this automatically for us, the use
cases for a finally block are very limited nowadays.

</text-box>

### Shifting the responsibility
Methods and constructors can throw exceptions. There are roughly two categories of exceptions.
The first category is types of exceptions that **may** be caught, such as the `IllegalArgumentException`, the `IllegalStateException`, and the `NumberFormatException`.
Other types of exceptions **must** be caught or declared in the method header using `throws`. These are called **checked exceptions**, such as the `IOException` and the `FileNotFoundException`.
Some problems are so severe that they will stop your program if they occur. These are called `Error` instead of `Exception`, such as the `OutOfMemoryError` and `StackOverflowError`.

We can handle exceptions by wrapping the code into a `try-catch` block or *throwing them out of the method*.

Parsing a number can throw an exception -- for example, the input might not be numeric at all or the variable type is not right.
This kind of exception may be handled.
We handle the exception by wrapping the code into a `try-catch` block.
In this example, we do not really care about the exception, but we do print a message to the user about it.

```java
public int readNumber(){
    try {
        System.out.println("Please enter the amount to withdraw");
        String line = s.nextLine();
        int amount = Integer.parseInt(line);
    } catch (Exception e) {
        System.out.println("Error: " + e.getMessage());
    }
    return amount;
}
```

A programmer can also leave the exception unhandled and shift the responsibility for handling it to whomever calls the method.
We can shift the responsibility of handling an exception forward by throwing the exception out of a method, and adding notice of this to the declaration of the method.
This means that between the open and close parentheses that hold the arguments, and before the `{` symbol that indicates the start of the block with the implementation
of the method, we write `throws ExceptionType` where `ExceptionType` is the type of the `Exception` that can be thrown. To indicate multiple different exception types
can be thrown, they are separated by comma's. And example where we indicate that a method may throw a NumberFormatException is written as follows.

```java
public int readNumber() throws NumberFormatException {
    System.out.println("Please enter the amount to withdraw");
    String line = s.nextLine();
    int amount = Integer.parseInt(line);
    return amount;
}
```

**TODO:** Dit is niet accuraat; in het bovenstaande voorbeeld hoeft de aanroeper niets te doen in dit voorbeeld, omdat het geen checked exception is.
Je komt dat toch uit bij een voorbeeld met een IOException, of dieper uitleggen dat dit alleen een indicate is, maar het een verplichting wordt als
het een check exception is. Dat is wel lastig;


Now the method calling the `readNumber` method has to either handle the exception in a `try-catch` block or shift the responsibility yet forward.
Sometimes the responsibility of handling exceptions is avoided until the end, and even the `main` method can throw an exception to the caller:

```java
public class MainProgram {
   public static void main(String[] args) throws Exception {
       // ...
   }
}
```

This indicates that an Exception can be thrown by the main method, and thus that the executing of the program may stop due to an exception.

### Throwing exceptions
The `throw` command throws an exception.
For example a `UnsupportedOperationException` can be done with command `throw new UnsupportedOperationException()`.
The following code always throws an exception.

```java
public class Program {

    public static void main(String[] args) throws Exception {
        // Program throws an exception
        throw new UnsupportedOperationException();
    }
}
```

We can also add an error message to the Exception, so the person who runs the programs get a bit more information
of what is wrong:

```java
public class Program {

    public static void main(String[] args) throws Exception {
        String msg = "I was too lazy to implement this program"
        // Program throws an exception
        throw new UnsupportedOperationException(msg);
    }
}
```

One exception that we are not forced to handle is the `IllegalArgumentException`.
The `IllegalArgumentException` tells the user that the values given to a method or a constructor as parameters are *wrong*.
It can be used when we want to ensure certain parameter values.

Lets create class `Grade`. It gets a integer representing a grade as a constructor parameter.

```java
public class Grade {
    private int grade;

    public Grade(int grade) {
        this.grade = grade;
    }

    public int getGrade() {
        return this.grade;
    }
}
```

We want that the grade fills certain criteria. The grade has to be an integer between 0 and 5. If it is something else, we want to *throw an exception*.
Let's add a conditional statement to the constructor, which checks if the grade fills the criteria.
If it does not, we throw the `IllegalArgumentException` and provide a helpful message
with `throw new IllegalArgumentException("Grade must be between 0 and 5.");`.

```java
public class Grade {
    private int grade;

    public Grade(int grade) {
        if (grade < 0 || grade > 5) {
            String msg = "Grade must be between 0 and 5.";
            throw new IllegalArgumentException(msg);
        }

        this.grade = grade;
    }

    public int getGrade() {
        return this.grade;
    }
}
```

```java
Grade grade = new Grade(3);
System.out.println(grade.getGrade());

Grade illegalGrade = new Grade(22);
// exception happens, execution will not continue from here
```

<sample-output>

3

Exception in thread "..." java.lang.IllegalArgumentException: Grade must be between 0 and 5.

</sample-output>

If an exception is a runtime exception, e.g. IllegalArgumentException, we do not have to warn about throwing it on the method declaration.

<programming-exercise name='Validating parameters (2 parts)' tmcname='part11-Part11_11.ValidatingParameters'>

Let's practice a little parameter validation with the `IllegalArgumentException` exception. There are two classes included with the exercise base: `Person` and `Calculator`. Modify the classes in the following manner:

<h2>Validating a person</h2>

The constructor of the class `Person` should ensure that the name given as the parameter is not null, empty, or over 40 characters in length. The age should between 0 and 120. If some of these conditions are not met, the constructor should throw an `IllegalArgumentException`.

<h2>Validating the calculator</h2>

The methods of the `Calculator` class should be as follows: The method `factorial` should only work if the parameter is a non-negative number (0 or greater). The method `binomialCoefficient` should only work when the parameters are non-negative and the subset size does not exceed the set size. If these methods receive invalid parameters when they are called, they should throw an `IllegalArgumentException`

</programming-exercise>

### Design principles
Exceptions are meant to deal with **exceptional** situations. They should thus not be used for regular control flow! Throwing and handling exceptions is not optimized, as language designers assume they don't occur very often.

You should **throw early, catch late**. It means that you should check the input of a method before you start doing computations. If the input is not okay, throw an exception.
If an exception can occur within a method that is not able to provide a good solution to the problem, the exception should be thrown to the caller.

Last but not least: _never use **return** in a finally block!_ It may cause weird behavior, such as canceling a thrown exception. The best alternative is to use try-with-recourses.

### Details of the exception
A `catch` block defines which exception to prepare for with `catch (Exception e)`.
Here, `e` is a variable name often used in this context, although we can also choose a different name
such as `ex`. Java would not be a proper object-oriented language if the exceptions were not objects as
well. Thus, the variable `e` in the example holds a reference to an object from which we can extract
information.

```java
try {
    // program code which might throw an exception
} catch (Exception e) {
    // details of the exception are stored in the variable e
}
```

The `Exception` class has some useful methods. For example, we can use `getMessage()`
to obtain the error message that is part of the Exception object.
Another example we saw is the `printStackTrace()` prints the *stack trace*, which shows from whhere we ended up with this exception.
Below is a stack trace printed by the `printStackTrace()` method.

<sample-output>

Exception in thread "main" java.lang.NullPointerException
  at package.Class.print(Class.java:43)
  at package.Class.main(Class.java:29)

</sample-output>

We read a stack trace from the bottom up. At the bottom is the first call, so the execution of the program has begun from the `main()` method of the `Class` class.
Line 29 of the main method of the `Class` class calls the `print()` method.
Line 43 of the `print` method has thrown a `NullPointerException` exception.
The details of an exception are very useful when trying to pinpoint where an error happens.

