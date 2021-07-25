---
path: '/week3/1-Interfaces-and-polymorphism'
title: 'Interfaces and polymorphism'
hidden: false
---


<text-box variant='learningObjectives' name='Learning Objectives'>

- You're familiar with the concept of an interface, can define your own interfaces, and implement an interface in a class.

- You know how to use interfaces as variable types, method parameters and method return values.

- You're aware of some of the interfaces that come with Java.

</text-box>

## Motivation to use Interfaces
An important reason to use Object-oriented programming, is that we prevent duplication of code. With this in the back of your mind, consider a simple dice game:
We throw two dice. If they have the same value, we multiply any one of them by hundred. In case of different values, we multiply the highest by then and add the lowest. Or, in case we have a one and a two, it's worth a thousand.
This game can be implemented as follows:
```java
public class Dice {
    private int d1;
    private int d2;

    public Dice(int die1, int die2) {
        d1 = Math.max(die1, die2);
        d2 = Math.min(die1, die2);
    }

    public int getValue() {
        if (d1 ==2 && d2 == 1) {
            return 1000;
        }
        if (d1 == d2) {
            return d1*100;
        }
        return 10*d1 + d2;
   }
}
```

Now we want to sort a list of `Dice` objects to rank them. Take a look at the following code:
```java
public static void sort(ArrayList<Dice> input) {
    // For every position in the list we will find the greatest
    for (int i = 0; i < input.size(); i++) {
        // Start at the current position
        for (int j = i + 1; j < input.size(); j++) {
            Dice jDice = input.get(j);
            if (jDice.getValue() > greatestDice.getValue()) {
                greatest = j;
                greatestDice = jDice;
            }
        }
        // Swap the current position with the smallest
        input.set(greatest, input.get(i));
        input.set(i, greatestDice);
    }
}
```

**NB: do not use this algorithm in practice, it is very inefficient.**

Now, let's say we would also want to sort `PokerHand` objects. We would then copy/paste the code, only changing the object types.
```java
public static void sort(ArrayList<PokerHand> input) {
    // For every position in the list we will find the greatest
    for (int i = 0; i < input.size(); i++) {
        // Start at the current position
        for (int j = i + 1; j < input.size(); j++) {
            PokerHand jDice = input.get(j);
            if (jDice.getValue() > greatestDice.getValue()) {
                greatest = j;
                greatestDice = jDice;
            }
        }
        // Swap the current position with the smallest
        input.set(greatest, input.get(i));
        input.set(i, greatestDice);
    }
}
```

If you want to sort other objects too, at this point you realize that you need to change something in your algorithm. Copy-pasting of code is not a good idea! We have an alternative way to do this, because our sorting algorithm does not care what is being sorted, as long as we have a way to obtain their value in the game.
We want to achieve **polymorphism**: treating objects of completely different classes in a uniform way. One way to achieve this, is by using **interfaces**.

## Interfaces: definition and use
We can use interfaces to define behavior that's required from a class, i.e., its methods. In other words, interfaces are used to guarantee that an object has one or more methods available. They're defined the same way that regular Java classes are, but "`public interface ...`" is used instead of "`public class ... `" at the beginning of the class. So they are defined in their own `.java` files. Interfaces define behavior through method names and their return values. However, they don't always include the actual implementations of the methods, but the signature ends with a semicolon. A visibility attribute on interfaces is not marked explicitly as they're always `public`. Let's examine a *GameValue* interface that describes the value.

```java
public interface GameValue {
    int getValue();
}
```

The `GameValue` interface declares a `getValue()` method, which returns a int-type value. The classes that implement the interface decide *how* the methods defined in the interface are implemented. A class implements the interface by adding the keyword *implements* after the class name followed by the name of the interface being implemented. Let us see how that works out in our Dice class.

```java
public class Dice implements GameValue {
    private int d1;
    private int d2;

    public Dice(int die1, int die2) {
        d1 = Math.max(die1, die2);
        d2 = Math.min(die1, die2);
    }

    @Override
    public int getValue() {
        if (d1 ==2 && d2 == 1) {
            return 1000;
        }
        if (d1 == d2) {
            return d1*100;
        }
        return 10*d1 + d2;
   }
}
```

The `implements GameValue` means that the class Dice will adhere to the definition in the GameValue interface, promising that this class will have all methods that are defined in the `GameValue` interface. We can do this in as many classes as we like.
The `@Override` annotation is not mandatory, but it is a good idea because we tell the compiler that we intend to implement a method from an interface. If we make a typo in the method signature, the compiler will warn us that we made a mistake.

As a result of our introduction of the `GameValue` interface and the modification of our `Dice` class, we are now allowed to use GameValue as a **type** throughout our files. Objects can be instantiated from interface-implementing classes just like with normal classes. They're also used in the same way, for instance, as an ArrayList's type. Objects of type Dice can be used when type GameValue is needed.
We can also let other classes, such as `PokerHand` and other similar classes implement the `GameValue` interface. Since a `Dice` object is now a specific type of `GameValue` object, we can cast both implicitly and explicitly, like this:

```java
Dice d = new Dice(3,5);
GameValue val = d;
```

and this:

```java
GameValue val = new Dice(3,5);
Dice d = (Dice) val;
```

Here, explicit casting is necessary because the dice is a more specific type than the Gamevalue type.

Now, we can adapt our sorting code in the following way:
```java
public static void sort(ArrayList<GameValue> input) {
    // For every position in the list we will find the greatest
    for (int i = 0; i < input.size(); i++) {
        // Start at the current position
        for (int j = i + 1; j < input.size(); j++) {
            GameValue jDice = input.get(j);
            if (jDice.getValue() > greatestDice.getValue()) {
                greatest = j;
                greatestDice = jDice;
            }
        }
        // Swap the current position with the smallest
        input.set(greatest, input.get(i));
        input.set(i, greatestDice);
    }
}
```

**NB: do not use this algorithm in practice, it is very inefficient.**

<text-box variant='hint' name='An Interface Is a Contract of Behaviour'>

When a class implements an interface, it signs an agreement. The agreement dictates that the class will implement the methods defined by the interface. If those methods are not implemented in the class, the program will not function.

The interface defines only the names, parameters, and return values of the required methods. The interface, however, does not have a say on the internal implementation of its methods. It is the responsibility of the programmer to define the internal functionality for the methods.

</text-box>

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

## Interface inheritance
Since the bank has an advantage in some types of games, we want to be able to detect whether a value was obtained by the bank or someone else. We could add a method `public boolean fromBank();` to the GameValue interface, but then all our classes would need to add a second method, while some of the games may not even have a bank.
We could create a second interface `public interface BankScore`, but then we have two separate types. On `GameValue` objects we can only call `getValue()` and on `BankScore` objects we can only call `fromBank()`.
We do not have a singly type where we can use both and we can choose only one type for variables and/or method and constructor arguments.
Ofcourse, we could add `public int getValue()'` to the `BankScore` interface, but then we cannot use `BankScore` objects in our old sorting algorithm. `BankScore` is still a separate type from `GameValue`.

To solve this problem, we let the interface `BankScore` inherit the interface `GameValue` by stating  `public interface BankScore extends GameValue`.
Now, the type `BankScore` can be used as a `GameValue` and classes that implement `BankScore` must have both `getValue()` and `fromBank()` methods. The `getValue()` method is inherited from `GameValue`.
We say that `BankScore` is a **subtype** of `GameValue` and that `GameValue` is a **supertype** of `BankScore`. A subtype can always do at least as much as its supertype. This terminology is based on _set theory_: the set of `BankScore` objects is a subset of the set of `GameValue` objects. The set of `GameValue` objects is a superset of the set of `BankScore` objects. Also supertype and subtype relations are **transitive**.

## Interface as Variable Type
<!-- TODO understand what this is about and where it fits in best -->
The type of a variable is always stated as its introduced. There are two kinds of type, the primitive-type variables (int, double, ...) and reference-type variables (all objects). We've so far used an object's class as the type of a reference-type variable.

```java
String string = "string-object";
TextMessage message = new TextMessage("ope", "many types for the same object");
```

An object's type can be other than its class. For example, the type of the `Ebook` class that implements the `Readable` interface is both `Ebook` and `Readable`. Similarly, the text message also has multiple types. Because the `TextMessage` class implements the `Readable` interface, it has a `Readable` type in addition to the `TextMessage` type.

```java
TextMessage message = new TextMessage("ope", "Something cool's about to happen);
Readable readable = new TextMessage("ope", "The text message is Readable!");
```

```java
ArrayList<String> pages = new ArrayList<>();
pages.add("A method can call itself.");

Readable book = new Ebook("Introduction to Recursion", pages);

int page = 0;
while (page < book.pages()) {
    System.out.println(book.read());
    page = page + 1;
}
```

Because an interface can be used as a type, it's possible to create a list that contains objects of the interface's type.

```java
ArrayList<Readable> readingList = new ArrayList<>();

readingList.add(new TextMessage("ope", "never been programming before..."));
readingList.add(new TextMessage("ope", "gonna love it i think!"));
readingList.add(new TextMessage("ope", "give me something more challenging! :)"));
readingList.add(new TextMessage("ope", "you think i can do it?"));
readingList.add(new TextMessage("ope", "up here we send several messages each day"));


ArrayList<String> pages = new ArrayList<>();
pages.add("A method can call itself.");

readingList.add(new Ebook("Introduction to Recursion.", pages));

for (Readable readable: readingList) {
    System.out.println(readable.read());
}
```

Note that although the `Ebook` class that inherits the `Readable` interface class is always of the interface's type, not all classes that implement the `Readable` interface are of type `Ebook`. You can assign an object created from the `Ebook` class to a `Readable`-type variable, but it does not work the other way without a separate type conversion.

```java
Readable readable = new TextMessage("ope", "TextMessage is Readable!"); // works
TextMessage message = readable; // doesn't work

TextMessage castMessage = (TextMessage) readable; // works if, and only if, readable is of text message type
```

Type conversion succeeds if, and only if, the variable is of the type that it's being converted to. Type conversion is not considered good practice, and one of the few situation where it's use is appropriate is in the implementation of the `equals` method.

## Interfaces as Method Parameters
The true benefits of interfaces are reaped when they are used as the type of parameter provided to a method. Since an interface can be used as a variable's type, it can also be used as a parameter type in method calls. For example, the `print` method in the `Printer` class of the class below gets a variable of type `read`.

```java
public class Printer {
    public void print(Readable readable) {
        System.out.println(readable.read());
    }
}
```

The value of the `print` method of the `printer` class lies in the fact that it can be given *any* class that implements the `Readable` interface as a parameter. Were we to call the method with any object instantiated from a class that inherits the Readable class, the method would function as desired.

```java
TextMessage message = new TextMessage("ope", "Oh wow, this printer knows how to print these as well!");

ArrayList<String> pages = new ArrayList<>();
pages.add("Values common to both {1, 3, 5} and {2, 3, 4, 5} are {3, 5}.");
Ebook book = new Ebook("Introduction to University Mathematics.", pages);

Printer printer = new Printer();
printer.print(message);
printer.print(book);
```

<sample-output>

Oh wow, this printer knows how to print these as well!
Values common to both {1, 3, 5} and {2, 3, 4, 5} are {3, 5}.

</sample-output>

Let's make another class called `ReadingList` to which we can add interesting things to read. The class has an `ArrayList` instance as an instance variable, where the things to be read are added. Adding to the reading list is done using the `add` method, which receives a `Readable`-type object as its parameter.

```java
public class ReadingList {
    private ArrayList<Readable> readables;

    public ReadingList() {
        this.readables = new ArrayList<>();
    }

    public void add(Readable readable) {
        this.readables.add(readable);
    }

    public int toRead() {
        return this.readables.size();
    }
}
```

Reading lists are usually readable, so let's have the `ReadingList` class implement the `Readable` interface. The `read` method of the reading list reads all the objects in the `readables` list, and adds them to the string returned by the `read()` method one-by-one.

```java
public class ReadingList implements Readable {
    private ArrayList<Readable> readables;

    public ReadingList() {
        this.readables = new ArrayList<>();
    }

    public void add(Readable readable) {
        this.readables.add(readable);
    }

    public int toRead() {
        return this.readables.size();
    }

    public String read() {
        String read = "";

        for (Readable readable: this.readables) {
            read = read + readable.read() + "\n";
        }

        // once the reading list has been read, we empty it
        this.readables.clear();
        return read;
    }
}
```

```java
ReadingList jonisList = new ReadingList();
jonisList.add(new TextMessage("arto", "have you written the tests yet?"));
jonisList.add(new TextMessage("arto", "have you checked the submissions yet?"));

System.out.println("Joni's to-read: " + jonisList.toRead());
```

<sample-output>

Joni's to-read: 2

</sample-output>

Because the `ReadingList` is of type `Readable`, we're able to add `ReadingList` objects to the reading list. In the example below, Joni has a lot to read. Fortunately for him, Verna comes to the rescue and reads the messages on Joni's behalf.

```java
ReadingList jonisList = new ReadingList();
int i = 0;
while (i < 1000) {
    jonisList.add(new TextMessage("arto", "have you written the tests yet?"));
    i = i + 1;
}

System.out.println("Joni's to-read: " + jonisList.toRead());
System.out.println("Delegating the reading to Verna");

ReadingList vernasList = new ReadingList();
vernasList.add(jonisList);
vernanLista.read();

System.out.println();
System.out.println("Joni's to-read: " + jonisList.toRead());
```

<sample-output>

Joni's to-read: 1000
Delegating the reading to Verna

Joni's to-read:0

</sample-output>

The `read` method called on Verna's list goes through all the `Readable` objects and calls the `read` method on them. When the `read` method is called on Verna's list it also goes through Joni's reading list that's included in Verna's reading list. Joni's reading list is run through by calling its `read` method. At the end of each `read` method call, the read list is cleared. In this way, Joni's reading list empties when Verna reads it.

As you notice, the program already contains a lot of references. It's a good idea to draw out the state of the program step-by-step on paper and outline how the `read` method call of the `vernasList` object proceeds!

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

## Interface as a return type of a method
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
However the class does not have to throw an error, as we can see below.

```java
public class TextServer implements FileServer {

    private Map<String, String> data;

    public TextServer() {
        this.data = new HashMap<>();
    }

    @Override
    public String load(String fileName) throws Exception {
        return this.data.get(fileName);
    }

    @Override
    public void save(String fileName, String textToSave) throws Exception {
        this.data.put(fileName, textToSave);
    }
}
```




