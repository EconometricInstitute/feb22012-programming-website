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

Using the static utility and a method reference to the `getTeacher` method, we can even reduce this to `Comparator<Course> comp = Comparator.comparing(Course::getTeacher);`.

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

For example, we can obtain a comparator for the reverse order of `String` objects using the `reverseOrder()` method. Suppose we want to sort our courses by the reverse alphabetical order of their teacher's name. We can use the following code for this:

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

What does it mean for a variable to be *effectively final*?

<Solution>

This means the variable is only assigned a value once. It basically means that we could declare the variable as `final` and the program would still compile, but it currently is not declared as a `final` variable.

</Solution>

---

How does the ability to write default methods in interfaces relate to abstract classes? Are there still things you can do with abstract classes that you can not do with interfaces?

<Solution>

Earlier, we discussed that it is possible to mix methods with an implementation and methods without an implementation in abstract classes. Default methods in interface also bring this functionality to interfaces.
However, interfaces still can not declare any instance variables. Therefore, it is also not possible to write any implementation in the default methods that make use of instance variables.

In general, if it is possible and convenient to have an interface, we prefer to have interfaces (see Effective Java, 3rd Edition Item 20 for a motivation)

</Solution>

---

Now that you have practice writing lambda expressions, you should practice writing `Comparator` in a functional programming style.

You will do so for objects from the following class which we saw in detail in an earlier chapter.

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

Use the static and default methods of the `Comparable` interface with lambda expressions
and method references to define `Comparator<Course>` objects that express the following orders:

1. Order the courses by their name in alphabetic order
2. First order the courses by the alphabetic order of their teacher's name, and if the names of teachers are equal, use the numeric (ascending) order of the course year (so oldest course first).
3. First order the courses by the alphabetic order of the name of the course. If two courses have the same name, put the most recent course first (i.e. use the reverse natural order of their year).
4. First order the courses by the name of the course. If the course names are equal, use the alphabetic order of the teacher of the course. Finally, if the same teacher has taught the same course multiple times, put the most recent course first (so use the reverse natural order of the year).

<Solution>

```java
// Order 1.
Comparator<Course> comp1;
comp1 = Comparator.comparing(Course::getCourseName);

// Order 2.
Comparator<Course> comp2;
comp2 = Comparator.comparing(Course::getTeacher)
                  .thenComparing(Course::getCourseYear);

// Order 3.
Comparator<Course> comp3;
comp3 = Comparator.comparing(Course::getCourseName)
                  .thenComparing(Course::getCourseYear, Comparator.reverseOrder());

// Order 4.
Comparator<Course> comp4;
comp4 = Comparator.comparing(Course::getCourseName)
                  .thenComparing(Course::getTeacher)
                  .thenComparing(Course::getCourseYear, Comparator.reverseOrder());
```

</Solution>


</Exercise>
