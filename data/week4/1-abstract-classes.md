---
path: "/week4/1-abstract-classes"
title: "Abstract Classes and Methods"
hidden: false
---

## Abstract classes
An important aspect of interfaces is that they allow us to define methods without an implementation. In certain cases we may also want to do this with classes. 
Sometimes, when planning a hierarchy of inheritance, there are cases when there exists a clear concept, but that concept is not a good candidate for an object in itself. The concept would be beneficial from the point of view of inheritance, since it includes variables and functionality that are shared by all the classes that would inherit it. On the other hand, you should not be able to create instances of the concept itself.
This leads to a problem: if we allow methods without a body, the class is not finished. In that case it is problematic to use objects of the class.

A solution for this is to write an abstract class. In an abstract class it is allowed to define methods without writing their body (with the purpose of letting subclasses provide the implementation).
An abstract class combines interfaces and inheritance. You cannot create instances of them -- you can only create instances of subclasses of an abstract class. They can include normal methods which have a method body, but it's also possible to define abstract methods that only contain the method definition. Implementing the abstract methods is the responsibility of subclasses. Generally, abstract classes are used in situations where the concept that the class represents is not a clear independent concept. In such a case you shouldn't be able to create instances of it.

To define an abstract class or an abstract method the keyword `abstract` is used. An abstract class is defined with the phrase `public abstract class *NameOfClass*`; an abstract method is defined by `public abstract returnType nameOfMethod`. Let's take a look at the following abstract class called `Operation`, which offers a structure for operations and executing them. A `final abstract class` is not allowed, since it will never be finished.

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
