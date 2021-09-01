---
path: '/week3/2-class-inheritance'
title: 'Class Inheritance'
hidden: false
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You know that in the Java programming language every class inherits the Object class, and you understand why every object has methods toString, equals, and hashCode.

- You are familiar with the concepts of inheritance, superclass, and subclass.

- You can create classes that inherit some of their properties from another class.

- You can call a constructor or method that is defined in a superclass.

- You know how an object's executed method is determined, and you are familiar with the concept of polymorphism.

- You can assess when to use inheritance, and you can come up with an example that is ill-suited for inheritance.

</text-box>

## Class inheritance
Inheritance does not only apply to interfaces, but also to classes. Here is an example:
```java
public class Square {
  public int x;

  public int getSquaredValue() {
    return x*x;
  }
}

public class SquareSum extends Square {
  public int y;

  public SquareSum(int value1, int value2) {
    x = value1;
    y = value2;
  }

  public int getSum() {
    return x + y;
  }
}

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

We can also call the methods of the superclass:
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

When we use class inheritance, the subclass inherits the methods of the superclass (including the body) and the instance variables of the superclass (but private ones are invisible). We can call methods of the superclass as if they are defined in the current class, unless they are private. Also, subtype and supertype relationships work the same as with interfaces. Moreover, a class can have at most one direct superclass and implement any non-negative number of interfaces.
For example:

`public class D excents A implements I, J {...}`

A class can have any number of subclasses, unless it is defined with the keyword `final`, then it can not have any subclasses.

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

## Calling the constructor of the superclass
You use the keyword `super` to call the constructor of the superclass. The call receives as parameters the types of values that the superclass constructor requires. If there are multiple constructors in the superclass, the parameters of the super call dictate which of them is used.

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
Let's create the class `Engine` using inheritance in our implementation. We'll create the class `Engine` which inherits the class `Part`: an engine is a special case of a part.

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

The constructors of the Engine class are worth some consideration. On the first constructor we use the keyword `super` to call the constructor of the superclass. The call `super(identifier, manufacturer)` calls the constructor `public Part(String identifier, String manufacturer)` which is defined in the class Part. Through this process the object variables defined in the superclass are initiated with their initial values. After calling the superclass constructor, we also set the proper value for the object variable `engineType`. In the second constructor, we call the first constructor within the same class using `this`.
Take-away message: *The `super` call bears some resemblance to the `this` call in a constructor; `this` is used to call a constructor of this class, while `super` is used to call a constructor of the superclass. If a constructor uses the constructor of the superclass by calling `super` in it, the `super` call must be on the first line of the constructor. This is similar to the case with calling `this` (must also be the first line of the constructor).*

When the constructor (of the subclass) is called, the variables defined in the superclass are initialized. The events that occur during the constructor call are practically identical to what happens with a normal constructor call. If the superclass doesn't provide a non-parameterized constructor, there must always be an explicit call to the constructor of the superclass in the constructors of the subclass.
A subclass **must** have a constructor that calls the constructor of the superclass when the superclass has one or more specified constructors. In the previous example, this means that you could remove the second constructor, but not the first, unless you would make a new constructor calling the super class.

```java
Engine engine = new Engine("combustion", "hz", "volkswagen", "VW GOLF 1L 86-91");
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

## Calling a superclass method
You can call the methods defined in the superclass by prefixing the call with `super`, just as you can call the methods defined in this class by prefixing the call with `this`. 
Just try it in the following programming exercise:

## The actual type of an object dictates which method is executed
An object's type decides what the methods provided by the object are. For instance, we implemented the class `Student` earlier. If a reference to a `Student` type object is stored in a `Person` type variable, only the methods defined in the `Person` class (and its superclass and interfaces) are available:

```java
Person ollie = new Student("Ollie", "6381 Hollywood Blvd. Los Angeles 90028");
ollie.credits();        // DOESN'T WORK!
ollie.study();              // DOESN'T WORK!
System.out.println(ollie);   // ollie.toString() WORKS
```

So an object has at its disposal the methods that relate to its type, and also to its superclasses and interfaces. The Student object above offers the methods defined in the the classes Person and Object.

In the last exercise we wrote a new `toString` implementation for Student to override the method that it inherits from Person. The class Person had already overriden the toString method it inherited from the class Object. If we handle an object by some other type than its actual type, which version of the object's method is called?

When we would have two students that we refer to by variables of different types. Which version of the toString method will be executed: the one defined in Object, Person, or Student?
The method to be executed is chosen based on the actual type of the object, which means the class whose constructor is called when the object is created. If the method has no definition in that class, the version of the method is chosen from the class that is closest to the actual type in the inheritance hierarchy.

<text-box variant='hint' name='Polymorphism'>
Regardless of the type of the variable, the method that is executed is always chosen based on the actual type of the object. Objects are polymorphic, which means that they can be used via many different variable types. The executed method always relates to the actual type of the object. This phenomenon is called polymorphism.
</text-box>

## When is inheritance worth using?
Inheritance is a tool for building and specializing hierarchies of concepts; a subclass is always a special case of the superclass. If the class to be created is a special case of an existing class, this new class could be created by extending the existing class. For example, in the previously discussed car part scenario an engine **is** a part, but an engine has extra functionality that not all parts have.

When inheriting, the subclass receives the functionality of the superclass. If the subclass doesn't need or use some of the inherited functionality, inheritance is not justifiable. Classes that inherit will inherit all the methods and interfaces from the superclass, so the subclass can be used in place of the superclass wherever the superclass is used. It's a good idea to keep the inheritance hierarchy shallow, since maintaining and further developing the hierarchy becomes more difficult as it grows larger. Generally speaking, if your inheritance hierarchy is more than 2 or 3 levels deep, the structure of the program could probably be improved.

Inheritance is not useful in every scenario. For instance, extending the class `Car` with the class `Part` (or `Engine`) would be incorrect. A car **includes** an engine and parts, but an engine or a part is not a car. More generally, **if an object owns or is composed of other objects, inheritance should not be used**.

When using inheritance, you should take care to ensure that the [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle) holds true. There should only be one reason for each class to change. If you notice that inheriting adds more responsibilities to a class, you should form multiple classes of the class.

### Example of misusing inheritance
Let's consider a postal service and some related classes. `Customer` includes the information related to a customer, and the class `Order` that inherits from the `Customer` class and includes the information about the ordered item. The class `Order` also has a method called `postalAddress` which represents the postal address that the order is shipped to.

```java
public class Customer {

    private String name;
    private String address;

    public Customer(String name, String address) {
        this.name = name;
        this.address = address;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
```

```java
public class Order extends Customer {

    private String product;
    private String count;

    public Order(String product, String count, String name, String address) {
        super(name, address);
        this.product = product;
        this.count = count;
    }

    public String getProduct() {
        return product;
    }

    public String getCount() {
        return count;
    }

    public String postalAddress() {
        return this.getName() + "\n" + this.getAddress();
    }
}
```

Above inheritance is not used correctly. When inheriting, the subclass must be a special case of the superclass; an order is definitely not a special case of a customer. The misuse shows itself in how the code breaks the single responsibility principle: the `Order` class is responsible both for maintaining the customer information and the order information.

The problem becomes very clear when we think of what a change in a customer's address would cause.
In the case that an address changes, we would have to change *every* order object that relates to that customer. This is hardly ideal. A better solution would be to encapsulate the customer as an object variable of the `Order` class. Thinking more closely on the semantics of an order, this seems intuitive. *An order has a customer*.

Let's modify the `Order` class so that it includes a reference to a `Customer` object.

```java
public class Order {

    private Customer customer;
    private String product;
    private String count;

    public Order(Customer customer, String product, String count) {
        this.customer = customer;
        this.product = product;
        this.count = count;
    }

    public String getProduct() {
        return product;
    }

    public String getCount() {
        return count;
    }

    public String postalAddress() {
        return this.customer.getName() + "\n" + this.customer.getAddress();
    }
}
```

This version of the `Order` class is better. The method `postalAddress` uses the *customer* reference to obtain the postal address instead of inheriting the class `Customer`. This helps both the maintenance of the program and its concrete functionality.

Now, when a customer changes, all you need to do is change the customer information; there is no need to change the orders.
