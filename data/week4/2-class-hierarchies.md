---
path: '/week4/2-class-hierarchies'
title: 'Class Hierarchies'
hidden: false
ready: true
---

<!-- Paul - this is also possibly interesting material from last week -->

<text-box variant='learningObjectives' name='Learning Objectives'>

- You are familiar with the concept of inheritance hierarchy.
- You understand that an object can be represented through all of its actual types.

</text-box>

## Inheritance from the Object class
Classes are used to clarify the concepts of the problem domain in object-oriented programming. Every class we create adds functionality to the programming language. This functionality is needed to solve the problems that we encounter. An essential idea behind object-oriented programming is that **solutions rise from the interactions between objects which are created from classes**. An object in object-oriented programming is an independent unit that has a state, which can be modified by using the methods that the object provides. Objects are used in cooperation; each has its own area of responsibility. For instance, our user interface classes have so far made use of `Scanner` objects.

Every Java class extends the class Object, which means that every class we create has at its disposal all the methods defined in the Object class. If we want to change how these methods are defined in Object function, they must be overriden by defining a new implementation for them in the newly created class. The objects we create receive the methods `equals` and `hashCode`, among others, from the Object class.

Every class derives from `Object`, but it's also possible to derive from other classes. When we examine the API (Application Programming Interface) of Java's [ArrayList](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/ArrayList.html), we notice that `ArrayList` has the  superclass `AbstractList`. `AbstractList`, in turn, has the class `Object` as its superclass.

<br/>

<pre>
  <a href="https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/Object.html" target="_blank" rel="noopener">java.lang.Object</a>
  <img src="../img/material/perinta.gif" /><a href="https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/AbstractCollection.html" target="_blank" rel="noopener">java.util.AbstractCollection</a>&lt;E&gt;
    <img src="../img/material/perinta.gif" /><a href="https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/AbstractList.html" target="_blank" rel="noopener">java.util.AbstractList</a>&lt;E&gt;
      <img src="../img/material/perinta.gif" /> java.util.ArrayList&lt;E&gt;
</pre>

Each class can directly extend only one class. However, a class indirectly inherits all the properties of the classes it extends. So the `ArrayList` class derives from the class `AbstractList`, and indirectly derives from the classes `AbstractCollection` and `Object`. So `ArrayList` has at its disposal all the variables and methods of the classes `AbstractList`, `AbstractCollection`, and `Object`.

You use the keyword `extends` to inherit the properties of a class. The class that receives the properties is called the subclass, and the class whose properties are inherited is called the superclass.

We've encountered situations where reference-type variables have other types besides their own one. For example, *all* objects are of type `Object`, i.e., any given object can be represented as a `Object`-type variable in addition to its own type.

```java
String text = "text";
Object textString = "another string";
```

```java
String text = "text";
Object textString = text;
```

In the examples above, a string variable is represented as both a String type and an Object type. Also, a String-type variable is assigned to an Object-type variable. However, assignment in the other direction, i.e., setting an Object-type variable to a String type, will not work. This is because `Object`-type variables are not of type `String`.

```java
Object textString = "another string";
String text = textString; // WON'T WORK!
```

What is this all about?

In addition to each variable's original type, each variable can also be represented by the types of interfaces it implements and classes that it inherits. The String class inherits the Object class and, as such, String objects are always of type Object. The Object class does not inherit a String class, so Object-type variables are not automatically of type String. Take a closer look at the <a href="https://docs.oracle.com/javase/8/docs/api/java/lang/String.html"> String </a> API documentation, in particular at the top of the HTML page.

![A screenshot of the String Class API documentation. The screenshot shows that the String class inherits the class Object.](../img/material/string-api-perinta.png)

The API documentation for the String class begins with a generic header followed by the class' package (`java.lang`). After the package details, the name of the class (`Class String`) is followed by the  *inheritance hierarchy* of the class.

<pre>
  <a href="https://docs.oracle.com/javase/8/docs/api/java/lang/Object.html">java.lang.Object</a>
  <img src="../img/material/perinta.gif"/> java.lang.String
</pre>

The inheritance hierarchy lists all the classes that the given class has inherited. Inherited classes are listed in the order of inheritance, with the class being inspected always at the bottom. In the inheritance hierarchy of the String class, we see that the `String` class inherits the `Object` class. *In Java, each class can inherit one class at most*. On the other hand, the inherited class may have inherited another class. As such, a class may indirectly inherit more than a single class.

The inheritance hierarchy can also be thought of as a list of the different types that the class implements.

Knowledge of the fact that objects can be of many different types -- of type Object, for instance -- makes programming simpler. If we only need methods defined in the Object class, such as `toString`, `equals` and `hashCode` in a method, we can simply use `Object` as the type of the method parameter. In that case, you can pass the method for *any* object as a parameter. Let's take a look at this with the `printManyTimes` method. The method gets an `Object`-type variable and the number of print operations as its parameters.

```java
public class Printer {
    public void printManyTimes(Object object, int times) {
        for (int i=0; i < times; i++) {
            System.out.println(object.toString());
            // or System.out.println(object);
        }
    }
}
```

The method can be given any type of object as a parameter. Within the `printManyTimes` method, the object only has access to the methods defined in the `Object` class because the object is *known* in the method to be of type `Object`. The object may, in fact, be of another type.

```java
Printer printer = new Printer();

String string = " o ";
List<String> words = new ArrayList<>();
words.add("polymorphism");
words.add("inheritance");
words.add("encapsulation");
words.add("abstraction");

printer.printManyTimes(string, 2);
printer.printManyTimes(words, 3);
```

<sample-output>

 o
 o
[polymorphism, inheritance, encapsulation, abstraction]
[polymorphism, inheritance, encapsulation, abstraction]
[polymorphism, inheritance, encapsulation, abstraction]

</sample-output>

Let's continue to look at the API description of the `String` class. The inheritance hierarchy in the description is followed by a list of interfaces implemented by the class.

<pre>
  All Implemented Interfaces:
  <a href="https://docs.oracle.com/javase/8/docs/api/java/io/Serializable.html" target="_blank" rel="noopener">Serializable</a>, <a href="https://docs.oracle.com/javase/8/docs/api/java/lang/CharSequence.html" target="_blank" rel="noopener">CharSequence</a>, <a href="https://docs.oracle.com/javase/8/docs/api/java/lang/Comparable.html" target="_blank" rel="noopener">Comparable</a><<a href="https://docs.oracle.com/javase/8/docs/api/java/lang/String.html" target="_blank" rel="noopener">String</a>>
</pre>

The `String` class implements the `Serializable`, `CharSequence`, and `Comparable` interfaces. An interface is also a type. According to the class' API description, the following interfaces can be set as the type of a String object.

```java
Serializable serializableString = "some text";
CharSequence charSequenceString = "more text";
Comparable<String> comparableString = "other text";
```

Note that we only discuss the `Comparable` interface in a later week, and the `Serializable` and `CharSequence` interface are only used as an example, but are not interfaces you have to be familiar with.

Since we're able to define the type of a method's parameter, we can declare methods that receive an object that *implements a specific interface*. When a method's parameter is an interface, any object that implements that interface can be passed to it as an argument.

We'll extend the `Printer` class so that it has a method for printing the characters of objects that implement the `CharSequence` interface. The `CharSequence` interface provides, among other things, methods `int length()` for getting a string's length and `char charAt(int index)`, which retrieves a character from a given index.

```java
public class Printer {
    public void printManyTimes(Object object, int times) {
        for (int i=0; i < times; i++) {
            System.out.println(object.toString());
            // or System.out.println(object);
        }
    }

    public void printCharacters(CharSequence charSequence) {
        for (int i=0; i < charSequence.length(); i++) {
            System.out.println(charSequence.charAt(i));
        }
    }
}
```

The `printCharacters` method can be passed any object that implements the `CharSequence` interface. These include `String` as well as `StringBuilder`, which is often more efficient for building `String` objects step by step than using the `+` operator to repeatedly concatenate `String` objects. The `printCharacters` method prints each character of a given object on its own line.

```java
Printer printer = new Printer();

String string = "works";

printer.printCharacters(string);
```

<sample-output>

w
o
r
k
s

</sample-output>

<Exercise title="Test your knowledge">

In this quiz, you can test your knowledge on the subjects covered in this chapter.

Suppose we create an object with the expression `new ArrayList<Integer>`.
For each of the following types, determine if this object has that type:

* `Object`
* `Integer`
* `List<Integer>`
* `String`
* `Integer []`

<Solution>

* `Object` - is a type of the object
* `Integer` - is not a type of the object
* `List<Integer>` - is a type of the object
* `String` - is not a type of the object
* `Integer []` - is not a type of the object

</Solution>

---

What is special about the `Object` class? How does it relate to class hierarchies?

<Solution>

Every class that does not specify a direct superclass using the `extends` keyword in the
class header, is automatically a direct subclass of the `Object` superclass. Therefore,
the `Object` class is at the root of the class hierarchy, and every non-array non-primitive
type has the methods define in the `Object` class, including `toString()`, `equals()` and
`hashCode()`.

</Solution>

---

Although we do not work with them, Java has various classes that can be used to build visual
user interfaces with buttons, windows and textfields. One class that can be used for this is
the `JTextField` class. Search for the Javadoc page of `JTextField` and determine which
super classes `JTextField` has in it's class hierarchy.
How many interfaces are implemented by `JTextField`?

**Note:** you do not have to understand what a `JTextField` does or how you to use it to
answer this question.

<Solution>

This answer is based on [this Javadoc page](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextField.html).

There are five super-classes in the class hierarchy: `JTextComponent`, `JComponent`, `Container`,
`Component` and `Object`.

It implements six interfaces: `ImageObserver`, `MenuContainer`, `Serializable`, `Accessible`,
`Scrollable` and `SwingConstants`.

This information can be found at the top of the Javadoc page.

</Solution>

</Exercise>

<!--

<programming-exercise name='Herds (2 points)' tmcname='part09-Part09_11.Herds' nocoins='true'>

In this exercise we are going to create organisms and herds of organisms that can move around. To represent the locations of the organisms we'll use a **two-dimensional coordinate system**. Each position involves two numbers: `x` and `y` coordinates. The `x` coordinate indicates how far from the origin (i.e. point zero, where x = 0, y = 0) that position is horizontally. The `y` coordinate indicates the distance from the origin vertically. If you are not familiar with using a coordinate system, you can study the basics from  [Wikipedia](https://en.wikipedia.org/wiki/Cartesian_coordinate_system).

<br/>

The exercise base includes the interface `Movable`, which represents something that can be moved from one position to another. The interface includes the method `void move(int dx, int dy)`. The parameter `dx` tells how much the object moves on the x axis, and dy tells the distance on the y axis.

This exercise involves implementing the classes `Organism` and `Herd`, both of which are movable.

<h2>Implementing the Organism Class</h2>

Create a class called `Organism` that implements the interface `Movable`. An organism should know its own location (as x, y coordinates). The API for the class `Organism` is to be as follows:

- **public Organism(int x, int y)**<br />The class constructor that receives the x and y coordinates of the initial position as its parameters.

- **public String toString()**<br/>Creates and returns a string representation of the organism. That representation should remind the following: `"x: 3; y: 6"`. Notice that a semicolon is used to separate the coordinates.

- **public void move(int dx, int dy)**<br/> Moves the object by the values it receives as parameters. The `dx` variable contains the change to coordinate `x`, and the `dy` variable ontains the change to the coordinate `y`. For example, if the value of `dx` is 5, the value of the object variable `x` should be incremented by five.

Use the following code snippet to test the `Organism` class.

```java
Organism organism = new Organism(20, 30);
System.out.println(organism);
organism.move(-10, 5);
System.out.println(organism);
organism.move(50, 20);
System.out.println(organism);
```

<sample-output>

x: 20; y: 30
x: 10; y: 35
x: 60; y: 55

</sample-output>


<h2>Implementing the Herd</h2>

Create a class called `Herd` that implements the interface `Movable`. A herd consists of multiple objects that implement the Movable interface. They must be stored in e.g. a list data structure.

The `Herd` class must have the following API.

- **public String toString()**<br/> Returns a string representation of the positions of the members of the herd, each on its own line.

- **public void addToHerd(Movable movable)**<br/> Adds an object that implements the `Movable` interface to the herd.

- **public void move(int dx, int dy)**<br/> Moves the herd with by the amount specified by the parameters. Notice that here you have to move each member of the herd.

Test out your program with the sample code below:

```java
Herd herd = new Herd();
herd.addToHerd(new Organism(57, 66));
herd.addToHerd(new Organism(73, 56));
herd.addToHerd(new Organism(46, 52));
herd.addToHerd(new Organism(19, 107));
System.out.println(herd);
```

<sample-output>

x: 73; y: 56
x: 57; y: 66
x: 46; y: 52
x: 19; y: 107

</sample-output>


</programming-exercise>


<programming-exercise name='Animals (4 parts)' tmcname='part09-Part09_12.Animals'>

In this exercise you'll demonstrate how to use inheritance and interfaces.

<h2>Animal</h2>

First implement an abstract class called `Animal`. The class should have a constructor that takes the animal's name as a parameter. The Animal class also has non-parameterized methods eat and sleep that return nothing (void), and a non-parameterized method getName that returns the name of the animal.

The sleep method should print "(name) sleeps", and the eat method should print "(name) eats". Here (name) is the name of the animal in question.

<h2>Dog</h2>

Implement a class called `Dog` that inherits from Animal. Dog should have a parameterized constructor that can be used to name it. The class should also have a non-parameterized constructor, which gives the dog the name "Dog". Another method that Dog must have is the non-parameterized bark, and it should not return any value (void). Like all animals, Dog needs to have the methods eat and sleep.

Below is an example of how the class Dog is expected to work.

```java
Dog dog = new Dog();
dog.bark();
dog.eat();

Dog fido = new Dog("Fido");
fido.bark();
```

<sample-output>

Dog barks
Dog eats
Fido barks

</sample-output>

<h2>Cat</h2>

Next to implement is the class `Cat`, that also inherits from the Animal class. Cat should have two constructors: one with a parameter, used to name the cat according to the parameter, and one without parameters, in which case the name is simply "Cat". Another method for Cat is a non-parameterized method called purr that returns no value (void). Cats should be able to eat and sleep like in the first part.

Here's an example of how the class Cat is expected to function:

```java
Cat cat = new Cat();
cat.purr();
cat.eat();

Cat garfield = new Cat("Garfield");
garfield.purr();
```

<sample-output>

Cat purrs
Cat eats
Garfield purrs

</sample-output>


<h2>NoiseCapable</h2>


Finally, create an interface called `NoiseCapable`. It should define a non-parameterized method makeNoise that returns no value (void). Implement the interface in the classes Dog and Cat. The interface should take use of the bark and purr methods you've defined earlier.

Below is an example of the expected functionality.


```java
NoiseCapable dog = new Dog();
dog.makeNoise();

NoiseCapable cat = new Cat("Garfield");
cat.makeNoise();
Cat c = (Cat) cat;
c.purr();
```

<sample-output>

Dog barks
Garfield purrs
Garfield purrs

</sample-output>

</programming-exercise>

-->
