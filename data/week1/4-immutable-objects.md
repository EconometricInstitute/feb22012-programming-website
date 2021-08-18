---
path: "/week1/4-immutable-objects"
title: "Immutable Objects"
hidden: false
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You know what immutable objects are.

- You can create your own immutable object.

- You know the advantages and disadvantages of immutable objects.

</text-box>

**TODO:** (...) maak daarna een exercise van het BigInteger voorbeeld, waarna je inderdaad terecht uitlegt dat ze ook op moeten letten hoe je het gebruikt.

In this section, you will learn what an immutable object is, how you can achieve immutability in Java and what are the advantages and disadvantages of these objects.

Immutable objects **never change their state**, so that their values cannot be changed. Thus, we do not need to copy immutable objects to prevent their state from being changed, which is a large advantage of an immutable object. A String is an example of an immutable object. When concatenating two strings, we get a new String, not altering the old string objects. Other examples are the non-primitive versions of primitive types, such as `Double` and `Integer`.

First, we have a look at a `String` example, were we have `String str = "abc";`. 
If we want the letter c as a `String` object, we need to create a new object, or explicitly overwriting the old object, basically creating a new one and throwing the old object away. 
For instance, we can state `String c = abc.substring(2,3);`.
The substring method returns the letter c, which is stored in the variable with the same name. 
On the other hand, if we would only call `abc.substring(2,3);`, nothing would happen. 
After both calls the first variable would still contain the string `"abc"`.
If we would make the call `abc = abc.substring(2,3);`, the variable _seems_ to change, but behind the scenes it first throws the old string `"abc"` away to store the new string `"c"` in the new variable with the same name.

Another example of an immutable object is `BigInteger` which allows us to do integer calculations with numbers that are too big to fit in an `int` or `long`.
First, you import it: `import java.math.BigInteger`. Then, take a look at this example where we use it:

```java
/*To create an instance of BigInteger, we use a special static method valueOf, not a constructor.
Some classes are designed this way by their programmers. **/
BigInteger a = BigInteger.valueOf(233);
BigInteger addValue = Biginteger.ValueOf(144);
BigInteger b = a;
b.add(addValue);
System.out.println(a);
System.out.println(b);
```

The question is: what will be printed? Would you expect 233 and 377 to be printed? 
It may then come as a surprise that for both _a_ and _b_ the number 233 will be printed here. That is because of the definition of the add method for BigInteger objects, which you can find in the [Java documentation](https://docs.oracle.com/javase/8/docs/api/java/math/BigInteger.html):

> The method `add(BigInteger val)` "returns a BigInteger whose value is `(this + val)`".

In the previous code, we computed a new value, but did not do anything with it. Lesson learned: check the return type! If we change `b.add(addValue)` into `b = b.add(addValue);`, it will print 233 and 377.

<text-box variant="hint" name="Store immutable values">
When you work with objects from a class that is designed to be immutable, or with methods that produce the result
as a new object, don't forget to save that object!
</text-box>

If you want to create your own class for immutable objects, follow these simple rules:
- Do not add any setter method.
- Declare all fields final and private.
- If a field is a mutable object itself, create copies of it for getter methods.
- If a mutable object is passed as an argument to the constructor, it must be assigned to a variable to create a immutable copy of it. It may also be convenient to write additional constructors to facilitate the creation of new objects.
- Do not write mutation methods, but write methods that compute the new state and return a new instance with that state.

Lastly, we will list the advantages and disadvantages of immutable objects here.

<text-box title="Advantages and Disadvantages">

**Advantages**
- We do not have to worry about copying them, we can pass references.
- They work similar to other often used objects, such as String.
- They are easy to use in advanced data structures that will be discussed later.

**Disadvantages**
- Creating a new object every time implies we have to copy data more often.
- You may lose efficiency compared to very optimized mutable objects.
- In some setting it is more intuitive to change the state of an object, such as a simulated environment or a bank account.
</text-box>
