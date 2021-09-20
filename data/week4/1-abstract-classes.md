---
path: "/week4/1-abstract-classes"
title: "Abstract Classes"
hidden: false
ready: true
---

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
For example, you would write  `public abstract class MyAbstractClass` as the class headaer. This then
allows you to to use the `abstract` keyword in method headers for which you do not want to provide
an implementation. For example the method header `public abstract ReturnType nameOfMethod();`, would
for subclasses to implement a method called `nameOfMethod` similar to when it would implement and interface.

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
}
```

The abstract class `Operation` works as a basis for implementing different actions. For instance, you can implement the plus operation by extending the `Operation` class in the following manner.

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

            executeOperation(choice);
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

    private void executeOperation(String choice) {
        int operation = Integer.valueOf(choice);

        Operation chosen = this.operations.get(operation - 1);
        chosen.execute(scanner);
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

Operations:
        0: Stop
        1: PlusOperation
Choice: **1**
First number: **8**
Second number: **12**
The sum of the numbers is 20

Operations:
        0: Stop
        1: PlusOperation
Choice: **0**

</sample-output>

The greatest difference between interfaces and abstract classes is that abstract classes can contain object variables and constructors in addition to methods. Since you can also define functionality in abstract classes, you can use them to define e.g. default behavior. In the user interface above storing the name of the operation used the functionality defined in the abstract `Operation` class.

<text-box variant='hint' name='Abstract Classes and Constructors'>

Since you are not allowed to instantiate abstract classes directly (e.g. no `new MyAbstractClass()`),
you might think that abstract classes do not have constructors. However, they can and do have
constructors. The purpose of this is that these constructors should be called in the constructor
of a subclass. You could already see this in the `Operation` class introduced above, which
specify a constructor that is called in the subclass `PlusOperation`.

</text-box>
