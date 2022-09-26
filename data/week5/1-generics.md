---
path: '/week5/1-generics'
title: 'Generics'
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You understand what basic *generic types* are and how you can use them
- You know generic type constraints exist and are not alarmed when you see them in the documentation
- You understand that you can just try to use methods that work with generic type constraints and do not have too worry a lot about them for this course

</text-box>

## Generic Types Recap

In week 1, you have learned about Generic types. Here we provide you with a short recap on generics:

A generic class is defined with the following format: `class name<T1, T2, ..., Tn> { ... }`.
Let us look at an example from the [Java Documentation on Generics](https://docs.oracle.com/javase/tutorial/java/generics/types.html):

```java
/**
 * Generic version of the Box class.
 * @param <T> the type of the value being boxed
 */
public class Box<T> {
    // T stands for "Type"
    private T t;

    public void set(T t) { this.t = t; }
    public T get() { return t; }
}
```

If you want to make a Box object with the `new` keyword, you have to pass a non-primitive type. A type variable can be any non-primitive type you specify: any class type, any interface type, any array type, or even another type variable.
For instance, you can use the `Integer` type like this: `Box<Integer> numberBox = new Box<Integer>();`. Any type `T` in the class code, will now be replaced by the `Integer` type.
You can also write the statement as follows: `Box<Integer> numberBox = new Box<>();`. Note that the second pair of &lt; and &gt; does not contain the type anymore. However, the compiler will fill in the first used type automatically. The empty &lt;&gt; is called a **diamond operator** and can be used because the type of the variable, which is `Box<Integer>` implies that call to the constructor should have `Integer` as the generic type as well. The diamond operator can only be used if the compiler is able to figure out what type should be filled in between the `<>`.

A significant portion of the Java data structures use type parameters, which enables them to handle different types of variables. ArrayList, for instance, receives a single type parameter, while the HashMap (which we will cover later this week) receives two.

```java
List<String> strings = new ArrayList<>();
Map<String, String> keyValuePairs = new HashMap<>();
```

By convention, type parameter names are single, uppercase letters. This stands in sharp contrast to the variable naming conventions that you already know about, and with good reason: Without this convention, it would be difficult to tell the difference between a type variable and an ordinary class or interface name.

The most commonly used type parameter names are:

- E: Element (used extensively by the Java Collections Framework that is discussed this week)
- K: Key
- N: Number
- T: Type
- V: Value

Sometimes, other names such as `U` or `S` are also used, or even names such as `E1` and `E2`.


## Generic Type Constraints

**Note:** you only need to understand the remainder of this section passively - there will not be any exam
questions that test if you understand it. However, you will come accross generic type constraints
on the slides and in the documentation and therefore it is important you are aware the exist.

Suppose we have two types, `Person` and `Student`, where `Student` is a subtype of `Person`.
This means that the following code would work without any problems (assuming some sensible
arguments come in the place of the `...`):

```java
Student s = new Student(...);
Person p = s;
```

However, the following code would not work:

```java
// This is not allowed, although intuitively it would make sense.
List<Student> students = new ArrayList<>();
List<Person> persons = students;
```

Logically, you might expect that this would work, since the `students` list containts objects
that can be converted to `Person` types. However, when it comes to *generic types*, the Java
compiler desires in this example that the types match exactly, and here it argues that a
`Student` is not the exact same type as a `Person`. The reason the compiler is so strict
about this is that *generic types* are used in more situations than just `Collection` types,
and it may not be logical to allow this type of conversion in all cases.
A clear example of this can be seen when we consider the same conversion for `Comparator` objects:

```java
// This is not allowed, and intuitively that makes sense.
Comparator<Student> stdComp = new StudentComparator();
Comparator<Person> personComp = stdComp;
```

The problem here is that a `Comparator<Student>` may use information that is specific to a
`Student`, for example their *student number*, that might not be available for `Person` objects
that are not a student. If that is the case, we should indeed be careful that we can not use
a `Comparator` for a `Student` objects as a `Comparator` for `Person` objects.

To overcome these issues, we can specify *generic type constraints* or *bounded type parameters*
that allow us to still perform type conversion in the cases where we would expect this is possible.
These come in three flavours: *wildcard types*, *extends* type constraints and *super* type constraints.

### Wildcard Types

Sometimes we do not care what type of object is store in a particular list. Suppose we want to create
a method that accepts a list of *anything*, which will check if it is at least of a certain size.
In such a case, can use a *wildcard type*, indicated by a `?` in a place where you would normally
expect a type variable. The following method gives such an example.

```java
public static boolean sizeAtLeast(List<?> list, int minSize) {
    return minSize <= list.size();
}
```

The main thing to note is that the `size` method of the `Collection` interface will return an
`int` regardless of what type of objects are stored in the `List`. The nice thing about specifying
`list` with a *wildcard type* is that we can pass any type of `List` into this method.

### Extends type constraints

In the example where we tried to assign a `List<Student>` to a variable of type `List<Person>`,
intuitively you would expect this to be possible. With a small adjustment, this is in fact possible.
If we use an *extends* type constraint, we can indicate that we accept a `List` of any type that is
equal to or a sub-type of a given type. This would give the following example:

```java
// This will compile!
List<Student> students = new ArrayList<>();
List<? extends Person> persons = students;
```

Here we indicate that the variable persons does not have to hold a `List` of things that are
*exactly* a person, but a `List` of anything that is either a `Person` or a subtype of it.
We can still use the variable `persons` like we would use a variable of type `List<Person>`,
for example, the following would function as expected:

```java
for (Person p : persons) {
    System.out.println(p.getName());
}
```

### Super type constraints

In the example where we tried to assign a `Comparator<Student>` to a variable of type
`Comparator<Person>`, we argued that it makes sense that this is not allowed, since the
`Comparator<Student>` could make use of information that is only specific to a `Student`.
However, if we would have a `Comparator<Person>`, we would expect that it can still be
used to compare `Student` objects, since `Students` will contain all the information
(and likely more) than a basic `Person`, because it is a subtype.

In a case like this, we could do this type of conversion by stating that we want a
`Comparator` that can compare `Student` objects, or any super-type of it. Similar to the
`? extends E` notation, we can use the `super` keyword.
In code this would look as follows:

```java
List<Student> students = new ArrayList<>();
// Add some students
Comparator<Person> personComp = new PersonComparator();
Comparator<? super Student> studentComp = personComp;
Collections.sort(students, studentComp);
```

In this example, it makes sense that if we have a way to order persons, we can also
use that method to order students. By using the right type constraints,

**Main take-away:** these *generic type constraints* appear in some methods of the
Collections framework to make sure that we can do things we would expect are possible,
while the compiler can still be strict in checking if things make sense. Usually, when
you work with methods where these constraints appear, you can just use them without
even notificing they are there.

<Exercise title="Test your knowledge">

In this quiz, you can test your knowledge on the subjects covered in this chapter.

What is the advantage of using generic types?

<Solution>

It let's you create types that can be used to work with many different types.
For example, the generic type `List<E>` allows us to create lists of `String`,
`Integer` and anything else we want.

</Solution>

---

What are disadvantages of using generic types?

<Solution>

- Generics don't work with primitive types.
- There are major challenges in working with Generic Arrays.
- We cannot create an instance of a type parameter.
- We cannot create, catch, or throw generic types.
- You cannot use `instanceof` with generic types.

</Solution>

---

What is the usage difference between generic types and interfaces?

<Solution>

Generics are a facility of generic programming in Java that allow a type or method to operate on objects of various types while providing compile-time type safety.

The interface in java is a mechanism to achieve fully abstraction and multiple inheritances in Java.

</Solution>

---

What does the diamond operator do and what does it look like in code?

<Solution>

The diamond operator looks like this: `<>`, and the compiler figures out what type should be in there. The diamond operator is used while creating a new instance of an object, for instance like this: `List<Integer> exampleList = new ArrayList<>();`. The compiler can figure out that the `ArrayList` holds objects of the type `Integer` as we already told the compiler that the variable type was some sort of `List` holding `Integer` objects.
Please note that the non-primitive type `Integer` is used here.

</Solution>

---

When do you use `?` as a type parameter and what is it called?

<Solution>

Using the question mark as a type is called using a wildcard. You use it in case you have no clue what type will be given to the method.
This does mean that you can not make any assumptions on the type, except that it will be an instance of `Object`.

</Solution>

</Exercise>
