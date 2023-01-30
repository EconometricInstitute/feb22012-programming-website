---
path: "/week6/7-streams-terminal"
title: "Streams: Terminal Operations"
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

 - Know how terminal operators are used in the context of streams
 - Understand the meaning of the `Optional` type
 - Understand that you can do some powerful data transformations with the `Collectors` class together with a stream

</text-box>

## Terminal Operations
After constructing a `Stream` object from a data source and zero or more intermediate operations, a **terminal operation** starts up the actual flow of objects through the pipeline and processes them into a final result. The Stream API is rather flexible in what this final result can be: you can feed all objects that are emitted from the stream to a `Consumer` such as `System.out::print`, check if some condition holds, obtain a the first object that is emitted from the stream, collect all objects that come out into a `Collection` type, or combine all emitted objects into an aggregate result such as a mean, sum, minimum or maximum value.

The previous table contains an overview of some of the terminal operations that are available in the `Stream` interface. Note that terminal operations can be recognized from the fact that they return something that is **not** of type `Stream`. By ending the pipeline, we obtain a different kind of result.

The `allMatch`, `anyMatch` and `noneMath` terminal operations all take a `Predicate` as an argument and compute a `boolean` value from the application of the `Predicate` to all objects emitted from the stream. The `count` terminal operation counts the number of objects emitted from the stream. The terminal operation `collect` requires a special object that can aggregate the emitted objects into an output. Different options for such `Collector` objects are explained in Section [\[sec:collectors\]][2]. We discuss the remaining terminal operations in more detail in the following sections.

**Some terminal operations in the `Stream` interface**

| Method                                  | Output        | Description                       |
|:----------------------------------------|:--------------|:----------------------------------|
| `allMatch(Predicate<T> predicate)`      | `boolean`     | is `predicate` true for all       |
| `anyMatch(Predicate<T> predicate)`      | `boolean`     | is `predicate` true for any       |
| `count()`                               | `long`        | number of objects                 |
| `collect(Collector<T,A,R> collector)`   | `R`           | aggregate using the `collector`   |
| `findFirst()`                           | `Optional<T>` | first object emitted              |
| `forEach(Consumer<T> action)`           | `void`        | perform `action` on all objects   |
| `max(Comparator<T> comparator)`         | `Optional<T>` | maximum according to `comparator` |
| `min(Comparator<T> comparator)`         | `Optional<T>` | minimum according to `comparator` |
| `noneMatch(Predicate<T> predicate)`     | `boolean`     | is `predicate` false for all      |
| `reduce(BinaryOperator<T> accumulator)` | `Optional<T>` | aggregate using the `accumulator` |

### `forEach`
The `forEach` terminal operation requires as `Consumer` and feeds all objects emitted from the `Stream` to this `Consumer`. An example of a possible `Consumer` is `System.out::println`, which prints the objects to the standard out. Thus, the following code fragment

```java
Stream.of("hello", "world", "via", "stream")
      .forEach(System.out::println);
```
should print:

<sample-output>
    hello
    world
    via
    stream
</sample-output>

### `Optional<T>`
It is possible to have streams that omit no data at all. This can happen if we call `stream()` on an empty `Collection`, or if we use a `filter` operation that is so strict that all objects are discarded from the stream. To deal with such situations in a neat way a new class `Optional<T>` was introduced. An object of type `Optional<T>` either holds a single value of type `T`, or is empty. As a consequence, rather than specifying a return type `T` that may be `null` if no suitable value can be returned, you can specify explicitly that a method may not always return a value by means of the `Optional<T>` return type.

The most useful methods that are available for objects of the `Optional` class are

```java
public T get();
public void ifPresent(Consumer<T> action);
public boolean isPresent();
public T orElse(T alternative);
```

Here, the `get()` method returns the value if a value is present, and throws an `NoSuchElementException` if the `Optional` is empty. The `isPresent()` method can be used to check if an actual value is present. The `ifPresent()` method has a `Consumer` as argument and feed the value contained in the `Optional` to this `Consumer` in the case a value is present. The `orElse()` method will return the value stored in the `Optional` if a value is present and return the argument if no value is present.

There are three `static` methods in the `Optional` class that we can use to obtain an `Optional` object. These are:

```java
public static <T> Optional<T> empty();
public static <T> Optional<T> of(T elem);
public static <T> Optional<T> ofNullable(T elem);
```

The method `Optional.empty()` should be used to obtain an `Optional` object which holds no value. The method `Optional.of(x)` can be used to obtain an `Optional` object that holds the value `x`. However, if `x` is `null`, the call to `Optional.of(x)` will throw an `NullPointerException`. As an alternative we can use `Optional.ofNullable(x)`, which returns an `Optional` object that holds the value `x` is it is not `null` and `Optional.empty()` if `x` is equal to `null`.
The following code example:

```java
Optional<String> noValue = Optional.empty();
Optional<String> niceValue = Optional.of("hello world");
System.out.println(noValue.orElse("nothing here"));
System.out.println(niceValue.orElse("nothing here"));
noValue.ifPresent(System.out::println);
niceValue.ifPresent(System.out::println);
```
will print:

<sample-output>
nothing here
hello world
hello world
</sample-output>

### `findFirst`, `max` and `min`
The `Stream` interface contains a number of terminal operations that return an `Optional`.

The terminal operation `findFirst` extracts a single element from the stream, and returns an `Optional` containing that element. If it turns out if the stream contains no objects at all, `Optional.empty()` is returned.

The terminal operations `max` and `min` require a `Comparator<T>` and will respectively return the maximum or minimum value emitted by the stream according to the order defined by the `Comparator`. In case the stream contains no objects at all, these terminal operations also return `Optional.empty()`.

For example, the following code:

```java
Stream.of("hello", "i", "am", "here")
      .filter(s -> s.length() > 2)
      .findFirst()
      .ifPresent(System.out::println);
Stream.of("hello", "i", "am", "here")
      .max(Comparator.naturalOrder())
      .ifPresent(System.out::println);
Stream.of("hello", "i", "am", "here")
      .min(Comparator.naturalOrder())
      .ifPresent(System.out::println);
```
should print:

<sample-output>
hello
i
am
</sample-output>

### `reduce`
From our experience with mathematics we know a number of *binary operators* that have the *associative property*. A binary operator ⊕ is associative if for all possible *a*, *b* and *c* it holds that *a* ⊕ (*b*⊕*c*) = (*a*⊕*b*) ⊕ *c*

Common examples of binary operators with this property are +, ×, min and max . Binary operators that violate this property are −, ÷ and exponentiation.

If we have a set or vector of values, it is often useful to combine all these values into a single value using such an associative operator. The procedure of combining many values into a single value using the + operator is often denoted by the ∑ symbol, whereas this procedure based on the × operator is often denoted by the ∏ symbol.

The idea of the terminal operation `reduce` is that it accepts a `BinaryOperator` that is assumed to be associative and combines all the values that are emitted from the stream using this operator into a resulting value. Since it is possible that a stream emits no objects at all, the return type of `reduce` is an `Optional<T>` rather than `T`, to indicate the possibility that there was no data to accumulate using the operator.
If no data is emitted by the stream, `reduce` returns `Optional.empty()`. In case a single element is emitted by a stream, the `Optional` will contain this single element. If more data is emitted, the combination of all this data is returned.

```java
List<Double> numbers = Arrays.asList(12.4, 7.9, 2.7);
Optional<Double> sum = numbers.stream()
                              .reduce(Double::sum);
Optional<Double> max = numbers.stream()
                              .reduce(Math::max);
Optional<Double> max2 = numbers.stream()
                               .filter(x -> x >= 50)
                               .reduce(Math::max);
System.out.println(sum.orElse(0d));
System.out.println(max.orElse(Double.NEGATIVE_INFINITY));
System.out.println(max2.orElse(Double.NEGATIVE_INFINITY));
```
will print:

<sample-output>
23.0
12.4
-Infinity
</sample-output>

## The `Collectors` class
The most powerful terminal operation of the `Stream` interface is the `collect` operation, which requires an object of type `Collector<T,A,R>`. A `Collector<T,A,R>` collections objects of type `T` from a `Stream<T>` in an intermediate mutable accumulator object of type `A` and converts this accumulator object into a final result of type `R` that is ultimately returned by the `collect()` method. While it is technically possible to implement your own `Collector` objects, this is rarely necessary and we will not discuss how to do this in this course.

Fortunately, introduced a new class `Collectors` that contains a number of useful `static` methods that can produce `Collector` objects for many use cases. This includes `Collector` objects that collect all the objects in the stream in a `List`, a `Set` or even a `Map` object, `Collector` objects that can combine a stream of `String` objects into a single `String`, and even a `Collector` that can partition the objects emitted by a `Stream` into different categories. All these `Collector` objects are discussed in the following sections.

### `toList`, `toSet`
A common thing we may want to do with the objects that are emitted from a data processing pipeline, is to store all those objects into a `Collection` object, such as a `List`, a `Set`. The Collectors class has the following methods than can help us achieve this:

```java
public static <T> Collector<T,?,List<T>> toList()
public static <T> Collector<T,?,Set<T>> toSet()
```

The method `Collectors.toList()` provides a `Collector` object that collects the output of the stream into a `List` object. Similarly the `Collectors.toSet()` methods provides a `Collector` object that collects the output of the stream into a `Set` object.

The following example code:
```java
List<String> names = Arrays.asList("Adrian", "Catherine", "John", "Mei", "Yousra");
List<String> longNames = names.stream()
                              .filter(n -> n.length() >= 5)
                              .collect(Collectors.toList());
Set<Integer> lengths = names.stream()
                            .map(String::length)
                            .collect(Collectors.toSet());
System.out.println(longNames);
System.out.println(lengths);
```
will print:

<sample-output>
[Adrian, Catherine, Yousra]
[3, 4, 6, 9]
</sample-output>

Note that the order of elements in the set could vary.

### `joining` of `String` objects
Every once in a while, you may consider to write a program that performs some reporting based on data that comes from a `List` or other type of `Collection`. In those cases, it may be desirable to convert all your objects to a `String` in some way, and then separate these `String` objects by for example with the string `" ,"`. Implementing this in the traditional way is always a rather tedious exercise, as the code typically looks as follows:

```java
List<String> names = Arrays.asList("Achmed", "Catherine", "John", "Mei", "Yousra");
StringBuilder sb = new StringBuilder();
boolean first = true;
for (String name : names) {
   if (sb.length() > 0) {
      sb.append(", ");
   }
   sb.append(name);
   first = false;
}
System.out.println(sb.toString());
```

What makes this code cumbersome, is the fact that we explicitly need to check if we should insert the separator or not.

The `Collectors` class provides two useful methods that can help us in situations like these:

```java
public static Collector<String,?,String> joining()
public static Collector<String,?,String> joining(String delimiter)
public static Collector<String,?,String> joining(String delimiter, String prefix, String suffix)
```

The `Collector` produced by `Collectors.joining()` concatenates the `String` objects emitted by the `Stream`. The `Collector` produced by `Collectors.joining(", ")` concatenates the the `String` objects emitted by the `Stream` separated by `", "`. Finally, the `Collector` produced by `Collectors.joining(", ", "[", "]")` results in a `String` that begins with a `[` followed by the `String` objects from the `Stream` separated by `", "` and a `]` symbol at the end.

The following example code:

```java
List<String> names = Arrays.asList("Adrian", "Catherine", "John", "Mei", "Yousra");
String concat = names.stream()
                     .collect(Collectors.joining());
String concatSep = names.stream()
                        .collect(Collectors.joining(", "));
String concatAll = names.stream()
                        .collect(Collectors.joining(", ", "[", "]"));
System.out.println(concat);
System.out.println(concatSep);
System.out.println(concatAll);
```

will print:

<sample-output>
    AdrianCatherineJohnMeiYousra
    Adrian, Catherine, John, Mei, Yousra
    [Adrian, Catherine, John, Mei, Yousra]
</sample-output>

### `toMap` and `groupingBy`
Another useful kind of output that we may want to produce from the objects emitted by a stream is a `Map`. The `Collectors` class contains a number of methods that can produce a `Map` object, of which the following are most interesting.

```java
public static Collector<T,?,Map<K,List<T>>> groupingBy(Function<T,K> classifier);
public static Collector<T,?,Map<K,V>> toMap(Function<T,K> keyMapper, Function<T,V> valueMapper);
```

Remember that a `Map<K,V>` holds a set of *key* objects of type `K` and that each key is associated with a value. The method `Collectors.toMap()` requires two `Function` object, of which the first function should convert the objects emitted from the stream to an object that will be used as a key value in the output `Map` and the second function should transform those objects in the associated value. As it could happen that multiple objects from the stream result in the same key object, the `Collector` produced by `toMap()` can throw an `IllegalStateException` if it encounters the same key more than once.

An alternative `Collector` that produces a `Map` as output can be obtained by calling the `Collectors.groupingBy()` method. This method requires a single `Function<T,K>` that converts the objects of type `T` emitted from the stream to key values of type `K`. The output map has type `Map<K,List<T>>`. The `Collector` object groups all objects that share the same key value in the `List<T>` associated with that key in the output map. This is very useful, as it allows you to partition the objects from a stream into based on a property of those objects.

When the following example code is executed:

```java
Course c1 = new Course(22012,2019,"Programming","Bouman", 4);
Course c2 = new Course(22012,2018,"Programming","Bouman", 4);
Course c3 = new Course(11013,2019,"ICT","Bouman",4);
Course c4 = new Course(22002,2019,"Combinatorial Optimization","van den Heuvel",4);
List<Course> courses = Arrays.asList(c1, c2, c3, c4);

Function<Course,String> keyFunction = c -> c.getCourseName()+" "+c.getCourseYear();
Function<Course,String> valueFunction = Course::getTeacher;
Map<String,String> map = courses.stream()
                                .collect(Collectors.toMap(keyFunction, valueFunction));
System.out.println(map);

Map<String,List<Course>> coursesPerTeacher;
coursesPerTeacher = courses.stream()
                           .collect(Collectors.groupingBy(Course::getTeacher));
System.out.println(coursesPerTeacher.get("Bouman"));
System.out.println(coursesPerTeacher.get("van den Heuvel"));
```

the following should be printed:

<sample-output>
    {Programming 2018=Bouman, Programming 2019=Bouman, ICT 2019=Bouman, Combinatorial Optimization 2019=van den Heuvel}
    [Course [courseNumber=22012, courseYear=2019, courseName=Programming, teacher=Bouman, ects=4.0], Course [courseNumber=22012, courseYear=2018, courseName=Programming, teacher=Bouman, ects=4.0], Course [courseNumber=11013, courseYear=2019, courseName=ICT, teacher=Bouman, ects=4.0]]
    [Course [courseNumber=22002, courseYear=2019, courseName=Combinatorial Optimization, teacher=van den Heuvel, ects=4.0]]
</sample-output>

## Further Reading
The [documentation](https://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html) of the `java.util.stream` package contains an in-depth treatise of the design and terminology related to the Stream API.

<Exercise title="Test your knowledge">

In this quiz, you can test your knowledge on the subjects covered in this chapter.

Write some code that does the following:

1. Create an empty `Optional<String>`
2. Create an `Optional<Integer>` that holds the number 42
3. A method `doubler` that accepts an `Optional<Integer>` and returns an `Integer` 0 if the given `Optional<Integer>` is empty and double the value as `Integer` if it is non-empty.

<Solution>

```java
// Part 1.
Optional<String> emtpy = Optional.empty();

// Part 2.
Optional<Integer> fortyTwo = Optional.of(42);

// Part 3.
public Integer doubler(Optional<Integer> in) {
      // Shortest solution
      return 2 * in.orElse(0);
}

// Part 3 (alternative, longer and not-preferred solution)
public Integer doulber(Optional<Integer> in) {
      if (in.isPresent()) {
            return 2 * in.get();
      }
      return 0;
}
```

</Solution>

---

Again, consider the `Course` class we introduced earlier:

```java
public class Course {
    // Instance variables and constructors omitted

    public long getCourseNumber() { ... }

    public int getCourseYear() { ... }

    public String getCourseName() { ... }

    public double getEcts() { ... }

    public String getTeacher() { ... }
}
```

Suppose we have a variable `List<Course> courses` containing objects for all courses taught at a University in
the recent past. Use the `Stream` API to write code that solves each of the following data analysis tasks
in a single statement (one declaration and one statement per task).

1. Compute a `List<String>` containing the names of all courses.
2. Compute a `Set<String>` of unique teachers that have taught courses in the year 2015.
3. Compute a `String` containing the names of all courses separated by commas. Course names should be repeated if a course was taught multiple times.
4. Print a line with the course year using `System.out.println`  for every year a course with the name `"Programming"` was taught.
5. Compute a `boolean` that indicates whether all courses with the name `"Programming"` where taught by a teacher with name `"Bouman"`.
6. Compute a `Map<Integer,List<courses>{}>` that provides a list of the courses taught by a teacher with name `"Bouman"` per year.

<Solution>

Note that the following are potential answer. Often, there is more than one way to do it.

```java
// Task 1.
List<String> names;
names = courses.stream()
               .map(Course::getCourseName)
               .collect(Collectors.toList());

// Task 2.
Set<String> teachers;
teachers = courses.stream()
                  .filter(c -> c.getCourseYear() == 2015)
                  .map(Course::getTeacher)
                  .collect(Collectors.toList());

// Task 3.
String names;
names = courses.stream()
               .map(Course::getCourseName)
               .collect(Collectors.joining(","));

// Task 4.
courses.stream()
       .filter(c -> c.getCourseName().equals("Programming"))
       .forEach(System.out::println);

// Task 5.
boolean answer;
answer = courses.stream()
                .filter(c -> c.getCourseName().equals("Programming"))
                .allMatch(c -> c.getTeacher().equals("Bouman");

// Task 6.
Map<Integer,List<Course>> result;
result = courses.stream()
                .filter(c -> c.getTeacher().equals("Bouman"))
                .collect(Collectors.groupingBy(Course::getCourseYear));
```
</Solution>

</Exercise>
