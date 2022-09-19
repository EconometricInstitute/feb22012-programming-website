---
path: '/week4/6-ordered-objects'
title: 'Ordered Objects'
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You are aware of Java's Comparable interface and know how to implement the compareTo method in your own classes
- You know what is Java's Comparator interface and how to implement the compare method.
- You can explain the difference between the compareTo method and the compare method and when to use which.
- You know how to sort list elements using multiple criteria (e.g., you know how to sort a person based on name and age).

</text-box>

## Ordering objects
When it comes to numbers, we have a perfect natural ordering, for instance:

1 &leq; 3.14 &leq; 5 &leq; 6 &leq; 7 &leq; <sup>16</sup>&frasl;<sub>2</sub> &leq; 12 &leq; 386 &leq; 1001 + <sup>1</sup>&frasl;<sub>3</sub> &leq; 5302 &leq; ...

When it comes to text, there is also a general consensus of how text should be ordered, such as:

"0123" - "20" - "9" - "app" - "apple" - "programming"

But for new classes, things are usually not so clear. For instance, considering the following class that models a mobile phone subscription with a
price per month and an data limit per month:
```java
public class Subscription {

    private double price;
    private int dataLimit;

    public Subscription(double price, int limit) {
        this.price = price;
        this.dataLimit = limit;
    }

    public double getPrice() { return this.price; }
    public int getDataLimit() { return this.dataLimit; }
}
```

For the following examples, is there a natural order?
```java
new Subscription(30,1000);
new Subscription(15, 250);
new Subscription(5,20);
new Subscription(10, 15);
```

You could give preference to either the *price* or the *dataLimit*, or even come up
with weighted sums that intend to combine both of them. In general, this is a problem
when we have more than one attribute that we might consider to determine an order.

Java has two important interfaces that make it easy to make objects of our classes
ordered. The `Comparable` interface can be used for *natural* orders that serve as
a default order for objects of a class, whereas the `Comparator` interface can be used
to define an ad-hoc order by creating objects that can determine the order of objects
of another class.

## The Comparable interface
If we want to define a natural ordering (or an ordering that is at least more natural than others), we can implement the `Comparable` interface.
Before, we have already looked at interfaces in general. The [Comparable interface](http://docs.oracle.com/javase/8/docs/api/java/lang/Comparable.html) is another one of Java's ready-made interfaces.
For example: `public class Subscription implements Comparable<Subscription>`.

The `Comparable` interface defines the `compareTo` method used to compare objects: `public int compareTo(E other);`. If a class implements the Comparable interface, objects created from that class can be sorted using Java's sorting algorithms.
The `compareTo` method required by the Comparable interface receives as its parameter the object to which the `this` object is compared. If the `this` object comes before the object received as a parameter in terms of sorting order, the method should return a negative number. If, on the other hand, the `this` object comes after the object received as a parameter, the method should return a positive number. Otherwise, 0 is returned. The sorting resulting from the `compareTo` method is called *natural ordering*.

The `Comparable` interface has the following rules in its contract:

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
        return Double.compare(value, other.value);
    }
}
```

With a `String`, you can even delegate the comparison to the compareTo function of the `String` class! For instance, like this:
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

<text-box variant='hint' name='Many classes already implement Comparable'>

Many classes in the Java standard library, including `String`, but also classes like
`BigInteger`,  `Integer` and `Double` implement the `Comparable` interface so we can easily
sort a list of these types of objects. Furthermore, we can call `compareTo` on these objects
in our own code. For example, if we want to do something with two given `String` objects
only if `str1` comes before `str2`, we can write `if (str1.compareTo(str2) < 0)`.

</text-box>

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

Since the Member class implements the Comparable interface, it is possible to sort the list by using the `sort` method. In fact, objects of any class that implement the `Comparable` interface can be sorted using the `sort` method.
If a programmer wants to organize the original list, the `sort` method of the `Collections` class should be used. This, of course, assumes that the objects on the list implement the `Comparable` interface.

Sorting club members is straightforward now.

```java
List<Member> members = new ArrayList<>();
members.add(new Member("mikael", 182));
members.add(new Member("matti", 187));
members.add(new Member("ada", 184));

for (Member m : members) {
    System.out.println(m);
}
System.out.println();
// sorting the stream that is to be printed using the sorted method
Collections.sort(members);
for (Member m : members) {
    System.out.println(m);
}
```

<sample-output>

```
mikael (182)
matti (187)
ada (184)

mikael (182)
ada (184)
matti (187)
```

</sample-output>


Returning to the example of the `Subscription` class for the mobile phone subscripts,
we can observe that a user may want to choose how to sort the different subscriptions.
For an implementation of the `compareTo` methods it is difficult to choose which one
of the following two implementations is the most *natural*:

```java
@Override
public int compareTo(Subscription other) {
    if (price != other.price) {
        // A lower price is better than a higher one
        return (int)Math.signum(price - other.price);
    }
    // A higher data limit is better than a lower one
    return other.dataLimit - dataLimit;
}
```

or this one:

```java
@Override
public int compareTo(Subscription other) {
    if (dataLimit != other.dataLimit) {
        // A higher data limit is better than a lower one
        return other.dataLimit - dataLimit;
    }
    // A lower price is better than a higher one
    return (int)Math.signum(price - other.price);
}
```

Fortunately, there is another interface for situations as this one.

## Comparator interface
Now, we will have a look at the `Comparator` interface, which is obviously slightly different from the `Comparable` and defines the following method: `public int compare(E left, E right);`.
It should also behave very similar to `compareTo`, but now you are comparing `left` with `right`. The big difference between the two is the following:
**The compareTo() method of the Comparable interface defines a _natural order_, while the compare() method of the Comparator interface defines an _ad-hoc order_!**

Here is an extensive example of an implementation of the compare method:

```java
public class PriceComparator implements Comparator<Subscription> {
    @Override
    public int compare(Subscription left, Subscription right) {
        return (int)Math.signum(left.getPrice() - right.getPrice());
    }
}
```

or

```java
public class DataLimitComparator implements Comparator<Subscription> {
    @Override
    public int compare(Subscription left, Subscription right) {
        return right.getDataLimit() - left.getDataLimit();
    }
}
```

and if we assign the following tasks to the compiler:

```java
ArrayList<Subscription> subs = new ArrayList<>();
subs.add(new Subscription(5,20));
subs.add(new Subscription(30,1000));
subs.add(new Subscription(10, 15));
subs.add(new Subscription(15, 250));
System.out.println(subs);
Collections.sort(subs, new PriceComparator());
System.out.println(subs);
Collections.sort(subs, new DataLimitComparator());
System.out.println(subs);
```

it would print the following:

<sample-output>

```
[(price: 5.0, limit: 20 MB), (price: 30.0, limit: 1000 MB), (price: 10.0, limit: 15 MB), (price: 15.0, limit: 250 MB)]
[(price: 5.0, limit: 20 MB), (price: 10.0, limit: 15 MB), (price: 15.0, limit: 250 MB), (price: 30.0, limit: 1000 MB)]
[(price: 30.0, limit: 1000 MB), (price: 15.0, limit: 250 MB), (price: 5.0, limit: 20 MB), (price: 10.0, limit: 15 MB)]
```

</sample-output>

<Exercise title="Test your knowledge">

In this quiz, you can test your knowledge on the subjects covered in this chapter.

What is the difference between the `Comparable` and the `Comparator` interface?
How is this difference visible when we call the `Collections.sort()` method?

<Solution>

The `Comparable` interface is used to define a natural order on a class, whereas the `Comparator` interface is used to
define an ad-hoc, external order. Typically, the class header for a natural order looks like:

```java
public class MyClass implements Comparable<MyClass> { ... }
```

whereas for an ad-hoc external order we have:

```java
public class MyComparator implements Comparable<SomeOtherClass> { ... }
```

When using `Collections.sort()`, we can sort a `List` of a type that has a natural order
without any additional information, for example:

```java
List<MyClass> myList = new ArrayList<>();
// Add some objects here
Collections.sort(myList);
```

If we want to have more control over the exact that is being used to sort the objects, or if
no natural order is available, we can pass a `Comparator` as a second argument to the
`Collections.sort()` method, for example:

```java
List<SomeOtherClass> list = new ArrayList<>();
// Add some objects here
Collections.sort(list, new MyComparator());
```

</Solution>

---

Consider the following class:

```java
public class Employee {
    private int yearsOfService;
    private String surName;

    public Employee(String surName, int yearsOfService) {
        this.yearsOfService = yearsOfService;
        this.surName = surname;
    }

    public int getYearsOfService() { return this.yearsOfService; }
    public String getSurName() { return this.surName; }
}
```

1. Write a class `EmployeeComparator` that provides an ad-hoc order where the longest years of service comes first, and employees with equal years of service are ordered according to their surname.
2. Adjust the class `Employee` so that is provides a natural order where the employee are first ordered by surname, and then by asceding years of service (i.e. the shortest years of service comes first).

<Solution>

**Part 1**

```java
public class EmployeeComparator implements Comparator<Employee> {
    public int compare(Employee e1, Employee e2) {
        int diffYearsOfService = e2.getYearsOfService() - e1.getYearsOfService();
        if (diffYearsOfService != 0) {
            return diffYearsOfService;
        }
        return e1.getSurName().compareTo(e2.getSurName());
    }
}
```

**Part 2**

```java
public class Employee implements Comparable<Employee> {
    /* All contents from original Employee go here */
    public int compareTo(Employee other) {
        int diffSurname = this.surName.compareTo(other.surName);
        if (diffSurname != 0) {
            return diffSurname;
        }
        return this.yearsOfService - other.yearsOfService;
    }
}
```

**Note:** we are allowed to access the private instance variable `yearsOfService` in the `other` object,
because we are writing this code within the `Employee` class itself.
This would not be allowed in the `EmployeeComparator` class, where we have to use the `getSurName()`
and `getYearsOfService()` methods to access this data.


</Solution>

</Exercise>

<!--
<programming-exercise name='Wage order' tmcname='part10-Part10_11.WageOrder'>

You are provided with the class Human. A human has a name and wage information. Implement the interface `Comparable` in a way, such that the overridden `compareTo` method sorts the humans according to wage from largest to smallest salary.

</programming-exercise>

<programming-exercise name='Students on alphabetical order' tmcname='part10-Part10_12.StudentsOnAlphabeticalOrder'>

The exercise template includes the class `Student`, which has a name. Implement the `Comparable` interface in the Student class in a way, such that the `compareTo` method sorts the students in alphabetical order based on their names.

The name of the `Student` is a String, which implements `Comparable` itself. You may use its `compareTo` method when implementing the method for the `Student` class. Note that `String.compareTo()` also treats letters according to their size, while the `compareToIgnoreCase` method of the same class ignores the capitalization completely. You may either of these methods in the exercise.

</programming-exercise>
-->


