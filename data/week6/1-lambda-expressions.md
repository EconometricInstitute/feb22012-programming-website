---
path: '/week6/1-lambda-expressions'
title: 'Lambda Expressions'
hidden: false
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You are aware of Java's Comparable class and now how to implement it in your own classes
- You know how to use Java's tools for sorting lists and stream elements.
- You know how to sort list elements using multiple criteria (e.g., you know how to sort a person based on name and age).

</text-box>

## Introduction to Lambda Expressions
In this document, we deal with the manipulation of objects for the purpose of data analysis. As an example, we use the domain of *students*, *courses* and *course results* obtained by the students. To start out, we first define a class that can help us model *course* data.

```java
public class Course {
    private final long courseNumber;
    private final int courseYear;
    private final String courseName;
    private final String teacher;
    private final double ects;

    public Course(long nr, int year, String name, String teacher, double ects) {
        super();
        this.courseNumber = nr;
        this.courseYear = year;
        this.courseName = name;
        this.teacher = teacher;
        this.ects = ects;
    }

    public long getCourseNumber() {
        return courseNumber;
    }

    public int getCourseYear() {
        return courseYear;
    }

    public String getCourseName() {
        return courseName;
    }

    public double getEcts() {
        return ects;
    }
    
    public String getTeacher() {
        return teacher;
    }
    
    // And default overridden versions of hashCode(), equals() and toString()
}
```

As you can see, four types of data are stored in a `Course` object: a *number* for the course, the *year* in which the course starts, the *name* of the course, the *teacher* of the course and the number of *ects* of this course. There are *getter* methods for these properties, and we also assume that we used our IDE to generate overridden versions of `hashCode()`, `equals()` and `toString()`.

As a result, the code
```java
Course c = new Course(22012, 2019, "Programming", "Paul Bouman", 4);
System.out.println(c);
```
prints the following: 

<sample-output>
Course [courseNumber=22012, courseYear=2019, courseName=Programming, teacher=Paul Bouman, ects=4.0]
</sample-output>

## Comparators Revisited
When we have a list of course objects, there could be different ways in which to sort them. For example, we could sort the courses based in an *oldest course first* order.
Alternatively, we could sort the courses based on the number of *ects* earned upon completion. For the different ways in which we can sort courses, we can define separate implementations of the `Comparator` interface, which requires us to implement the following method:

```java 
public interface Comparator<T> {
   public int compare(T left, T right);
}
```
that should return a negative `int` value if `left` \< `right`, return a positive `int` value if `left` \> `right` and zero if and only if `left` = `right`.

If we intend to sort a `List<Course>` by the alphabetical order of the names of the teachers of the courses, we could implement the `Comparator` in a class, and define a `sortCourses` method as follows:

```java
public static class TeacherComparator implements Comparator<Course> {
    @Override
    public int compare(Course o1, Course o2) {
        return o1.getTeacher().compareTo(o2.getTeacher());
    }
}

public static void sortCourses(List<Course> courses) {
    Collections.sort(courses, new TeacherComparator());
}
```

By defining a `static class` within another class, we avoid the need to put the `TeacherComparator` in a separate file. But still, there is quite a bit of code necessary to express that we want to order courses based on the teacher. The essence of what we want to express is the following short expression: `o1.getTeacher().compareTo(o2.getTeacher())`.

However, to be able to use this expression to sort `Course` objects, we need to define both a *class header* for the `TeacherComparator` class, as well as the *method header* of the `compare` method. Programmers sometimes refer to this kind of code as *boilerplate code*: we need to write it to let the compiler check that all our types are safe, but does not express what we want to do.

In this case, it is possible to use a feature of Java called an *anonymous class*. This is a class that can be defined _within a method_. Unfortunately, it still looks rather cumbersome:

```java
public static void sortCourses(List<Course> courses) {
    Comparator<Course> comp;
    comp = new Comparator<Course>() {
        @Override
        public int compare(Course o1, Course o2) {
            return o1.getTeacher().compareTo(o2.getTeacher());
        }           
    };
    Collections.sort(courses, comp);
}
```

In this course, we **advice against using anonymous classes**. When they are used, the code is often hard to read and understand. For example, it is rather confusing that it results in a *method definition* within a *method definition*. The number of nested curly braces also blows up fast, making it complicated to grasp the structure of the program.

Prior to Java 8, the anonymous class was the shortest way to transform our teacher comparison expression into a `Comparator` object. Fortunately, Java 8 introduced a feature called **lambda expressions**, that provides a syntax that is more concise and easier to read than the anonymous class.

Lambda expressions can only be used to create an object that implements an interface with a single unimplemented method. An interface with only a single unimplemented method is called a **functional interface**. This term is based on the concept of a *mathematical function*.

<!-- Special function; The types of the arguments of the single method can be seen as the \emph{domain} of the function whereas the return type can be seen as the \emph{image} of the function.
 
\begin{info}[Functional Programming]
Most Computer Science bachelor programs contain a course called \emph{functional programming} dedicated to a programming language that focuses on the composition of functions, rather than given step-by-step descriptions of what the computer should do. The first and oldest functional programming language is \emph{Lisp}, and more modern functional languages are \emph{Haskell}, \emph{Scala}, \emph{F\#} and \emph{OCaml}. One of the advantages of functional programming, is that it makes it easier to write programs that can be distributed over multiple computers or processors. With the rise of multi-core processors (most mobile phones already have four or eight cores) and the popularity of \emph{distributed} computing where data analysis tasks must be spread out over datasets that are stored on a number of different.
\end{info}
-->

The `Comparator` interface contains only a single unimplemented method:
`compare`. For our example, we can turn our expression
`o1.getTeacher().compareTo(o2.getTeacher())` into a `Comparator` object
as follows:

```java
Comparator<Course> comp = (Course o1, Course o2) ->    {
    return o1.getTeacher().compareTo(o2.getTeacher());
};
```

A *lambda expression* can be recognized by the arrow, written as `->`. Before this arrow, parameter variables are defined that will be available inside the body of the lambda expression. After the arrow, we have a block or expression, that contains regular code. 
It is required that the types and the number of the parameter variables match those of the single method of the functional interface. 
For a `Comparator<Course>`, the `compare` method expects two `Course` objects as input, which matches the arguments of our lambda expression. The type of the code after the arrow, must match the return type of the functional interface method. 
Since the return type of the `compare` method is `int`, we are required to return an `int` in our case. Fortunately, the `compareTo` method produces an `int`, and so the compiler is happy that our lambda expression matches the `compare` method.

Since the parameter and return types of the lambda expressions are required to match the parameter and return types of the functional interface, the compiler often does not need the explicit input types of the lambda expression, and can use *type inference* to determine what the types of the lambda expression’s inputs will be. As a result, we can shorten our example:

```java
Comparator<Course> comp = (o1,o2) -> {
    return o1.getTeacher().compareTo(o2.getTeacher());
};
```

There is another useful trick we can use here. Notice that the only code within the lambda is a single return statement. If only a single expression is returned, we are allowed to omit the curly braces and return statement and only write the expression. This provides an extremely concise syntax to create our `Comparator`: `Comparator<Course> comp = (o1,o2) -> o1.getTeacher().compareTo(o2.getTeacher());`

While this is great for a `Comparator` that compares a single attribute of our `Course` object, it is not sufficient for more complex `Comparator` object. Take for example the order in which we first compare the teacher. If the teachers are equal, we compare the course year. If the course years are also equal, we finally compare the names of the courses in alphabetical order. In that case, we should still use a more verbose lambda expression with explicit return statements.

```java
Comparator<Course> comp = (o1, o2) -> {
    if (!o1.getTeacher().equals(o2.getTeacher())) {
        return o1.getTeacher().compareTo(o2.getTeacher());
    }
    if (o1.getCourseYear() != o2.getCourseYear()) {
        return o1.getCourseYear() - o2.getCourseYear();
    }
    return o1.getCourseName().compareTo(o2.getCourseName());
};
```

If we can only use lambda expressions, this is the best we can. But Java introduced more features that make it possible to define a complex comparator in a much more compact way than the above code. But before we can work on that, we need to study two additional topics.

## Functional Interfaces
The `Comparator` type is a bit different from many of the types we are familiar with in `Java`, such as `String`, `ArrayList` or `Integer`. The main difference is that most of the common types hold *data*, while most `Comparator` objects only define the implementation of a method. In particular, a `Comparator` object should not have a state that changes over time, as the contract of the `compare` method typically dictates that the order of the objects must remain consistent. 

The idea that a type, such as `Comparator` can represent a method rather than data, has proven to be quite powerful: we do not need to implement a sorting algorithm for every type we introduce, and we do not need to adapt complex sorting code when we want to define a new ad-hoc order for our objects. In `Java`, the `Collections.sort` method accepts not only data, but also a function that can be called to determine if two objects are in the correct order or not.

In the programming paradigm called *functional programming*, it is a common idea to have one function, for example `Collections.sort`, have another function as input, for example a `compare` method. 
In the terminology of *functional programming*, a function that accepts another function as part of its input is called a **higher order function**. While that idea has always been possible in `Java` to write such higher order functions (the `Comparator` interface is much older than Java 8), it typically required the use of anonymous classes and Java programmers often preferred the straightforward way to keep their code more readable and understandable.

### Consumer
With the introduction of `Java 8`, the creators of the language added a number of new built-in interfaces that are meant to be used by such higher order functions, representing certain patterns that occur frequently in Java programs. One such interface is the `Consumer<T>` interface, which represents a function that does something with an argument of type `T`, but returns nothing. The single unimplemented method of this interface is defined as follows: `public void accept(T t);`.

Arguably the most commonly used method in Java that accepts a single argument and returns nothing is the `System.out.println` method. We will now rewrite a traditional method that prints the names of all courses to use this interface.

```java
public static void printCourseNames(List<Course> courses) {
    for (Course c : courses) {
        System.out.println(c.getCourseName());
    }
}
```

The creators of `Java 8` added a new method to the `Iterable` interface called `forEach`. Since all `Collection` is a super-type of `Iterable`, and `List` and `Set` are both sub-types of `Collection`, this methods can also be used `List` and `Set` objects. The `forEach` method is defined as follows: `public void forEach(Consumer<? super T> action);`.

Notice that the expression `System.out.println(c.getCourseName())` depends on a single variable `c` and returns nothing. We can use a lambda expression to turn this expression into a `Consumer<Course>`, like this: `Consumer<Course> printer = c -> System.out.println(c.getCourseName());`

Furthermore, we can use the lambda expression as a direct argument to the `forEach` method:
```
public static void printCourseNames(List<Course> courses) {
    courses.forEach(c -> System.out.println(c.getCourseName()));
}
```

### Function
When we think about the implementation of our `Comparator<Course>`, we typically extract a property from two `Course` objects than can be compared, and return an answer based on the result of that comparison. 
This is a very common pattern in `Comparator` implementations, and we can think about it in a different way: we want to **transform** two `Course` objects into two objects that have a *natural order*, and then use that natural order to determine our result.

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

Notice how short our method has become! At first, the second argument of the merge method may look a little bit cryptic, but it is just one way in which we can produce a `BinaryOperator` object that represents the mathematical + symbol. The statement `result.merge(word, 1, (i,j) -> i+j)` can be read as follows: store a 1 as the value for the key `word` if that key does not occur in the map, or combine 1 with the current value in the map using the + operator and store the result as the new value for key `word`.

<!-- Note: in fact, the actual {\tt Map} interface defines the third argument of {\tt merge} as a {\tt BiFunction} which is a super type of {\tt BinaryOperator}, but in almost every case, you will pass a {\tt BinaryOperator} to this method. -->

### Other functional interfaces
The functional interfaces `Consumer`, `Function` and `BinaryOperator` are just three examples of the new functional interfaces that are included since Java 8. For many common patterns and tasks, a functional interfaces was defined. The next table contains the most important functional interfaces:

**Common functional interfaces in Java**
    
| Interface           | Arguments           | Returns   | Interpretation                      |
|:--------------------|:--------------------|:----------|:------------------------------------|
| `ComparatorT`       | `(T o1, T o2)`      | `int`     | Define an order on `T`’s            |
| `BinaryOperator<T>` | `(T left, T right)` | `T`       | Combine two `T`’s into one `T`.     |
| `Consumer<T>`       | `(T arg)`           | `void`    | Do something with argument          |
| `BiConsumer<T,U>`   | `(T arg1, U arg2)`  | `void`    | Do something with the arguments     |
| `Function<T,R>`     | `(T arg)`           | `R`       | Transform a `T` into an `R`         |
| `BiFunction<T,U,R>` | `(T arg1, U arg2)`  | `R`       | Transform a `T` and `U` into an `R` |
| `Predicate<T>`      | `(T arg)`           | `boolean` | Check if a `T` has a property       |
| `Supplier<T>`       | `()`                | `T`       | Produces object of type `T`         |
| `UnaryOperator<T>`  | `(T arg)`           | `T`       | Transforms a `T` to a `T`           |
| `Runnable`          | `()`                | `void`    | Execute a task                      |
    
All newly added functional interfaces are defined in the java package `java.util.function`. The package contains a large number of additional functional interfaces that are typically variants of the interfaces in the table above focused on primitive types. For example: a *predicate* that accepts an `int`, or a *function* that converts something to an `int`. At the bottom of this page, you can find a table with the definitions of some of these additional interfaces.

## Method references
As we are now familiar with lambda expressions and functional interfaces, we should be comfortable with writing code such as:

```java
    Consumer<String> printer = str -> System.out.println(str);
    Function<Course,String> courseToString = c -> c.getTeacher();
    BinaryOperator<Integer> plus = (a,b) -> Integer.sum(a,b);
```
    
While these are simple and elegant lambda expressions, there is still a small bit of boilerplate code left in these examples. In these examples, our intention is to use the method `System.out.println` as a `Consumer<String>`, use the `getTeacher()` method to convert a `Course` to a `String`, or use the method `Integer.sum` as a `BinaryOperator`. However, we still define variables such as `str`, `c`, `a` and `b` to utilize these methods within the functional interfaces. 

An alternative to lambda expression are **method references**. A method reference is a way in which we can express the idea that the implementation of a functional interface is given by a particular method. A method reference is given using the either a class name or an object, followed by double colon operator `::` followed by the name of the method. Since we are not calling the method, but want to use it as an object of a function interface type, parenthesis and arguments are omitted. Using method references, we can write the `printer`, `courseToString` and `plus` references as follows: 

```java
Consumer<String> printer = System.out::println;
Function<Course,String> courseToString = Course::getTeacher;
BinaryOperator<Integer> plus = Integer::sum;
```

Note that you can always use the lambda notation instead: the main advantage of method references is that they are shorter, and we do not have the need to introduce a variable. Another advantage of method references, is that methods are generally easier to test and debug than lambda expressions. For very short lambda expressions, there is often little need for debugging, but when we write longer lambda expressions, debugging becomes complicated. 

Recall our long lambda expression implementing a rather complicated `Comparator<Course>` given in Listing [\[lst:longlambda\]][1]. This is a good candidate to replace with a method reference as follows: 

```java
public class ComparatorExamples {
    public static int compareCourses(Course o1, Course o2) {
        if (!o1.getTeacher().equals(o2.getTeacher())) {
            return o1.getTeacher().compareTo(o2.getTeacher());
        }
        if (o1.getCourseYear() != o2.getCourseYear()) {
            return o1.getCourseYear() - o2.getCourseYear();
        }
        return o1.getCourseName().compareTo(o2.getCourseName());
    }
    
    public static void sortCourses(List<Course> courses) {
        Collections.sort(courses, ComparatorExamples::compareCourses);
    }
}    
```
The advantage of this approach over writing a lambda expression, is that it is now easier to write test cases that call the `compareCourses` method directly. It also makes the code a bit easier to read: we have fewer nested blocks. In fact, the only Java 8 style syntax we are using here is a single method reference.

The are some variants of the method references, based on whether you write a class name or object before the `::` and whether the method name after the `::` is `static` or not. Table [1][] shows all five types of method references, together with their equivalent lambda expressions. 

| Type        | Method Reference          | Lambda Expression                      |
|:------------|:--------------------------|:---------------------------------------|
| Static      | `MyClass::myStaticMethod` | `(arg) -> MyClass.myStaticMethod(arg)` |
| Bound       | `var::myMethod`           | `(arg) -> var.myMethod(arg)`           |
| Unbound     | `MyClass::myMethod`       | `(obj, arg) -> obj.myMethod(arg)`      |
| Constructor | `MyClass::new`            | `(arg) -> new MyClass(arg)`            |
| Array       | `int[]::new`              | `(len) -> new int[len]`                |

There are five types of method references. The five types are shown here, together with an equivalent lambda expression.

<!-- TODO: discussion of static vs non-static in a special interest block -->

## Default Methods in Interfaces
If you paid attention, you may have noticed that we referred to functional interfaces as interfaces that contain only a single *unimplemented* method. That may seem rather verbose, as Java versions prior to version 8 do not allow interfaces to contain any method implementations. That has changed with Java 8, as it is now possible to provide a *default* method implementation within an interface. Note that it is still not to declare *variables* within an interface, and classes that implement the interface are allowed to override the default implementation provided by the interface.

Writing a *default* method implementation in an interface is very similar to writing a regular method implementation, with the main different being the keyword `default` in the method header. We are allowed to call other methods defined in the interface, even if those methods have no method implementation.

The following is an example of an interface for two dimensional points in the Euclidean plane.

```java
    public interface Point2D
    {
        public double getX();
        public double getY();
        public default double distanceTo(Point2D other)
        {
            double dx = getX() - other.getX();
            double dy = getY() - other.getY();
            return Math.sqrt(dx*dx + dy*dy);
        }
    }
 ```

Now any non-abstract class that implements the `Point2D` interface is required to implement both the `getX()` and `getY()` method, but is not required to implement the `distanceTo` method. If no implementation of the `distanceTo` method is written in the class, the default implementation of the `distanceTo` method is written in the class, the default implementation provided in the interface is used.

In Java versions prior to version 8, the language creators almost never dared to add additional methods to existing interfaces, at it would break compatibility with all classes implementing that interface. With the introduction of default method implementations in interface, many new helpful methods were added to existing interfaces, including `Map` and `List`. The `merge` method of the `Map` interface mentioned in the section on Binary Operators is one example of a new default method implementation.

Another advantage of default method implementations in interfaces is that we can use a lambda expression or a method reference for that interface when that interface contains more than one method, as long as only a single method has no default implementation. This is the case for the `Comparator` interface, to which a number of default methods were added in Java 8. One example is the `reversed` method:

```java
public interface Comparator<T> {
    public int compare(T left, T right);
    public default Comparator<T> reversed() {
        return (l,r) -> compare(r,l);
    }
}
 ```   

The `reversed()` method is quite useful. If we have any `Comparator`, we can derive a new `Comparator` object from it which defines the reversed order. The implementation is rather simple: each time two elements are compared, the order in which they are compared it swapped by the lambda expression before they are given to the original `Comparator`. The usage is rather intuitive, as witnessed by the following example:

```java
List<Course> courses = /* some list */;
Comparator<Course> comp = Comparator.comparing(Course::getTeacher);
// Sorts the courses in the alphabetical order of their teacher
courses.sort(comp);
Comparator<Course> reversed = comp.reversed();
// Sorts the courses to the reversed alphabetical order of their teacher
courses.sort(reversed); 
```

Besides methods with *default* implementations, Java 8 now also allows the definition of `static` methods within interfaces. The main purpose of static methods is to provide utility methods, such as `Math.max()`, `Math.sin()` and `Collections.sort()`. For functional interfaces it may be convenient to include helpful utility methods in the interface, rather than in separate classes such as `Collections` (which provides utility methods that deal with `Collection` types). The method `Comparator.comparing` is an example of such a static method. In the next section, we will have a closer look at the default and utility methods that were added to the `Comparator` interface, and see some nice examples that show how we can use them to write readable, declarative `Comparator`s.

# Writing Functional Comparators
Using lambda expressions and method references, we have great tools to write concise and declarative implementations of the `Comparator` interface. A good example is that we can obtain a `Comparator` object that defines an order on `Course` objects based on their teacher: `Comparator<Course> comp = (o1,o2) -> o1.getTeacher().compareTo(o2.getTeacher());`.

Using the static utility and a method reference to the `getTeacher` method, we can even reduces this to `Comparator<Course> comp = Comparator.comparing(Course::getTeacher);`.

If we want to compare a single attribute of a `Course` object, this is great. The property of the objects the comparator is comparing is called a *key*. The `Comparator` interface has a number of static methods that can help use create `Comparator` objects based on such keys. These are:

```java
public static Comparator<T> comparing(Function<T,Comparable> keyExtractor);
public static Comparator<T> comparing(Function<T,U> keyExtractor, Comparator<U> keyComparator);
public static Comparator<T> comparingDouble(ToDoubleFunction<T> keyExtractor);
public static Comparator<T> comparingInt(ToIntFunction<T> keyExtractor);
```

Based on these methods, we can create various comparators for our `Course` objects:
```java
Comparator<Course> compTeacher = Comparator.comparing(Course::getTeacher);
Comparator<Course> compYear = Comparator.comparingInt(Course::getCourseYear);
Comparator<Course> compEcts = Comparator.comparingDouble(Course::getEcts);
Comparator<Course> compName = Comparator.comparing(Course::getCourseName);
```

We can also obtain a basic `Comparator` object for types that have a natural order defined by the `Comparable` type. The `Comparator` interfaces contains two static methods related to natural orders:
```java
public static Comparator<T extends Comparable> naturalOrder();
public static Comparator<T extends Comparable> reverseOrder();
```

For example, we can obtain an comparator for the reverse order of `String` objects using the `reverseOrder()` method. Suppose we want to sort our courses by the reverse alphabetical order of their teach name. We can use the following code for this:

```java
// Obtain a reverse alphabetic order comparator
Comparator<String> reverse = Comparator.reverseOrder();
Comparator<Course> comp = Comparator.comparing(Course::getTeacher, reverse);
// Alternatively, this can be written as:
Comparator<Course> comp = Comparator.comparing(Course::getTeacher, Comparator.reverseOrder());
```

Often we want to define more complex orders: *first* compare the *teacher* and if the teachers are equal, *then* compare the *year* in which the course is given. Only if both the *teacher* and *year* are the same, *then* the comparator should look at the *name* of the course. Using lambda expressions, this still requires us to write code that is not that readable and understandable.

Fortunately, the `Comparator` interface has a number of default method implementation that can help us. These default method implementation are the following ones:

```java
public default Comparator<T> thenComparing(Comparator<T> other);
public default Comparator<T> thenComparing(Function<T,Comparable> keyExtractor);
public default Comparator<T> thenComparing(Function<T,U> keyExtractor, Comparator<U> keyComparator);
public default Comparator<T> thenComparingDouble(ToDoubleFunction<T> keyExtractor);
public default Comparator<T> thenComparingInt(ToIntFunction<T> keyExtractor);
```

These methods allow use to take an existing `Comparator` and derive a new `Comparator` that first uses the order defined by the original `Comparator`. Only if two objects are equal according to the original `Comparator`, the next `Comparator` is used to determine the order. 

The idea that we can combine two `Comparator` objects into a new one is a quite powerful. This is often called *composition*: more complex functions are defined as a combination of multiple smaller functions. We can use this to constructor our more complex comparator:

```java
Comparator<Course> compTeacher = Comparator.comparing(Course::getTeacher);
Comparator<Course> compYear = Comparator.comparingInt(Course::getCourseYear);
Comparator<Course> compName = Comparator.comparing(Course::getCourseName);
// Combine the three separate comparators into one:
Comparator<Course> compAll = compTeacher.thenComparing(compYear)
                                        .thenComparing(compName);
```

We do not need to define the different comparators separately before we can combine them, so the above code can be reduced to the following, shorter version:
```java
Comparator<Course> comp;
comp = Comparator.comparing(Course::getTeacher)
                 .thenComparingInt(Course::getCourseYear)
                 .thenComparing(Course::getCourseName);
```

# Effectively Final
It is allowed to use any variables that are in score in a lambda expression, as long as they are declared as inputs for the lambda expressions, or are **effectively final**. A variabele is considered to be effectively final, if it would be possible to add the `final` keyword to the declaration of the variable without the compiler complaining about it.
The following is an example code fragment that violates the pricinple of using a variable within a lambda expression that is not effectively final:
```java
List<Predicate<Integer>> predList = new ArrayList<>();
for (int i=1; i <= 10; i++) {
    // The following is illegal since variable i is not effectively final!
    // The reason is that i is incremented at the end of each loop, and
    // thus changes in every iteration.
    Predicate<Integer> p = v -> v >= i;
    predList.add(p);
}
```
Often, it is relatively easy to fix this issue by the introduction of a new variable:
```java
List<Predicate<Integer>> predList = new ArrayList<>();
for (int i=1; i <= 10; i++) {
    // Variable j is never updated after this, so it is effectively final
    int j = i;
    // This lambda expression is now legal
    Predicate<Integer> p = v -> v >= j;
    predList.add(p);
}
```

<!-- From here it is the Fins mooc -->

## Sorting Method as a Lambda Expression
Let's assume that we have the following Person class for use.

```java
public class Person {

    private int birthYear;
    private String name;

    public Person(int birthYear, String name) {
        this.birthYear = birthYear;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public int getBirthYear() {
        return birthYear;
    }
}
```

And person objects on a list.
```java
ArrayList<Person> person = new ArrayList<>();
person.add(new Person("Ada Lovelace", 1815));
person.add(new Person("Irma Wyman", 1928));
person.add(new Person("Grace Hopper", 1906));
person.add(new Person("Mary Coombs", 1929));
```

We want to sort the list without having to implement the `Comparable` interface.

Both the `sort` method of the `Collections` class and the stream's `sorted` method accept a lambda expression as a parameter that defines the sorting criteria. More specifically, both methods can be provided with an object that implements the <a href="https://docs.oracle.com/javase/8/docs/api/java/util/Comparator.html" target="_blank">Comparator</a> interface, which defines the desired order - the lambda expression is used to create this object.

```java
ArrayList<Person> persons = new ArrayList<>();
persons.add(new Person("Ada Lovelace", 1815));
persons.add(new Person("Irma Wyman", 1928));
persons.add(new Person("Grace Hopper", 1906));
persons.add(new Person("Mary Coombs", 1929));

persons.stream().sorted((p1, p2) -> {
    return p1.getBirthYear() - p2.getBirthYear();
}).forEach(p -> System.out.println(p.getName()));

System.out.println();

persons.stream().forEach(p -> System.out.println(p.getName()));

System.out.println();

Collections.sort(persons, (p1, p2) -> p1.getBirthYear() - p2.getBirthYear());

persons.stream().forEach(p -> System.out.println(p.getName()));
```

<sample-output>

Ada Lovelace
Grace Hopper
Irma Wyman
Mary Coombs

Ada Lovelace
Irma Wyman
Grace Hopper
Mary Coombs

Ada Lovelace
Grace Hopper
Irma Wyman
Mary Coombs

</sample-output>

When comparing strings, we can use the `compareTo` method provided by the String class. The method returns an integer that describes the order of both the string given to it as a parameter and the string that's calling it.

```java

ArrayList<Person> persons = new ArrayList<>();
persons.add(new Person("Ada Lovelace", 1815));
persons.add(new Person("Irma Wyman", 1928));
persons.add(new Person("Grace Hopper", 1906));
persons.add(new Person("Mary Coombs", 1929));

persons.stream().sorted((p1, p2) -> {
    return p1.getName().compareTo(p2.getName());
}).forEach(p -> System.out.println(p.getName()));
```

<sample-output>

Ada Lovelace
Grace Hopper
Irma Wyman
Mary Coombs

</sample-output>

<programming-exercise name='Literacy comparison (2 parts)' tmcname='part10-Part10_13.LiteracyComparison'>

This exercise uses open data about literacy levels, provided by UNESCO. The data includes statistics of estimated or reported levels of literacy for various countries for the past two years.
File `literacy.csv`, included with the exercise template, includes the literacy estimates for women and men over 15 years of age. Each line in the file `literacy.csv` is as follows:
"theme, age group, gender, country, year, literacy percent. Below are the first five lines as an example.

<pre>
Adult literacy rate, population 15+ years, female (%),United Republic of Tanzania,2015,76.08978
Adult literacy rate, population 15+ years, female (%),Zimbabwe,2015,85.28513
Adult literacy rate, population 15+ years, male (%),Honduras,2014,87.39595
Adult literacy rate, population 15+ years, male (%),Honduras,2015,88.32135
Adult literacy rate, population 15+ years, male (%),Angola,2014,82.15105
</pre>

Create a program that first reads the file `literacy.csv` and then prints the contents from the lowest to the highest ranked on the literacy rate. The output must be exactly as in the following example. The example shows the first five  of the expected rows.

<sample-output>

Niger (2015), female, 11.01572
Mali (2015), female, 22.19578
Guinea (2015), female, 22.87104
Afghanistan (2015), female, 23.87385
Central African Republic (2015), female, 24.35549

</sample-output>

This exercise is worth two points.

Tip! Here's how to split a string into an array by each comma.

```java
String string = "Adult literacy rate, population 15+ years, female (%),Zimbabwe,2015,85.28513";
String[] pieces = string.split(",");
// now pieces[0] equals "Adult literacy rate"
// pieces[1] equals " population 15+ years"
// etc.

// to remove whitespace, use the trim() method:
pieces[1] = pieces[1].trim();
```

</programming-exercise>

## Sorting By Multiple Criteria
We sometimes want to sort items based on a number of things. Let's look at an example in which films are listed in order of their name and year of release. We'll make use of Java's <a href="https://docs.oracle.com/javase/8/docs/api/java/util/Comparator.html" target="_blank" norel>Comparator</a> class here, which offers us the functionality required for sorting. Let's assume that we have the class `Film` at our disposal.

```java
public class Film {
    private String name;
    private int releaseYear;

    public Film(String name, int releaseYear) {
        this.name = name;
        this.releaseYear = releaseYear;
    }

    public String getName() {
        return this.name;
    }

    public int getReleaseYear() {
        return this.releaseYear;
    }

    public String toString() {
        return this.name + " (" + this.releaseYear + ")";
    }
}
```

The `Comparator` class provides two essential methods for sorting: `comparing` and `thenComparing`. The `comparing` method is passed the value to be compared first, and the `thenComparing` method is the next value to be compared. The `thenComparing` method can be used many times by chaining methods, which allows virtually unlimited values to be used for comparison.

When we sort objects, the `comparing` and `thenComparing` methods are given a reference to the object's type - the method is called in order and the values returned by the method are compared. The method reference is given as `Class::method`. In the example below, we print  movies by year and title in order.

```java
List<Film> films = new ArrayList<>();
films.add(new Film("A", 2000));
films.add(new Film("B", 1999));
films.add(new Film("C", 2001));
films.add(new Film("D", 2000));

for (Film e: films) {
    System.out.println(e);
}

Comparator<Film> comparator = Comparator
              .comparing(Film::getReleaseYear)
              .thenComparing(Film::getName);

Collections.sort(films, comparator);

for (Film e: films) {
    System.out.println(e);
}
```

<sample-output>

A (2000)
B (1999)
C (2001)
D (2000)

B (1999)
A (2000)
D (2000)
C (2001)

</sample-output>

<programming-exercise name='Literature (3 parts)' tmcname='part10-Part10_14.Literature'>

Write a program that reads user input for books and their age recommendations.

The program asks for new books until the user gives an empty String (only presses enter). After this, the program will print the number of books, their names, and their recommended ages.

<h2>Reading and printing the books</h2>

Implement the reading and printing the books first, the ordering of them doesn't matter yet.

<sample-output>

Input the name of the book, empty stops: **The Ringing Lullaby Book**
Input the age recommendation: **0**

Input the name of the book, empty stops: **The Exiting Transpotation Vehicles**
Input the age recommendation: **0**

Input the name of the book, empty stops: **The Snowy Forest Calls**
Input the age recommendation: **12**

Input the name of the book, empty stops: **Litmanen 10**
Input the age recommendation: **10**

Input the name of the book, empty stops:

4 books in total.

Books:
The Ringing Lullaby Book (recommended for 0 year-olds or older)
The Exiting Transpotation Vehicles (recommended for 0 year-olds or older)
The Snowy Forest Calls (recommended for 12 year-olds or older)
Litmanen 10 (recommended for 10 year-olds or older)

</sample-output>

<h2>Ordering books based on their age recommendation</h2>

Expand your program so, that the books are sorted based on their age recommendations when they are printed. If two (or more) books share the same age recommendations the order between them does not matter.

<sample-output>

Input the name of the book, empty stops: **The Ringing Lullaby Book**
Input the age recommendation: **0**

Input the name of the book, empty stops: **The Exiting Transpotation Vehicles**
Input the age recommendation: **0**

Input the name of the book, empty stops: **The Snowy Forest Calls**
Input the age recommendation: **12**

Input the name of the book, empty stops: **Litmanen 10**
Input the age recommendation: **10**

Input the name of the book, empty stops:

4 books in total.

Books:
The Ringing Lullaby Book (recommended for 0 year-olds or older)
The Exiting Transpotation Vehicles (recommended for 0 year-olds or older)
Litmanen 10 (recommended for 10 year-olds or older)
The Snowy Forest Calls (recommended for 12 year-olds or older)

</sample-output>

<h2>Ordering books based on their age recommendation and name</h2>
Expand your program, so that it sorts the books with the same age recommendation based on their name alphabetically.

<sample-output>

Input the name of the book, empty stops: **The Ringing Lullaby Book**
Input the age recommendation: **0**

Input the name of the book, empty stops: **The Exiting Transpotation Vehicles**
Input the age recommendation: **0**

Input the name of the book, empty stops: **The Snowy Forest Calls**
Input the age recommendation: **12**

Input the name of the book, empty stops: **Litmanen 10**
Input the age recommendation: **10**

Input the name of the book, empty stops:

4 books in total.

Books:
The Exiting Transpotation Vehicles (recommended for 0 year-olds or older)
The Ringing Lullaby Book (recommended for 0 year-olds or older)
Litmanen 10 (recommended for 10 year-olds or older)
The Snowy Forest Calls (recommended for 12 year-olds or older)

</sample-output>
</programming-exercise>
