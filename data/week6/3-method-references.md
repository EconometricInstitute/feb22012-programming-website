---
path: '/week6/3-method-references'
title: 'Method References'
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You understand and can write method references.
- You are aware of the different types of method references.
- You understand that method references are shorter notation for some specific lambda expressions.

</text-box>

## Method references
As we are now familiar with lambda expressions and functional interfaces, we should be comfortable with writing code such as:

```java
    Consumer<String> printer = str -> System.out.println(str);
    Function<Course,String> courseToString = c -> c.getTeacher();
    BinaryOperator<Integer> plus = (a,b) -> Integer.sum(a,b);
```

While these are simple and elegant lambda expressions, there is still a small bit of boilerplate code left in these examples. In these examples, our intention is to use the method `System.out.println` as a `Consumer<String>`, use the `getTeacher()` method to convert a `Course` to a `String`, or use the method `Integer.sum` as a `BinaryOperator`. However, we still define variables such as `str`, `c`, `a` and `b` to utilize these methods within the functional interfaces.

An alternative to lambda expression are **method references**. A method reference is a way in which we can express the idea that the implementation of a functional interface is given by a particular method. A method reference is given using either a class name or an object, followed by double colon operator `::` followed by the name of the method. Since we are not calling the method, but want to use it as an object of a functional interface type, parenthesis and arguments are omitted. Using method references, we can write the `printer`, `courseToString` and `plus` references as follows:

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

<!-- TODO: discussion of static vs non-static in a special interest block -->

<Exercise title="Test your knowledge">

In this quiz, you can test your knowledge on the subjects covered in this chapter.

What does the following piece of code do? What type of method reference was used?
What is an equivalent program where the method references and functional types are removed?

```java
BigInteger bi10 = BigInteger.valueOf(10);
BigInteger bi2 = BigInteger.valueOf(2);
BinaryOperator<BigInteger> op = BigInteger::multiply;
BigInteger result = op.apply(bi10, bi2);
System.out.println(result);
```

<Solution>

The program creates two `BigInteger` objects with numbers 10 and 2, multiplies them and prints the result (20).
In this case, and *unbound* method reference was used, as `multiply` is not a static method and the method reference
is applied to the class `BigInteger` and not an object of type `BigInteger`.

The equivalent program without a method reference or functional interface is written as follows:

```java
BigInteger bi10 = BigInteger.valueOf(10);
BigInteger bi2 = BigInteger.valueOf(2);
BigInteger result = bi10.multiply(bi2);
System.out.println(result);
```

</Solution>


---

For each of the following tasks and types, use a method reference to create an object that implements a functional interface of the given type:

1. An object of type `BinaryOperator<Double>` that computes the maximum of two `Double` objects using `Math.max`
2. An object of type `Function<Integer,BigInteger>` that converts an `Integer` into a `BigInteger` using `BigInteger.valueOf`
3. An object of type `Predicate<String>` that tests whether a given `String` object is in a `List<String>` object named `myList`
4. An object of type `Supplier<List<Integer>>` that can be used to create new `ArrayList<Integer>` objects
5. An object of type `BiConsumer<List<String>,String>` that adds a given `String` to a given `List<String>` using `List.add()`
6. An object of type `BiConsumer<Integer,String>` that adds a given `String` to a `List<String>` object `myList` at a given `Integer` index using `List.add()`

**Note:** it is possible to use a method reference to a method that returns something while a void method is excepted, e.g. `List.add()` can be used for a `Consumer`/`BiConsumer`, although `List.add()` returns a `boolean`.

<Solution>

1. `BinaryOperator<Double> bo = Math::max;` (this is a static reference)
2. `Function<Integer,BigInteger> f = BigInteger::valueOf;` (this is a static reference)
3. `Predicate<String> p = myList::contains;` (this is a bound reference)
4. `Supplier<List<Integer>> s = ArrayList::new;` (this is a constructor reference)
5. `BiConsumer<List<String>,String> bc = List::add;` (this is an unbound reference)
6. `BiConsumer<Integer,String> bc2 = myList::add;` (this is a bound reference)

</Solution>

---

For each of the following lambda expressions and method references, determine a possible type using a function interface.

1. `(Double d) -> d+1`
2. `Double::sum`
3. `(Double d1, Double d2) -> d1 - Math.floor(d2) < 0.5`
4. `(Double d) -> Arrays.asList(d)`
5. `(Double d, String s) -> s + " : " + d;`
6. `() -> Math.random() * 10`
7. `(Double d) -> System.out.println("Value: "+d)`
8. `(Double d, String str) -> System.out.println("text: "+str);`
9. `(List<Double> lst) -> lst.contains(42.0)`

You can choose from `BinaryOperator<Double>`, `Supplier<Double>`, `Consumer<Double>`, `BiFunction<Double,String,String>`, `Predicate<List<Double>>`, `UnaryOperator<Double>`, `BiConsumer<Double,String>`, `BiPredicate<Double>`, and `Function<Double,List<Double>>`.

<Solution>

1. `UnaryOperator<Double>`
2. `BinaryOperator<Double>`
3. `BiPredicate<Double>`
4. `Function<Double,List<Double>>`
5. `BiFunction<Double,String,String>`
6. `Supplier<Double>`
7. `Consumer<Double>`
8. `BiConsumer<Double,String>`
9. `Predicate<List<Double>>`

</Solution>


</Exercise>
