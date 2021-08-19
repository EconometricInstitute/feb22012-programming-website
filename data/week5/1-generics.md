---
path: '/week5/1-generics'
title: 'Generics'
hidden: false
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You can add objects to a list
- You can go through objects in a list

</text-box>

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
For instance, you can use the `Integer` type like this: `Box<Integer> numberBox = new Box<Integer>`. Any type `T` in the class code, will now be replaced by the `Integer` type.
You can also write the statement as follows: `Box<Integer> numberBox = new Box<>`. Note that the second pair of &lt; and &gt; does not contain the type anymore. However, the compiler will fill in the first used type automatically. The empty &lt;&gt; is called a **diamond operator**.

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
- S,U,V etc. - 2nd, 3rd, 4th types
