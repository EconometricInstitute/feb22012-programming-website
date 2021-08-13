---
path: "/week6/2-functional-interfaces-data-processing"
title: "Functional Interfaces for Data Processing"
hidden: false
---

## A common pattern
The following method contains a common pattern in data processing:

```java
public class StreamExamples {
    private List<Course> courses;
    // Constructor
    public List<String> getNamesAfterYear(int year) {
        List<String> result = new ArrayList<>();
        for (Course c : courses) {
            if (c.getCourseYear() >= year) {
                result.add(c.getCourseName());
            }
        }
        return result;
    }
}
```

Note that the `NamesAfterYear` method accepts a year and looks at all `Course` objects current stored in the list `courses`. If the year a course takes places is greater our equal to the `year` provided as input, the name of the course is extracted and added to the output list.

There are two common concepts in this method. First, we *select* or *filter* only the elements of the list that are interesting according to some rule, i.e. whether the year of the course is greater or equal to a given year. Second, we *transform* our `Course` data into `String` data by retrieving the name of the course from the `Course` objects.

Before, we discussed a number of *functional interfaces* that were introduced together with the *lambda expressions*. Do you recall them? If not, have a look at the table that was provided to refresh your memory.

Let us first consider the concept of *selecting* or *filtering* data. Here, for each element in the source data set, we want to determine if they should be included in the output data according to some *condition*. Do you know which functional interface would be best suited to model the task of checking whether a condition holds or not?

The functional interface that is useful in this context is called `Predicate<T>`. A predicate has a method `boolean test(T arg)` that accepts an argument of type `T` and outputs a boolean whether a property or condition of that input is true or false. In our case, we can generalize our method to accept a `Predicate` to check which `Course` objects to include, rather than a year. This gives the following code: 

```java
public List<String> getNamesConditional(Predicate<Course> p) {
    List<String> result = new ArrayList<>();
    for (Course c : courses) {
        if (p.test(c)) {
            result.add(c.getCourseName());
        }
    }
    return result;
}
```

and we can rewrite our `namesAfterYear` method by writing the condition as the lambda expression `c -> c.getCourseYear() >= year`. In full, this becomes:

```java
public List<String> getNamesAfterYear(int year) {
    return getNamesConditional(c -> c.getCourseYear() >= year);
}
```

Next we consider the concept of *transforming* the `Course` objects to data we want to store in the data list. In the example, `Course` objects are transformed to `String` objects by calling the `getCourseName` method of the `Course` class. Can you guess which functional interface from the table is most suited to represent the task of transforming one type of data to another type of data?

The functional interface that is useful in this context is called `Function<T,R>`. A function has a method `R apply(T arg)` that accepts an object of type `T` and transforms it to an object of type `R`. In our case, we are transforming a `Course` object to a `String` object by calling the `getCourseName` method from the `Course` class. We can generalize our `getNamesConditional` method to work with different transformations by using a `Function<Course,String` object as follows:

```java
public List<String> transformToString(Function<Course,String> f, Predicate<Course> p) {
    List<String> result = new ArrayList<>();
    for (Course c : courses) {
        if (p.test(c)) {
            String ans = f.apply(c);
            result.add(ans);
        }
    }
    return result;
}
```

and we can rewrite our `namesAfterYear` method by providing the condition as a `Predicate<Course>` object, and use a method reference to `getCourseName` to construct the `Function` object.

```java
public List<String> getNamesAfterYear(int year) {
    Function<Course,String> f = Course::getCourseName;
    Predicate<Course> p = c -> c.getCourseYear() >= year;
    return transformToString(f, p);
}
```

Note that the output type is now `List<String>`. But we may want to transform `Course` objects to `Integer` (using the `getCourseYear()` method) or `Double` (using the `getEcts()` method). We can make our `transformToString` method even more general by defining a method specific type variable `E` for the output type. Both the `Function` and the method itself should have this type `E` as their output. This results in the following method:

```java
public <E> List<E> transform(Function<Course,E> f, Predicate<Course> p) {
    List<E> result = new ArrayList<>();
    for (Course c : courses) {
        if (p.test(c)) {
            E ans = f.apply(c);
            result.add(ans);
        }
    }
    return result;
}
```

We can rewrite the `getNamesAfterYear` method as follows:
```java
public List<String> getNamesAfterYear4(int year) {
    return transform(Course::getCourseName, c -> c.getCourseYear() >= year);
}
```

While it may seem cumbersome to split up our original method into two methods, our `transform` method makes it rather easy to extract different data out of our list of `Course` objects. Two examples are:

```java
public List<String> getTeacherNamesInYear(int year) {
    return transform(Course::getTeacher, c -> c.getCourseYear() == year);
}
    
public List<Double> getECTSForTeacher(String teacherName) {
    return transform(Course::getEcts, c -> c.getTeacher().equals(teacherName));
}
```

The first of these methods, computers a list of the names of teachers of courses that take place in a given year. The second method computes a list of course ECTS for courses taught by a particular teacher. Thanks to the generality of the `transform` method, we can *declaratively* write queries on our data set of courses, rather than having to write an explicit imperative program with `for` and `each`.

As we have seen, using lambda expressions and method references allow us to write queries on a list of data in a more declarative and more concise way. However, we still implemented the transform method by our self. One of the main innovations that was introduced in Java 8, the Stream API, can help us to avoid writing our own `transform` method and many variants of it for similar but slightly different patterns. 

## A data processing pipeline
An alternative way to think about the `transform` method we developed in Listing [\[lst:transform\]][1] is to visualize it as a data processing *pipeline*. Through this data pipeline, we have the *source* list `courses`, which can emit its `Course` objects into the pipeline. The first step these objects hit in the pipeline is a *filter* unit that removes any `Course` objects that only lets objects flow through it if they adhere to a given condition, removing any objects from the flow that fail to meet the condition. After the filter unit, there is a *transform* unit that takes `Course` objects that flow into it through the pipeline, and transforms them into some other kind of object of a generic type `E`. Finally, there is a *terminal unit* at the end of the pipeline, that takes any objects of type `E` that reach it, and puts them in a `List<E>`. Thus, this *terminal unit* has the task of assembling the final output. In the figure below, you can see a visual representation of this pipeline:

<img width="593" alt="In the figure, the visual representation shows four stadia. The first is the Source List, that points to the second, which says Filter. The Filter points to Transform and Transform points to Output list." src="https://user-images.githubusercontent.com/67587903/129425492-74770591-9e7c-44cc-83c7-0c81034ae125.PNG">

When we think about data processing pipelines, it is useful to think about three categories of units that make up the pipeline. At the beginning of the pipeline, there is a **data source** that is able to emit data objects that flow through the pipeline. After the data source, the data objects flow through a sequence of **intermediate operations**, that can perform various tasks: filter out data objects based on some condition, transform data objects into different data objects, shut down the flow of data objects after a certain number of objects have passed through it and many other tasks. At the end of the pipeline, there is a single **terminal operation** that consumes all objects flowing through the pipeline and does something with them: store them in a data structure such as a `List` or `Set`, compute some aggregate statistic based on them such as a sum or maximum value, or perform a task for each object that flows out of the pipeline. 

In Java 8, the `Stream` API was introduced that allows us to define data processing pipelines such as the one visualized in Figure [\[fig:mapfilterpipeline\]][1]. When we want to implement data processing tasks that fit the paradigm of the pipeline well, this `API` enables you to write very concise code, that typically leaves little room for accidental programming mistakes. It often holds that if your code compiles, it behaves as intended. 

The concept of data processing pipelines has proven to be quite popular since the advent of the *Big Data* hype. 
Traditional procedural implementations of data processing methods require programmers to write statement like: for each element in the list, check if some condition holds, then call some method on it, if that succeeds put it in an output list. 
However, if the data is distributed over a number of different computers or if we want to perform the data processing in a parallel fashion, it often requires a lot of work to convert the procedural approach to the new setting. 
If think about data processing in terms of a pipeline, we do not need to define how all steps are precisely executed, but only what should happen in each of the processing units of the pipeline. 
This *declarative* way of thinking has a major advantage: when we want to execute the pipeline in a distributed or parallel fashion, we only need to think if the different steps in our pipeline support this. 
We can leave the actual execution of the steps in the pipeline to the library that implements the `Stream` API, whether it is applied to a standard data structure, executed in a parallel fashion or perform on many computers connected to each other via a network.

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
Not all objects that flow through a data processing pipeline may be of interest for the analysis you intend to perform. It is thus helpful to have an operation that can remove the objects that are not relevant to the analysis from the data flow, before they can reach the processing stops further down the pipeline. The intermediate operation `filter` does this. 
The `filter` method requires a `Predicate<T>` object that is used to determine if objects should be continue to flow to the next processing units in the pipeline or be discarded. If the `test()` function of the `Predicate` returns `true`, an object is send to the next unit in the pipeline, and if it returns `false`, the object is discarded.

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

## Terminal Operations
After constructing a `Stream` object from a data source and zero or more intermediate operations, a **terminal operation** starts up the actual flow of objects through the pipeline and processes them into a final result. The Stream API is rather flexible in what this final result can be: you can feed all objects that are emitted from the stream to a `Consumer` such as `System.out::print`, check if some condition holds, obtain a the first object that is emitted from the stream, collect all objects that come out into a `Collection` type, or combine all emitted objects into an aggregate result such as a mean, sum, minimum or maximum value.

The previous table contains an overview of some of the terminal operations that are available in the `Stream` interface. Note that terminal operations can be recognized from the fact that they return something that is **not** of type `Stream`. By ending the pipeline, we obtain a different kind of result.

The `allMatch`, `anyMatch` and `noneMath` terminal operations all take a `Predicate` as an argument and compute a `boolean` value from the application of the `Predicate` to all objects emitted from the stream. The `count` terminal operations counts the number of objects emitted from the stream. The terminal operation `collect` requires a special object that can aggregate the emitted objects into an output. Different options for such `Collector` objects are explained in Section [\[sec:collectors\]][2]. We discuss the remaining terminal operations in more detail in the following sections.

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
It is possible to have streams that omit no data at all. This can happen if we call `stream()` on an empty `Collection`, or if we use a `filter` operation that is so strict that all objects are discarded from the stream. To deal with such situations in a neat way the creators of decided to introduce a new class `Optional<T>`. An object of type `Optional<T>` either holds a single value of type `T`, or is empty. As a consequence, rather than specifying a return type `T` that may be `null` if no suitable value can be returned, you can specify explicitly that a method may not always return a value by means of the `Optional<T>` return type.

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
