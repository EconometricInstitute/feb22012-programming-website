---
path: "/week6/6-stream-intermediate"
title: "Streams: Introduction and Intermediate Operations"
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

 - You understand how to start a stream
 - You understand how to obtain a stream from a `List` or `Set`
 - You know some important intermediate operations on a stream and how to use them

</text-box>

## Data sources and the `Stream` API
In Java, a data processing pipeline is denoted by the type `Stream<T>`, where type variable `T` refers to the type of the objects which are emitted at the end of the pipeline. The first step in a data processing pipeline is to choose a *data source*. The most common way to obtain a `Stream` is to obtain it from a common data structure such as `List` or `Set`. However, this is not the only way in which `Stream` objects can be obtain. The `Stream` interface defines four `static` methods that can be used to obtain a `Stream` in a different way:

```java
public static <T> Stream<T> concat(Stream<T> a, Stream<T> b)
public static <T> Stream<T> generate(Supplier<T> s);
public static <T> Stream<T> iterate(T seed, UnaryOperator<T> f);
public static <T> Stream<T> of(T... values);
```

The `Stream.concat()` can be used to combine two `Stream<T>` objects into a single `Stream`, that will first emit all the objects from `Stream<T> a` until they are exhausted and then emits all elements from `Stream<T> b`. The `Stream.of()` method can be used to create a `Stream<T>` for a fixed number of values. For example, we can create a `Stream` that will emit three `String` values as follows: `Stream<String> s = Stream.of("hello", "I'm", "flowing");`.

The `Stream.generate()` method accepts a `Supplier<T>`. Every time the `Stream` is requested to emit an object, the `get()` method of the `Supplier` is called to produce a new object to emit. The `Stream.iterate()` method uses a starting value that will be first value emitted by the `Stream`. Each time the `Stream` is requested to emit another object, the `UnaryOperator` is applied on the previous value emitted to obtain the next value that is emitted.

Note that there is no limit on number of objects that are emitted by `Stream.generate()` and `Stream.iterate()`. In contrast to conventional data structures such as `List` and `Set`, a `Stream` can represent an *infinite* flow of objects. This is possible since objects are only emitted from a `Stream` object when a terminal operation makes a request to emit an object from the `Stream`. This also means that all operations that produce a `Stream` object, do not compute any data yet. They wait for a call to a terminal operation before any objects are emitted. This behavior of a `Stream` is called **lazy** behavior, and refers to the fact that objects are only emitted at the moment this is required.

This means, the most common way to obtain a `Stream` is as follows:

```java
List<MyType> list = new ArrayList<>();
// Add some things to the list
list.stream()
    // call some operations on the stream
    // ...
```

## Intermediate operations
Once you have obtained a `Stream` object that represents our data processing pipeline, it is often useful to attach additional processing units to the pipeline. In the terminology of the `Stream` library, these are called *intermediate operations*. The table below contains the most useful intermediate operations of the `Stream` interface. It is easy to recognize the intermediate operations, as they all have a `Stream` as a return type. Note that call an intermediate operation does not process any objects until a terminal operation is called on the resulting `Stream` object. Therefore, like the operations that convert a data source to a `Stream` object, the intermediate operations are also **lazy** operations.

In the following sections, we discuss the most common intermediate operations: `filter` and `map`.

**Overview of the intermediate operations in the `Stream` interface**

| Operation                          | Output      | Description                           |
|:-----------------------------------|:------------|:--------------------------------------|
| `distinct()`                       | `Stream<T>` | filters out duplicate elements        |
| `filter(Predicate<T> predicate)`   | `Stream<T>` | filters out `false` elements          |
| `limit(long n)`                    | `Stream<T>` | emits at most `n` elements            |
| `map(Function<T,R> mapper)`        | `Stream<R>` | converts objects to type `R`          |
| `skip(long n)`                     | `Stream<T>` | filters out the next `n` elements     |
| `sorted()`                         | `Stream<T>` | sorts elements by their natural order |
| `sorted(Comparator<T> comparator)` | `Stream<T>` | sorts elements with the `comparator`  |

### The `filter` operation
Not all objects that flow through a data processing pipeline may be relevant to the analysis you intend to perform. It is thus helpful to have an operation that can remove the objects that are not relevant to the analysis from the data flow, before they can reach the processing stops further down the pipeline. The intermediate operation `filter` does this.
The `filter` method requires a `Predicate<T>` object that is used to determine if objects should be continue to flow to the next operations in the pipeline or be discarded. If the `test()` function of the `Predicate` returns `true`, an object is send to the next unit in the pipeline, and if it returns `false`, the object is discarded.

The next example shows how we can obtain a `Stream` of all even numbers from a stream that contains all numbers.

```java
// A stream of all integer numbers
Stream<BigInteger> numbers;
numbers = Stream.iterate(BigInteger.ZERO, bi -> bi.add(BigInteger.ONE));
// A stream of all even integer numbers
BigInteger two = BigInteger.valueOf(2);
Predicate<BigInteger> isEven = bi -> bi.mod(two).equals(BigInteger.ZERO);
Stream<BigInteger> evenNumbers = numbers.filter(isEven);
```

A second example shows how we can obtain a `Stream<String>` that only emits `String` objects that are shorter than ten characters using a `List<String>` as the data source.
```java
List<String> texts = ...; // Some list
Stream<String> shortOnly = texts.stream()
                                .filter(str -> str.length() < 10);
```

### The `map` operation
Sometimes you want to convert the objects flowing through a data pipeline to objects of a different type. This is precisely where the `map` method of the `Stream` interface can be used. The `map` methods accepts a `Function<T,R>` which has an input type `T` equal to the type of the objects currently emitted by the `Stream` and an output type `R` that represents the type of objects emitted to the pipeline after the `map` operation.

The following code example shows how we can convert a stream of `Course` objects into a stream of `String` objects using the `map` function:

```java
Stream<Course> stream = courses.stream();
Function<Course,String> toTeacher = Course::getTeacher;
Stream<String> teachers = stream.map(toTeacher);
Stream<String> names = stream.map(Course::getCourseName);
```

We have now seen some very useful intermediate operations, that can be added to the pipeline by calling the appropiate methods.
However, data only starts flowing through the pipeline when we call a *terminal operation*, which is what we discuss in the
next section.

<Exercise title="Test your knowledge">

In this quiz, you can test your knowledge on the subjects covered in this chapter.

Can you obtain a `Stream` from both a `List` and `Set`? Explain your answer.

<Solution>

Yes, the `.stream()` method is defined in the `Collection` interface, which is a super-type of both `List` and `Set` objects.
Therefore we can obtain a `Stream` from any `Collection`, including `List` and `Set` objects.

</Solution>

---

In order to gain a bit more experience with the intermediate operations, you will use them in imperative code.

Write a method that inspects a `List<Course> and uses a `Predicate<Course>` that
represents a condition for `Course` objects to count how many course objects
in the list agree with the condition(i.e. the condition returns true). The header
of this method should be

```java
public int countConditional(List<Course> courses, Predicate<Course> condition)
{
   ...
}
```

You can use a regular `for` loop, but should of course make use of the `condition` object.

<Solution>

A typical solution would be something as follows:

```java
public int countConditional(List<Course> courses, Predicate<Course> condition)
{
   int result = 0;
   for (Course c : courses)
   {
      if (condition.test(c))
	  {
	     result++;
	  }
   }
   return result;
}
```

</Solution>

---

In order to gain a bit more experience with the intermediate operations, you will use them in imperative code.

Write a method that give a `List<Course>`, a `Consumer<Course>` that represents an
action that can be performed with a course and a `Predicate<Course>` that represents a
condition for a course that does the following:
as long as the condition is true for `Course` objects in the list, feed them to the
`Consumer`. As soon as you find a `Course` object for which the condition is false,
stop feeding the objects to the `Consumer`. The header of this method should be
```java
public void performWhile(List<Course> courses, Predicate<Course> condition,
                         Consumer<Course> action)
{
   ...
}
```

You can use a regular `for` loop, but should of course make use of the `condition` and `action` objects.

<Solution>

```java
public void performWhile(List<Course> courses, Predicate<Course> condition,
                         Consumer<Course> action)
{
   for (Course c : courses)
   {
      if (condition.test(c))
	  {
	     action.accept(c);
	  }
	  else
	  {
	     return;
	  }
   }
}
```

Note that variants are possible. It would work to use `break` rather than `return` in this
case, and it would also be possible to write a variant that is based on a while loop, although that
would probably require an additional boolean variable.

</Solution>

</Exercise>
