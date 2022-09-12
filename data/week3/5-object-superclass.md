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

A number of methods is defined in the Object class. Some of those are outside the scope of this course, such as `clone()`, `finalize()`, `getClass()`, `notify()`, `notifyAll()`, and `wait()`. That leaves us with three methods that we will cover: `toString()`, `equals()`, and `hashCode()`. Here, we will only cover the first. The other two will be covered next week. Although you have used the `equals` method in the past, we will cover it in more depth than we did before.

### toString() method

The `toString()` method is used to obtain a `String` that describes the object, and is automatically called when we print an arbitrary object, like `System.out.println(anyObject);`.
The default behavior defined in the `Object` class is that the JVM prints the name of the class, the @ symbol and something which resembles (but is not exactly) the identity of the object.
When you print objects of your own classes, you typically see something like this: `ClassName@23df3521`. This is due to the default implementation of `toString()` method in the `Object` class.
However, since `toString()` is just a method, it is very useful to override it if we want to print objects of the class we are creating.
The `System.out.println` method, or concatenation to a `String` with an expression like `"My object" + myObj` makes sure the`toString()` method is called automatically to convert the
to a `String` automatically.


<Exercise title="Test your knowledge">

In this quiz, you can test your knowledge on the subjects covered in this chapter.

Suppose you create a class as follows:

```java
public class EmptyClass { }
```

Does this class have a superclass? Can you call any methods on objects of this class?

<Solution>

The class has `Object` as it's superclass. You can call the methods that are available in
`Object`, for example `toString` or `equals` on objects of the `EmptyClass` class.

</Solution>

---

Explain what the default `toString` method does. Why would you want to override it?

<Solution>

The default behavior is that it prints the class name, a @ and something that resembles
a memory address that is different from object to object.

Often, it is much more convenient if we can see the contents of an object. For example,
if we have a `Student` object, it is much more helpful if the name of the student and/or
the student number are printed, rather than the location in the computer's memory.
By overriding the `toString` method, we can make sure that the interesting information
gets printed.

</Solution>

</Exercise>
