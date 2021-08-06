---
path: '/week4/3-finding-and-comparing-objects'
title: 'Finding and Comparing objects'
hidden: false
---

<text-box variant='learningObjectives' name='Learning Objectives'>

 - You understand the difference between the ==-operator and the equals method.
 - You can override the equals() and/or hashCode() method or generate its code.
 - You know when to override these methods.
 - You can explain what a contract is.

</text-box>

## Finding objects
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
<img width="400" alt="week4 object references 1" src="https://user-images.githubusercontent.com/67587903/128515240-8e271590-1110-4ac2-b8ad-22ca7309b688.PNG">

In the above image, you can see how the memory stores the various `Integer` values. `i1`'s reference points towards an `Integer` object that stores the value 12. The variables `i2` and `i3` both point towards the same object, but to another object than `i1` points to. This other object is also an `Integer` object, storing the value 12. 
In practice, the memory of a computer is linear. It is a very long array of bits. Although arrows are visually appealing, when we compare references we actually compare memory addresses, like in the picture below.

<img width="400" alt="week4 object references 2" src="https://user-images.githubusercontent.com/67587903/128515242-cf8a2364-b4ef-4127-97f1-3db838abbf24.PNG">

Here, the linear computer memory is displayed by a sequence of numbers and words. Since a and b are primitive types, actual values are stored in the memory. When we compare `a==b`, we compare the numbers 12 and 12.
Since `i1` is a non-primitive, the memory address of the object it references is stored in the memory. The 49 tells it that it can be looked up from character 49 onwards. `i2` is stored in the memory from index 63 onwards. When we compare `i1==i2`, we compare 49 with 63.

When we want to compare the **contents** of objects, the `equals` method should be used, instead of the `==` operator. In the Introduction to Programming course, yhou learned that the Object class contains a method `equals(Object other)`. The default implementation of this method does the same as the == operator, but it can be overridden. Most classes that you are familiar with, such as `String` and `Integer`, do so.

For strings, `equals` works as expected in that it declares two strings _identical in content_ to be 'equal' even if they are two separate objects. The String class has replaced the default `equals` with its own implementation.
If we want to compare our own classes using the `equals` method, then it must be defined inside the class. The method created accepts an `Object`-type reference as a parameter, which can be any object. The comparison first looks at the references. This is followed by checking the parameter object's type with the `instanceof` operation - if the object type does not match the type of our class, the object cannot be the same. We then create a version of the object that is of the same type as our class, after which the object variables are compared against each other.

## Overriding the equals() and hashCode() methods
As we have seen last week, the cosmic superclass `Object` has several general methods, of which we have already seen the `toString()` method. Now, we will see the other two methods that we promised to cover.

### equals()
When overriding the `boolean equals()` methods, there is a number of rules you need to take into account if you want to let other classes use your objects.
These rules that are related to overriding methods are called a **_contract_**. It is the responsibility of the programmer to adhere to these!
For equals itself, there are five rules, which also could be found in the [documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/Object.html) :

- It is **reflexive**: `x.equals(x)` should always return `true`.
- It is **symmetric**: `x.equals(y)` should return `true` if and only if `y.equals(x)` returns true.
- It is **transitive**: if `x.equals(y)` returns `true` and `y.equals(z)` returns `true` too, then `x.equals(z)` must also return `true`.
- It is **consistent**: calling `x.equals(y)` multiple times should each time result in `true` or each time result in `false`, provided no information used in these equal comparisons of the object is modified in between the calls.
- And `x.equals(null)` should return `false`, provided `x` is not `null`.

Aside from these five rules for `equals()`, the documentation also mentions: "Note that it is generally necessary to override the `hashCode()` method whenever `equals()` is overridden, to maintain the general contract for the `hashCode()` method, which stats that equal objects must have equal hash codes."

### hashCode()
So, what does `int hashCode()` do?

Well, by default, it returns the memory address of the object as an `int`. In general, a **hash function** maps data of arbitrary size to a fixed size, that is in our case an `int`. In Java, the main purpose is rapid data lookup, typically in a HashSet or HashMap, about which we talk more later). Possible analogies are a fingerprint or the length of a movie.
To understand this well, realize that a movie has only one length (as so, each object's memory address has only one hashcode), but multiple movies could have the same length (so that a hashcode can belong to multiple objects). As you can see from this example, a hashCode might not be unique.

The documentation specifies the following:

- `hashCode` must return the same integer when called multiple times, if no information used in `equals` is modified between the calls.
- If `x.equals(y)` returns `true`, then it **must hold** that `x.hashCode() == y.hashCode()`.
- If `x.equals(y)` returns `false`, then `x.hashCode` does not necessarily have to differ from `y.hashCode()`. However, distinct integer results for unequal objects may improve the performance of hash tables.

Equal hashcodes thus are a **necessary condition** for equality of two objects, but are not a **sufficient condition**.

For deeper understanding, elaborate for yourself on the fingerprint analogy: if the same human leaves fingerprints in two locations, they will be equal. However, if two sets of fingerprints are equal, they still could be from different humans. How does this compare to the use of hashCode()?

### Overriding equals() and hashCode()
Adhering to the contracts of `equals()` and `hashCode()` can be a tricky business. In practice, you should try to avoid doing this by hand. Actually, `IntelliJ` or any other good IDE can generate the code for you! 

<text-box variant='hint' name='Assisted creation of the equals method and hashCode '>

IntelliJ provides support for the creation of both `equals` and `hashCode`. You can select Source -> Insert Code from the menu and then select *equals() and hashCode()* from the drop-down list. The IDE then asks for the instance variables used in the methods. The methods developed by NetBeans are typically sufficient for our needs.

</text-box>

Consider the following example:
```java
public class Pair {
  private final int x;
  private final int y;
    public Pair(int x, int y) {
      this.x = x;
      this.y = y;
    }
    …
}
```
This generates the following code:
```java
@Override
public int hashCode() {
  final int prime = 31;
  int result = 1;
  result = prime * result + x;
  result = prime * result + y;
  return result;
}
@Override
public boolean equals(Object obj) {
  if (this == obj)
    return true;
  if (obj == null)
    return false;
  if (getClass() != obj.getClass())
    return false;
  Pair other = (Pair) obj;
  if (x != other.x)
    return false;
  if (y != other.y)
    return false;
  return true;
}
```

Whether you need to override `equals()` and `hashCode()` depends on your intended use. If you are likely to have two separate objects with the same values, but really want to regard them as separate objects, the default implementation is what you want.
On the other hand, if you read and store pairs of numbers from a file and want to check whether they also exist in a second file, you want to be able to compare the values of `Pair` objects created by different files. In such cases, you should override both `hashCode()` and `equals()`.
In most cases where you want to override both methods, it is preferable to let your IDE generate the code, but in some circumstances (such as unordered pairs), you may want to do it yourself.
