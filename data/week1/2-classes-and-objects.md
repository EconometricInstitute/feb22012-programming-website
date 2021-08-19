---
path: "/week1/2-classes-and-objects-in-java"
title: "Classes and objects in Java"
hidden: false
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You revise your knowledge on classes and objects.

- You understand what a constructor is, and you are able to make one yourself.

- You know how to use the Java Documentation and open API for existing classes and their methods.

- You can tell the difference between static and non-static methods.

- You know that most objects store references to values.

- You are familiar with the null and this reference.

</text-box>

Last year, you have started your journey in the world of object-oriented programming in the course Introduction to Programming. We'll shortly review the use of objects and methods.

## Revision of Classes and Objects
A class defines the attributes of objects, i.e., the information related to them (instance variables), and their commands, i.e., their methods. The values of instance (i.e., object) variables define the internal state of an individual object, whereas methods define the functionality it offers.
A method is a piece of code written inside a class that can be called. A method is always part of some class and is often used to modify the internal state of an object instantiated from a class.
An object is always instantiated by calling a method that created an object, i.e., a constructor by using the `new` keyword.

A class thus specifies what the objects instantiated from it are like.
- The object's variables (instance variables) specify the internal state of the object.
- The object's methods specify what the object does.

If you make your own class, you should write Javadoc style comments that start with `/**` for every method in the class, but also for the class itself. Within the class Javadoc comment, you should also state who the author is, using the `@author` annotation. For public methods, you explain the use of the method, the parameters and return types.

Let's create a class named `Person`. For this class, we create a separate file named `Person.java`. Our program now consists of two separate files, since the main program is also in its own file. The `Person.java` file initially contains the class definition **public class Person** and the curly brackets that confine the contents of the class.
A class defines the attributes and behaviors of objects that are created from it. Let's decide that each person object has a name and an age. It's natural to represent the name as a string, and the age as an integer. We'll go ahead and add these to our blueprint:

```java
public class Person {
    private String name;
    private int age;
}
```
We specify above that each object created from the `Person` class has a `name` and an `age`. Variables defined inside a class are called _instance variables_.
Instance variables are written on the lines following the class definition `public class Person {`. Each variable is preceded by the keyword private. The keyword **private** means that the variables are "hidden" inside the object, which is known as _encapsulation_. **Public** variables, on the other hand, are variables that are visible from outside the class.

Lastly, in the following picture, a brief overview of the relations between statements, variables, methods, objects and classes are depicted and explained:

<img width="618" alt="In the visual representation, two parts are depicted: operations and memory. Operations are triggered by statements that are grouped in methods, which on their turn are grouped in a class. The statements modify the variables, which are part of the memory and are grouped in objects. The methods operate on the objects and objects have a class as a type. The operations thus influence the memory and both operations and memory are part of the class." src="https://user-images.githubusercontent.com/67587903/129898218-de6a477f-f90b-41e0-97cf-7b7d5d0f7419.PNG">

## Defining a Constructor
We want to set an initial state for an object that's created. Custom objects are created the same way as objects from pre-made Java classes, such as `ArrayList`, using the `new` keyword. It'd be convenient to pass values to the variables of that object as it's being created. For example, when creating a new person object, it's useful to be able to provide it with a name:

```java
public static void main(String[] args) {
    Person ada = new Person("Ada");
    // ...
}
```

This is achieved by defining the method that creates the object, i.e., its constructor. The constructor is defined after the instance variables. In the following example, a constructor is defined for the Person class, which can be used to create a new Person object. The constructor sets the age of the object being created to 0, and the string passed to the constructor as a parameter as its name:

```java
public class Person {
    private String name;
    private int age;

    public Person(String initialName) {
        this.age = 0;
        this.name = initialName;
    }
}
```

The constructor's name is always the same as the class name. The class in the example above is named Person, so the constructor will also have to be named Person. The constructor is also provided,  as a parameter, the name of the person object to be created. The parameter is enclosed in parentheses and follows the constructor's name. The parentheses that contain optional parameters are followed by curly brackets. In between these brackets is the source code that the program executes when the constructor is called (e.g., `new Person ("Ada")`).

Objects are always created using a constructor.
A few things to note: the constructor contains the expression `this.age = 0`. This expression sets the instance variable `age` of the newly created object (i.e., "this" object's age) to 0. The second expression `this.name = initialName` likewise assigns the string passed as a parameter to the instance variable `name` of the object created.

<text-box variant='hint' name='Default Constructor'>

If the programmer does not define a constructor for a class, Java automatically creates a default one for it. A default constructor is a constructor that doesn't do anything apart from creating the object. The object's variables remain uninitialized (generally, the value of any object references will be `null`, meaning that they do not point to anything, and the values of primitives will be `0`)

</text-box>

## Methods
### Standard objects
For objects of standard Java classes, you can find the available methods in the [Java Documentation](https://docs.oracle.com/javase/8/docs/api/) of the API.
On the left, a list of all public classes is presented. If you choose the `String` class, you can scroll down to the Method Summary, where all methods of the String class are described.
For instance, the methods length(), toLowerCase(), toUpperCase(), charAt(), split() and replaceAll() are mentioned here.
If you place your cursor on the word `String` at the definition of a String object and press `Ctrl + Shift + i` on Windows or `Cmd + Shift + i` on Mac, you can find the implementation of all these methods in the pop-up.

## Objects and references
In Java, variables that do not actually hold objects, merely hold a **reference** to the object, which is a location of the object within the computer's memory. When a variable contains the memory location of an object, it _refers_ to that object.
For instance, in the following code, two variables `a` and `b` refer to the same `ArrayList` object.
```java
ArrayList<Integer> a = new ArrayList<>();
a.add(5);
ArrayList<Integer> b = a;
b.add(10);
System.out.println(a);
```
Since they refer to the same object, an adjustment performed via reference `b` is also visible via reference `a`, such that now `[5, 10]` will be printed.
This shows a clear distinction between primitive and non-primitive variables. Object variables are non-primitive and hold references. Primitive variables, however, store data, not references. In the following example, the two variables _a_ and _b_ can thus be adjusted separately without impacting each other.

In the image below, you can see how the memory processes the storage and adaption of the statements in the code above:

<img width="527" alt="The image shows variables a and b both pointing to the same ArrayList. The arraylist has a size of 2 and has to spaces with pointers in them, which each point to an Integer object. The Integer objects contain the values 5 and 10." src="https://user-images.githubusercontent.com/67587903/129902561-bc38d276-c000-4205-a297-ea462b95359b.PNG">

If an object does not refer to anything at all, the object reference has the special value `null`.
Another used reference is `this`. This reference is used by methods to refer to the object that the method is called on.
If you need refreshment on these two special object references, please have a look at the Introduction to Programming matter of [week 5](https://feb21011.ese.eur.nl/week-5/5-objects-and-references).

### Static versus Non-Static
Static methods can _not_ be invoked on objects and are general. It means that the `this` keyword does not exist for these methods, while it does for non-static methods. Since static methods are not associated with an object, they can not evoke instance variables directly. If a static method makes use of an instance variable, it is done via a reference to the object. Ofcourse, static methods can acces static variables right away, since a static variable belongs to a class and is global. Thus, methods in two different objects can access and change the same variable.
Non-static methods are also called `instance` methods. Instance variables thus are non-static, and each object has his own copy of the instance variables. Non-static methods can access both static and non-static variables.
