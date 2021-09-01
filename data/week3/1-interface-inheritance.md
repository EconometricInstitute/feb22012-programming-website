---
path: '/week3/1-interface-inheritance'
title: 'Interface Inheritance'
hidden: false
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You understand the concept of inheritance in the context of interfaces.
- You understand how interfaces are used as variable types.
- You know how to use interfaces as method parameters.
- You can use an interface as a return type.

</text-box>

## Introduction to inheritance
Inheritance is a mechanism that copies all the properties and behaviors of a parent object to a child object. This way, new classes can be built upon existing classes. 
For instance, if you build a general `Animal` class and define their characteristics, you may want to build subclasses for specific animals later. For example, think of the classes `Dog`, `Horse`, etc.. These classes need all the characteristics from `Animal`, and may add some other, more specific, methods or characteristics.
This week, you will learn more about inheritance in multiple applications.

<text-box variant='hint' name='Recap on polymorphism and interfaces'>
We can use interfaces to define behavior that's required from a class, i.e., its methods. Thus, interfaces are used to guarantee that an object has one or more methods available. Polymorphism is the use of a single interface to entities of different types, so that an object can take on multiple forms. For instance, a Dog could also be classified as an Animal.
    
In short, inheritance lets us inherit attributes and methods from another class. Polymorphism uses those methods to perform different tasks. This allows us to perform a single action in different ways.
    
If you do not remember the concepts of polymorphism and interfaces well enough, please reread the broader explanations of these topics, given in the previous weeks. 
</text-box>

### Interface inheritance
Since the bank has an advantage in some types of games, we want to be able to detect whether a value was obtained by the bank or someone else. We could add a method `public boolean fromBank();` to the GameValue interface, but then all our classes would need to add a second method, while some of the games may not even have a bank.
We could create a second interface `public interface BankScore`, but then we have two separate types. On `GameValue` objects we can only call `getValue()` and on `BankScore` objects we can only call `fromBank()`.

We do not have a singly type where we can use both and we can choose only one type for variables and/or method and constructor arguments.
Ofcourse, we could add `public int getValue()'` to the `BankScore` interface, but then we cannot use `BankScore` objects in our old sorting algorithm. `BankScore` is still a separate type from `GameValue`.

To solve this problem, we let the interface `BankScore` inherit the interface `GameValue` by stating  `public interface BankScore extends GameValue`.
Now, the type `BankScore` can be used as a `GameValue` and classes that implement `BankScore` must have both `getValue()` and `fromBank()` methods. The `getValue()` method is inherited from `GameValue`.

We say that `BankScore` is a **subtype** of `GameValue` and that `GameValue` is a **supertype** of `BankScore`. A subtype can always do at least as much as its supertype. This terminology is based on _set theory_: the set of `BankScore` objects is a subset of the set of `GameValue` objects. The set of `GameValue` objects is a superset of the set of `BankScore` objects. Also supertype and subtype relations are **transitive**.

### Interface as Variable Type
The type of a variable is always stated as its introduced. There are two kinds of type, the primitive-type variables (int, double, ...) and reference-type variables (all objects). We've so far used an object's class as the type of a reference-type variable.
An object's type can be other than its class. For example, the type of the `Dice` class that implements the `GameValue` interface is both `Dice` and `GameValue`.

```java
Dice throwDice = new Dice(3, 4);
GameValue throwDice2 = new Dice(2,5);
```

Because an interface can be used as a type, it's possible to create a list that contains objects of the interface's type.

```java
ArrayList<GameValue> gamesList = new ArrayList<>();

gamesList.add(new Dice(3,5));
gamesList.add(new PokerHand(4,8));
gamesList.add(new Dice(1,6));
gamesList.add(new Dice(1000,5));
gamesList.add(new Dice(7,8));

for (GameValue game: gamesList) {
    System.out.println(game.getValue());
}
```

Note that although the `Dice` class that inherits the `GameValue` interface class is always of the interface's type, not all classes that implement the `GameValue` interface are of type `Dice`. You can assign an object created from the `Dice` class to a `GameValue`-type variable, but it does not work the other way without a separate type conversion.
Type conversion succeeds if, and only if, the variable is of the type that it's being converted to. Type conversion is not considered good practice, and one of the few situation where it's use is appropriate is in the implementation of the `equals` method, which we will learn about more later in this course.

### Interfaces as Method Parameters
The true benefits of interfaces are reaped when they are used as the type of parameter provided to a method. Since an interface can be used as a variable's type, it can also be used as a parameter type in method calls. For example, the `getValue` method of the class below gets a variable of type `GameValue`.

```java
public class GameValue {
    public void getValue(GameValue gameValue) {
        System.out.println(gameValue.value);
    }
}
```

The value of the `getValue` method of the `GameValue` class lies in the fact that it can be given *any* class that implements the `GameValue` interface as a parameter. Were we to call the method with any object instantiated from a class that inherits the GameValue class, the method would function as desired.

### Interface as a return type of a method
Interfaces can be used as return types in methods -- just like regular variable types. In the next example is a class `Factory` that can be asked to construct differerent objects that implement the `Packable` interface.

```java
import java.util.Random;

public class Factory {

    public Factory() {
        // Note that there is no need to write an empy constructor without
        // parameters if the class doesn't have other constructors.
        // In these cases Java automatically creates a default constructor for
        // the class which is an empty constructor without parameters.
    }

    public Packable produceNew() {
        // The Random-object used here can be used to draw random numbers.
        Random ticket = new Random();
        // Draws a number from the range [0, 4). The number will be 0, 1, 2, or 3.
        int number = ticket.nextInt(4);

        if (number == 0) {
            return new CD("Pink Floyd", "Dark Side of the Moon", 1973);
        } else if (number == 1) {
            return new CD("Wigwam", "Nuclear Nightclub", 1975);
        } else if (number == 2) {
            return new Book("Robert Martin", "Clean Code", 1);
        } else {
            return new Book("Kent Beck", "Test Driven Development", 0.7);
        }
    }
}
```

The Factory can be used without exactly knowing what different kind of Packable classes exist. In the next example there is a class Packer that gives a box of things. A packer defines a factory which is used to create the things:

```java
public class Packer {
    private Factory factory;

    public Packer() {
        this.factory = new Factory();
    }

    public Box giveABoxOfThings() {
         Box box = new Box(100);

         int i = 0;
         while (i < 10) {
             Packable newThing = factory.produceNew();
             box.add(newThing);

             i = i + 1;
         }

         return box;
    }
}
```

Because the packer does not know the classes that implement the interface `Packable`, one can add new classes that implement the interface without changing the packer. The next example creates a new class that implements the Packable interface `ChocolateBar`. The factory has been changed so that it creates chocolate bars in addition to books and CDs. The class `Packer` works without changes with the updated version of the factory.

```java
public class ChocolateBar implements Packable {
    // Because Java's automatically generated default constructor is enough,
    // we don't need a constructor

    public double weight() {
        return 0.2;
    }
}
```

```java
import java.util.Random;

public class Factory {
    // Because Java's automatically generated default constructor is enough,
    // we don't need a constructor

    public Packable produceNew() {

        Random ticket = new Random();
        int number = ticket.nextInt(5);

        if (number == 0) {
            return new CDDisk("Pink Floyd", "Dark Side of the Moon", 1973);
        } else if (number == 1) {
            return new CDDisk("Wigwam", "Nuclear Nightclub", 1975);
        } else if (number == 2) {
            return new Book("Robert Martin", "Clean Code", 1 );
        } else if (number == 3) {
            return new Book("Kent Beck", "Test Driven Development", 0.7);
        } else {
            return new ChocolateBar();
        }
    }
}
```

<text-box variant='hint' name='Reducing the dependencies between classes'>

Using interfaces in programming enables reducing dependencies between classes. In the previous example the Packer does not depend on the classes that implement the Packable interface. Instead, it just depends on the interface. This makes possible to add new classes that implement the interface without changing the Packer class. What is more, adding new Packable classes doesn't affect the classes that use the Packer class.

</text-box>

## Exceptions and Interfaces
An Interface can have methods which throw an exception.
For example the classes implementing the following `FileServer` interface *might* throw an exception from the methods `load` or `save`.

```java
public interface FileServer {
    String load(String fileName) throws Exception;
    void save(String fileName, String textToSave) throws Exception;
}
```

If an interface declares a `throws Exception` attribute to a method, so that these methods might throw an exception, the class implementing this interface must also have this attribute.
However the class does not have to throw an error.
