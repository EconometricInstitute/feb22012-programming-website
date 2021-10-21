---
path: '/week7/4-packages'
title: 'More on packages'
hidden: false
extra: true
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You know what packages are and can place classes in them

- You know what the `import` statement used in Java is composed of

</text-box>

As the number of classes implemented for the program grows, remembering all the functionality and methods becomes more difficult. What helps is naming the classes in a sensible manner and planning them so that each class has one clear responsibility. In addition to these measures, it's wise to divide the classes into packages. Classes in one package might share funcionality, purpose, or some other logical property.

Packages are practically directories in which the source code files are organised.

IDEs offer existing tools for package management. Up until this point, we have only created classes and interfaces in the default package of the Source Packages folder of the project. You can create a new package in NetBeans by right-clicking on the Source Packages section (which contains the project's packages), and then selecting *New -&gt; Java Package...*.

You can create classes inside a package in the same way you can in the default package. Below we create the class `Program` in the newly created package `library`.

The package of a class (the package in which the class is stored) is noted at the beginning of the source code file with the statement `package *name-of-package*;`. Below, the class Program is in the package `library`.

```java
package library;

public class Program {

    public static void main(String[] args) {
        System.out.println("Hello packageworld!");
    }
}
```

Every package, including the default package, may contain other packages. For instance, in the package definition `package library.domain` the package `domain` is inside the package `library`. The word `domain` is often used to refer to the storage space of the classes that represent the concepts of the problem domain. For example, the class `Book` could be inside the package `library.domain`, since it represents a concept in the library application.

```java
package library.domain;

public class Book {
    private String name;

    public Book(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }
}
```

A class can access classes inside a package by using the `import` statement. The class `Book` in the package `library.domain` is made available for use with the statement `import library.domain.Book;`. The import statements that are used to import classes are placed in the source code file after the package definition.

```java
package library;

import library.domain.Book;

public class Program {

    public static void main(String[] args) {
        Book book = new Book("the ABCs of packages!");
        System.out.println("Hello packageworld: " + book.getName());
    }
}
```

<sample-output>

Hello packageworld: the ABCs of packages!

</sample-output>

From this point on, *nearly all* of the exercises will use packages. Let's begin by creating our first very own packages.

## Directory structure in a file system
Every project you see in NetBeans is in your computer's [file system](https://en.wikipedia.org/wiki/File_system) or on a centralized server.
The project directory `src/main/java` contains the source code files of the program. If the package of a class is library, that class is stored inside the `src/main/java/libary` folder of the source code directory. You can also check the concrete project structure in NetBeans in the **Files** tab, which is normally next to the **Project** tab. If you cannot see the **Files** tab, you can make it appear by choosing the option **Files** from the dropdown menu **Window**.

Application development is normally done in the **Projects** tab, where NetBeans hides unimportant files from the programmer.

## Packages and access modifiers
Until now, we've used two access modifiers. The modifier `private` is used to define variables (and methods) that are only visible inside the class where they are defined. They cannot be used from outside that class. The methods and variables defined with `public`, on the other hand, are available for everyone to use.

```java
package library.ui;

public class UserInterface {
    private Scanner scanner;

    public UserInterface(Scanner scanner) {
        this.scanner = scanner;
    }

    public void start() {
        printTitle();

        // other functionality
    }

    private void printTitle() {
        System.out.println("***********");
        System.out.println("* LIBRARY *");
        System.out.println("***********");
    }
}
```

If you create an object of the `UserInterface` class above, its constructor and `start` method are callable from anywhere in the program. The method `printTitle` and the variable `scanner` are available only from within the class.

If the access modifier is missing, the methods and variables are only visible inside the same package. We call this the default or package modifier. Let's change the example above so that the method `printTitle` has package access modifier.

```java
package library.ui;

public class UserInterface {
    private Scanner scanner;

    public UserInterface(Scanner scanner) {
        this.scanner = scanner;
    }

    public void start() {
        printTitle();

        // other functionality
    }

    void printTitle() {
        System.out.println("***********");
        System.out.println("* LIBRARY *");
        System.out.println("***********");
    }
}
```

Now the classes inside the same package -- i.e., the classes inside the package `library.ui` -- can use the method `printTitle`.

```java
package library.ui;

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        UserInterface ui = new UserInterface(scanner);

        ui.printTitle(); // works!
    }
}
```

If a class is in a different package, the method `printTitle` cannot be called. In the example below, the class `Main` is in the package `library`. As the `printTitle` method is in the package `library.ui` and has the package access modifier, it cannot be used.

```java
package library;

import java.util.Scanner;
import library.ui.UserInterface;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        UserInterface ui = new UserInterface(scanner);

        ui.printTitle(); // doesn't work!
    }
}
```

## A larger example: flight control
Let's take a look at a program that offers a text UI for adding and examining airplanes and flights. The user interface of the program looks like this.

<sample-output>

Airport Asset Control
--------------------

Choose an action:
[1] Add an airplane
[2] Add a flight
[x] Exit Airport Asset Control
&gt; **1**
Give the airplane id: **HA-LOL**
Give the airplane capacity: **42**
Choose an action:
[1] Add an airplane
[2] Add a flight
[x] Exit Airport Asset Control
&gt; **1**
Give the airplane id: **G-OWAC**
Give the airplane capacity: **101**
Choose an action:
[1] Add an airplane
[2] Add a flight
[x] Exit Airport Asset Control
&gt; **2**
Give the airplane id: **HA-LOL**
Give the departure airport id: **HEL**
Give the target airport id: **BAL**
Choose an action:
[1] Add an airplane
[2] Add a flight
[x] Exit Airport Asset Control
&gt; **2**
Give the airplane id: **G-OWAC**
Give the departure airport id: **JFK**
Give the target airport id: **BAL**
Choose an action:
[1] Add an airplane
[2] Add a flight
[x] Exit Airport Asset Control
&gt; **2**
Give the airplane id: **HA-LOL**
Give the departure airport id: **BAL**
Give the target airport id: **HEL**
Choose an action:
[1] Add an airplane
[2] Add a flight
[x] Exit Airport Asset Control
&gt; **x**

Flight Control
------------

Choose an action:
[1] Print airplanes
[2] Print flights
[3] Print airplane details
[x] Quit
&gt; **1**
G-OWAC (101 capacity)
HA-LOL (42 capacity)
Choose an action:
[1] Print airplanes
[2] Print flights
[3] Print airplane details
[x] Quit
&gt; **2**
HA-LOL (42 passengers) (HEL-BAL)
HA-LOL (42 passengers) (BAL-HEL)
G-OWAC (101 passengers) (JFK-BAL)

Choose an action:
[1] Print airplanes
[2] Print flights
[3] Print airplane details
[x] Quit
&gt; **3**
Give the airplane id: **G-OWAC**
G-OWAC (101 capacity)

Choose an action:
[1] Print airplanes
[2] Print flights
[3] Print airplane details
[x] Quit
&gt; **x**

</sample-output>

There are many concepts of the problem domain in the program, and the essential ones are `Airplane` and `Flight`. Each flight also involves a `Place` (places of departure and destination). In addition to the concepts that represent the problem domain, the program also contains a text UI and a class through which the text UI uses the concepts.

The package structure of the program could look like the following (for example):

- `flightControl` - includes the main program class that is needed to start the program

- `flightControl.domain` - includes the classes that represent concepts of the problem domain: `Airplane`, `Flight`, and `Place`

- `flightControl.logic` - includes the functionality that is used to control the application

- `flightControl.ui` - includes the textual user interface

In the next subchapter, we list one possible organization for the operation of the program (excluding the main program class).

## Classes that represent concepts of the problem domain
The classes that represent concepts of the problem domain are often placed inside a package called `domain`. Since the entirety of the application is inside the package `flightControl`, let's place the package `domain` inside the package `flightControl`. Concepts of the problem domain are represented by the classes `Place`, `Airplane`, and `Flight`.

```java
package flightControl.domain;

public class Place {

    private String ID;

    public Place(String ID) {
        this.ID = ID;
    }

    @Override
    public String toString() {
        return this.ID;
    }
}
```

```java
package flightControl.domain;

public class Airplane {

    private String id;
    private int capacity;

    public Airplane(String id, int capacity) {
        this.id = id;
        this.capacity = capacity;
    }

    public String getID() {
        return this.id;
    }

    public int getCapacity() {
        return this.capacity;
    }

    @Override
    public String toString() {
        return this.id + " (" + this.capacity + " capacity)";
    }
}
```



```java
package flightControl.domain;
public class Flight {

    private Airplane airplane;
    private Place departureAirport;
    private Place targetAirport;

    public Flight(Airplane airplane, Place departureAirport, Place targetAirport) {
        this.airplane = airplane;
        this.departureAirport = departureAirport;
        this.targetAirport = targetAirport;
    }

    public Airplane getAirplane() {
        return this.airplane;
    }

    public Place getDeparturePlace() {
        return this.departureAirport;
    }

    public Place getTargetPlace() {
        return this.targetAirport;
    }

    @Override
    public String toString() {
        return this.airplane.toString() + " (" + this.departureAirport + "-" + this.targetAirport + ")";
    }
}

```

### Application logic
The application logic is typically kept separate from the classes that represents concepts of the problem domain. In our example, the application logic is stored in the package `logic`. Application logic includes the functionality to add airplanes and flights, and to list them.

```java
package flightControl.logic;

import java.util.Collection;
import flightControl.domain.Flight;
import flightControl.domain.Airplane;
import java.util.HashMap;
import java.util.Map;
import flightControl.domain.Place;

public class FlightControl {

    private HashMap<String, Airplane> airplanes = new HashMap<>();
    private HashMap<String, Flight> flights = new HashMap<>();
    private Map<String, Place> places;

    public FlightControl() {
        this.flights = new HashMap<>();
        this.airplanes = new HashMap<>();
        this.places = new HashMap<>();
    }

    public void addAirplane(String ID, int capacity) {
        Airplane plane = new Airplane(ID, capacity);
        this.airplanes.put(ID, plane);
    }

    public void addFlight(Airplane plane, String departureID, String destinationID) {
        this.places.putIfAbsent(departureID, new Place(departureID));
        this.places.putIfAbsent(destinationID, new Place(destinationID));

        Flight flight = new Flight(plane, this.places.get(departureID), this.places.get(destinationID));
        this.flights.put(flight.toString(), flight);
    }

    public Collection<Airplane> getAirplanes() {
        return this.airplanes.values();
    }

    public Collection<Flight> getFlights() {
        return this.flights.values();
    }

    public Airplane getAirplane(String ID) {
        return this.airplanes.get(ID);
    }
}

```

### Text user interface
The user interface is separate from the application logic and the classes that represent the problem domain. In this example, the user interface is stored in the package `ui`.

```java
package flightControl.ui;

import flightControl.domain.Flight;
import flightControl.domain.Airplane;
import java.util.Scanner;
import flightControl.logic.FlightControl;

public class TextUI {

    private FlightControl flightControl;
    private Scanner scanner;

    public TextUI(FlightControl flightControl, Scanner scanner) {
        this.flightControl = flightControl;
        this.scanner = scanner;
    }

    public void start() {
        // let's start in two parts -- first start the asset control,
        // then the flight control
        startAssetControl();
        System.out.println();
        startFlightControl();
        System.out.println();
    }

    private void startAssetControl() {
        System.out.println("Airport Asset Control");
        System.out.println("--------------------");
        System.out.println();

        while (true) {
            System.out.println("Choose an action:");
            System.out.println("[1] Add an airplane");
            System.out.println("[2] Add a flight");
            System.out.println("[x] Exit Airport Asset Control");

            System.out.print("> ");
            String answer = scanner.nextLine();

            if (answer.equals("1")) {
                addAirplane(scanner);
            } else if (answer.equals("2")) {
                addFlight(scanner);
            } else if (answer.equals("x")) {
                break;
            }
        }
    }

    private void addAirplane() {
        System.out.print("Give the airplane id: ");
        String id = scanner.nextLine();
        System.out.print("Give the airplane capacity: ");
        int capacity = Integer.parseInt(scanner.nextLine());

        this.flightControl.addAirplane(id, capacity);
    }

    private void addFlight() {
        System.out.print("Give the airplane id: ");
        Airplane airplane = askForAirplane(scanner);
        System.out.print("Give the departure airport id: ");
        String departureID = scanner.nextLine();
        System.out.print("Give the target airport id: ");
        String destinationID = scanner.nextLine();

        this.flightControl.addFlight(airplane, departureID, destinationID);
    }

    private void startFlightControl() {
        System.out.println("Flight Control");
        System.out.println("------------");
        System.out.println();

        while (true) {
            System.out.println("Choose an action:");
            System.out.println("[1] Print airplanes");
            System.out.println("[2] Print flights");
            System.out.println("[3] Print airplane details");
            System.out.println("[x] Quit");

            System.out.print("> ");
            String answer = scanner.nextLine();
            if (answer.equals("1")) {
                printAirplanes();
            } else if (answer.equals("2")) {
                printFlights();
            } else if (answer.equals("3")) {
                printAirplaneDetails();
            } else if (answer.equals("x")) {
                break;
            }
        }
    }

    private void printAirplanes() {
        for (Airplane plane : flightControl.getAirplanes()) {
            System.out.println(plane);
        }
    }

    private void printFlights() {
        for (Flight flight : flightControl.getFlights()) {
            System.out.println(flight);
            System.out.println("");
        }
    }

    private void printAirplaneDetails() {
        System.out.print("Give the airplane id: ");
        Airplane plane = askForAirplane();
        System.out.println(plane);
        System.out.println();
    }

    private Airplane askForAirplane() {
        Airplane airplane = null;
        while (airplane == null) {
            String id = scanner.nextLine();
            airplane = flightControl.getAirplane(id);

            if (airplane == null) {
                System.out.println("No airplane with the id " + id + ".");
            }
        }

        return airplane;
    }
}
```
