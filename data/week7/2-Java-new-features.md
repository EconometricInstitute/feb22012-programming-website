---
path: '/week7/2-java-new-features'
title: 'Java: new Features'
hidden: false
extra: true
ready: true
---

## Java versions

Since Java 8, working with time data has improved. Let us have a look at it, since some of you may end up working with time series. Prior to Java 8 working with time was a big mess. You had a class `GregorianCalendar` which is mutable (which can be confusing) and where the first day of the month is represented by an integer 1, while the first month is represented by an integer 0.
A new library, `java.time`, was added, which has immutable classes and is way more intuitive to use. Some nice examples at [this website](http://javarevisited.blogspot.nl/2015/03/20-examples-of-date-and-time-api-from-Java8.html).

Since Java 9, Oracle has switched to a more steady 2 releases per year cycle. Features are included when they are done.
- Java 9: Factory methods for `List`s, `Set`s, etc: `List.of(1, 2, 3)` and a module system was added for structuring large software projects. [(OpenJDK link)](https://openjdk.org/projects/jdk9/)
- Java 10: Local variable type inference: `var myList = List.of(1,2,3);` results in a variable `myList` with type `List<Integer>`. [(OpenJDK link)](https://openjdk.org/projects/jdk/10/)
- **Java 11**: Minor improvements, but first "long-term-support" release in the new cycle of faster releases. [(OpenJDK link)](https://openjdk.org/projects/jdk/11/)
- Java 12: Switch expressions. Useful if you want to map many different cases to certain expressions. [(OpenJDK link)](https://openjdk.org/projects/jdk/12/)
- Java 13: Minor improvements, some interesting preview features. [(OpenJDK link)](https://openjdk.org/projects/jdk/13/)
- Java 14: An option to have better error messages with `NullPointerException` that tells which exact variable was `null`, new concurrency features [(OpenJDK link)](https://openjdk.org/projects/jdk/14/)
- Java 15: Text blocks for multi-line `String` literals (open and end with `""""`, must contain a newline) [(OpenJDK link)](https://openjdk.org/projects/jdk/15/)
- Java 16: Pattern matching for `instanceof` which eliminates the need for an explicit cast, and Record which are simple classes that hold data for which you don't have to write constructors, getters, `equals`, `hashCode` and `toString` [(OpenJDK link)](https://openjdk.org/projects/jdk/16/)
- **Java 17**: Long Term Supported version and sealed-classes, a way to create an abstract class with a specific list of subclasses such that no other subclasses are possible. [(OpenJDK link)](https://openjdk.org/projects/jdk/17/)
- Java 18: UTF-8 as default charset and a simple web-server was added. [(OpenJDK link)](https://openjdk.org/projects/jdk/18/)
- Java 19: mostly preview features, such as improvements to switch statements, improvements for vector computations and including code in other languages, and a preview of virtual threads. [(OpenJDK link)](https://openjdk.org/projects/jdk/19/)

## GraalVM

Besides the periodic improvements of the Java language itself, another interesting development is [GraalVM](https://www.graalvm.org/), which is a project that includes an alternative to the Java Virtual Machine, but also adds features such as ahead-of-time compilation so that you can compile Java program in a similar way as C/C++ code. It also provides a way to support different languages within the same virtual machine, and has implementations of Python, R, and many other languages. Benchmarks claims that Python and R scripts run a lot faster than on their official implementations, and it would potentially also be easier to mix programming languages with this platform. However, as these are alternative implementations, there is always some concern related to compatibility, especially with third party libraries and packages. Furthermore, some people are concerned about Oracle's control over the project, as they have a reputation of charging very high license fees for software and support. However, there is a free and open source community edition of the project. [Wikipedia](https://en.wikipedia.org/wiki/GraalVM) also contains some information related to the project.
