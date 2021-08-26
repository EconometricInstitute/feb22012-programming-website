---
path: '/week1/4-intro-generic-types'
title: 'Introduction to Generic Types'
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

The concept of _Generics_ allows us to do this. It allows us to write classes that store or work with objects of a freely chosen type.
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

<text-box name="The Var keyword" variant="hint">

The var keyword was introduced in Java 10. Type inference is used in `var` keyword, in which it detects automatically the datatype of a variable based on the surrounding context. The below examples explain where var is used, and it is also explained where you can’t use it.
  
```java
public static void main(String[] args) {
    // int
    var x = 100;

    // double
    var y = 1.90;
  
    // char
    var z = 'a';

    // string
    var p = "tanu";

    // boolean
    var q = false;
  
    // type inference is used in var keyword in which it
    // automatically detects the datatype of a variable
    System.out.println(x);
    System.out.println(y);
    System.out.println(z);
    System.out.println(p);
    System.out.println(q);
}
```

Unfortunately, `var` cannot be used var cannot be used for method parameters and return type. 
Neither, it can be used as a Generic type, or with a Generic type.
Thus, both `List<var> myList` and `var<Integer> myVar` are invalid.
Lastly, `var` cannot be used without explicit initialization.
    
Although `var` can be very handy in some situations, it has also many restrictions. Therefore, we suggest not to use it for now. 
    
_Source: [Geeks for Geeks](https://www.geeksforgeeks.org/var-keyword-in-java/)_    
   
</text-box>
    
<Exercise title="Test your knowledge">

In this quiz, you can test your knowledge on the subjects covered in this chapter. 

What are generic types?

<Solution>

A generic type is a generic class or interface that is parameterized over types. 
Essentially, generic types allow you to write a general, generic class (or method) that works with different types, allowing for code re-use.

</Solution>
    
</Exercise>
