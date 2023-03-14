---
path: '/week3/3-class-inheritance'
title: 'Class Inheritance'
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You are familiar with the concepts of inheritance, superclass, and subclass.
- You can create classes that inherit some of their properties from another class.
- You can call a constructor or method that is defined in a superclass.
- You understand how the access operators `private`, `public` and `protected` work in an inheritance context

</text-box>

## Class inheritance
Inheritance does not only apply to interfaces, but also to classes.
An inheritance relationship between two classes is defined with the
`extends` keyword. If we have a class `A` and a class `B`, we can make
`B` inherit from `A` by writing `class B extends A` for the class header of `B`.
If we do so, we call `A` a *superclass* of `B` and `B` a *subclass* of `A`.

Where interfaces only define methods, classes also have *instance variables* and
*method implementations*. When we work with class inheritance, these are inherited as well.
Here is an example:

```java
// Contents of Square.java
public class Square {
  public int x;

  public int getSquaredValue() {
    return x*x;
  }
}

// Contents of SquareSum.java
public class SquareSum extends Square {
  public int y;

  public SquareSum(int value1, int value2) {
    // Instance variable declared in the super class
    x = value1;
    // Instance variable declared in this class
    y = value2;
  }

  public int getSum() {
    // This uses an instance variable from
    // both this class and the super class
    return x + y;
  }
}
```

Note that, opposed to what we practice and preach in this course, the instance
variables are `public` for now. We will deal with that a bit later in this
chapter. First, let's try to use the above classes in an example:

```java
public static void main(String[] args) {
  SquareSum test = new SquareSum(5,3);
  System.out.println(test.getSquaredValue());
  System.out.println(test.getSum());
}
```

<sample-output>
25
8
</sample-output>

Not only do the instance variables of a superclass exist within objects
of a subclass, it is possible to call methods of the superclasses from
within the subclass as well. Consider the following example:

```java
public class SquareSumPlus extends SquareSum {
  public SquareSumPlus(int value1, int value2) {
    x = value1;
    y = value2;
  }

  public int getSumPlusSquare() {
    return getSum() + getSquaredValue();
  }
}
```

When we use class inheritance, the subclass inherits the methods of the superclass (including their body/implementation) and the instance variables of the superclass.
However, instance variables and methods that are `private` can not be accessed in a subclass (as the subclass is written in a different `.java`) as they are invisible.
However, when you use the debugger, you will still see that `private` variables exist within the object.
We can call methods of the superclass like we can with methods that are defined in the current class, unless they are private.


### Inheritance and Interface relationships

We have now seen the two ways in which we can achieve polymorphism with classes: *interfaces* and *inheritance*.
For (class) inheritance, subtype and supertype relationships work the same as with interfaces:
the type of a subclass is a *specialization* of a superclass, and the superclass is a *generalization* of the
subclass. These relations are always transitive, and the general type conversion rules apply. Converting a
type to a more general type is always possible and can be done automatically, whereas conversion from a more
general type to a more specific type needs special care. Because of transitivity, subtype and supertype relations
can have several intermediate types but still be called subtype or supertype. If a distinction is needed, we
call a relation without intermediates a *direct* supertype, subtype, superclass or subclass relation.

Moreover, a class **can have at most one direct superclass** but **implement any non-negative number of interfaces**.
Consider the following example:

`public class D extends A implements I, J {...}`

Another rule is that a class can have any number of subclasses, unless it is defined with the keyword `final`.

`public final class F extends D` means that no subclasses of `F` can be made. Classes in the standard
library you know well, such as `String` and `Integer` are `final` classes, and therefore you can not
create your own subclasses for those types.

<text-box variant='backgroundMaterial' name='Inheritance in other Programming Languages'>

Java has a strict rule that a class can have at most one direct superclass. The main reason for this is to
make it clear which implementation of a method is inherited, and it helps to keep inheritance relationships
easier to understand.

Some languages, such as C++ and Python do allow multiple inheritance, whereas others such as Java and C# do not.
Since it can be useful to give a class multiple polymorphic types, a different mechanism such as interfaces
is sometimes used. When you learn a new object oriented language and you want to dig deeper into the mechanisms
in that particular language, you should read up on this. However, if you just want to use objects you can
typically just start writing programs and see how far you get, improving your understanding when necessary.

</text-box>

## Calling the constructor of the superclass or the same class

In the first line of a constructor, you can use the keyword `super` to call the constructor of the superclass. The call receives as parameters the types of values that the superclass constructor requires. If there are multiple constructors in the superclass, the parameters of the super call dictate which of them is used.

Let's take a look at a car manufacturing system that manages car parts. A basic component of part management is the class `Part`, which defines the identifier, the manufacturer, and the description.

```java
public class Part {
    private String identifier;
    private String manufacturer;


    public Part(String identifier, String manufacturer) {
        this.identifier = identifier;
        this.manufacturer = manufacturer;
    }

    public String getIdentifier() {
        return identifier;
    }

    public String getManufacturer() {
        return manufacturer;
    }
}
```

One part of the car is the engine. As is the case with all parts, the engine, too, has a manufacturer, an identifier, and a description. In addition, each engine has a type: for instance, an internal combustion engine, an electric motor, or a hybrid engine.
Let's create the class `Engine` using inheritance in our implementation. We'll create the class `Engine` which applies inheritance by extending the class `Part`: an engine is a special case of a part.

On the first line of a constructor, it is allow to call another constructor. To call another constructor within the same class, we can use `this(...)`. To call a constructor of the superclass, we can use `super(...)`. The following code contains
an example of types of calls to other constructors:

```java
public class Engine extends Part {

    private String engineType;

    public Engine(String engineType, String identifier, String manufacturer) {
        super(identifier, manufacturer);
        this.engineType = engineType;
    }

    public Engine(String engineType, String identifier) {
        this(engineType, identifier, "myself");
    }

    public String getEngineType() {
        return engineType;
    }
}
```

The class definition `public class Engine extends Part` indicates that the class `Engine` inherits the functionality of the class `Part`. We also define an object variable `engineType` in the class `Engine`. Since the class `Engine` extends the class `Part`, it has at its disposal all the methods that the class `Part` offers, **except for private methods and variables**. You can create instances of the class `Engine` the same way you can of any other class.

The constructors of the Engine class are worth further consideration. On the first constructor we use the keyword `super` to call the constructor of the superclass. The call `super(identifier, manufacturer)` calls the constructor `public Part(String identifier, String manufacturer)` which is defined in the class Part. Through this process the object variables defined in the superclass are initiated with their initial values. After calling the superclass constructor, we also set the proper value for the object variable `engineType`. In the second constructor, we call the first constructor within the same class using `this`.
Take-away message: *The `super` call bears some resemblance to the `this` call in a constructor; `this` is used to call a constructor of this class, while `super` is used to call a constructor of the superclass. If a constructor uses the constructor of the superclass by calling `super` in it, the `super` call must be on the first line of the constructor. This is similar to the case with calling `this` (must also be the first line of the constructor).*

When the constructor (of the subclass) is called, the variables defined in the superclass are initialized. The events that occur during the constructor call are practically identical to what happens with a normal constructor call. If the superclass doesn't provide a non-parameterized constructor, there must always be an explicit call to the constructor of the superclass in the constructors of the subclass.
A subclass **must** have a constructor that calls the constructor of the superclass when the superclass has one or more specified constructors. In the previous example, this means that you could remove the second constructor, but not the first, unless you would make a new constructor calling the super class.

```java
Engine engine = new Engine("combustion", "hz", "volkswagen");
System.out.println(engine.getEngineType());
System.out.println(engine.getManufacturer());
```

<sample-output>

combustion
volkswagen

</sample-output>

As you can see, the class `Engine` has all the methods that are defined in the class `Part`.

## Access modifiers private, protected, and public
If a method or variable has the access modifier `private`, it is visible only to the internal methods of that class. Subclasses will not see it, and a subclass has no direct means to access it. So, from the Engine class there is no way to directly access the variables identifier, manufacturer, and description, which are defined in the superclass Part. The programmer cannot access the variables of the superclass that have been defined with the access modifier private.

A subclass sees everything that is defined with the `public` modifier in the superclass. If we want to define some variables or methods that are visible to the subclasses but invisible to everything else, we can use the access modifier `protected` to achieve this.
Methods and variables that are `protected`, can not only be called and accessed from within the same class definitions, but also from within its subclass definitions. Also, they can be called and accessed from within the same package, but in our assignments we do not use packages, so all our classes are in the same package. For instance, `ArrayList` is in the `java.util` package, so we cannot access `protected` variables and methods of an `ArrayList`, unless we create a subclass of it.


<Exercise title="Test your knowledge">

In this quiz, you can test your knowledge on the subjects covered in this chapter.

What is the purpose of performing a call `super(...)` and `this(...)` in
the first line of a constructor?

<Solution>

With a call to `super(...)` we can call a constructor of the direct super-class.
This way we can make sure the super-class can perform proper initialization.

With a call to `this(...)` we can call another overloaded constructor in the
same class. One reason to do this is to have easier to use constructors that
require fewer arguments. Another reason is to reduce duplicate code that
initializes the class as much as possible.

</Solution>

---

Explain the difference between declaring a method `public`, `protected` and `private`.

<Solution>

If a method is declared `public`, it can be accessed from anywhere.
If a method is declared `protected`, it can be accessed from subclasses, and within the same package.
If a method is declared `private`, it can only be accessed from within the same `.java` source file.

</Solution>

---

Suppose the following classes have been created (the contents were omitted for reasons of brevity):

```java
public interface I { ... }
public class A { ... }
public class B extends A { ... }
public class C extends B implements I { ... }
public class D extends C { ... }
public class E extends C { ... }
```

For each of the following, choose the correct option:

* Class `B` is a (sub-class of / super-class of / not related to) `A`
* Class `A` is a (sub-class of / super-class of / not related to) `B`
* Class `C` is a (sub-class of / super-class of / not related to) `A`
* Class `A` is a (sub-class of / super-class of / not related to) `C`
* Class `D` is a (sub-class of / super-class of / not related to) `A`
* Class `A` is a (sub-class of / super-class of / not related to) `E`
* Class `D` is a (sub-class of / super-class of / not related to) `E`
* Class `A` is a (sub-type of / super-type of / not related to) `I`
* Class `C` is a (sub-type of / super-type of / not related to) `I`
* Class `E` is a (sub-type of / super-type of / not related to) `I`
* Class `E` is a (direct sub-type / sub-type) of `C`
* Class `E` is a (direct sub-type / sub-type) of `B`

<Solution>

* Class `B` is a **sub-class of** `A`
* Class `A` is a **super-class of** `B`
* Class `C` is a **sub-class of** `A`
* Class `A` is a **super-class of** `C`
* Class `D` is a **sub-class of** `A`
* Class `A` is a **super-class of** `E`
* Class `D` is a **not related to** `E`
* Class `A` is a **not related to** `I`
* Class `C` is a **sub-type of** `I`
* Class `E` is a **sub-type of** `I`
* Class `E` is a **direct sub-type** of `C`
* Class `E` is a **sub-type** of `B`

</Solution>

---

Suppose we introduce a new class with header `public class G extends F`.
Are there any rules related to the constructors of class `G` we have to
take into account?

<Solution>

Yes. If there are any constructors in `F`, we have to make sure we call
them in the constructors of `G`. This way we ensure that the part of the
objects `G` that is defined in class `F` is properly initialized.

</Solution>

</Exercise>
