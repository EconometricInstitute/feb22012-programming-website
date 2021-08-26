---
path: "/week1/3-classes-and-objects-in-java"
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
A class defines the attributes of objects, i.e., the information related to them (instance variables), and their commands, i.e., their methods. The values of instance variables (sometimes also referred to as object variables) define the internal state of an individual object, whereas methods define the functionality it offers.
A method is a piece of code written inside a class that can be called. A method is always part of some class and is often used to modify the internal state of an object instantiated from a class.
An object is always instantiated by calling a special type of method that creates and initializes an object using the `new` keyword. This special type of method is called the *constructor*.


A class can be seen as a blueprint or the schematics of the objects that are instantiated from it, and tells what those objects are like.
- The object's variables (instance variables) specify the internal state of the object.
- The object's methods specify what the object does.

An object is created while the program is running, and lives in the computer's memory until it is no longer necessary. The JVM has a feature called *garbage collection* that automatically
figures out when an object in memory is not needed by checking if there are no variables that refer to it any longer. It then recovers that memory, so it can be reused for objects that are created at a later time.
As such, the lifecycle of an object starts with the initialization via a constructor call, it then lives in the memory, at some point becomes dereferenced, and finally it is cleaned up by the garbage collector.

Let's create a class named `Person`. For this class, we create a separate file named `Person.java`. Our program now consists of two separate files, since the main program is also in its own file. The `Person.java` file initially contains the class definition **public class Person** and the curly brackets that confine the contents of the class.
A class defines the attributes and behaviors of objects that are created from it. Let's decide that each person object has a name and an age. It's natural to represent the name as a string, and the age as an integer. We'll go ahead and add these to our blueprint:

```java
public class Person {
    private String name;
    private int age;
}
```
We specify above that each object created from the `Person` class has a `name` and an `age`. Variables defined inside a class are called _instance variables_.
Instance variables are written on the lines following the class definition `public class Person {`. Each variable is preceded by the keyword private.
The keyword **private** means that the variables are "hidden" inside the object, which is known as _encapsulation_. The idea of encapsulation is that you make the
object user-friendly for other programmers by carefully thinking about which methods and variables you want to expose as **public** to other programmers, whereas
the internals should be hidden away from other programmers and kept **private**. For example, you can use a Java `ArrayList` without knowing exactly how it works
internally. This is by design: the public part of the `ArrayList` was designed for easy of use, where the internals are a complicated but efficient implementation
for store data. In general, instance variables are almost always kept **private**, as providing access to them via methods provides more flexibility to change something
at a later point in time.

<text-box name="Javadoc Comments" variant="hint">

Classes have a public part that is visible and can be used by other users and programmers. If you make your own class, you should write Javadoc style comments that start with `/**` for every public method in the class to document how they can be used. Furthermore, it is also a good idea to add it for the class itself, where you explain how objects of the class can be used. Within the class Javadoc comment, you should also state who the author is, using the `@author` annotation. For public methods, you explain the use of the method, the parameters, and return types, so it is totally clear how a method should be used to another programmer.

The private part of the methods is for internal use only, and therefore it is less important to document these parts. Although it is always good to explain the more complicated parts of your code in case you have to adjust or change it after not having looked at it for a long time.

</text-box>

Lastly, in the following picture, a brief overview of the relations between statements, variables, methods, objects, and classes are depicted and explained:

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

Writing a constructor is very similar to writing a method, with one major difference: the constructor's name is always the same as the class name. The class in the example above is named Person, so the constructor will also have to be named Person. The constructor also accepts a parameter, the name of the person object to be created. The parameter is enclosed in parentheses and follows the constructor's name. The parentheses that contain zero or more parameters are followed by a *code block*, as usual delimited by curly brackets. In between these brackets is the source code that the program executes when the constructor is called (e.g., `new Person ("Ada")`).

Objects are always created using a constructor.
A few things to note: the constructor contains the expression `this.age = 0`. This expression sets the instance variable `age` of the newly created object (i.e., "this" object's age) to 0. The second expression `this.name = initialName` likewise assigns the string passed as a parameter to the instance variable `name` of the object created.

<text-box variant='hint' name='Default Constructor'>

If the programmer does not define a constructor for a class, Java automatically creates a default one for it. A default constructor is a constructor that doesn't do anything apart from creating the object. The object's variables remain uninitialized (generally, the value of any object references will be `null`, meaning that they do not point to anything, and the values of primitives will be `0`)

</text-box>

## Methods

### Standard objects

For objects of standard Java classes, you can find the available methods in the [Java Documentation](https://docs.oracle.com/en/java/javase/11/docs/api/) of the API.
It is very important and convenient to familiarize yourself with the Java Javadoc Documentation, as it tells you a lot of details of what you can do with the
built-in classes of Java.
Once you visit the documentation, a list of all public classes is presented on the left. If you choose the `String` class, you can scroll down to the Method Summary, where all methods of the String class are described.
For instance, the methods length(), toLowerCase(), toUpperCase(), charAt(), split() and replaceAll() are mentioned here.

<text-box name="Short keys" variant="hint">
    
If you place your cursor on the word `String` at the definition of a String object and press <kbd>Ctrl</kbd> + <kbd>Q</kbd> on Windows or <kbd>Cmd</kbd> + <kbd>J</kbd> on Mac, you get the Javadoc documentation of the class.
You can find the full source code of the class by pressing <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>i</kbd> on Windows or <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>i</kbd> on Mac.

</text-box>
    
    
## Objects and references

<Exercise title="Values vs References">

### Values

Determine (without using the computer) what will be printed by the following program:

```java
int a = 5;
int b = a;
b += 5;
System.out.println(a);
```

<Solution>

The output is `5`. Since variables `a` and `b` hold separate values, the adjustment of
`b`'s value is not visible via variable `a`.

</Solution>

<br />

### References

Determine (without using the computer) what will be printed by the following program:

```java
ArrayList<Integer> a = new ArrayList<>();
a.add(5);
ArrayList<Integer> b = a;
b.add(10);
System.out.println(a);
```

<Solution>

The output is `[5, 10]`

The reason for this is that both `a` and `b` hold a reference to the same object, and thus `b.add(10)` is performed with the same object `a` refers to.
This is discussed in more detail below.

</Solution>

</Exercise>

In Java, variables that do not actually hold objects, merely hold a **reference** to the object, which is a location of the object within the computer's memory. When a variable contains the memory location of an object, it _refers_ to that object.
For instance, in the code in the exercise above, the two variables `a` and `b` refer to the same `ArrayList` object.


Since they refer to the same object, an adjustment performed via reference `b` is also visible via reference `a`, such that now `[5, 10]` will be printed.
This shows a clear distinction between primitive and non-primitive variables. Object variables are non-primitive and hold references. Primitive variables, however, store data, not references. In the following example, the two variables _a_ and _b_ can thus be adjusted separately without impacting each other.

In the image below, you can see how the memory processes the storage and adaption of the statements in the code above:

<img width="527" alt="The image shows variables a and b both pointing to the same ArrayList. The arraylist has a size of 2 and has to spaces with pointers in them, which each point to an Integer object. The Integer objects contain the values 5 and 10." src="https://user-images.githubusercontent.com/67587903/129902561-bc38d276-c000-4205-a297-ea462b95359b.PNG">

If an object does not refer to anything at all, the object reference has the special value `null`.
Another used reference is `this`. This reference is used by methods to refer to the object that the method is called on.
If you need refreshment on these two special object references, please have a look at the Introduction to Programming matter of [week 5](https://feb21011.ese.eur.nl/week-5/5-objects-and-references).

### Static versus Non-Static

Static methods are _not_ invoked on objects and are general. As a consequence, the `this` keyword does not exist for these methods, because the method performed is not acting on an object.
All differences between static and non-static methods can be explained from the single fact that no implicit or explicit `this` is available within the scope of the method.

When we call a non-static method (sometimes called *instance* methods), we always call it on an object and within the method the object that the method operates on can be accessed via the `this` keyword.
A static method can only make use of an instance variable via references passed as arguments to the method.
Static variables can be accessed from anywhere, since a static variable belongs to a class and is a single global variable, whereas each object of a class has its own copies of the instance variables of that class.
    
    
<Exercise title="Test your knowledge">

In this quiz, you can test your knowledge on the subjects covered in this chapter. 

What is the difference between private and public variables?

<Solution>

The keyword private means that the variables are "hidden" inside the object, which is known as encapsulation.
Public variables, on the other hand, are exposed as public to other programmers, whereas the internals should be hidden away from other programmers and kept private.
In general, instance variables are almost always kept private, as providing access to them via methods provides more flexibility to change something at a later point in time.
    
</Solution>    

    
Can you give an example of a variable that references to an object? And also a variable that does not?

<Solution>

```java
List<Integer> myList = new ArrayList<>();
myList.add(23);
int number = myList.get(0);
```

Here, the first value of the list references to an `Integer` object that on its turn holds the value 23.
The `number` variable is an example of a variable that actually holds the value.
    
</Solution>    


Say that you have a `Dog` class and want each dog to take certain behavior, such as barking. Assume that you do not want to let every dog bark. 
You make a `bark()` method. Should this be a **static** or a **non-static** method?

<Solution>

The bark method will be called on certain dogs, so we want to be able to call the method on an object. This means that we should make the `bark()` method non-static. Now, the method can be accessed via the `this` keyword.
    
</Solution> 
    
</Exercise>
