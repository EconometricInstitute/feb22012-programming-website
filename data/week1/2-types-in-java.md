---
path: '/week1/2-types-in-java'
title: 'Types in Java'
hidden: false
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You know what types are.

- You know what primitive types are and which eight primitive types exist in Java.

- You are familiar with the concept and use of converting types using casting.

- You know what non-primitive types are.

- You know what is meant with the concept of a generic type parameter.

- You are familiar with some already existing Java classes that make use of generic type parameters.

- You can create classes of your own that make use of generic type parameters.

</text-box>

**TODO:** Deze pagina is wel lang; we kunnen overwegen hem op te splitsen

## Introduction to types
Since we began using lists, we have given data structures the type of the values that we want them to store. For example, a list that stores strings has been defined as `ArrayList<String>`. But why would we bother about types?


<programming-exercise name="Which method?">

First consider the following code:
```java
int student = 36;
int grade = 45;
register(student, grade);
```
Is this correct code? It depends on how the register method is defined. Consider the two following options:
```java
public static void register(int grade, int student) {...}
```
or alternatively.
```java
public static void register(int student, int grade) {...}
```

Take a moment to think which of the two options would be the correct one.

**TODO:** this more like a kind of quiz... perhaps it is possible to make a "Quiz" variant of the programming exercise?

</programming-exercise>

Unfortunately, there is no way to tell which of the two is correct! They might both be, but it depends
on the actual method was implemented. This is makes it very easy to introduce nasty bugs, by accidentally
swapping the two. Of course, this would be something that we would like to avoid and
**the best way to avoid bugs is to make them impossible.**
Let us rewrite this code by introducing types for `Student` and `Grade`.
```java
Student student = getStudent(36);
Grade grade = getGrade(12);
register(student, grade);
```
This way only one register method signature is valid, and the compiler will check if we provide the right parameters.
In the above code, we have used the `Student` and `Grade` types. Now, if the method signature is
`public static void register(Grade grade, Student student)` the code will not compile,
but with `public static void register(Student student, Grade grade)` it will.
This way, the compiler finds a mistake before we can even run the code, which saves the effort of debugging.

The use of types in Java both has advantages and disadvantages, which are listed below.

<text-box title="Advantages and Disadvantages">

**Advantages**
* A powerful type system helps to **prevent bugs**.
* Your programming environment uses types to tell you what you can do with the object.
* Code becomes **easier to read** when your variables have types.
* Types make it easier to write **modular code** since it allows for polymorphism, which we discuss later in this course.
* Automated manipulation of your code by means of **refactoring** becomes safer.

**Disadvantages**
* As types need to be declared, you need **more code** to do the same thing.
* A decent understanding of the **type system** of the language is required.

</text-box>


## Primitive types

In Java, exactly eight primitive types exist, which you already know: `byte`, `short`, `int`, `long`, `float`, `double`, `char` and `boolean`. Primitive types are not considered as objects and they just represent raw values.
All other types are non-primitive, such as `String`, `List` and arrays, including arrays of non-primitive types, for example `double []` or `int [][]`.

Sometimes, it is necessary to convert between types. In some cases, this can be done automatically, for example:
```java
int number = 233;
double sameNumber = number; //sameNumber holds 233.0 now
```
This type of conversion is called **implicit casting**, because casting is done automatically without us telling explicitly that the compiler should cast one type to another type.
In the above case, this is always possible, because for every `int` value there is a corresponding `double` value. You could say that the set of `double` values _generalizes_ the set of `int` values.
In other cases, however, this is not possible, such as in this case:
```java
double number = 123.0;
int sameNumber = number; //this will give an error
```
In this example, the compiler doesn't want to take the risk to do an automatic conversion, since some double values, such as `0.5`, do not have a corresponding `int` value.

In general, **automatic conversion is only possible if the conversion goes from a more specific to a more general type**. This way, the compiler saves you from _loss of precision_ without realizing.
In some cases, we may still want to convert a `double` into an `int` value because we know that it will work out right.
We can do that by **explicit casting**, which is basically telling the compiler to override the type system, like this:
```java
double number 123.0;
int sameNumber = (int) number; //sameNumber holds 123 now
```

In this particular example, things will work fine. In general, **explicit casts*  may produce unexpected results:

```java
int number = 198;
byte b = (byte) number;
System.out.println(b);
```

which will result in

<sample-output>
-58
</sample-output>

The reason for this output is that `byte` values can only store numbers between `-128` and `127`, which is insufficient to represent
the `int` value `198`. This type of behavior is called an *overflow*. When you write an explicit cast, you should be aware of
potential issues and if needed, write additional code to safeguard yourself against such unexpected behavior.

## Non-Primitive Types

All types that are not primitive types are non-primitive types. Examples of these are `String`, `Scanner`, `int[]`, and the classes you create yourself result in new non-primitive types such as `Student` and `Course`.
Since Java 5 we can also construct type-of-type things like `ArrayList<String>`. The rule to determine if a type is a primitive or non-primitive type, all you need to do is check whether the type is one of
the eight primitive types. If it is not, it has to be a non-primitive type.

Lastly, for every primitive type there is an associated non-primitive type, spelled with an uppercase letter: `Byte`, `Short`, `Integer`, `Long`, `Float`, `Double`, `Character`, `Boolean`. For these special types, primitive types and their corresponding non-primitive types can be mixed. This is called **autoboxing** and conversion is carried out automatically mostly.
For instance, conversion from `Integer` to `double` is done automatically, but from `int` to Double is not possible.

**TODO:** Er is vast meer en/of preciezer te vertellen over autoboxing rules, en ik zie vaak in de tentamens dat studenten het toch niet helemaal begrijpen.

## Generic types

**TODO:** er kan iets voor te zeggen zijn dit iets later te plaatsen, wellicht in elk geval na classes and objects in deze week, omdat we voorbeelden geven waar klassen gemaakt worden? Object/classes naar voren halen zou ook kunnen omdat het een soort van recap van vorig jaar is.

Until now, we have seen classes and methods for which the types used were explicitly determined in the class or method signature.
However, we have seen `List<String>` and `List<Integer>` as two types of lists that hold different types of data.
Can we implement a class that can contain objects of any given type, similar to the `List` type?

The concept of _Generics_ allow use to do this. It allows us to write classes that store or work with objects of a freely chosen type.
The choice is based on the generic type parameter in the definition of the classes, which makes it possible to choose the type(s) *at the moment of the object's creation*.
Using generics is done in the following manner: after the name of the class, follow it with a chosen number of type parameters. Each of them is  placed between the 'smaller than' and 'greater than' signs, like this: `public class Class<TypeParameter1, TypeParameter2, ...>`. The type parameters are usually defined with a single character.

Let's implement our own generic class `Locker` that can hold one object of any type.

```java
public class Locker<T> {
    private T element;

    public void setValue(T element) {
        this.element = element;
    }

    public T getValue() {
        return element;
    }
}
```

The definition `public class Locker<T>` indicates that the `Locker` class must be given a type parameter in its constructor. After the constructor call is executed, all the variables stored in that object are going to be of the type that was given with the constructor. Let's create a locker for storing strings.

```java
Locker<String> string = new Locker<>();
string.setValue(":)");

System.out.println(string.getValue());
```

<sample-output>

:)

</sample-output>


In the program above, the **runtime** implementation of the `Locker` object named `string` looks like the following.

```java
public class Locker<String> {
    private String element;

    public void setValue(String element) {
        this.element = element;
    }

    public String getValue() {
        return element;
    }
}
```

Changing the type parameter allows for creating lockers that store objects of other types. You could store an integer in the following manner.

```java
Locker<Integer> integer = new Locker<>();
integer.setValue(5);

System.out.println(integer.getValue());
```

<sample-output>

5

</sample-output>

There is no maximum on the number of type parameters, it's all dependent on the implementation. The programmer could implement the following `Pair` class that is able to store two objects of specified types.

```java
public class Pair<T, K> {
    private T first;
    private K second;

    public void setValues(T first, K second) {
        this.first = first;
        this.second = second;
    }

    public T getFirst() {
        return this.first;
    }

    public K getSecond() {
        return this.second;
    }
}
```

**TODO:** Quiz weghalen / vervangen door een self-check?
<quiz id="4e28cce5-9043-58be-ac53-5243976494bd"></quiz>

A significant portion of the Java data structures use type parameters, which enables them to handle different types of variables. ArrayList, for instance, receives a single type parameter, while the HashMap (which we will cover later in this course) receives two.

```java
List<String> strings = new ArrayList<>();
Map<String, String> keyValuePairs = new HashMap<>();
```
