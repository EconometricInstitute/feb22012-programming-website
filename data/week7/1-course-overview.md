---
path: '/week7/1-course-overview'
title: 'Course overview'
hidden: false
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You revise all the subject matter and prepare well for the exam

</text-box>

## Classes and Objects
### Classes
You need to understand how you write a class; you put each class in its own .java file, with the basic syntax: `public class MyName … { … }`.
Within the class you can define variables and methods. The typical order is to first define the variables, then the constructors, and last the
methods.

You need to know the distinction between instance variables and class (static) variables and local variables
You can define methods to operate on objects (regular methods) and to operate without an object (static methods).
Methods that only read information from the object are called _accessor methods_. Methods that change the state/information stored in the object are called _mutator methods_.
Methods and constructors can be _overloaded_. The type system is used to figure out which one will be executed.

### The Type System
Java is a _strongly typed_ language. As a result, all variables and expressions have a type. Expressions can be all kinds of things, e.g. just a literal `36`, a variable `x`, summing two variables `x + y`, a call to a method `Math.min(3,5)` or even a call to a constructor `new ArrayList<Integer>()`.
There is an important distinction between primitive types and nonprimitive types, although _Autoboxing_ converts primitive values 'automaticaly' to non-primitive values and vice-versa. To convert between types, _implicit casts_ are allowed when the compiler can reason they are safe. _Explicit casts_ are potentially unsafe.
You have _generic types_, like `ArrayList<Integer>` or `Map<String,Integer>`, where generic types are denoted by a type variable (e.g. `ArrayList<E>` or `Map<K,V>` )

You also need to understand relations between types: 
- Interfaces can be implemented by classes, which implies objects of that class can also be used as the type of the interface. (subtype: class, supertype: interface)
- When working with inheritance, subclasses also are of the type of their superclass, but the other way around needs explicit casting.
- Relations can be visualized using a class hierarchy diagram (which can also show interfaces and abstract classes).

The compiler uses the type system to reason about the correctness of types in your code. You should be able to reason about types like the compiler does. This is an important skill when you are coding in a team, use libraries written by other people, etc.
   
### Casting and instanceof
Suppose that we have a Herbivore which is a subclass of Creature. Which of the following assignments are okay?

```java
Herbivore h = new Herbivore();
Creature c = h;
Herbivore h2 = c;
```
The third line is not, because a `Herbivore` is more specific than a `Creature` by being a subclass. Thus, the `Creature` object cannot be cast into a `Herbivore` object.
The second line, however, performs an implicit cast (it is always safe, since we go _from a subtype to a supertype_).
It is important that you can figure out these sorts of errors for Question 3 in the practice exam!
If we want to convert a creature to a human, we have to check the type of the creature and perform a cast afterwards.
```java
if (c instanceof Human) {
    Human h2 = (Human) c;
}
```

### Objects
You should be able to instantiate objects using their constructor. 
You should understand that you can call methods on objects.
- Within a class, you can just call the methods of the current object without using a
period to call them. (e.g. within countFile() you can call count())
- When you call methods on other objects, you need the period.

```java
public int sizeSquared(Collection<?> col) {
    return col.size() * col.size();
}
```

You can also pass objects to methods and constructor (see above). You can obtain a reference to the _current_ object via the `this` keyword.
You should be able to use some basic objects used during the assignments (e.g. `String`, `BigInteger`, `ArrayList`, `PrintWriter`, `Scanner`, etc.).
Also, you should be able to call and use methods of classes you have not seen before, but for which an explanation is provided of how they work.

### References and (Im)mutability
Variables of non-primitive types hold references. We can have multiple references to the same object. This can lead to confusion if you modify the object using one reference, since these modifications will also be observable via the other references. 
A non-primitive variable can also hold a `null` reference. If that is the case calling a method on in or accessing an instance variables throws a `NullPointerException`.
Some classes have been designed such that all modifications of an object are forbidden. Notable examples are `String` and `Integer`. Objects of these classes are called _immutable_. With such objects you don’t have to worry about the reference issue.
Other classes, however, can be modified and are called _mutable_. The `Collection`s are notable examples.
Reasoning about references can be made easier using _Memory State Diagrams_.

## Exceptions
When a problematic situation is detected, programs can and should raise an exception. In Java, an exception is raised using the `throw` keyword and an object of type `Throwable`.
You can indicate that a method might throw an Exception using the `throws` keyword in the method header.
You have multiple constructions with the `try` keyword:
- The `try-catch` construction (multiple catch clauses allowed)
- The `try-finally` construction (executed as soon as the try clause is exited)
- The `try-catch-finally` construction (combination of above)
- The `try-with-resources` construction (no catch or finally necessary)

There are _checked exceptions_ and _unchecked exceptions_. Subclasses of `Error` and `RuntimeException` are unchecked. All other exceptions are _checked exceptions_.
Checked exceptions either need to be caught, or thrown the caller (this can be indicated with throws in the method header). This is not necessary for unchecked exceptions, but if you throw them, it is nice to still indicate this to other programmers in the method header.
The only checked Exceptions that you have dealt with are the `IOException` and `FileNotFoundException`.
For instance, the constructors of `Scanner`, `PrintWriter` and `FileInputStream` can throw a `FileNotFoundException`. The readLine() method of BufferedReader can throw a `IOException`.
This is not indicated in the reference you have available at the exam, so you should remember it!

## Interfaces
Interfaces are one of the ways to achieve _polymorphism_. An `interface` introduces a new type, for which you can specify methods that must be implemented by classes implementing the interface.
A class indicates it is implementing an interface with the keyword `implements` in the class header and must implement its methods.
Objects of classes implementing the interface also have the type of the interface (the interface is a supertype and the class a subtype). Classes can extend at most one class, but can have any number of interfaces as a supertype.

### Inheritance
The second way to achieve _polymorphism_ is by using _inheritance_. It is indicated with the keyword `extends` in the class header and can be either for classes or interfaces.
In case of classes we have a relation between the _superclass_ and the _subclass_ (which is just a special type of supertype/subtype relation). Instance variables and method implementations are _inherited_ from the super class (and can be called and used if they are public or protected).
Methods can be overridden, redefining the implementation of certain methods. It is still possible to call the methods or constructors of the super class using the `super` keyword.
A class can _extend_ at most one class, but implement multiple interfaces.

### Abstract classes
In some cases we want to implement part of a class, but leave some methods open for subclasses to implement. This can be achieved with an _abstract class_. Such as class has the keyword `abstract` in the class header.
Methods without an implementation must be denoted with the `abstract` keyword as well. Other methods in the abstract class may call the abstract methods and operate on instance variables like normal classes. It is not possible to create objects of an abstract class by directly calling the constructor using `new`.

### Object
<!-- Here, I found it difficult which type of header to use. The object class is about extending classes, so the above info (which would suggest ###), but the Object class is also an introduction to the comparator and so on (which would suggest ##). -->
If a class does not explicitly extend another class, it implicitly
extends Object. You need to know about three methods in Object what they do:
`toString()`, `hashCode()` and `equals()`. 
By default, these methods use the memory address of an object (e.g. to determine whether two objects are equal). So even if two separate objects have the same values stored in their instance variables, the `equals()` method will return false (just as the == operator does).
It can be very useful to override them, but with hashCode() and equals() you have to make sure you adhere to their contract. Many classes from the standard library override these methods already.

## Collections
### Comparator and Comparable
Sometimes we want to sort objects according to some order. In case a _natural order_ is available, a class can implement the `Comparable<E>` interface. It requires the method `public int compareTo(E other);`. A number of classes from the standard library do this, like `String`, `Integer`, `BigInteger`, `Double`, etc.
We can also use a separate class to define an _ad-hoc order_ using the `Comparator<E>` interface. This requires the method `public int compare(E left, E right);`.

We can use the static method `Collections.sort()` to sort a list of elements which implement the `Comparable` interface. We can also pass a `Comparator` as a second argument to sort according to some ad-hoc order.
Suppose we get an int `c` from either `left.compareTo(right)` or `myComp.compare(left, right)`
- If c < 0 then the object left comes before right in a sorted list.
- If c > 0 then the object left comes after right in a sorted list.
- If c == 0 then the objects are regarded as equal by this order.

Consider a `List<Integer>` with numbers 1,2, … , 10. When we call `Collections.sort()` on this list, the order will indeed be 1,2,3,4,5,6,7,8,9,10 (this is easy to remember).
Objects of the following class will be sorted in the same way:
```java
public class MyInteger implements Comparable<MyInteger> {
    private int value;
    @Override
    public int compareTo(MyInteger other) {
        return this.value - other.value;
    }
}
```

Sometimes it is also useful to call another `compareTo` method:
```java
public class Student implements Comparable<Student> {
    private String name;
    @Override
    public int compareTo(Student other) {
        return name.compareTo(other.name);
    }
}
```

### Collections Framework
A very useful framework that allows you to store and access collections of objects in a number of ways. There are three different types: Lists, Sets and Maps.
The `Collection<E>` interface extends the `Iterable<E>` interface. This means that you can use the enhanced for-loop on Lists and Sets.

#### List
A `List` stores data sequentially. The same element can occur multiple times and the order of elements is part of the list semantics.
An `ArrayList<E>` uses an array to model a list. It is very efficient to access elements anywhere in the list, but adding at the front or removing an element halfway requires a lot of elements to be moved.
A `LinkedList<E>` uses a container object for each element, with pointers to the next and previous container. This makes adding and removing at both the front and back very efficient, but access of elements in the middle is costly.

#### Set
A `Set<E>` or `SortedSet<E>` is used to store elements if we are only interested in knowing whether an element is or is not in the set. Elements are never repeated and the order in which elements are added has no special meaning.
A `HashSet<E>` stores elements using both the `hashCode()` and `equals()` methods and requires that these are consistent.
A `TreeSet<E>` stores elements in a binary tree and requires a either a
`Comparable` or `Comparator` interface that is consistent with `equals()`.

#### Map
A `Map<K,V>` is used to store key-value pairs. The keys form a set (i.e. they are unique) and every key is associated with a value.
A `HashMap<K,V>` stores elements using both the `hashCode()` and `equals()` methods and requires that these are consistent.
A `TreeMap<K,V>` stores elements in a binary tree and requires a either a Comparable or Comparator interface that is consistent with `equals()`.

### Lambda Expressions
_Functional interfaces_ are interface with one unimplemented method.
_Lambda expressions_ are used to implement a functional interface. The syntax is something like this: `input definition -> output definition`.
_A method reference_ is a special lambda expression for situations where a single method is called. The syntax looks like: `ClassName::methodName` or `expression::methodName`.

For instance:
```java
public static void sortCoursesByTeacherLambda3(List<Course> courses) {
    Comparator<Course> comp;
    comp = (o1, o2) -> o1.getTeacher().compareTo(o2.getTeacher());
    Collections.sort(courses, comp);
}
```

In the following table, you can review the relation between types, method references and lambda expressions:

|Type       | Method reference           | Lambda Expression                    |
|-----------|----------------------------|--------------------------------------|
|Static     |MyClass::myStaticMethod     |(args) -> MyClass.myStaticMethod(args)|
|Bound      |var::myMethod               |(args) -> var.myMethod(args)          |
|Unbound    |MyClass::myMethod           |(obj, args) -> obj.myMethod(args)     |
|Constructor|MyClass::new                |(args) -> new MyClass(args)           |
|Array      |int[]::new                  |(len) -> new int[len]                 |

### Functional interfaces
With the new built-in functional interfaces we can model common patterns, such as:
- Doing something with an object (Consumer)
- Checking a property/condition (Predicate)
- Transforming an object (Function, UnaryOperator)
- Combining two objects into one (BinaryOperator)

Here are the new functional interfaces:
| Interface                    | Input arguments | Output  | Interpretation |  
|------------------------------|-----------------|---------|----------------|
| Comparator                  | (T o1, T o2) | int | Define an order on T's |
| BinaryOperator    |  (T left, T right) | T | Combine two T's into one T.  |
| Consumer                    | (T arg) | void | Do something with argument |
| BiConsumer    | (T arg1, U arg2) | void | Do something with the arguments |
| Function                          | (T arg) | R | Transform a T into an R |
| BiFunction         | (T arg1, U arg2) | R | Transform a T and U into an R |
| Predicate               | (T arg) | boolean | Check if a T has a property |
| Supplier                             | () | T | Produces object of type T |
| UnaryOperator                       | (T arg) | T | Transforms a T to a T |
| Runnable                                     | () | void | Execute a task |

They are useful to construct methods that are generic. Rather than hardcoding these tasks, we can pass them as an argument. Calling is easy due to lambda expressions and method references.

### Default interface methods
In Java 8, we are allowed to write method implementations in an interface (but
we can not define any instance variables). In case we do, the `default` keyword is mandatory.
Subclasses do not need to implement the default methods (but they may
override them).
Functional interfaces can have any number of default methods, but must have
exactly one non-default (unimplemented or abstract) method.
Please have a look at the example code below:
```java
public interface Point2D {
    public double getX(); //Traditional interface method
    public double getY(); //Traditional interface method
    public default double distanceTo(Point2D other) { // Default method
        double dx = getX() - other.getX(); // Calls to unimplemented method.
        double dy = getY() - other.getY();
        return Math.sqrt(dx*dx + dy*dy);
    }
}
```

### Static interface methods
In Java 8, it is now also possible to define static utility methods within an interface (much like Collections.sort, or Math.max). For example, the Comparator interface has a number of useful static methods:
```java
// Function based Comparators
public static <T> Comparator<T> comparing(Function<T,Comparable> keyExtractor)
public static <T,U> Comparator<T> comparing(Function<T,U> keyExtractor, Comparator<U> keyComparator)
// Natural order based Comparators
public static <T extends Comparable> Comparator<T> naturalOrder()
public static <T extends Comparable> Comparator<T> reverseOrder()
```

And also some default methods:
```java
// Composition of Comparators
public default <T> Comparator<T> thenComparing(Comparator<T> other)
public default <T> Comparator<T> thenComparing(Function<T,Comparable> keyExtractor)
public default <T,U> Comparator<T> thenComparing(Function<T,U> keyExtractor, Comparator<U> keyComparator)
```
### Writing shorter Comparators
```java
public static int compareCourses(Course left, Course right) {
    if (left.getTeacher().equals(right.getTeacher())) {
        return left.getTeacher().compareTo(right.getTeacher());
    }
    if (left.getCourseYear() != right.getCourseYear()) {
        return right.getCourseYear() - left.getCourseYear();
    }
    return left.getCourseName().compareTo(right.getCourseName());
}

public static void sortCourses(List<Course> courses) {
    Collections.sort(courses, MyClass::compareCourses);
}
```

```java
Comparator<Course> compTeacher = Comparator.comparing(Course::getTeacher);
Comparator<Course> compYear = Comparator.comparing(Course::getCourseYear, Comparator.reverseOrder());
Comparator<Course> compName = Comparator.comparing(Course::getCourseName);
// Combine the three separate comparators into one:
Comparator<Course> comp = compTeacher.thenComparing(compYear).thenComparing(compName);
```

```java
Comparator<Course> comp = Comparator.comparing(Course::getTeacher)
                                    .thenComparing(Course::getCourseYear, Comparator.reverseOrder())
                                    .thenComparing(Course::getCourseName);
Collections.sort(courses, comp);
```

### The `Optional<T>` class
An object of `Optional<T>` either: holds a single value of type T, or holds no value at all. It can be used to avoid returning null values and forces the user to deal
with potential absence of a result.
Static methods that can be used to obtain an `Optional` object:
```java
public static <T> Optional<T> empty()
public static <T> Optional<T> of(T elem)
public static <T> Optional<T> ofNullable(T elem)
```

The following methods are available on an `Optional` object:
```java
public T get()
public void ifPresent(Consumer<T> action)
public boolean isPresent()
public T orElse(T alternative)
```

## The Java 8 Stream API
Java 8 introduce the Stream API that can be used to build and process data processing pipelines in a declarative fashion.
The main interface is `Stream<T>`. It models an (unfinished) data processing pipeline that can emit objects of type `T`. A pipeline consists of three types of operations:
- A single **data source**
- Zero or more **intermediate operations**
- A single **terminal operation**
Objects only start flowing through the pipeline and are actually processed when they are requested by a terminal operation. The data source and intermediate operations are called **lazy operations**. The terminal operation is a non-lazy operation.

The most common way to obtain a Stream is by means of a new default method that was added to the Collection interface: `public default Stream<T> stream()`. The following code examples give us Stream objects:  
```java
public default Stream<T> stream()
// A stream that will emit three string objects
Stream<String> s = Stream.of("hello", "I'm", "flowing");
// The word "hello" infinitely many times.
Stream<String> tooPolite = Stream.generate(() -> "hello");
// The numbers 0, 1, 2, etcetera
Stream<BigInteger> allInts = Stream.iterate(BigInteger.ZERO, bi -> bi.add(BigInteger.ONE));
// Obtain a Stream from a List object
List<String> lst = Arrays.asList("these", "are", "list", "elements");
Stream<String> fromLst = lst.stream();
```
These operations are **lazy**, so no objects start flowing (yet)

Intermediate operation are lazy and can be recognized from the fact the return type is also a Stream.
This resulting Stream represents the data processing pipeline with an additional operation attached to it.

|Method                         |Output              |Description                |
|-------------------------------|--------------------|---------------------------|
|distinct()                     |Stream&lt;T&gt;           |discards duplicate elements|
|filter(Predicate&lt;T&gt; predicate) |Stream&lt;T&gt;           |discards false elements    |
|limit(long n)                  |Stream&lt;T&gt;           |emits at most n elements   |
|map(Function&lt;T,R&gt; mapper)      |Stream&lt;R&gt;           |converts objects to type R |
|skip(long n)                   |Stream&lt;T&gt;           |discards the next n elements|
|sorted()                       |Stream&lt;T&gt;           |sorts elements by their natural order|
|sorted(Comparator&lt;T&gt; comparator)|Stream&lt;T&gt;          |sorts elements with the comparator|

   
When you call a terminal operation on a Stream, it starts consuming objects from the stream and objects finally start flowing through the processing pipeline.

The following operations are available:
|Method                               |Output              |Description                    |
|-------------------------------------|--------------------|-------------------------------|
|allMatch(Predicate&lt;T&gt; predicate)     |boolean             |Is predicate true for all      |
|anyMatch(Predicate&lt;T&gt; predicate)     |boolean             |Is predicate true for any      |
|count()                              |long                |Number of objects              |
|collect(Collector&lt;T,A,R&gt; collector)  |R                   |Aggregate using the collector  |
|findFirst()                          |Optional&lt;T&gt;         |First object emitted           |
|forEach(Consumer&lt;T&gt; action)          |void                |Perform action on all objects  |
|max(Comparator&lt;T&gt; comparator)        |Optional&lt;T&gt;         |Maximum according to comparator|
|min(Comparator&lt;T&gt; comparator)        |Optional&lt;T&gt;         |Minimum according to comparator|
|noneMatch(Predicate&lt;T&gt; predicate)    |boolean             |Is predicate false for all     |
|reduce(BinaryOperator&lt;T&gt; accumulator)|Optional&lt;T&gt;         |Aggregate using the accumulator|

The collect operation requires an object of type `Collector<T,A,R>`. 
- A collector takes objects of type `T`.
- Accumulates them into a (mutable) accumulator type A
- Transforms the final accumulation into type R
There is no need to implement them by yourself (unless you want to). The `Collectors` class provides methods to obtain many useful collectors (similar to `Comparator.comparing()`).
`Collectors.toList()` and `Collectors.toSet()` for contructing a `List` or `Set` dataset from the elements of a `Stream`. `Collectors.joining()` is for combining strings into a single `String` (with or without delimiter, prefix and suffix). 
