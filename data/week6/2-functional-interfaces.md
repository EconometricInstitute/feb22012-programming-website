---
path: '/week6/2-functional-interfaces'
title: 'Functional Interfaces'
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You are able to explain what is special about a functional interface.
- You can name a number of standard functional interfaces and understand how to use and interpret them.

</text-box>

## Functional Interfaces
The `Comparator` type is a bit different from many of the types we are familiar with in `Java`, such as `String`, `ArrayList` or `Integer`. The main difference is that most of the common types hold *data*, while most `Comparator` objects only define the implementation of a method. In particular, a `Comparator` object should not have a state that changes over time, as the contract of the `compare` method typically dictates that the order of the objects must remain consistent.

The idea that a type, such as `Comparator` can represent a method rather than data, has proven to be quite powerful: we do not need to implement a sorting algorithm for every type we introduce, and we do not need to adapt complex sorting code when we want to define a new ad-hoc order for our objects. In `Java`, the `Collections.sort` method accepts not only data, but also a function that can be called to determine if two objects are in the correct order or not.

In the programming paradigm called *functional programming*, it is a common idea to have one function, for example `Collections.sort`, have another function as input, for example a `compare` method.
In the terminology of *functional programming*, a function that accepts another function as part of its input is called a **higher order function**. While it has always been possible in `Java` to write such higher order functions (the `Comparator` interface is much older than Java 8), it typically required the use of anonymous classes and Java programmers often preferred the straightforward way to keep their code more readable and understandable.

### Consumer
With the introduction of `Java 8`, the creators of the language added a number of new built-in interfaces that are meant to be used by such higher order functions, representing certain patterns that occur frequently in Java programs. One such interface is the `Consumer<T>` interface, which represents a function that does something with an argument of type `T`, but returns nothing. The single unimplemented method of this interface is defined as follows: `public void accept(T t);`.

Arguably, the most commonly used method in Java that accepts a single argument and returns nothing is the `System.out.println` method. We will now rewrite a traditional method that prints the names of all courses to use this interface.

```java
public static void printCourseNames(List<Course> courses) {
    for (Course c : courses) {
        System.out.println(c.getCourseName());
    }
}
```

The creators of `Java 8` added a new method to the `Iterable` interface called `forEach`. Since all `Collection`s are a subtype of `Iterable`, and `List` and `Set` are both subtypes of `Collection`, this method can also be used on `List` and `Set` objects. The `forEach` method is defined as follows: `public void forEach(Consumer<? super T> action);`.

Notice that the expression `System.out.println(c.getCourseName())` depends on a single variable `c` and returns nothing. We can use a lambda expression to turn this expression into a `Consumer<Course>`, like this: `Consumer<Course> printer = c -> System.out.println(c.getCourseName());`

Furthermore, we can use the lambda expression as a direct argument to the `forEach` method:
```
public static void printCourseNames(List<Course> courses) {
    courses.forEach(c -> System.out.println(c.getCourseName()));
}
```

### Function
When we think about the implementation of our `Comparator<Course>`, we typically extract a property from two `Course` objects that can be compared, and return an answer based on the result of that comparison.
This is a very common pattern in `Comparator` implementations, and we can think about it differently: we want to **transform** two `Course` objects into two objects that have a *natural order*, and then use that natural order to determine our result.

In `Java 8`, there is a functional interface that can be used to represent a transformation called `Function`. It is defined as follows:
```java
public Function<T,R> {
    public R apply(T arg);
}
```
Furthermore, the interface `Comparator` defines a new static utility method that accepts a function, which has the following simplified signature: `public static <T> Comparator<T> comparing(Function<T,Comparable> keyExtractor);`.

This can be interpreted as follows: given a `Function` object that is able to transform an object of type `T` into an object that implements a natural order via the `Comparable` interface, we obtain a `Comparator` which defines an ad-hoc order. This may sound daunting, but if we look at an actual example of how we can use it, it is not that bad: `Comparator<Course> comp = Comparator.comparing(c -> c.getTeacher());`.

The `Comparator<Course>` we obtain in this example will extract the teacher from two `Course` objects it needs to compare, and determine the order of the course objects based on their respective teachers.

The above is an example of *declarative programming*: rather than writing code that describes how the result of the comparison must be computed, we only describe what value should be used in the comparison. This often makes the code easier to understand, since you do not need to understand the computations that are going on, but can focus on the logic and meaning of your program.

### BinaryOperator
A common task in data analysis is counting how often something occurs. A `Map` is very useful for this kind of task, as we can use a `Map<String,Integer>` to hold the number of occurrences for every word, category, sentence, keyword etcetera we encounter. This can be achieved with the following code:

```java
public static Map<String,Integer> countOccurences(List<String> words)
{
    Map<String,Integer> result = new LinkedHashMap<>();
    for (String word : words) {
        if (result.containsKey(word)) {
            int oldValue = result.get(word);
            result.put(word, 1 + oldValue);
        }
        else {
            result.put(word, 1);
        }
    }
    return result;
}
```

While this method is extremely helpful, the `if-else` represents two options that we commonly need to consider when we work with maps: what to do when a certain key is present, and what to do when the key is not present yet. In Java, the method `merge` was added to the `Map` interface. A simplified version of the signature of this method is: `public V merge(K key, V value, BinaryOperator<T> remappingFunction);`, where the `BinaryOperator` interface is defined as:

```java
    public BinaryOperator<T>
    {
        public T apply(T left, T right);
    }
```
A `BinaryOperator` is a function that combines two things of type `T` and produces another value of type `T`. Common examples of binary operators in mathematics are: +, −, × and ÷. For example, the result of adding two numbers together is a new number.

The `merge` method in the `Map` interface allows us to define a new value that should be inserted into the map for a given key in case the map does not hold a value for that key yet. If the map does hold a value for that key, the old value and the new value are combined using the `BinaryOperator`, and the result is stored for that key instead. Note how these two options correspond to the two cases of the `if-else` in our `countOccurences` method. Indeed, we can avoid the use of the `if-else` using the `merge` method of map as follows:

```java
public static Map<String,Integer> countOccurences(List<String> words) {
    Map<String,Integer> result = new LinkedHashMap<>();
    for (String word : words) {
        result.merge(word, 1, (i,j) -> i+j);
    }
    return result;
}
```
Notice how short our method has become! At first, the second argument of the merge method may look a little cryptic, but it is just one way in which we can produce a `BinaryOperator` object that represents the mathematical + symbol. The statement `result.merge(word, 1, (i,j) -> i+j)` can be read as follows: store a 1 as the value for the key `word` if that key does not occur in the map, otherwise combine 1 with the current value in the map using the + operator and store the result as the new value for key `word`.

<!-- Note: in fact, the actual {\tt Map} interface defines the third argument of {\tt merge} as a {\tt BiFunction} which is a super type of {\tt BinaryOperator}, but in almost every case, you will pass a {\tt BinaryOperator} to this method. -->

### Other functional interfaces
The functional interfaces `Consumer`, `Function` and `BinaryOperator` are just three examples of the new functional interfaces that are included since Java 8. For many common patterns and tasks, a functional interface was defined. The next table contains the most important functional interfaces:

**Common functional interfaces in Java**

| Interface           | Arguments           | Returns   | Interpretation                      |
|:--------------------|:--------------------|:----------|:------------------------------------|
| `Comparator<T>`     | `(T o1, T o2)`      | `int`     | Define an order on `T`’s            |
| `BinaryOperator<T>` | `(T left, T right)` | `T`       | Combine two `T`’s into one `T`.     |
| `Consumer<T>`       | `(T arg)`           | `void`    | Do something with argument          |
| `BiConsumer<T,U>`   | `(T arg1, U arg2)`  | `void`    | Do something with the arguments     |
| `Function<T,R>`     | `(T arg)`           | `R`       | Transform a `T` into an `R`         |
| `BiFunction<T,U,R>` | `(T arg1, U arg2)`  | `R`       | Transform a `T` and `U` into an `R` |
| `Predicate<T>`      | `(T arg)`           | `boolean` | Check if a `T` has a property       |
| `Supplier<T>`       | `()`                | `T`       | Produces object of type `T`         |
| `UnaryOperator<T>`  | `(T arg)`           | `T`       | Transforms a `T` to a `T`           |
| `Runnable`          | `()`                | `void`    | Execute a task                      |

All newly added functional interfaces are defined in the java package `java.util.function`. The package contains a large number of additional functional interfaces that are typically variants of the interfaces in the table above, focused on primitive types. For example: a *predicate* that accepts an `int` is an `IntPredicate`, or a *function* that converts something to a `double` is a `DoubleFunction`. At the bottom of this page, you can find a table with the definitions of some of these additional interfaces.


<Exercise title="Test your knowledge">

In this quiz, you can test your knowledge on the subjects covered in this chapter.

In your code, you want to choose a type for an object that can do one of the following tasks.
Determine which functional type would be most suitable. State the full type, including generics.

So for example, the answer for an object to determine the order of two students of type `Student`
would be `Comparator<Student>`.

1. Check if a student of type `Student` has enrolled before the year 2019
2. Use a trained regression model of type `Model` to make a prediction for a new observation of type `Observation` and print the result to the screen
3. Use a trained regression model of type `Model` to make a prediction for a new observation of type `Observation` and obtain a prediction of type `Prediction`
4. Multiply two square matrices of type `SquareMatrix`
5. Transposing a square matrix of type `SquareMatrix`
6. Determining the determinant of a square matrix of type `SquareMatrix` as a `Double` value
7. Send the message in an `EmailMessage` object to a friend

<Solution>

1. a `Predicate<Student>`
2. a `BiConsumer<Model,Observation>` (printing to the screen is usually void, so a `Consumer` is appropriate)
3. a `BiFunction<Model,Observation,Prediction>`
4. a `BinaryOperator<SquareMatrix>` as the result of multiplying two square matrix is itself a `SquareMatrix`. A `BiFunction<SquareMatrix,SquareMatrix,SquareMatrix>` would be an alternative, more verbose option.
5. a `UnaryOperator<SquareMatrix>` as the result of transposing a square matrix is itself a `SquareMatrix`. A `Function<SquareMatrix,SquareMatrix>` would be an alternative, more verbose option.
6. a `Function<SquareMatrix,Double>` as the determinant is typically a `Double` value. Since the output type is different from the input type, we need a `Function`.
7. a `Consumer<EmailMessage>`, as sending an e-mail is typically a `void` method that just performs the sending. For void methods, a `Consumer` is a good choice.

</Solution>

</Exercise>
