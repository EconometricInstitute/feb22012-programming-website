---
path: '/week6/1-lambda-expressions'
title: 'Lambda Expressions'
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You can understand and write a lambda expression.
- You know what an anonymous class is, but you do not use it.

</text-box>

## Introduction to Lambda Expressions
In this part of the course, we deal with the manipulation of objects for the purpose of data analysis. As an example, we use the domain of *students*, *courses* and *course results* obtained by the students. To start out, we first define a class that can help us model *course* data.

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

If we intend to sort a `List<Course>` by the alphabetical order of the names of the teachers of the courses, we could implement the `Comparator` as a class *within the `Course`-class*, and define a `sortCourses` method as follows:

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

However, to be able to use this expression to sort `Course` objects, we need to define both a *class header* for the `TeacherComparator` class, and the *method header* of the `compare` method. Programmers sometimes refer to this kind of code as *boilerplate code*: we need to write it to let the compiler check that all our types are safe, but does not express what we want to do.

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

In this course, we **advise against using anonymous classes**. When they are used, the code is often hard to read and understand. For example, it is rather confusing that it results in a *method definition* within a *method definition*. The number of nested curly braces also blows up fast, making it complicated to grasp the structure of the program.

Prior to Java 8, the anonymous class was the shortest way to transform our teacher comparison expression into a `Comparator` object. Fortunately, Java 8 introduced a feature called **lambda expressions**, that provides a syntax that is more concise and easier to read than the anonymous class.

Lambda expressions can only be used to create an object that implements an interface with a single unimplemented method. An interface with only a single unimplemented method is called a **functional interface**. This term is based on the concept of a *mathematical function*.

<!--- Special function; The types of the arguments of the single method can be seen as the \emph{domain} of the function whereas the return type can be seen as the \emph{image} of the function. --->

<text-box name="Functional Programming" variant="hint">

Most Computer Science bachelor programs contain a course called _functional programming_ dedicated to a programming language that focuses on the composition of functions, rather than given step-by-step descriptions of what the computer should do.
The first and oldest functional programming language is _Lisp_, and more modern functional languages are _Haskell_, _Scala_, _F\#_ and _OCaml_. One of the advantages of functional programming, is that it makes it easier to write programs that can be distributed over multiple computers or processors.
With the rise of multicore processors (most mobile phones already have four or eight cores) and the popularity of _distributed_ computing, where data analysis tasks must be spread out over datasets that are stored on a number of different computers, such languages have a natural benefit.

</text-box>

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
For a `Comparator<Course>`, the `compare` method expects two `Course` objects as input, which matches the arguments of our lambda expression. The type of the code, after the arrow, must match the return type of the functional interface method.
Since the return type of the `compare` method is `int`, we are required to return an `int` in our case. Fortunately, the `compareTo` method produces an `int`, and so the compiler is happy that our lambda expression matches the `compare` method.

Since the parameter and return types of the lambda expressions are required to match the parameter and return types of the functional interface, the compiler often does not need the explicit input types of the lambda expression. It can use *type inference* (i.e. automatic detection of types used) to determine what the types of the lambda expression’s inputs will be. As a result, we can shorten our example:

```java
Comparator<Course> comp = (o1,o2) -> {
    return o1.getTeacher().compareTo(o2.getTeacher());
};
```

There is another useful trick we can use here. Notice that the only code within the lambda is a single return statement. If only a single expression is returned, we are allowed to omit the curly braces and return statement and only write the expression. This provides an extremely concise syntax to create our `Comparator`:

```java
Comparator<Course> comp = (o1,o2) -> o1.getTeacher().compareTo(o2.getTeacher());
```

While this is great for a `Comparator` that compares a single attribute of our `Course` object, it is not sufficient for a more complex `Comparator` object. Take, for example, the order in which we first compare the teacher. If the teachers are equal, we compare the course year. If the course years are also equal, we finally compare the names of the courses in alphabetical order. In that case, we should still use a more verbose lambda expression with explicit return statements.

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

If we can only use lambda expressions, this is the best we can. But Java introduced more features that make it possible to define a complex comparator in a much more compact way than the above code. But before we can work on that, we need to study two additional topics: functional interfaces and method references. We do so in the following two sections.


<Exercise title="Test your knowledge">

In this quiz, you can test your knowledge on the subjects covered in this chapter.

Which of the following pieces of code are a valid lambda expression?

```java
// Piece 1
Comparator<String> strCmp = (String s1, String s2) -> s1.length() - s2.length();
// Piece 2
Comparator<List<Object>> listCmp;
listCmp = (List<Object> lst1, List<Object> lst2) -> lst2.size() - lst1.size();
// Piece 3
Comparator<Course> courseCmp = course1.getCourseName().compareTo(course2.getCourseName());
// Piece 4
Comparator<Integer> modSevenCmp = (Integer i1, Integer i2) -> {
    int tmp1 = i1 % 7;
    int tmp2 = i2 % 7;
    return tmp1-tmp2;
}
```

<Solution>

Pieces 1, 2 and 4 are valid lambda expressions. Pieces 1 and 2 a concise style, although the type declarations before the arrow could also be removed as the compiler can deduce them using type-inference on the type of `strCmp` and `listCmp`.
Piece 4 uses a block as the body of the lambda expression. This makes it possible to declare variables.

Piece 3 is an invalid lambda expression, as the variables `course1` and `course2` are not declared, and there is no arrow to indicate that this is a lambda expression.

</Solution>

---

What is the difference between the form

```java
Comparator<Course> c = (o1,o2) -> o1.getTeacher().compareTo(o2.getTeacher());
```

and the following form?

```java
Comparator<Course> c = (Course o1, Course o2) -> o1.getTeacher().compareTo(o2.getTeacher());
```

Why can the types be omitted from the first form?

<Solution>

In the first form, the types are omitted in the input part of the lambda. The Java Compiler can
deduce what the types of `o1` and `o2` should be using the specification of the `compareTo` method
in `Comparator`, and the fact that we are creating a `Comparator<Course>` object.

The technique the compiler uses to fill in the types for you, is called *type inference*.

</Solution>

---

Look at the `Course` class at the start of this chapter. Write a separate *lambda expression*
that defines a `Comparator<Course>` for each of the following orderings.
Do not use of static methods of the `Comparator` class such as `Comparator.comparing` yet.

1. Order the courses in alphabetic order of their course names
2. Order the courses by descending number of *ects*
3. Order the courses by ascending number of *ects*
4. Order the courses by ascending course year
5. Order the courses by descending course year

<Solution>

1. `Comparator<Course> comp = (o1,o2) -> o1.getCourseName().compareTo(o2.getCourseName()`
2. `Comparator<Course> comp = (o1,o2) -> (int)Math.signum(o2.getEcts()-o1.getEcts())`
3. `Comparator<Course> comp = (o1,o2) -> (int)Math.signum(o1.getEcts()-o2.getEcts())`
4. `Comparator<Course> comp = (o1,o2) -> o1.getCourseYear() - o2.getCourseYear()`
5. `Comparator<Course> comp = (o1,o2) -> o2.getCourseYear() - o1.getCourseYear()`

</Solution>

</Exercise>
