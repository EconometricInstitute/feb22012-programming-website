---
path: '/week4/4-finding-and-comparing-objects'
title: 'Finding and Comparing objects'
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

 - You understand the difference between the `==`-operator and the `equals()` method.
 - You understand why many standard classes such as `String` and `Integer` override the `equals()` method.
 - You are aware that you should prefer to use your IDE (IntelliJ/Eclipse) to generate the code for `equals()` rather than write it yourself.

</text-box>

## Comparing objects
In some cases, we must retrieve and compare data from memory for the use of our program. Think of finding out whether a certain transaction occurs in multiple datasets, or computing some aggregate scores for the same person, item, or identifier across multiple data sets, or keeping track of how often certain events occur during a simulation.
To do this, we need two things: a structured way to store data (such as an array, ArrayList or ...), and a way to compare new to old objects.

Please consider the following example:
```java
Integer i1 = new Integer(12);
Integer i2 = new Integer(12);
System.out.println(i1 == i2);
System.out.println(i1.equals(i2));
```

will print

<sample-output>
false
true
</sample-output>

Just like in real life, there is a distinction between two variables with the same contents (copies) and variables referring to the exact same object (references).
The `==` operator tests what is stored in the two variables. For primitive types, this is the actual value, whilst for non-primitive types, this is a reference (or memory address). Let us look into this difference a bit deeper.

Using the code below, let us take a look at how the system processes the code to gain a better understanding of the compiler's behavior.
```java
int a = 12;
int b = 12;
Integer i1 = new Integer(12);
Integer i2 = new Integer(12);
Integer i3 = i2;
```
<img width="400" alt="In the above image, you can see how the memory stores the various Integer values. i1's reference points towards an Integer object that stores the value 12. The variables i2 and i3 both point towards the same object, but to another object than i1 points to. This other object is also an Integer object, storing the value 12." src="https://user-images.githubusercontent.com/67587903/128515240-8e271590-1110-4ac2-b8ad-22ca7309b688.PNG">

In practice, the memory of a computer is linear. It is a very long array of bits. Although arrows are visually appealing, when we compare references we actually compare memory addresses, like in the picture below.

<img width="500" alt="Picture display a sequence of memory with at some positions the objects of our program. The memory addresses are display (20 to 70, similar to an index) and the variables from the previous example are indicated at different locations in the memory. A detailed description is right below the image." src="https://user-images.githubusercontent.com/67587903/128515242-cf8a2364-b4ef-4127-97f1-3db838abbf24.PNG">

Here, the linear computer memory is displayed by a sequence of numbers and words. Since a and b are primitive types, actual values are stored in the memory. When we compare `a==b`, we compare the numbers 12 and 12.
Since `i1` is a non-primitive, the memory address of the object it references is stored in the memory. The 49 tells it that it can be looked up from character 49 onwards. `i2` is stored in the memory from index 63 onwards. When we compare `i1==i2`, we compare 49 with 63.

When we want to compare the **contents** of objects, the `equals` method should be used, instead of the `==` operator. In the Introduction to Programming course, you learned that the Object class contains a method `equals(Object other)`. The default implementation of this method does the same as the == operator, but it can be overridden. Most classes that you are familiar with, such as `String` and `Integer`, do so. The fact that it is overridden in the `Integer` class is the reason why in the example above, `i1.equals(i2)` returns true.

For strings, `equals` works as expected in that it declares two strings _identical in content_ to be 'equal' even if they are two separate objects. The String class has replaced the default `equals` with its own implementation.
If we want to compare our own classes using the `equals` method, then it must be defined inside the class. The method created accepts an `Object`-type reference as a parameter, which can be any object.

We suggest that you do not try to write the code for an overridden `equals` method yourself, but use IntelliJ or Eclipse to generate it for you, since doing so correctly is non-trivial. If you try to do this yourself,
you will typically see that the following elements are used: the comparison first looks at the references. If the argument points to the same object in memory, they should be equal. If they are two separate objects, this is followed by checking the parameter object's type with the `instanceof` operation - if the object type does not match the type of our class, the object cannot be the same. Then, if the class is the same, a cast is performed after which the object variables are compared against each other.

There is one more issue to take into account when you override the equals method: if we do so, we should take care of the `hashCode` method as well. To understand why this is the case, you have to understand what the contract of the `hashCode` method is, and what it is used for, which we discuss in the next section, *Equals and Hashcode*.

<Exercise title="Test your knowledge">

In this quiz, you can test your knowledge on the subjects covered in this chapter.


Suppose a fellow student has implemented a class `Dataset`. Suppose you have obtained two references to two `Dataset` objects held in variables `a` and `b`.
Which of the following statements are true?

1. If `a == b` returns `true`, then `a.equals(b)` must also return `true`.
2. If `a == b` returns `false`, it is still possible that `a.equals(b)` returns `true`.
3. Assuming `a` and `b` are not null, it is guaranteed that `a == b` and `a.equals(b)` always return the same.
4. Assuming `a` and `b` are not null, it is possible that `a == b` and `a.equals(b)` always return the same.
5. If `a.equals(b)` returns `false`, then `a == b` must also return `false`.

<Solution>

1. **True**: if `a == b` is `true`, this means both refer to the same object in memory. Since `a` and `b` are then really a single object, the contents of `a` and `b` must be equal as well.
2. **True**: this is true. If `a == b` is `false`, that means `a` and `b` are different objects. However, they may be different objects which hold the same values. If `equals()` is overriden to compare the contents of the objects, `a.equals(b)` would return `true` in that case.
3. **False**: this is not guaranteed. If `equals` is overridden to compare the contents of the objects, for two objects with the same values `a == b` would return `false`, yet `a.equals(b)` would return true.
4. **True**: this is possible. If `equals` is not overridden, the behavior of the equals method is to check if two objects are in fact the exact same object in the memory.
5. **True**: if `a.equals(b)` returns `false`, the is a difference in the contents as therefore there must be two different objects. This automatically means that the reference in `a` and `b` must be different as well.

</Solution>

</Exercise>
