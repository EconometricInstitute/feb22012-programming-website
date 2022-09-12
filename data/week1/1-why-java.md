---
path: '/week1/1-why-java'
title: 'Why Java?'
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- Understand why Java is an interesting programming language to learn.

- Remember what you have learned in Introduction to Programming.

</text-box>

## Java compared to other programming languages
Java is a member of the class of object-oriented programming languages, where objects and types offer a convenient abstraction to think about the code that you write. The use of types avoids common mistakes in other languages.
Java is also considered a *strongly typed* language, meaning that it applies strict typing rules at compile time.
Other popular programming languages such as `Javascript`, `Python`, `R` or `Matlab` are not as strongly typed as is Java and do not require users to be aware of the typing rules. If you start learning one of those languages, you would need to learn the typing rules before you can use Java. When moving from Java to one of those languages, you have learned a good structured way to avoid confusion of data types in a language that is more flexible. It is thus easier to move from Java to one of these than the other way around.
There are, however, more languages that use objects and types, such as `C++` and `C`. Still, Java is easier to learn because it does not involve difficult memory management.
Learning Java will thus provide you with a good basis for learning many other popular (object-oriented and procedural) programming languages.

Another important reason for the popularity of Java is that a Java program can be run on any platform. This means that you can easily share your written program with someone else and that this person can directly run your code without having to make changes or to transform the code to a different format. That is made possible by the `Java Compiler`, which translates the source code written by programmers to so-called *bytecode*. This bytecode is then executed by a program called the *Java Virtual Machine* (JVM), that is available for many hardware platforms. The JVM technology is very powerful and clever, and can decide to convert the bytecode to `CPU-specific Assembly` to make the code run very efficiently.

## Introduction to Programming
Earlier, you have taken the course `Introduction to Programming`. You may want to visit the [website of Introduction to Programming](https://feb21011.ese.eur.nl/) to recall things that you have learned last year. Here, you are provided with a very short recap only.

The first program that you have written has probably looked something like this:
```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello world!");
    }
}
```

In the weeks after, you have learned to use loops to prevent repetitive code and if-statements to account for multiple cases. To store large quantities of values, you have learned to use arrays and lists. Also, you have written methods to structure your code and used objects to create different instances of one construct.

## This course
In this course, you will become more experienced with some of the most important concepts related to Object Oriented Programming in Java.
In essence, our aim is that you will be able to write Java programs to solve complex problems that you will encounter during your studies,
and learn valuable concepts that allow you to easily learn more complex features of languages such as Python and R.

<Exercise title="Recap Quiz">

In this quiz, you can test your basic knowledge of Introduction to Programming.

### JVM

What does the Java Virtual Machine do?

<Solution>

Java programs, as we write them, are compiled to Java *bytecode* by the Java compiler. The Java Virtual Machine (JVM) translates these instructions to machine code for the CPU, the Central Processing Unit (CPU), which then executes the translated instructions. Different computer platforms (e.g. Windows, Mac OS, iOS, Android) each have their own JVM, which can execute Java bytecode. This way, it is (usually) easy to transfer Java programs from platform to another platform.

</Solution>


### For and while-loops

What is wrong with the following piece of code?

```java
for (int i = 0; i < 10; i++); {
    System.out.println(i);
}
```

<Solution>

The semicolon behind the condition should not be there.

The condition and the execution block of the for loop belong together and should thus not be separated by a semicolon.

</Solution>

---

How does a for-each loop work?

<Solution>

A for each loop is called on a List and does something for every element in the list.
For instance:

```java
String sentence = "";
List<String> myList = List.of("h", "el", "lo", " there", "!");
for (String s : myList) {
    sentence = sentence + s;
}
System.out.println(sentence);
```

Will print the sentence: "Hello there!"

</Solution>

---

Rewrite the following method so that it contains a for-loop rather than a while loop:

```java
public static String repeat(String text, int repetitions) {
    int i = 0;
    StringBuilder sb = new StringBuilder();
    while (i < repetitions) {
        sb.append(text);
        i++;
    }
    return sb.toString();
}
```

<Solution>

```java
public static String repeat(String text, int repetitions) {
    StringBuilder sb = new StringBuilder();
    for (int i=0; i < repetitions; i++) {
        sb.append(text);
    }
    return sb.toString()
}
```

</Solution>

---

Rewrite the following method so that it contains a while-loop rather than a for-loop:

```java
public static int sumProduct(int[] listA, int[] listB) {
    int result = 0;
    for (int i=0; i < listA.length && i < listB.length; i++) {
        result += listA[i] * listB[i];
    }
    return result;
}
```

<Solution>

```java
public static int sumProduct(int[] listA, int[] listB) {
    int result = 0;
    int i=0;
    while (i < listA.length && i < listB.length) {
        result += listA[i] * listB[i];
        i++;
    }
    return result;
}

```

</Solution>

---

Rewrite the following method so that it contains a for-loop rather than a while loop:

```java
public List<String> makeList() {
    List<String> result = new ArrayList<>();
    while (moreComing()) {
        result.add(nextString())
    }
    return result;
}
```

<Solution>

Note that a for is unnatural for this function. However, we are allowed to leave everything except the condition empty in the for-loop:

```java
public List<String> makeList() {
    List<String> result = new ArrayList<>();
    for (;moreComing();) {
        result.add(nextString())
    }
    return result;
}
```

</Solution>


### Types

What is a type?

<Solution>

A type is a named set of values and the operations that can be carried out with them.

Think for instance of the type String: it is a set of all possible Strings, which can be all combinations of words, letters and symbols you can think of. On each object of the String type, you can use its operations, such as requesting the length of the String.

</Solution>


### Object-Oriented Programming

What is an object?

<Solution>

An object is an instance of a class. From one class, several objects can be made. An object has instance variables that are specific to the internal state of that object. The classes non-static methods specify what methods can be performed on the object.

Think for instance of dogs. Each dog has its own characteristics (i.e. states) and behaviors. If we would create a class `Dog` that repesents dogs, the states of a dog could for example be the dog's color, name, and breed. We could create methods for wagging the tail, barking, or eating to mimic a dog's behavior.

</Solution>

---

What is a constructor?

<Solution>

A constructor instantiates a new object when you use the `new` keyword.
The object's instance variables are set to defaults or they can be set by the constructor using arguments that you passed to it.

</Solution>

---

What does a class do?

<Solution>

A class contains the blueprint needed to create objects, and also defines the objects' variables and methods. An object is created using the constructor of the class.

</Solution>

</Exercise>
