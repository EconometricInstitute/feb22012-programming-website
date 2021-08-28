---
path: '/week3/1-interface-inheritance'
title: 'Interface Inheritance'
hidden: false
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You understand the concept of inheritance in the context of interfaces

</text-box>

**TODO:** meer leerdoelen toevoegen

**TODO:** heel korte recap van polymorfisme en interfaces uit vorige week

**TODO:** heel korte uitleg van het algemene concept inheritance, omdat dit het grote onderwerp is deze week

### Interface inheritance
Since the bank has an advantage in some types of games, we want to be able to detect whether a value was obtained by the bank or someone else. We could add a method `public boolean fromBank();` to the GameValue interface, but then all our classes would need to add a second method, while some of the games may not even have a bank.
We could create a second interface `public interface BankScore`, but then we have two separate types. On `GameValue` objects we can only call `getValue()` and on `BankScore` objects we can only call `fromBank()`.

We do not have a singly type where we can use both and we can choose only one type for variables and/or method and constructor arguments.
Ofcourse, we could add `public int getValue()'` to the `BankScore` interface, but then we cannot use `BankScore` objects in our old sorting algorithm. `BankScore` is still a separate type from `GameValue`.

To solve this problem, we let the interface `BankScore` inherit the interface `GameValue` by stating  `public interface BankScore extends GameValue`.
Now, the type `BankScore` can be used as a `GameValue` and classes that implement `BankScore` must have both `getValue()` and `fromBank()` methods. The `getValue()` method is inherited from `GameValue`.

We say that `BankScore` is a **subtype** of `GameValue` and that `GameValue` is a **supertype** of `BankScore`. A subtype can always do at least as much as its supertype. This terminology is based on _set theory_: the set of `BankScore` objects is a subset of the set of `GameValue` objects. The set of `GameValue` objects is a superset of the set of `BankScore` objects. Also supertype and subtype relations are **transitive**.

<programming-exercise name='TacoBoxes (2 parts)' tmcname='part09-Part09_05.TacoBoxes'>

In the exercise template you'll find Interface `TacoBox` ready for your use. It has the following methods:

- the method `int tacosRemaining()` return the number of tacos remaining in the box.

- the method `void eat()` reduces the number of tacos remaining by one. The number of tacos remaining can't become negative.

```java
public interface TacoBox {
    int tacosRemaining();
    void eat();
}
```

<h2>Triple taco box</h2>

Implement the class `TripleTacoBox`, that implements the `TacoBox` interface. `TripleTacobox` has a constructor with no parameters. `TripleTacobox` has an object variable `tacos` which is initialized at 3 when the constructor is called.

<h2>Custom taco box</h2>

Implement the class `CustomTacoBox`, that implements the `TacoBox` interface. `CustomTacoBox` has a constructor with one parameter defining the initial number of tacos in the box(`int tacos`).

</programming-exercise>

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

<!--- Hi Paul, can you have a look at this code, to check if I did it right? I had to change this example into the terms that fit to your example, but it was a bit confusing--->
```java
public class GameValue {
    public void getValue(GameValue gameValue) {
        System.out.println(gameValue.value);
    }
}
```

The value of the `getValue` method of the `GameValue` class lies in the fact that it can be given *any* class that implements the `GameValue` interface as a parameter. Were we to call the method with any object instantiated from a class that inherits the GameValue class, the method would function as desired.

<programming-exercise name='Interface In A Box (4 parts)' tmcname='part09-Part09_06.InterfaceInABox' nocoins='true'>

<h2>Packables</h2>

Moving houses requires packing all your belongings into boxes. Let's imitate that with a program. The program will have boxes, and items to pack into those boxes. All items must implement the following Interface:

```java
public interface Packable {
    double weight();
}
```

Add the Interface to your program. Adding a new Interface is quite similar to adding a new class. Instead of selecting <i>new Java class</i> just select <i>new Java interface</i>.

Create classes `Book` and `CD`, which implement the Interface. Book has a constructor which  is given the author (String), name of the book (String), and the weight of the book (double) as parameters. CD has a constructor which is given the artist (String), name of the CD (String), and the publication year (int). The weight of all CDs is 0.1 kg.

Remember to implement the Interface `Packable` in both of the classes. The classes must work as follows:

```java
public static void main(String[] args) {
    Book book1 = new Book("Fyodor Dostoevsky", "Crime and Punishment", 2);
    Book book2 = new Book("Robert Martin", "Clean Code", 1);
    Book book3 = new Book("Kent Beck", "Test Driven Development", 0.5);

    CD cd1 = new CD("Pink Floyd", "Dark Side of the Moon", 1973);
    CD cd2 = new CD("Wigwam", "Nuclear Nightclub", 1975);
    CD cd3 = new CD("Rendezvous Park", "Closer to Being Here", 2012);

    System.out.println(book1);
    System.out.println(book2);
    System.out.println(book3);
    System.out.println(cd1);
    System.out.println(cd2);
    System.out.println(cd3);
}
```

Prints:

<sample-output>

Fyodor Dostoevsky: Crime and Punishment
Robert Martin: Clean Code
Kent Beck: Test Driven Development
Pink Floyd: Dark Side of the Moon (1973)
Wigwam: Nuclear Nightclub (1975)
Rendezvous Park: Closer to Being Here (2012)

</sample-output>

NB: The weight is not printed

<h2>Box</h2>

Make a class called `Box`. Items implementing the `Packable` interface can be packed into a box. The `Box` constructor takes the maximum capacity of the box in kilograms as a parameter. The combined weight of all items in a box cannot be more than the maximum capacity of the box.

Below is an example of using a box:

```java
public static void main(String[] args) {
    Box box = new Box(10);

    box.add(new Book("Fyodor Dostoevsky", "Crime and Punishment", 2)) ;
    box.add(new Book("Robert Martin", "Clean Code", 1));
    box.add(new Book("Kent Beck", "Test Driven Development", 0.7));

    box.add(new CD("Pink Floyd", "Dark Side of the Moon", 1973));
    box.add(new CD("Wigwam", "Nuclear Nightclub", 1975));
    box.add(new CD("Rendezvous Park", "Closer to Being Here", 2012));

    System.out.println(box);
}
```

Prints

<sample-output>

Box: 6 items, total weight 4.0 kg

</sample-output>

NB: As the weights are saved as a double, the calculations might have some small rounding errors. You don't need to worry about them.

<h2>Box weight</h2>

If you made an class variable `double weight` in the Box class, replace it with a method which calculates the weight of the box:

```java
public class Box {
    //...

    public double weight() {
        double weight = 0;
        // calculate the total weight of the items in the box
        return weight;
    }
}
```

When you need the weight of the box, for example when adding a new item to the box, you can just call the weight method.

The method could also return the value of an object variable. However here we are practicing a situation, where we do not have to maintain an object variable explicitly, but can calculate its value as needed. After the next exercise storing the weight as an object variable would not necessary work anyway. After completing the exercise have a moment to think why that is.

<h2>A Box is packable too!</h2>

Implementing the `Packable` Interface requires a class to have the method `double weight()`. We just added this method to the Box class. This means we can make the Box packable as well!

Boxes are objects, which can contain objects implementing the `packable` Interface. Boxes implement this Interface as well. So **a box can contain other boxes!**

Try this out. Make some boxes containing some items, and add some smaller boxes to a bigger box. Try what happens, when you put a box in itself. Why does this happen?

</programming-exercise>

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
