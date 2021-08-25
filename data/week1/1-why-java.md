---
path: '/week1/1-why-java'
title: 'Why Java?'
hidden: false
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

Another important reason for the popularity of Java is that a Java program can be run on any platform. This means that you can easily share your written program with someone else and that this person can directly run your code without having to make changes or to transform the code to a different format. This is made possible by the `Java Compiler`, which translates the source code written by programmars to so-called *bytecode*. This bytecode is then executed by a program called the *Java Virtual Machine* (JVM), that is available for many different hardware platforms. The JVM technology is very powerful and clever, and can decide to convert the bytecode to `CPU-specific Assembly` to make the code run very efficiently .

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
\
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

Java programs, as we write them, contain instructions for the Java Virtual Machine (JVM).
The Java Virtual Machine translates these instructions to bytecode (zeros and ones) for the CPU, the Central Processing Unit (CPU), which then executes the translated instructions.

</Solution>    
    
    
### For loops

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

    
### Types

What is a type?
    
<Solution>

A type is a named set of values and the operations that can be carried out with them. 

Think for instance of a String: it is a set of all words or letter combinations you can think of, and you can use it's operations, such as requesting the length of the String.

</Solution>


### Object Oriented Programming 

What is an object?

<Solution>

An object is an instance of a class, so from one class, several objects can be made. An object has instance variables that are specific to the internal state of that object. The object's methods specify what the object does.
    
Think for instance of dogs. A class can be called `Dog`. Each dog has its own characteristics (i.e. states) and behaviors. The states of a dog could be his color, name, and breed. It's behaviors could be wagging the tail, barking, or eating.
    
</Solution> 
    
    
What is a constructor?

<Solution>

A constructor instantiates a new object when you use the `new` keyword.
The object's variables are set to default or to arguments that you passed to the constructor.

</Solution> 
    
    
</Exercise>
