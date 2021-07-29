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
or alternatively,
```java
public static void register(int student, int grade) {...}
```

Take a moment to think which of the two options would be the correct one.

**TODO:** this more like a kind of quiz... perhaps it is possible to make a "Quiz" variant of the programming exercise?

</programming-exercise>

Unfortunately, there is no way to tell which of the two is correct! They might both be, but it depends on the actual method was implemented. 
This is makes it very easy to introduce nasty bugs, by accidentally swapping the two. 
Of course, this would be something that we would like to avoid and **the best way to avoid bugs is to make them impossible.**
Let us rewrite this code by introducing types for `Student` and `Grade`.
```java
Student student = getStudent(36);
Grade grade = getGrade(12);
register(student, grade);
```
This way only one register method signature is valid, and the compiler will check if we provide the right parameters.
In the above code, we have used the `Student` and `Grade` types. 
Now, if the method signature is `public static void register(Grade grade, Student student)` the code will not compile, but with `public static void register(Student student, Grade grade)` it will.
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

In this particular example, things will work fine. In general, **explicit casts**  may produce unexpected results:

```java
int number = 198;
byte b = (byte) number;
System.out.println(b);
```

which will result in

<sample-output>
-58
</sample-output>

The reason for this output is that `byte` values can only store numbers between `-128` and `127`, which is insufficient to represent the `int` value `198`. 
This type of behavior is called an *overflow*. When you write an explicit cast, you should be aware of potential issues and if needed, write additional code to safeguard yourself against such unexpected behavior.

## Non-Primitive Types

All types that are not primitive types are non-primitive types. Examples of these are `String`, `Scanner`, `int[]`, and the classes you create yourself result in new non-primitive types such as `Student` and `Course`.
Since Java 5 we can also construct type-of-type things like `ArrayList<String>`. The rule to determine if a type is a primitive or non-primitive type, all you need to do is check whether the type is one of
the eight primitive types. If it is not, it has to be a non-primitive type.

### Autoboxing

Lastly, for every primitive type there is an associated non-primitive type, spelled with an uppercase letter: `Byte`, `Short`, `Integer`, `Long`, `Float`, `Double`, `Character`, `Boolean`. 
For these special types, primitive types and their corresponding non-primitive types can be mixed. Type conversion then makes use of something called **autoboxing**.
Autoboxing is the automatic conversion that the Java compiler makes between primitive types and their corresponding non-primitive types. 
For example, converting and `int` to an `Integer` is done automatically by autoboxing. If the conversion goes the other way, it is called unboxing.
The Java compiler applies autoboxing when a primitive value is passed as a parameter to a method that expects its corresponding non-primitive type, or when a primitive value is assigned to a non-primitive typed variable.

Consider the following example:
```java
public static int evenSum(List<Integer> numbersList) {
  int evenNumbersSum = 0;
  for (Integer i : numbersList) {
    if (i % 2 == 0) {
      evenNumbersSum += i;
    }
  }
  return evenNumbersSum;
}  
```
Note that the remainder `%` and unary plus `+=` operators do not apply to `Integer` objects. However, the compiler does not generate an error, because it unboxes the objects to `int` objects at runtime.

<text-box title="Advantages of Autoboxing and Unboxing">
  * The compiler makes you write code that is easier to read, because we do not need to cast types explicitly.
  * It also lets you use primitive and non-primitive types interchangeably, which is convenient.
</text-box>
  
  Moreover, for unboxed variables the same rules apply as for primitive types in general.
  For instance, conversion from `Integer` to `double` is done automatically, but from `int` to Double is not possible.
