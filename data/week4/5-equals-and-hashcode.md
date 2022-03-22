---
path: '/week4/5-equals-and-hashcode'
title: 'Equals and Hashcode'
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

 - You can override the equals() and/or hashCode() method or, *preferably*, generate its code with your IDE (IntelliJ/Eclipse).
 - You know when to override these methods.
 - You can explain what a contract is.

</text-box>

## Overriding the equals() and hashCode() methods
As we have seen last week, the cosmic superclass `Object` has several general methods, of which we have already seen the `toString()` method. Now, we will see the other two methods that we promised to cover.

### equals()
When overriding the `boolean equals()` methods, there is a number of rules you need to take into account if you want to let other classes use your objects.
These rules that are related to overriding methods are called a **contract**. It is the responsibility of the programmer (which is you!) to adhere to these!
Failure to do so may lead to weird complicated bugs that can take a lot of time to find as they may lead to hard-to-detect logical errors in your programs.

Contracts can typically be found in the Javadoc documentation of the class that introduces the method you are implementing or overriding.
For the `equals` method itself we can find in the [documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/Object.html)
that there are five rules in the contract that an overriden implementation should adhere to:

- It is **reflexive**: `x.equals(x)` should always return `true`.
- It is **symmetric**: `x.equals(y)` should return `true` if and only if `y.equals(x)` returns true.
- It is **transitive**: if `x.equals(y)` returns `true` and `y.equals(z)` returns `true` too, then `x.equals(z)` must also return `true`.
- It is **consistent**: calling `x.equals(y)` multiple times should each time result in `true` or each time result in `false`, provided no information used in these equal comparisons of the object is modified in between the calls.
- And `x.equals(null)` should return `false`, provided `x` is not `null` (which would result in a `NullPointerException` anyways).

Aside from these five rules for `equals()`, the documentation also mentions: "Note that it is generally necessary to override the `hashCode()` method whenever `equals()` is overridden, to maintain the general contract for the `hashCode()` method, which states that equal objects must have equal hash codes."

### hashCode()
So, what does `int hashCode()` do?

By default, it returns something that is strongly related to the the memory address of the object as an `int`. In general, a **hash function** maps data of arbitrary size to a fixed size, that is in our case an `int`.
In Java, the main purpose is rapid data lookup, typically in a `HashSet` or `HashMap`, about which we talk more next week. Possible analogies of how a hash code can be used to speed up identification of an object
are a fingerprint of a person or the length of a movie.
To understand this well, realize that a movie has only one length, so if we try to find a movie in a large collection of movies, we can start by looking for movies that have the correct length.
Even though multiple movies could have the same length, we can eliminate many movies already by first looking at this property. As you can see from this example, a hashCode might not be, and does not have to be, unique.

The [documentation of the Object class](https://docs.oracle.com/javase/8/docs/api/java/lang/Object.html) states the following rules for the contract of `hashCode`:

- `hashCode` must return the same integer when called multiple times, if no information used in `equals` is modified between the calls.
- If `x.equals(y)` returns `true`, then it **must hold** that `x.hashCode() == y.hashCode()`.
- If `x.equals(y)` returns `false`, then `x.hashCode` does not necessarily have to differ from `y.hashCode()`. However, distinct integer results for unequal objects may improve the performance of hash tables.

Equal hashcodes thus are a **necessary condition** for equality of two objects, but are not a **sufficient condition**.

For deeper understanding, elaborate for yourself on the fingerprint analogy: if the same human leaves fingerprints in two locations, they will be equal. However, if two sets of fingerprints are equal, they still could be from different humans as there is an extremely small (but non-zero) probability that two different humans have matching fingerprints. Still, a fingerprint match will eliminate many candidates you do not need to consider and investigate in more detail.

### Code examples overriding equals() and hashCode()
Adhering to the contracts of `equals()` and `hashCode()` can be a tricky business. In practice, you should try to avoid doing this by hand. Actually, `IntelliJ` or any other good IDE can generate the code for you!

<text-box variant='hint' name='Assisted creation of the equals method and hashCode '>

IntelliJ provides support for the creation of both `equals` and `hashCode`. You can select Code -> Generate from the menu and then select *equals() and hashCode()* from the drop-down list.
The IDE then asks for the instance variables used in the methods. The methods developed by NetBeans are typically sufficient for our needs.

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

  public int getFirst() {
    return x;
  }

  public int getSecond() {
    return y;
  }
}
```

When using IntelliJ with the IntellJ default template, we see the following code:


```java
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    Pair pair = (Pair) o;

    if (x != pair.x) return false;
    return y == pair.y;
}

@Override
public int hashCode() {
    int result = x;
    result = 31 * result + y;
    return result;
}
```

As you can see, the `equals` method contains a couple of checks for
edge cases, before it starts comparing the instance variables.
The `hashCode` method uses a prime number `31` factor to combine
different instance variables, to avoid that the pair `1, 2` will
end up with the same hashcode as the pair `2, 1`.

If we use IntelliJ with the java.util.Objects template, we get
slightly different code:

```java
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Pair pair = (Pair) o;
    return x == pair.x && y == pair.y;
}

@Override
public int hashCode() {
    return Objects.hash(x, y);
}
```

The `equals()` method looks very similar, but for `hashCode` we
now see that a helper method from the utility class `java.util.Objects`
(not to be confused with the cosmic superclass `java.lang.Object`!!)
is used to conveniently compute the hashCode.

When using Eclipse, it could generate the following code that is slightly longer,
but very similar in functionality to the IntelliJ default template:

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

## When to override hashCode and equals

Whether you need to override `equals()` and `hashCode()` depends on your intended use. If you are likely to have two separate objects with the same values, but really want to regard them as separate objects, the default implementation is what you want.
On the other hand, if you want to be able to compare separate objects of your class based on their contents, you should override `hashCode` and `equals`.
For example, if you read and store pairs of numbers from a file and create objects that way and then want to check whether they also exist in a second file.
In most cases where you want to override both methods, it is preferable to let your IDE generate the code, but in some circumstances (such as unordered pairs), you may want to do it yourself, or generate the code automatically and adjust it as needed.

<Exercise title="Test your knowledge">

In this quiz, you can test your knowledge on the subjects covered in this chapter.

If you would want to compare to strings and she if they hold the same word(s), would you use `==` or `equals`, and why?

<Solution>

A String is a non-primitive type, as it is written with a capital letter. Therefore, the `==`-operator would not work here, as we do not want to compare if the objects are the same, but whether the values that the objects hold are the same.
 
</Solution>


What should you keep in mind when overriding the `equals()` method?

<Solution>

The method that you write should adhere to some rule. It should be reflexive, symmetric, transitive and consistent.
Also, you must override the `hashcode()` method!

</Solution>

What does it mean when two objects have the same hashcode? And what if they have different ones?

<Solution>

If two objects have the same hashcode, they are in the same collection of objects. Therefore, they might hold the same value(s) and thus be the same object, but they also still might be very different.
On the other hand, if two objects have different hashcodes, we are sure the objects are different from each other. As soon as the `equals()` method finds that the two objects have different hashcodes, it returns `false` immediately.

</Solution>

</Exercise>
