---
path: '/week3/2-interface-inheritance'
title: 'Interface Inheritance'
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You understand the concept of inheritance in the context of interfaces.
- You are aware how inheritance relationships influence influence types and how references of a certain type can be used
- You understand the concept of subtype, supertype and the transitivity of these relationships

</text-box>

## Introduction to inheritance

Inheritance is a mechanism within the object-oriented programming paradigm that allows us to base an interface or class upon an existing interface or class and
*expanding* the behavior or implementation. When we define an *inheritance relationship* between two classes or between two interfaces, there is usually
a *super*-class or *super*-interface from which the behavior/implementation is inherited by one or more *sub*-class or *sub*-interfaces. The type of the
*sub*-class or *sub*-interface will be regarded a *specialization* of the *super* class or interface. This way we can reuse common behavior or implementations
of classes or interfaces which helps us achieve *code reuse*, or create code where we can easily switch between different types of specialized behavior
which helps us to achieve *polymorphism* (similar to what we can achieve with interfaces).
For example, if you build a general `Animal` class and define their characteristics, you may want to build subclasses for specific animals later. For example, think of the classes `Dog`, `Horse`, etc.. These classes need all the characteristics from `Animal`, and may add some other, more specific, methods or characteristics of these animals. Code and implementations that are common to all animals can be put in the `Animal` class, while code and implementations that are specific to the `Dog` and `Horse` can be put in
those specific classes. Furthermore, objects of type `Dog` or `Horse` can also be used in places where the more general `Animal` type is needed, which would allow us to create a simulation for general `Animal` objects, and run different experiments with the
specific behavior of `Dog` objects or `Horse` objects.

This week, you will learn more about inheritance. First we will discuss how inheritance works with interfaces, and then we move on to classes.

<text-box variant='hint' name='Recap on polymorphism and interfaces'>

We can use interfaces to define behavior that's required from a class, i.e., its methods. Thus, interfaces are used to guarantee that an object has one or more methods available. Interfaces provide *polymorphism* because we can write code that is able to handle objects of different classes, but which share a common interface type. This means that objects can take on multiple forms.

If you do not remember the concepts of polymorphism and interfaces well enough, please reread the this topic in the material [from last week](/week2/5-introduction-interfaces).

</text-box>

### Interface inheritance

In last weeks material, an interface was introduce to be able to compare the outcomes of certain types of casino games based on some score/value. The interface looked like this:

```java
public interface GameValue {
    int getValue();
}
```

The interface could then be used in different classes: `PokerHand`, `BlackjackHand`, etc. Objects of those different classes could be sorted for analysis by a single sorting
algorithm that operated on the `GameValue` type, rather than having a separate function for each type. As an advantage, if we would introduce a new type of game, we can
apply the analysis that was created earlier as soon as it implements the `GameValue` interface.

Since the bank has an advantage in some types of games, we want to be able to detect whether a value was obtained by the bank or someone else. We could add a method `boolean fromBank();` to the GameValue interface, but then all our classes would need to add a second method, while some of the games may not even have a bank. Note that we do not explicitly write that this method is `public`, as interface methods cannot be private. You may write public, but please be consistent.
We could create a second interface `BankScore` as follows:

```java
public interface BankScore {
    boolean fromBank();
}
```

However, this approach gives us two separate types. On `GameValue` objects we can only call `getValue()` and on `BankScore` objects we can only call `fromBank()`.
If the analysis information needs only one of the two pieces of information, this approach would work. However, if both pieces of information are needed, for
example because you need to compute the average outcome that where influenced by the staff of the casino, you would need both types.

As do not have a singly type where we can use both and we can choose only one type for (instance) variables and/or method and constructor arguments.
One idea could be to add `int getValue()'` to the `BankScore` interface:

```java
public interface BankScore {
    int getValue();
    boolean fromBank();
}
```

 However, we can then still not use `BankScore` objects in our old sorting algorithm. `BankScore` is still a separate type from `GameValue`.

To solve this problem, we let the interface `BankScore` inherit the interface `GameValue` with the `extends` keyword as follows:

```java
public interface BankScore extends GameValue {
    boolean fromBank();
}
```

Now, an *inheritance relationship* between `GameValue` and `BankScore` is established and the type `BankScore` can be used as a `GameValue`
and classes that implement `BankScore` must have both `getValue()` and `fromBank()` methods, as the `getValue()` method is inherited from
`GameValue`.

We say that `BankScore` is a **subtype** of `GameValue` and that `GameValue` is a **supertype** of `BankScore`. A subtype can always do at least as much as its supertype. This terminology is based on _set theory_: the set of `BankScore` objects is a subset of the set of `GameValue` objects. The set of `GameValue` objects is a superset of the set of `BankScore` objects. Also supertype and subtype relations are **transitive**.

To summarize, when we establish an *inheritance relationship* between interface `A` and interface `B` with `B extends A` in the class header, the two following things happen:

1. When a class implements interface `B` it needs to implement **all** methods that must be implemented when interface `A` is implemented, and in addition the methods define in interface B must be implemented as well.
2. The type `B` is considered as a specialization of the `A`, so references to objects of type `B` can be assigned to variables of type `A`. However, there is **no** guarantee that every object of type `A` will also be an object of type `B`.

These relationships are *transitive*: if we have `B extends A` and `C extends B`, classes implementing `C` need to implement all methods from `A`, `B` and `C`, and object references of type `C` can be assigned to variables of both type `A` and type `B`.

<Exercise title="Test your knowledge">

In this quiz, you can test your knowledge on the subjects covered in this chapter.

Explain how we can use *interface inheritance* and what the consequences of using it are.

<Solution>

Interface inheritance can be used via the `extends` keyword in the header of the interface, e.g. `interface B extends A`,
where `A` is another interface.

One consequence of doing this, is that `B` inherits the contents of interface `A`.
Typically that means that any class that implements interface `B` must implement all methods declared in both `B` and
`A`. Classes that implement only interface `A` are oblivious of interface `B` and thus only have to implement the
methods of interface `B`.

Another consequence is that we can assign references to objects of type `B` to variables of type `A`, as type `B` is
now a specialization of type `A`, and type `A` is a generalization of type `B`. This means any object of type `B` is
guaranteed to be also of type `A`, whereas not all objects of type `A` are guaranteed to be of type `B`.

</Solution>

---

Consider the following interfaces:

```java
interface A {
    int getANumber();
}

interface B extends A {
    String getBString();
}

interface C extends B {
    double getCDouble();
}

interface D extends B {
    boolean getDBoolean();
}
```

Suppose we create some objects of these types in some way:

```java
A aObj = /* some constructor */;
B bObj = /* some constructor */;
C cObj = /* some constructor */;
D dObj = /* some constructor */;
```

Determine for each of the following statements if they can be executed:

* `A otherA1 = bObj;`
* `A otherA2 = cObj;`
* `C otherC = aObj;`
* `D otherD = bObj;`
* `D otherD = cObj;`
* `String bStr = aObj.getBString();`
* `String bStr2 = cObj.getBString();`
* `int aNum = bObj.getANumber();`
* `int aNum2 = dObj.getANumber();`
* `double cDouble = aObj.getCDouble();`
* `boolean dBoolean = cObj.getDBoolean();`

<Solution>

* `A otherA1 = bObj;` : This is allowed.
* `A otherA2 = cObj;` This is allowed.
* `C otherC = aObj;` This is not allowed, not every object of type `A` has to be of type `C`.
* `D otherD = bObj;` This is not allowed, not every object of type `B` has to be of type `D`.
* `D otherD = cObj;` This is not allowed, an object of type `C` typically will not be of type `D`, unless a class implements both `C` and `D`.
* `String bStr = aObj.getBString();` This is not allowed, as the `A` interface does not have this method.
* `String bStr2 = cObj.getBString();` This is allowed.
* `int aNum = bObj.getANumber();` This is allowed.
* `int aNum2 = dObj.getANumber();` This is allowed.
* `double cDouble = aObj.getCDouble();` This is not allowed, as the `getCDouble` method is not available for type `A`.
* `boolean dBoolean = cObj.getDBoolean();` This is not allowed, as the `getDBoolean` method is not available for type `C`.

</Solution>

</Exercise>
