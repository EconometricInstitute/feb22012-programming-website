---
path: '/week6/3-method-references'
title: 'Method References'
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You understand and can write method references.
- You are aware of the different types of method references
- You understand that method references are shorter notation for some specific lambda expressions

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

<!-- TODO: discussion of static vs non-static in a special interest block -->
