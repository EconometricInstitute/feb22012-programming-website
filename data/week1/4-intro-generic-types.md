---
path: '/week1/4-intro-generic-types'
title: 'Types in Java'
hidden: false
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You know what is meant with the concept of a generic type parameter.

- You are familiar with some already existing Java classes that make use of generic type parameters.

- You can create classes of your own that make use of generic type parameters.

</text-box>

## Generic types
Until now, we have seen classes and methods for which the types used were explicitly determined in the class or method signature.
However, we have seen `List<String>` and `List<Integer>` as two types of lists that hold different types of data.
Can we implement a class that can contain objects of any given type, similar to the `List` type?

The concept of _Generics_ allow use to do this. It allows us to write classes that store or work with objects of a freely chosen type.
The choice is based on the generic type parameter in the definition of the classes, which makes it possible to choose the type(s) *at the moment of the object's creation*.
Using generics is done in the following manner: after the name of the class, follow it with a chosen number of type parameters. Each of them is  placed between the 'smaller than' and 'greater than' signs, like this: `public class Class<TypeParameter1, TypeParameter2, ...>`. The type parameters are usually defined with a single character, such as `<T>`, `<E>`, `<K>` or `<V>`.

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

    public Pair(T first, K second) {
        this.setValues(first, second);
    }

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

This type of class can be quite useful, for example if you want to create a method that can return two values rather than a single value.
We will look at generic types in more detail when we cover the Collections API.

**TODO:* discuss the `var` keyword that is useful when you have super complicated generic types?
Probably we should suggest students do not use it, but it is possible in Codegrade I think.
