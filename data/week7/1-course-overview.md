---
path: '/week7/1-course-overview'
title: 'Course overview'
hidden: false
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You revise all the subject matter and prepare well for the exam

</text-box>

## Classes and Objects
### Classes
You need to understand how you write a class; you put each class in its own .java file, with the basic syntax: `public class MyName … { … }`.
Within the class you can define variables and methods. The typical order is to first define the variables, then the constructors, and last the
methods.

You need to know the distinction between instance variables and class (static) variables and local variables
You can define methods to operate on objects (regular methods) and to operate without an object (static methods).
Methods that only read information from the object are called _accessor methods_. Methods that change the state/information stored in the object are called _mutator methods_.
Methods and constructors can be _overloaded_. The type system is used to figure out which one will be executed.

### The Type System
Java is a _strongly typed_ language. As a result, all variables and expressions have a type. Expressions can be all kinds of things, e.g. just a literal `36`, a variable `x`, summing two variables `x + y`, a call to a method `Math.min(3,5)` or even a call to a constructor `new ArrayList<Integer>()`.
There is an important distinction between primitive types and nonprimitive types, although _Autoboxing_ converts primitive values 'automaticaly' to non-primitive values and vice-versa. To convert between types, _implicit casts_ are allowed when the compiler can reason they are safe. _Explicit casts_ are potentially unsafe.
You have _generic types_, like `ArrayList<Integer>` or `Map<String,Integer>`, where generic types are denoted by a type variable (e.g. `ArrayList<E>` or `Map<K,V>` )

You also need to understand relations between types: 
- Interfaces can be implemented by classes, which implies objects of that class can also be used as the type of the interface. (subtype: class, supertype: interface)
- When working with inheritance, subclasses also are of the type of their superclass, but the other way around needs explicit casting.
- Relations can be visualized using a class hierarchy diagram (which can also show interfaces and abstract classes).

The compiler uses the type system to reason about the correctness of types in your code. You should be able to reason about types like the compiler does. This is an important skill when you are coding in a team, use libraries written by other people, etc.
   
### Casting and instanceof
Suppose that we have a Herbivore which is a subclass of Creature. Which of the following assignments are okay?

```java
Herbivore h = new Herbivore();
Creature c = h;
Herbivore h2 = c;
```
The third line is not, because a `Herbivore` is more specific than a `Creature` by being a subclass. Thus, the `Creature` object cannot be cast into a `Herbivore` object.
The second line, however, performs an implicit cast (it is always safe, since we go _from a subtype to a supertype_).
It is important that you can figure out these sorts of errors for Question 3 in the practice exam!
If we want to convert a creature to a human, we have to check the type of the creature and perform a cast afterwards.
```java
if (c instanceof Human) {
    Human h2 = (Human) c;
}
```

### Objects
You should be able to instantiate objects using their constructor. 
You should understand that you can call methods on objects.
- Within a class, you can just call the methods of the current object without using a
period to call them. (e.g. within countFile() you can call count())
- When you call methods on other objects, you need the period.

```java
public int sizeSquared(Collection<?> col) {
    return col.size() * col.size();
}
```

You can also pass objects to methods and constructor (see above). You can obtain a reference to the _current_ object via the `this` keyword.
You should be able to use some basic objects used during the assignments (e.g. `String`, `BigInteger`, `ArrayList`, `PrintWriter`, `Scanner`, etc.).
Also, you should be able to call and use methods of classes you have not seen before, but for which an explanation is provided of how they work.

### References and (Im)mutability
Variables of non-primitive types hold references. We can have multiple references to the same object. This can lead to confusion if you modify the object using one reference, since these modifications will also be observable via the other references. 
A non-primitive variable can also hold a `null` reference. If that is the case calling a method on in or accessing an instance variables throws a `NullPointerException`.
Some classes have been designed such that all modifications of an object are forbidden. Notable examples are `String` and `Integer`. Objects of these classes are called _immutable_. With such objects you don’t have to worry about the reference issue.
Other classes, however, can be modified and are called _mutable_. The `Collection`s are notable examples.
Reasoning about references can be made easier using _Memory State Diagrams_.

## Exceptions
When a problematic situation is detected, programs can and should raise an exception. In Java, an exception is raised using the `throw` keyword and an object of type `Throwable`.
You can indicate that a method might throw an Exception using the `throws` keyword in the method header.
You have multiple constructions with the `try` keyword:
- The `try-catch` construction (multiple catch clauses allowed)
- The `try-finally` construction (executed as soon as the try clause is exited)
- The `try-catch-finally` construction (combination of above)
- The `try-with-resources` construction (no catch or finally necessary)

There are _checked exceptions_ and _unchecked exceptions_. Subclasses of `Error` and `RuntimeException` are unchecked. All other exceptions are _checked exceptions_.
Checked exceptions either need to be caught, or thrown the caller (this can be indicated with throws in the method header). This is not necessary for unchecked exceptions, but if you throw them, it is nice to still indicate this to other programmers in the method header.
The only checked Exceptions that you have dealt with are the `IOException` and `FileNotFoundException`.
For instance, the constructors of `Scanner`, `PrintWriter` and `FileInputStream` can throw a `FileNotFoundException`. The readLine() method of BufferedReader can throw a `IOException`.
This is not indicated in the reference you have available at the exam, so you should remember it!

## Interfaces
dia 10
