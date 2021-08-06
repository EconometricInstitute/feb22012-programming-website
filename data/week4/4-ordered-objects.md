---
path: '/week4/4-ordered-objects'
title: 'Ordered Objects'
hidden: false
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You are aware of Java's Comparable class and now how to implement it in your own classes
- You know how to use Java's tools for sorting lists and stream elements.
- You know how to sort list elements using multiple criteria (e.g., you know how to sort a person based on name and age).

</text-box>

## Ordering objects
When it comes to numbers, we have a perfect natural ordening, for instance: 

1 &leq 3.14 &leq 5 &leq 6 &leq 7 &leq <sup>16</sup>&frasl;<sub>2</sub> &leq 12 &leq 386 &leq 1001 + <sup>1</sup>&frasl;<sub>3</sub> &leq 5302 &leq ...

When it comes to text, there is also a general consensus of how text should be ordered, such as:

"0123" - "20" - "9" - "app" - "apple" - "programming"

But for new classes, things are usually not so clear. For instance, considering the following class:
```java
public class Subscription {
    private double price;
    private int dataLimit;
    public Subscription(double price, int limit) {
        this.price = price;
        this.dataLimit = limit;
    }
    …
}
```

For the following examples, is there a natural order?
```java
new Subscription(30,1000);
new Subscription(15, 250);
new Subscription(5,20);
new Subscription(10, 15);
```

You could give preference to either the *price* or the *dataLimit*...

## The Comparable interface
If we want to define a natural ordering (or an ordering that is at least more natural than others), we can implement the `Comparable` interface.
Before, we have already looked at interfaces in general. The [Comparable interface](http://docs.oracle.com/javase/8/docs/api/java/lang/Comparable.html) is another one of Java's ready-made interfaces. 
For example: `public class Subscription implements Comparable<Subscription>`.

The `Comparable` interface defines the `compareTo` method used to compare objects: `public int compareTo(E other);`. If a class implements the Comparable interface, objects created from that class can be sorted using Java's sorting algorithms.
The `compareTo` method required by the Comparable interface receives as its parameter the object to which the "this" object is compared. If the "this" object comes before the object received as a parameter in terms of sorting order, the method should return a negative number. If, on the other hand, the "this" object comes after the object received as a parameter, the method should return a positive number. Otherwise, 0 is returned. The sorting resulting from the `compareTo` method is called *natural ordering*.

The `Comparable` interface has the following ruls in its contract:

- If we have `x.compareTo(y) > 0` then we must have `y.compareTo(x) < 0`.
- It is **transitive**: if we have `x.compareTo(y) > 0` and `y.compareTo(z) > 0`, then we must have `x.compareTo(z) > 0`.
- Finally, if we have `x.compareTo(y) == 0`, then the *sign* of `x.compareTo(z)` must be equal to the sign of `y.compareTo(z)`.

For **consistency**, it is *recommended* that `x.compareTo(y) == 0` is equal to `x.equals(y)`, but this is *not strictly required*. If this is not the case, you should state this in the commentary of the class, for instance as follows: *"Note: this class has a natural ordering that is inconsistent with equals."*.

Although the previous rules can be a bit daunting, implementing `Comparable<E>` is often straightforward. For instance, see the following examples:

```java
public class MyInt implements Comparable<MyInt> {
    private final int value;
    public MyInt(int i) {
        value = i;
    }

    @Override
    public int compareTo(MyInt o) {
        return value - o.value;
    }
}
```

```java
public class MyDouble implements Comparable<MyDouble> {
    private double value;
    public MyDouble(Double val) {
        value = val;
    }

    @Override
    public int compareTo(MyDouble other) {
        return (int)Math.signum(value - other.value);
    }
}
```

With a `String`, you can even delegate the comparison the the compareTo function of the `String` class! For instance like this:
```java
public class MyText implements Comparable<MyText> {
    private final String text;
    public MyText(String text) {
        this.text = text;
    }

    @Override
    public int compareTo(MyText other) {
        return text.compareTo(other.text);
    }
}
```

Let us also take a look at this with the help of a Member class that represents a child or youth who belongs to a club. Each club member has a name and height. The club members should go to eat in order of height, so the Member class should implement the `Comparable` interface. The Comparable interface takes as its type parameter the class that is the subject of the comparison. We'll use the same `Member` class as the type parameter.

```java
public class Member implements Comparable<Member> {
    private String name;
    private int height;

    public Member(String name, int height) {
        this.name = name;
        this.height = height;
    }

    public String getName() {
        return this.name;
    }

    public int getHeight() {
        return this.height;
    }

    @Override
    public String toString() {
        return this.getName() + " (" + this.getHeight() + ")";
    }

    @Override
    public int compareTo(Member member) {
        if (this.height == member.getHeight()) {
            return 0;
        } else if (this.height > member.getHeight()) {
            return 1;
        } else {
            return -1;
        }
    }
}
```

As returning a negative number from `compareTo()` is enough if the `this` object is smaller than the parameter object, and returning zero is sufficient when the lengths are the same, the `compareTo` method described above can also be implemented as follows.

```java
@Override
public int compareTo(Member member) {
    return this.length - member.getHeight();
}
```

Since the Member class implements the Comparable interface, it is possible to sort the list by using the `sorted` method. In fact, objects of any class that implement the `Comparable` interface can be sorted using the `sorted` method.
If a programmer wants to organize the original list, the `sort` method of the `Collections` class should be used. This, of course, assumes that the objects on the list implement the `Comparable` interface.

Sorting club members is straightforward now.

```java
List<Member> member = new ArrayList<>();
member.add(new Member("mikael", 182));
member.add(new Member("matti", 187));
member.add(new Member("ada", 184));

member.stream().forEach(m -> System.out.println(m);
System.out.println();
// sorting the stream that is to be printed using the sorted method
member.stream().sorted().forEach(m -> System.out.println(m);
member.stream().forEach(m -> System.out.println(m);
// sorting a list with the sort-method of the Collections class
Collections.sort(member);
member.stream().forEach(m -> System.out.println(m);
```

<sample-output>

mikael (182)
matti (187)
ada (184)

mikael (182)
ada (184)
matti (187)

mikael (182)
matti (187)
ada (184)

mikael (182)
ada (184)
matti (187)

</sample-output>

<programming-exercise name='Wage order' tmcname='part10-Part10_11.WageOrder'>

You are provided with the class Human. A human has a name and wage information. Implement the interface `Comparable` in a way, such that the overridden `compareTo` method sorts the humans according to wage from largest to smallest salary.

</programming-exercise>

<programming-exercise name='Students on alphabetical order' tmcname='part10-Part10_12.StudentsOnAlphabeticalOrder'>

The exercise template includes the class `Student`, which has a name. Implement the `Comparable` interface in the Student class in a way, such that the `compareTo` method sorts the students in alphabetical order based on their names.

The name of the `Student` is a String, which implements `Comparable` itself. You may use its `compareTo` method when implementing the method for the `Student` class. Note that `String.compareTo()` also treats letters according to their size, while the `compareToIgnoreCase` method of the same class ignores the capitalization completely. You may either of these methods in the exercise.

</programming-exercise>
