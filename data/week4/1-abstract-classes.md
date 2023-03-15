---
path: "/week4/1-abstract-classes"
title: "Abstract Classes"
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You understand what an abstract class is.
- You know how to use, create and extend abstract classes.
- You know the difference between methods that are declared abstract and regular methods.
- You understand that abstract classes themselves cannot be instantiated.

</text-box>

The advantage of using interfaces is that we can define methods without an implementation,
for which then different classes can create different implementations of those methods,
easily allowing us to choose different types of behavior in simulations or other types
of software. The advantage of using class inheritance, is that we can reuse the implementation of
a super-class, such that we only have to add new methods that add new functions and behavior,
while the objects can still be used as the type of the superclass.

With an *abstract class* we can combine both advantages: we can define methods without an
implementation so that we are able to provide different implementations of those methods
in subclasses, but also define instance variables and methods with behavior that will be
shared among all subclasses. However, there is one catch: if a class has methods without
behavior, we are not allowed to instantiate objects of such classes, since they are not
finished - some of the methods that are defined can not be called since their behavior
is not implemented.

In an abstract class it is allowed to define methods without writing their body (with the purpose of letting subclasses provide the implementation).
An abstract class combines interfaces and inheritance. You cannot create instances of them -- you can only create instances of subclasses of an
abstract class. They can include normal methods which have a method body, but it's also possible to define abstract methods that only contain the
method definition. Implementing the abstract methods is the responsibility of subclasses.

To define an abstract class or an abstract method the keyword `abstract` is used in the class header.
For example, you would write  `public abstract class MyAbstractClass` as the class header. This then
allows you to to use the `abstract` keyword in method headers for which you do not want to provide
an implementation. For example the method header `public abstract ReturnType nameOfMethod();`, would
require subclasses to implement a method called `nameOfMethod`, similar to when it would implement an
interface requiring to implement a method.

Since an abstract class is designed to be finished in a subclass, a `final abstract class` is not allowed,
as forbidding subclasses of an abstract class would imply it can never be finished, and thus never used.

Let's take a look at the following abstract class called `Operation`, which offers a structure for operations
and executing them.

```java
public abstract class Operation {

    private String name;

    public Operation(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public abstract void execute(Scanner scanner);

    public void executeAndRepeat(Scanner scanner, int repetitions) {
        for (int i=0; i < repetitions; i++) {
            this.execute(scanner);
        }
    }
}
```

The abstract class `Operation` works as a basis for implementing different actions.

For instance, you can implement the plus operation by extending the `Operation` class in the following manner.

```java
public class PlusOperation extends Operation {

    public PlusOperation() {
        super("PlusOperation");
    }

    @Override
    public void execute(Scanner scanner) {
        System.out.print("First number: ");
        int first = Integer.valueOf(scanner.nextLine());
        System.out.print("Second number: ");
        int second = Integer.valueOf(scanner.nextLine());

        System.out.println("The sum of the numbers is " + (first + second));
    }
}
```

Since all the classes that inherit from `Operation` have also the type `Operation`, we can create a user interface by using `Operation` type variables. Next we'll show the class `UserInterface` that contains a list of operations and a scanner. It's possible to add operations to the UI dynamically.

```java
public class UserInterface {

    private Scanner scanner;
    private ArrayList<Operation> operations;

    public UserInterface(Scanner scanner) {
        this.scanner = scanner;
        this.operations = new ArrayList<>();
    }

    public void addOperation(Operation operation) {
        this.operations.add(operation);
    }

    public void start() {
        while (true) {
            printOperations();
            System.out.println("Choice: ");

            String choice = this.scanner.nextLine();
            if (choice.equals("0")) {
                break;
            }

            System.out.println("How often: ")
            String repetitions = this.scanner.nextLine();

            executeOperation(choice, repetitions);
            System.out.println();
        }
    }

    private void printOperations() {
        System.out.println("\t0: Stop");
        int i = 0;
        while (i < this.operations.size()) {
            String operationName = this.operations.get(i).getName();
            System.out.println("\t" + (i + 1) + ": " + operationName);
            i = i + 1;
        }
    }

    private void executeOperation(String choice, String repetitions) {
        int operation = Integer.valueOf(choice);
        int reps = Integer.valueOf(repetitions);

        Operation chosen = this.operations.get(operation - 1);
        chosen.executeAndRepeat(scanner, reps);
    }
}
```

The user interface works like this:

```java
UserInterface userInterface = new UserInterface(new Scanner(System.in));
userInterface.addOperation(new PlusOperation());

userInterface.start();
```

<sample-output>

```
Operations:
        0: Stop
        1: PlusOperation
Choice: **1**
How often: **1**
First number: **8**
Second number: **12**
The sum of the numbers is 20

Operations:
        0: Stop
        1: PlusOperation
Choice: **0**
```

</sample-output>

The greatest difference between interfaces and abstract classes is that abstract classes can contain object variables and constructors in addition to methods. Since you can also define functionality in abstract classes, you can use them to define e.g. default behavior. In the user interface above, storing the name of the operation used the functionality defined in the abstract `Operation` class.

<text-box variant='hint' name='Abstract Classes and Constructors'>

Since you are not allowed to instantiate abstract classes directly (e.g. no `new MyAbstractClass()`),
you might think that abstract classes do not have constructors. However, they can and do have
constructors. The purpose of this is that these constructors should be called in the constructor
of a subclass. You could already see this in the `Operation` class introduced above, which
specify a constructor that is called in the subclass `PlusOperation`.

The rules discussed for constructors in case of regular classes also apply to abstract classes.
The only difference is that the constructors of an abstract class cannot be called using the
`new` keyword in the same way as for regular classes. However, they typically do have to be
called by a constructor of a subclass.

</text-box>

<Exercise title="Test your knowledge">

In this quiz, you can test your knowledge on the subjects covered in this chapter.

Suppose someone has created an abstract class `MotorizedVehicle`. Is it possible
to obtain an object of this type `MotorizedVehicle`? If yes, what steps would be
needed?

<Solution>

It is not possible to directly instantiate an abstract class. In order to obtain
an object that also has type `MotorizedVehicle`, we need to create a non-abstract
subclass of `MotorizedVehicle`, implement all methods from `MotorizedVehicle` that
have no implementation, and then call a constructor of this subclass.

</Solution>

---

Determine whether the following statements are true or false, and why:

* Inside an abstract class you are not yet allowed to call methods that are abstract
* Abstract classes can have constructors
* We can use the `MotorizedVehicle mv = new MotorizedVehicle();` keyword to instantiate the abstract class `MotorizedVehicle`, as long as it has the proper constructor.
* Since abstract classes can not be instantiated, they can not be used as a type

<Solution>

*Inside an abstract class you are not yet allowed to call methods that are abstract*:
This is **false**. In the example on this page the `executeAndRepeat` method calls the
`execute` method in the same class.

*Abstract classes can have constructors*: This is **true**, abstract classes can have constructors

*We can use the `new` keyword to instantiate an abstract class, as long as the abstract class has a constructor.* This is **false**, the constructor
can not be used to instantiate `MotorizedVehicle` like this. Typically there should be some subclass, e.g. `public class Car extends MotorizedVehicle { ... }`
for which we can then do `MotorizedVehicle mv = new Car();`.

*Since abstract classes can not be instantiated, they can not be used as a type.* This is **false**. Abstract classes, like interfaces, can be used as
a type, for example in variable and parameter declaration, even though they can not be instantiated into objects directly.

</Solution>

</Exercise>
