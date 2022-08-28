---
path: '/week1/2-types-in-java'
title: 'Types in Java'
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You know what types are.

- You know what primitive types are and which eight primitive types exist in Java.

- You are familiar with the concept and use of converting types using casting.

- You know what non-primitive types are.

</text-box>

## Introduction to types
In a strongly typed programming language, we are required to define the type of the values that we want them to store.
When we declare variables, we have to be specific. For example, a list that stores strings has been defined as
`ArrayList<String>`, if we want to store a number we often use `int` or `double` types, and for text we use
`String`. But why would we bother about all these types?

<Exercise title="Which method?">

First, consider the following code:
```java
int student = 36;
int course = 45;
register(student, course);
```

Is this correct code?
Or should it say `register(course, student)`?
Take a moment to think which of the two options would be the correct one.

<Solution>

This was a trick question. You don't have enough information to answer it as it
depends on how the `register` method is defined. Consider the two following options:

```java
public static void register(int grade, int student) {...}
```
or alternatively,
```java
public static void register(int student, int grade) {...}
```

It all depends on what happens with the `student` and `grade` variables inside the method.
Therefore, there is no way to tell the correct answer to this question.

</Solution>

</Exercise>

Unfortunately, in the exercise above, there is no way to tell which of the two is correct! They might both be, but it depends on the way
the actual method was implemented. This makes it very easy to introduce nasty bugs, by accidentally swapping the two, only
discovering your programming error when a student shows up for the wrong course.
Using the type system we can make sure that the compiler can catch a mistake if we accidentally swap the two.
A nice quote from Java for Everyone is that **the best way to avoid bugs is to make them impossible.**
Let do this by rewriting this code by introducing new types for `Student` and `Grade`.
```java
Student student = getStudent(36);
Course grade = getCourse(12);
register(student, course);
```

This way only one signature for the `register` method is valid, and the compiler will check if we provide the right parameters.
In the above code, we have used the `Student` and `Course` types.
Now, if the method signature is `public static void register(Course course, Student student)` the code will not compile,
but with `public static void register(Student student, Course course)` it will.
This way, the compiler finds a mistake before we can even run the code, which saves the effort of debugging.

The types also help a lot with the tools you use for programming. IntelliJ can often do very good suggestions
which methods you can call on a certain variable, or suggest what argument to pass to a method. It uses the
type information to make these suggestions and provide you with powerful features to manipulate your code,
generate code and scan your code for typical errors.

For a programmer, it can also make understanding the code easier. If a sloppy programmer declares two variables
 `int s` and `int c`, it may be hard to guess what they represent. If `Student s` and `Course c` are declared,
 it is much easier to understand what type of data is being held in the objects referenced by those variables.

### Method Overloading

Another advantage of the type system, is that it allows performing **overloading** of methods. This means
that we can have multiple methods with the same name, but different types. For example, suppose we want
to be able to check whether a number or a string has an odd length. A good name for such a method would be
`hasOddLength`. In Java, we can do the following:

```java
public static boolean hasOddLength(String in) {
    return in.length() % 2 == 1;
}

public static boolean hasOddLength(int n) {
    if (n == 0) {
        return true;
    }
    int digits = (int)Math.log10(Math.abs(n) + 1);
    return digits % 2 == 1;
}
```

As you can see, we created two methods with the same name and a different implement for different data types.
The nice thing is that the compiler already knows that for the expression `hasOddLength("hello!")` it has to
execute the first version of the method, while for the expressions `hasOddLength(131)` it has to execute the
second, based on the type of the arguments. In languages that are not strongly typed, this is not possible.
In that case, you have to use different names, such as `hasOddLengthString` and `hasOddLengthInt`,
or use an `if-else` in the method to determine the type of the input, which is slower because it requires
additional checking while the program is executed.

Methods can be overloaded as long as each version of the methods with the same name either have differently
typed arguments, or have a different number of arguments. The compiler has to be able to determine which
version of the method to use when you call it somewhere in the program, and it looks at the number of
arguments and the types of those arguments to decide this.

### Summary

The use of types in Java both has advantages and disadvantages, which are listed below.

<text-box name="Advantages and Disadvantages of the Java Type System">

**Advantages**
* A powerful type system helps to **prevent bugs**.
* Your programming environment uses types to tell you what you can do with the object.
* Code becomes **easier to read** when your variables have types.
* Types make it easier to write **modular code** since it allows for polymorphism, which we discuss later in this course.
* Automated manipulation of your code by means of **refactoring** becomes safer.
* It allows overloading of methods.

**Disadvantages**
* As types need to be declared, you need **more code** to do the same thing.
* A decent understanding of the **type system** of the language is required.

</text-box>


## Primitive types
In Java, exactly eight primitive types exist, which you already know: `byte`, `short`, `int`, `long`, `float`, `double`, `char` and `boolean`. Primitive types are not considered as objects, and they just represent raw values.

<text-box name="characters" variant="hint">

One of the eight primitive types is a character, shortened by `char`. It holds one Unicode character (e.g. a letter or emoji) and is used for many purposes.
All the letters and signs that we use have a unicode number. If you are interested, you can read more about this at [Unicode.org](https://home.unicode.org/).
In the book `Think Java`, some nice examples are covered, such as the following (from page 96) :

In Unicode, each character is represented by a *code point*, which you can think of as an integer. The code points for uppercase Greek letters run from 913 to 937, so we can display the Greek alphabet like this:

```java
System.out.print("Greek alphabet: ");
for (int i = 913; i <= 937; i++) {
   System.out.print((char) i);
}
System.out.println();
```

This example uses a type cast to convert each integer (in the range) to the corresponding character. Try running the code and see what happens.

</text-box>

All other types are non-primitive, such as `String`, `List` and arrays, including arrays of non-primitive types, for example `double []` or `int [][]`.

#### Converting
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

In general, **automatic conversion is only possible if the conversion goes from a more specific to a more general type**. This way, the compiler saves you from a _loss of precision_.
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
This type of behavior is called an *overflow*. When you write an explicit cast, you should be aware of potential issues and, if needed, write additional code to safeguard yourself against such unexpected behavior.
Picking data-types conservatively such that they can hold all foreseeable values is a good idea. Alternatively, there are special data types that will never overflow (at the cost of requiring more memory and being slower).
In this course, we see the `BigInteger` as an example of that.

## Non-Primitive Types
All types that are not primitive types are non-primitive types. Examples of these are `String`, `Scanner`, `int[]`, and the classes you create yourself result in new non-primitive types such as `Student` and `Course`.
Since Java 5 we can also construct type-of-type things like `ArrayList<String>`. The rule to determine if a type is a primitive or non-primitive type, all you need to do is check whether the type is one of the eight primitive types.
If it is not, it has to be a non-primitive type.

For every primitive type there is an associated non-primitive type, spelled with an uppercase letter: `Byte`, `Short`, `Integer`, `Long`, `Float`, `Double`, `Character`, `Boolean`.
This is because in Java, you cannot directly insert primitive type values (numbers, characters or boolean values) into array lists. For example, you cannot form an `ArrayList<double>`.
Instead, you must use an object of the related non-primitive type, which is also called the _wrapper object_. Such an object contains a single value.
As we will discuss in more detail later, this is necessary as variables of a non-primitive type contain references to objects or arrays.
To collect `double` values in an array list, you use an `ArrayList<Double>`.
Note that the wrapper class names start with uppercase letters, and that two of them differ from the names of the corresponding primitive integer types: `Integer` and `Character`.

### Autoboxing
The eight primitive types and their corresponding non-primitive wrapper times types can often be mixed. Type conversion then makes use of something called **autoboxing**,
which refers to either unpacking a primitive value from a wrapper object, or putting a primitive value into a wrapper object.
Autoboxing is the automatic conversion that the Java compiler makes between primitive types and their corresponding non-primitive types.
For example, converting and `int` to an `Integer` is done automatically by autoboxing. If the conversion goes the other way, it is called unboxing.
The Java compiler applies autoboxing when a primitive value is passed as a parameter to a method that expects its corresponding non-primitive type, or when a primitive value is assigned to a non-primitive typed variable.

Consider the following example:
```java
// boxing
Integer x = 5;

// unboxing
int y = x;
```

It also works in a more advanced example:
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

<text-box name="Advantages of Autoboxing and Unboxing">

**Advantages**

- The compiler allows you to write code that is easier to read, because we do not need to cast types explicitly.
- The compiler lets you use primitive and non-primitive types interchangeably, which is convenient.

**Disadvantages**

- If you want to write extremely performant code, autoboxing can give overhead which you may need to try to avoid.

</text-box>

Autoboxing and unboxing also work between non-associated primitive and non-primitive types, but only one way around. For instance, conversion from `Integer` to `double` is done automatically, but from `int` to Double is not possible.
The second case is not possible, because the boxing conversion is executed first and will autobox the `int` into an `Integer`. Since it is not possible to cast between non-primitive types, this cannot be (implicitly) casted to Double.
The first case, however, can be done, since the compiler would first autobox `Integer` into an `int`, which can implicitly be casted to a `double` value. If you do want to convert an `int` to a `Double`, you can use a workaround by first
converting the `int` to `double` yourself.

```java
Integer x = 5;
int y = 7;
// The following is allowed
double a = x;
// The following is **not** allowed
Double b = y;
// The following is allowed.
Double c = (double) y;
```


<Exercise title="Test your knowledge">

In this quiz, you can test your knowledge on the subjects covered in this chapter.

Why do we use types in Java?

<Solution>

Firstly, a powerful type system helps to prevent bugs.
Also, it allows overloading of methods.
Moreover, the code is easier to read and to refactor.
More advantages can be found in the advantages text box.

</Solution>

---

What is method overloading?

<Solution>

When the same method name is used for more than one method, the name is **overloaded**.
In Java, you can overload method names provided that the parameter types are different. For example, you can declare two methods, both called `print`:

```java
public void print(String s) { ... }
public void print(int i) { ... }
```

When the `print` method is called, for example using the statement `print(x);`, the compiler looks at the type of `x`. If `x` is a `String`, the first method is called. If `x` is an integer value, the second method is called. If there is no print method that is suitable for the type of `x`, the compiler generates an error.

</Solution>

---

What is the difference between a primitive type and a non-primitive type?

<Solution>

There are only eight primitive types, namely `byte`, `short`, `int`, `long`, `float`, `double`, `char` and `boolean`.
All other types are non-primitive, including arrays of primitive types (i.e. `int []`), the boxed versions of the
primitive types (i.e. `Integer`) and also `String` is a non-primitive type.

</Solution>

---

Can you autobox from `Integer` to `double`? And from `int` to `Double`?

<Solution>

Yes, you can autobox from `Integer` to `double`, but you cannot autobox from `int` to `Double`.

</Solution>

</Exercise>
