---
path: '/week3/5-object-superclass'
title: 'Object, the Cosmic Superclass'
ready: true
hidden: false
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You know that in the Java programming language every class inherits the Object class, either directly or indirectly
- You understand why every object has methods such as `toString`, `equals`, and `hashCode`.

</text-box>

## Object: the cosmic superclass

In case we you do not define a superclass in a class header, that class will still extend the `Object` class. As a result of the fact that subtype/supertype relations are transative, this means every class in Java is a subclass of Object.
Therefore, `Object` is sometimes referred to as the *cosmic superclass*, since it is the superclass of everything.

A number of methods is defined in the Object class. Some of those are outside the scope of this course, such as `clone()`, `finalize()`, `getClass()`, `notify()`, `notifyAll()`, and `wait()`. That leaves us with three methods that we will cover: `toString()`, `equals()`, and `hashCode()`. Here, we will only cover the first. The other two will be covered next week.

### toString() method

The `toString()` method is used to obtain a `String` that describes the object, and is automatically called when we print an arbitrary object, like `System.out.println(anyObject);`.
The default behavior defined in the `Object` class is that the JVM prints the name of the class, the @ symbol and something which resembles (but is not exactly) the identity of the object.
When you print objects of your own classes, you typically see something like this: `ClassName@23df3521`. This is due to the default implementation of `toString()` method in the `Object` class.
However, since `toString()` is just a method, it is very useful to override it if we want to print objects of the class we are creating.
The `System.out.println` method, or concatenation to a `String` with an expression like `"My object" + myObj` makes sure the`toString()` method is called automatically to convert the
to a `String` automatically.
