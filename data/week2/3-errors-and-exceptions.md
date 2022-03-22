---
path: '/week2/3-exception-mechanism'
title: 'The Exception Mechanism'
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

 - You know what exceptions are and how to handle them

 - You can throw exceptions

 - You know that some exceptions have to be handled and that some exceptions do not have to be handled.

</text-box>

## Exceptions
When program execution ends with an error, the runtime error is so severe that an exception is thrown. For example, a program might call a method with a *null* reference and throw a `NullPointerException`, or the program might try to refer to an element outside an array and result in an `IndexOutOfBoundsException`, and so on.
Some exceptions we have to always prepare for, such as errors when reading from a file or errors related to problems with a network connection. On the other hand, we do not have to prepare for runtime exceptions, such as the NullPointerException, beforehand. Java will always let you know if your code has a statement or an expression which can throw an error you have to prepare for. If you do not handle those types of error properly in your program, your program will not compile.
Java has special features incorporated into the language that can pass control to a handler, from the point a runtime error was detected.

<text-box variant='hint' name='Read the Error Message!'>

Mostly, if programs terminate and report an exception, quite a few students give up at that point, without actually reading the error message. Admittedly, the format of the exception report is not very friendly, but with some practice it is easy to decipher it.

There are two pieces of useful information:

 1. The name of the exception, such as `ArrayIndexOutOfBoundsException`
 2. The stack trace; the method calls that led to the exception, such as `Homework1.java:15` tells us we have to look at line 15 in the Homework1 file.

 Note that in many situations the line where there exception occurs does not have to be the line with the incorrect code. With a `NullPointerException`, the problem is usually that you forgot to initialize a variable somewhere else, but you will see the error at the point where you try to use the variable. It is thus often needed to reason backwards to find the root of the problem. This is challenging, but with practice you will see that you will get better at it!

</text-box>

## The Exception Mechanism
In Java, the _exception mechanism_ provides a flexible mechanism for passing control from the point of error detection to a handler that can deal with the error. In the following paragraphs, we will cover throwing and catching exceptions.

### Throwing exceptions
When something goes wrong or unexpected happens while the program is running, it typically makes no sense to continue running the code in the regular fashion. In Java, you can raise an exception, which will break the normal control flow.
Raising an exception means that the execution of the current method is stopped, and that we return to the calling method with an exception status. There are two options in the calling method: it can either handle the exception, or it will
pass on the exception to the method that called it. When an exception is raised, an none of the calling methods handle it, the execution will stop and the program will terminate with an error.

You can raise an exception with the `throw` keyword, which behaves very similar to the `return` keyword, the difference being that is ignores the return type of the method, but raise an exception.
It is a good idea to indicate what types of exception may be raised by `throw` statements in a method. This can be indicated in the method header using the `throws` keyword.

Here is an example of a method that uses the `throw` keyword to raise an exception if not enough money is on a bank account. The exception type used is an `IllegalArgumentException`:
```java
public void withdrawMoney(int amount) throws IllegalArgumentException {
   if (amount > balance) {
      throw new IllegalArgumentException("Balance too low");
   }
   balance -= amount;
}
```

In the example above, a new exception object is constructed, and then it's thrown. Most exception objects can be constructed with an error message, like this one.
Also note that you don't need an 'else' because the exception will stop the method, like a return statement does, in case the if-statement is met.


Let consider some more examples of exceptions. For example, an `UnsupportedOperationException`
can be raise using the statement `throw new UnsupportedOperationException()`.
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

Now let's use this in a class `Grade`. It gets a integer representing a grade as a constructor parameter.

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

### Exception Handling: try - catch

While it is of course helpful that raising an exception makes a user aware that something went wrong,
we may also consider to try and resolve such situations within our program. This is called *handling an exception*.
We can use a `try {} catch (Exception e) {}` block structure to handle exceptions. The keyword `try` starts a block
containing the code which *might* throw an exception. The block starting with the keyword `catch` defines what happens
if an exception is thrown within the `try` block. We use the keyword `catch`, because causing an exception is referred
to as `throw`ing an exception. The keyword `catch` is followed by the type of the exception handled by that block, for example:

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

A possible interaction (with input displayed in red) could look as follows:

<sample-output>

Please enter the amount to withdraw.

**Twenty**

Input was not a valid number. Please try again.

**80**

Amount exceeds balance of 50. Please try again.

**20**

Balance is now: 30

</sample-output>

In the code above, two catch blocks appear. We place more specific exceptions before more general ones. You can also choose to catch all exceptions at once with the general statement `catch (Exception e)`.
**Although this seems very convenient, you are obliged to be as specific as possible in declaring catch statements.** Thus, you should not use anything like `Exception e`, but rather somethin like an `IllegalArgumentException`.

Here is an example in which we look at the situation of parsing strings to integers.
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

<text-box variant='hint' name='When possible, use specific exception types!'>

In some of the examples we use the type `Exception`. In general, it is a good idea to use more specific
exception types. If a caller of your method has to deal with the type `Exception`, they do not get any
kind of information on what can go wrong and whether or not they should try to handle it. If the type is
`IllegalArgumentException`, this conveys the message that not all arguments passed to the methods may be
valid to the caller, which is much more informative.

Additionally, it is possible to specify that a method can throw different types of exceptions, and it is
possible to create multiple catch blocks for the different types of exceptions. This can be handy if, for
example, you want to treat the situation where there is not enough money on a bank account different from
the situation where a network error occurs while communcating with the bank.

</text-box>

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

Last but not least: _never use **return** in a finally block!_ It may cause weird behavior, such as canceling a thrown exception.

</text-box>

### Checked and Unchecked Exceptions
Methods and constructors can throw exceptions. There are roughly two categories of exceptions.
The first category is types of exceptions that **may** be caught, such as the `IllegalArgumentException`, the `IllegalStateException`, and the `NumberFormatException`.
Other types of exceptions **must** be caught or declared in the method header using `throws`. These are called **checked exceptions**, such as the `IOException` and the `FileNotFoundException`.
Some problems are so severe that they will stop your program if they occur. These are called `Error` instead of `Exception`, such as the `OutOfMemoryError` and `StackOverflowError`.

When unchecked exception can occur in your program, your program will compile without problems and when something goes wrong, the error will typically not be handled and your program
stops displaying an exception. With checked exceptions, we have to make sure that their are either handled using a `try-catch`, or delegate the responsibility to handle them using a
`throws` keyword in the method header.

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
can be thrown, they are separated by comma's. And example where we indicate that a method may throw a `IOException` is written as follows.

```java
public int readFile() throws FileNotFoundException {
    String fileName = "myFile.docx";
    Scanner in = new Scanner(New File(fileName));
    String input = in.next();
    int value = Integer.parseInt(input);
    ...
}
```

The `throws` clause signals the caller of your method that it may encounter a `FileNotFoundException`. Then the caller needs to make the decision whether to handle the exception, or declare that the exception may be thrown.
Note that you **must** specify all checked exceptions that a method may throw. This means either check exceptions that are directly thrown with the `throw` keyword, or any unhandled checked exceptions that may be thrown
by other methods called inside the method.

Sometimes the responsibility of handling exceptions is avoided until the end, and even the `main` method can throw an exception to the caller:

```java
public class MainProgram {
   public static void main(String[] args) throws Exception {
       // ...
   }
}
```

This indicates that an `Exception` can be thrown by the main method, and thus that the executing of the program may stop due to an exception.
This is generally not adviced if you intend to create robust, user friendly software, but it can be very handy when you create a quick prototype
or code for computational experiments.


### Accesing Details of an Exception
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

### Design principles
Exceptions are meant to deal with **exceptional** situations. They should thus not be used for regular control flow! Throwing and handling exceptions is not optimized, as language designers assume they don't occur very often.

You should **throw early, catch late**. It means that you should check the input of a method before you start doing computations. If the input is not okay, throw an exception.
If an exception can occur within a method that is not able to provide a good solution to the problem, the exception should be thrown to the caller.

<text-box name="exceptions tutorial" variant="hint">

If you still feel like you are struggling with the understanding of exceptions, feel free to check this [tutorial](https://docs.oracle.com/javase/tutorial/essential/exceptions/).
Note that it also includes some nice exercises at the bottom of the page. The blue paragraph titles are clickable.

</text-box>

<Exercise title="Test your knowledge">

In this quiz, you can test your knowledge on the subjects covered in this chapter.

What is an exception used for?

<Solution>

An exception is an event which occurs during the execution of a program, that disrupts the normal flow of the program's instructions. The exception is an object that tells you more about what went wrong.
You can code beforehand what to do in case of exceptions. So, an exception is used to either let the code know what to do in case an exception is thrown, or to let the user know that something went wrong.

</Solution>


Does the general statement `catch (Exception e)` always work when catching an exception?
If so, is it desirable to do this? If it does not always work, what do we do when the general statement does not work?

<Solution>

Yes, this general statement always works in a `try-catch` composition, but is not necessarily desirable. It is much better to be more specific about the exceptions that you expect as a coder. That makes the code easier to read and it also makes the exceptions easier to handle for other programmers that use your code.

</Solution>

What will happen in case an exception occurs in the code below?
```
 try {
    doSomething();
}
catch (Exception e) {
 }
```
 
<Solution>

Nothing will happen. The code will continue as if nothing happened. As a programmer or user, you will receive no indication that something went wrong. 
However, your results will be useless and may contain many errors. 
To prevent this from happening, you should always put something in the `catch` block, such as `e.printStackTrace();`, to get an indication if something went wrong.

</Solution>

#TODO may later want to add a question on checked and unchecked exceptions.

</Exercise>
