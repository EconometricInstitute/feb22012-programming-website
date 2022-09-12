---
path: '/week3/1-interface-types'
title: 'Interface Types'
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You understand how interfaces are used as variable types.
- You know how to use interfaces as method parameters.
- You can use an interface type as a return type.
- You understand when automated type conversion is possible and when casts are needed
- You are aware of the `instanceof` operator to check if certain type conversions are possible

</text-box>

In last weeks material, an interface was introduce to be able to compare the outcomes of certain types of casino games based on some score/value. The interface looked like this:

```java
public interface GameValue {
    int getValue();
}
```

We could then implement different classes, for example `Dice` and `PokerHand`, that implement this interface.

```java
public class Dice implements GameValue {
    private int d1;
    private int d2;

    public Dice(int die1, int die2) {
        d1 = Math.max(die1, die2);
        d2 = Math.min(die1, die2);
    }

    public int getFirst() {
        return d1;
    }

    public int getSecond() {
        return d2;
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

A rough sketch of a what a `PokerHand` could look like is this:

```java
public class PokerHand implements GameValue {

    private List<String> cards;

    public PokerHand(String card1, String card2, String card3,
                        String card4, String card5) {
        this.cards = List.of(card1, card2, card3, card4, card5);
    }

    @Override
    public int getValue() {
        int score = 0;
        // Some complicated code that uses the cards to compute a score
        // ...
        return score;
    }
}
```

The advantage of using an interface, is that objects of both classes can
now be used as the same `GameValue` type.

### Interface Types in Variable Declarations

When a variable is declared, it must always be clear what the variable, usually by writing the type in front of the variable name. There are two kinds of type, the primitive-type variables (int, double, ...) and reference-type variables (all objects). We've so far used an object's class as the type of a reference-type variable.
An object's type can be other than its class. For example, the type of the `Dice` class that implements the `GameValue` interface is both `Dice` and `GameValue`.

```java
Dice throwDice = new Dice(3, 4);
GameValue throwDice2 = new Dice(2,5);
GameValue throwDice3 = throwDice;
```

### Interface Types as Method Parameters

The true benefits of interfaces are reaped when they are used as the type of parameter provided to a method.
Since an interface can be used as a variable's type, it can also be used as a parameter type in method calls.
For example, the `getValue` method of the class below accepts an argument of type `GameValue`.

```java
public class GameValue {
    public void printValue(GameValue gameValue) {
        System.out.println(gameValue.getValue());
    }
}
```

The value of declaring the `getValue` method such that it accepts a `GameValue` argument lies in the fact that it can be given objects of *any* class that implements the `GameValue` interface as input.
When we call method with any object instantiated from a class that inherits the GameValue class, the method would function as desired. This avoid having to create many different methods for different
types of casino games.

### Interface Types as Return Types

It is also possible to create a method that returns something of an interface type

```java
public static GameValue getHighestValue(GameValue a, GameValue b) {
    if (a.getValue() > b.getValue()) {
        return a;
    }
    return b;
}
```
### Type Conversion

Note that since the `Dice` class that inherits the `GameValue` interface class, it is guaranteed that every `Dice` can be used as a `GameValue`.
However, not all classes that implement the `GameValue` interface are guaranted to be of type `Dice`.
As a consequence, you can assign an object created from the `Dice` class to a `GameValue`-type variable,
but it does not work the other way without an explicit type conversion. In case you still want to do this, you have to use an explicit cast:

```java
public void printDiceValue(GameValue dice) {
    // Not sure whether the next step will work
    Dice myDice = (Dice) dice;
    // Extract some information specific to the Dice class
    int firstThrow = myDice.getFirst();
    int secondThrow = myDice.getSecond();
    System.out.print(firstThrow+", " secondThrow);
    System.out.println(" : "+myDice.getValue());
}
```

The above method attempts to convert a given reference of type `GameValue` into a reference of type `Dice`.
However, if the method is called with a `GameValue` reference that actually points to a `PokerHand` object,
you will get a `ClassCastException` when you run the code, indicating that this type cast has failed.
In general, we should avoid this type of type conversion if this is possible. For example, changing the method
header to:

```java
public void printDiceValue(Dice dice) { ... }
```

In this case, we know for sure that the input is actually of type `Dice`, and therefore a cast is not necessary.

### Safe Type Conversions and `instanceof`

As explained the following code performs an unsafe type conversion:

```java
public void printDiceValue(GameValue dice) {
    // Not sure whether the next step will work
    Dice myDice = (Dice) dice;
    // ... more code here
}
```

To make sure we perform the type conversion only when this is safe, we can use the `instanceof` keyword to check whether
it is safe to cast a certain reference to a particular type. It is a binary operator which on the left hand side has
an expression, and on the right hand side has a type, like so: `expr instanceof Type`. The operator will return `true`
in case the reference in `expr` can be converted to the give `Type` and otherwise returns `false`. We can adjust
the code above as follows to use this mechanism:

```java
public void printDiceValue(GameValue dice) {
    // Not sure whether the next step will work
    if (dice instanceof Dice) {
        // This makes sure we only perform the type conversion
        // when this is safe
        Dice myDice = (Dice) dice;
        // ... more code here
    }
    else {
        // throw an Exception or do something else
    }
}
```

Typically, it is preferred to use inheritance and method overloading to prevent having to do these kind of type checks, but in some cases it can be very useful.

<text-box variant='backgroundMaterial' name='Exceptions and Interfaces'>

An Interface can have methods which throw an exception.
For example the classes implementing the following `FileServer` interface *might* throw an exception from the methods `load` or `save`.

```java
public interface FileServer {
    String load(String fileName) throws FileNotFoundException;
    void save(String fileName, String textToSave) throws Exception;
}
```

If an interface declares a `throws Exception` attribute on a method, this allows that implementations of these methods
can throw Exceptions. However, it is not mandatory that the class will throw an exception, perhaps this will never
happen for certain implementation of the interface, while it can happen with other implementations.

</text-box>

<Exercise title="Test your knowledge">

In this quiz, you can test your knowledge on the subjects covered in this chapter.

Why do we use interfaces in Java?

<Solution>

We use interfaces to achieve polymorphism, that lets us use different objects in a uniform way.

This can prevent the writing duplicate code. Writing duplicate code should be avoided even if the code differs a little.
That way we need to write (and if needed debug) the code only once. If the code needs to be adjusted later, there is no
risk that we forget to update one of the copies.

Furthermore, it makes our code modular: we can easily swap components that model investing behavior, that implement
statistical models, etcetera.

</Solution>

Why would one use the interface type as a method parameter or return type?

<Solution>

We use the more general interface type as parameters and return types to keep methods general.
By doing so, we make sure that all inheriting classes can use the method and avoid having to
implement the same method for each inheriting class.

It is also used in creating and declaring new variables.
A very well-known example is the following: `List<String> exampleList = new ArrayList<>();`.
Here, the type `List` is general, as there exist many different types of lists.
The class `ArrayList` inherits the class `List`, so that `List` is an interface of `List` here.
In the [documentation](https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/util/List.html)
you can find which other implementing classes have the interface `List`.

</Solution>

What can you do to avoid making mistakes while converting between types?

<Solution>

To safely convert between types, it is best to use the `instanceof` keyword to check if the type
of your variable is actually the same as the type you want to convert to. Don't forget to think
about what your program should do if the result of this check is `false`.

</Solution>

</Exercise>
