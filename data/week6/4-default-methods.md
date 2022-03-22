---
path: '/week6/4-default-methods'
title: 'Default methods and Shorter Comparators'
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You know what a default method in an interface is and where it is used.
- You can write a sorting method as a lambda expression or method reference.
- You understand how you can construct a `Comparator` with the `Comparator.comparing` method
- You can sort by multiple criteria.

</text-box>

## Method references
As we are now familiar with lambda expressions and functional interfaces, we should be comfortable with writing code such as:

```java
    Consumer<String> printer = str -> System.out.println(str);
    Function<Course,String> courseToString = c -> c.getTeacher();
    BinaryOperator<Integer> plus = (a,b) -> Integer.sum(a,b);
```

While these are simple and elegant lambda expressions, there is still a small bit of boilerplate code left in these examples. In these examples, our intention is to use the method `System.out.println` as a `Consumer<String>`, use the `getTeacher()` method to convert a `Course` to a `String`, or use the method `Integer.sum` as a `BinaryOperator`. However, we still define variables such as `str`, `c`, `a` and `b` to utilize these methods within the functional interfaces.

An alternative to lambda expression are **method references**. A method reference is a way in which we can express the idea that the implementation of a functional interface is given by a particular method. A method reference is given using either a class name or an object, followed by double colon operator `::` followed by the name of the method. Since we are not calling the method, but want to use it as an object of a function interface type, parenthesis and arguments are omitted. Using method references, we can write the `printer`, `courseToString` and `plus` references as follows:

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
The advantage of this approach, over writing a lambda expression, is that it is now easier to write test cases that call the `compareCourses` method directly. It also makes the code a bit easier to read: we have fewer nested blocks. In fact, the only Java 8 style syntax we are using here is a single method reference.

There are some variants of the method references, based on whether you write a class name or object before the `::` and whether the method name after the `::` is `static` or not. Table [1][] shows all five types of method references, together with their equivalent lambda expressions.

| Type        | Method Reference          | Lambda Expression                      |
|:------------|:--------------------------|:---------------------------------------|
| Static      | `MyClass::myStaticMethod` | `(arg) -> MyClass.myStaticMethod(arg)` |
| Bound       | `var::myMethod`           | `(arg) -> var.myMethod(arg)`           |
| Unbound     | `MyClass::myMethod`       | `(obj, arg) -> obj.myMethod(arg)`      |
| Constructor | `MyClass::new`            | `(arg) -> new MyClass(arg)`            |
| Array       | `int[]::new`              | `(len) -> new int[len]`                |

There are five types of method references. The five types are shown here, together with an equivalent lambda expression.

<Exercise title="Test your knowledge">

In this quiz, you can test your knowledge on the subjects covered in this chapter.

In the class World there is a static method countCreatures(String animals) with a return value of an integer. How do we write a method reference and a lambda expression for that?  

<Solution>

The method reference is as follows: `World::countCreatures`
The lambda expression is as follows: `(int) -> World.countCreatures(cows)`.

</Solution>

What method reference belongs to this lambda expression?
`World::new`
    
<Solution>

(arg) -> new World(arg)
    
</Solution>
</Exercise>

<!-- TODO: discussion of static vs non-static in a special interest block -->

## Default Methods in Interfaces
If you paid attention, you may have noticed that we referred to functional interfaces as interfaces that contain only a single *unimplemented* method. That may seem rather verbose, as Java versions prior to version 8 do not allow interfaces to contain any method implementations. That has changed with Java 8, as it is now possible to provide a *default* method implementation within an interface. Note that it is still not to declare *variables* within an interface, and classes that implement the interface are allowed to override the default implementation provided by the interface.

Writing a *default* method implementation in an interface is very similar to writing a regular method implementation, with the main different being the keyword `default` in the method header. We are allowed to call other methods defined in the interface, even if those methods have no method implementation.

The following is an example of an interface for two-dimensional points in the Euclidean plane.

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

Now, any non-abstract class that implements the `Point2D` interface is required to implement both the `getX()` and `getY()` method, but is not required to implement the `distanceTo` method. If no implementation of the `distanceTo` method is written in the class, the default implementation of the `distanceTo` method is written in the class, the default implementation provided in the interface is used.

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

Besides methods with *default* implementations, Java 8 now also allows the definition of `static` methods within interfaces. The main purpose of static methods is to provide utility methods, such as `Math.max()`, `Math.sin()` and `Collections.sort()`. For functional interfaces, it may be convenient to include helpful utility methods in the interface, rather than in separate classes such as `Collections` (which provides utility methods that deal with `Collection` types). The method `Comparator.comparing` is an example of such a static method. In the next section, we will have a closer look at the default and utility methods that were added to the `Comparator` interface, and see some nice examples that show how we can use them to write readable, declarative `Comparator`s.

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

For example, we can obtain a comparator for the reverse order of `String` objects using the `reverseOrder()` method. Suppose we want to sort our courses by the reverse alphabetical order of their teach name. We can use the following code for this:

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
It is allowed to use any variables that are in score in a lambda expression, as long as they are declared as inputs for the lambda expressions, or are **effectively final**. A variable is considered to be effectively final, if it would be possible to add the `final` keyword to the declaration of the variable without the compiler complaining about it.
The following is an example code fragment that violates the principle of using a variable within a lambda expression that is not effectively final:
```java
List<Predicate<Integer>> predList = new ArrayList<>();
for (int i=1; i <= 10; i++) {
    Predicate<Integer> p = v -> v >= i;
    predList.add(p);
}
```

The above is illegal since variable i is not effectively final! The reason is that i is incremented at the end of each loop, and thus changes in every iteration.
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

<!-- FROM HERE ON ITS NOT THE READER BUT THE FINNISH MOOC! -->

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

<Exercise title="Test your knowledge">

In this quiz, you can test your knowledge on the subjects covered in this chapter.

Why do we use types in Java?

<Solution>

Firstly, a powerful type system helps to prevent bugs.
Also, it allows overloading of methods.
Moreover, the code is easier to read and to refactor.
More advantages can be found in the advantages text box.

</Solution>


What is method overloading?


<Solution>

When the same method name is used for more than one method, the name is **overloaded**.
In Java, you can overload method names provided that the parameter types are different. For example, you can declare two methods, both called `print`:

`public void print(String s)`
`public void print(int i)`

When the `print` method is called, `print(x);`, the compiler looks at the type of `x`. If `x` is a `String`, the first method is called. If `x` is an integer value, the second method is called. If `x` is neither, the compiler generates an error.

</Solution>


What is the difference between a primitive type and a non-primitive type?

<Solution>

A non-primitive type is an instance of a class, which is an object.
Primitive types, on the other hand, just hold a value (number, character or true/false).
There are only eight primitive types, namely `byte`, `short`, `int`, `long`, `float`, `double`, `char` and `boolean`.

</Solution>


Can you autobox from `Integer` to `double`? And from `int` to `Double`?

<Solution>

Yes, you can autobox from `Integer` to `double`, but you cannot autobox from `int` to `Double`. Please reread the last paragraph of the text for further explanation.

</Solution>

</Exercise>
