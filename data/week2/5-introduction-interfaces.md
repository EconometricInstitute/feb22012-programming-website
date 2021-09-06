---
path: '/week2/5-introduction-interfaces'
title: 'Introduction to Interfaces'
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You're familiar with the concept of an interface, can define your own interfaces, and implement an interface in a class.

- You know how to use interfaces as variable types, method parameters and method return values.

- You're aware of some of the interfaces that come with Java.

</text-box>

## Motivation to use Interfaces
An important reason to use Object-oriented programming, is that we prevent duplication of code. With this in the back of your mind, consider a simple dice game:
We throw two dice. If they have the same value, we multiply any one of them by a hundred. In case of different values, we multiply the highest by then and add the lowest. Or, in case we have a one and a two, it's worth a thousand.
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
    // For every position in the list, we will find the greatest
    for (int i = 0; i < input.size(); i++) {
        int greatest = i;
        Dice greatestDice = input.get(i);
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
// **NB: do not use this algorithm in practice, it is very inefficient.**
```

Now, let's say we would also want to sort `PokerHand` objects. We would then copy/paste the code, only changing the object types.
```java
public static void sort(ArrayList<PokerHand> input) {
    // For every position in the list we will find the greatest
    for (int i = 0; i < input.size(); i++) {
        // Start at the current position
        int greatest = i;
        Pokerhand greatestDice = input.get(i);
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
We want to achieve **polymorphism**: treating objects of completely different classes uniformly. One way to achieve this, is by using **interfaces**.

## Interfaces: definition and use
We can use interfaces to define behavior that's required from a class, i.e., its methods. In other words, interfaces are used to guarantee that an object has one or more methods available. They're defined the same way that regular Java classes are, but "`public interface ...`" is used instead of "`public class ... `" at the beginning of the class. So they are defined in their own `.java` files. Interfaces define behavior through method names and their return values. However, they don't always include the actual implementations of the methods, but the signature ends with a semicolon. A visibility attribute on interfaces is not marked explicitly, as they're always `public`. Let's examine a *GameValue* interface that describes the value.

```java
public interface GameValue {
    int getValue();
}
```

The `GameValue` interface declares a `getValue()` method, which returns an int-type value. The classes that implement the interface decide *how* the methods defined in the interface are implemented. A class implements the interface by adding the keyword *implements* after the class name, followed by the name of the interface being implemented. Let us see how that works out in our Dice class.

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
// **NB: do not use this algorithm in practice, it is very inefficient.**
```

<text-box variant='hint' name='An Interface Is a Contract of Behavior'>

When a class implements an interface, it signs an agreement. The agreement dictates that the class will implement the methods defined by the interface. If those methods are not implemented in the class, the program will not function.

The interface defines only the names, parameters, and return values of the required methods. The interface, however, does not have a say on the internal implementation of its methods. It is the responsibility of the programmer to define the internal functionality for the methods.

</text-box>
