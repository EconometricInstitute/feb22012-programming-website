---
path: '/week7/2-java-new-features'
title: 'Java: new Features'
hidden: false
extra: true
ready: true
---

Since Java 8, working with time data has improved. Let us have a look at it, since some of you may end up working with time series. Prior to Java 8 working with time was a big mess. You had a class `GregorianCalendar` which is mutable (which can be confusing) and where the first day of the month is represented by an integer 1, while the first month is represented by an integer 0.
A new library, `java.time`, was added, which has immutable classes and is way more intuitive to use. Some nice examples at [this website](http://javarevisited.blogspot.nl/2015/03/20-examples-of-date-and-time-api-from-Java8.html).

Since Java 9, Oracle has switched to a more steady 2 releases per year cycle. Features are included when they are done.
- Java 9: Factory methods for `List`s, `Set`s, etc: `List.of(1, 2, 3)` and a module system was added for structuring large software projects.
- Java 10: Local variable type inference: `var myList = List.of(1,2,3);` results in a variable `myList` with type `List<Integer>`.
- Java 11: Minor improvements, but first "long-term-support" release in the new cycle of faster releases.
- Java 12: Switch expressions. Useful if you want to map many different cases to certain expressions.
- Java 13: Minor improvements, some interesting preview features.
- Java 14: An option to have better error messages with `NullPointerException` that tells which exact variable was `null`, new concurrency features
- Java 15: Text blocks for multi-line `String` literals (open and end with `""""`, must contain a newline)
- Java 16: Pattern matching for `instanceof` which eliminates the need for an explicit cast, and Record which are simple classes that hold data for which you don't have to write constructors, getters, `equals`, `hashCode` and `toString`
- Java 17: Long Term Supported version and sealed-classes, a way to create an abstract class with a specific list of subclasses such that no other subclasses are possible.
