---
path: '/week3/3-overriding-methods'
title: 'Overriding Methods'
hidden: false
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You are familiar with the concepts of a method parameter, a method's return value, and a program's call stack.
- You know how to create methods and how to call them from both the main program (the `main` method) and from inside other methods.
- You can create parameterized and non-parameterized methods, and you can create methods that return a value.

</text-box>

## Methods of a superclass
Sometimes it is useful to redefine the body of one or more methods of the superclass.

```java
public class SimpleFunction {
    public double compute(double x) {
        return;
    }
    public double findClosestToZero(double lb, double ub, double step) {
        double best = lb;
        double bestVal = Math.abs(compute(lb));
        for (double cur = lb; cur <= ub; cur += step) {
            if (val < bestVal) {
                best = cur;
                bestVal = val;
            }
        }
    return best;
    }
}

public class Polynomial extends SimpleFunction {
    private double[] factors;
    public Polynomial(doublep[ coefficients) {
        super();
        factors = coefficients;
    }
    
    @Override
    public double compute(double x) {
        double result = 0;
        for (int d = 0; d < factors.length; d++) {
            result += factors[d] * Math.pow(x,d);
        }
        return result;
    }
}
```

The version of `compute` which is executed depends on the **type of the object**, not on the type of the variable which contains the reference to the object.
For instance if we would run this:
```java
SimpleFunction f1 = new SimpleFunction();
System.out.println(f1.compute(2));

double[] coeffs = {2,3,1};
Polynomial f2 = New Polynomial(coeffs);
System.out.println(f2.compute(2));

SimpleFunction f3 = f2;
System.out.println(f3.compute(2));
```

<sample-output>
2.0
12.0
12.0
</sample-output>

When we override a method, we redefine the body of a method. Sometimes it is useful to call the original method in the overriden method, using the reference `super`. For example, if we want to create a subclass of `ArrayList` where we print a value as soon as it is added to the list by a call to `.add()`.

```java
public class LoggerList extends ArrayList<Double> {
    public LoggerList() {
        super();
    }
    
    @Override
    public boolean add(Double d) {
        System.out.println("Adding " + d);
        boolean result = super.add(d);
        return result;
    }
}
```

Apart from overriding the method of a subclass, we can redefine a method of a super-class in the same way as we write a regular method. We should also add the `@Override` annotation so the compiler can check whether we are really redefining some method.
Which implementation of a method is executed, depends on the type of object, not on the type of variable referring to it.
We can forbid a method to be overridden by subclasses with the `final` keyword in the header, for example: `public final void doSomething() { ... }`.

## Object: the cosmic superclass
In case we do not define a superclass in our class header, a class will still extend `Object`. As a result, every class in Java is a subclass of Object. Therefore, it is also known as `The Cosmic Superclass`.
A number of methods is defined in the Object class. Some of those are outside the scope of this course, such as `clone()`, `finalize()`, `getClass()`, `notify()`, `notifyAll()`, and `wait()`. That leaves us with three methods that we will cover: `toString()`, `equals()`, and `hashCode()`. Here, we will only cover the first. The other two will be covered next week.

### toString() method
If we print an arbitrary object, like `System.out.println(anyObject);`, the compiler mostly prints the name of the class, the @ symbol and the current memory address, like this: `ClassName@23df3521`. This is due to the default implementation of the toString() method in the Object class.
Therefore, it is very useful to override the `toString()` method if we want to print objects of the class we are creating. The printing method, namely, automatically concenates the Object to a String and calls the `toString()` method automatically.

## Two more keywords: protected and instanceof
### protected
Before, we have seen the `public` and `private` keywords. Methods and variables that are `public` can be called and accessed from anywhere. Methods and variables that are `private`, however, can only be called and accessed from within the same class (or java file).

Now, we introduce the `protected` keyword. Methods and variables that are `protected`, can not only be called and accessed from within the same class definitions, but also from within its subclass definitions. Also, they can be called and accessed from within the same package, but in our assignments we do not use packages, so all our classes are in the same package. For instance, `ArrayList` is in the `java.util` package, so we cannot acces `protected` variables and methods of an `ArrayList`, unless we create a subclass of it.

### instanceof
Consider the example where we are casting non-primitive types:
```java
DefivatifeFunction df = new SineFunction(1000);
SineFunction sf = (SineFunction) df;
```

In the above example it is safe to do this, because we know for sure that `df` is of type `SineFunction`. However, if we do not know what kind of `DerivativeFunction` is used, we will get a `ClassCastException` if `df` is not a `SineFunction`.
We can use the `instanceof` keyword to check whether it is safe to cast a supertype to a subtype, like this:
```java
public void doSomething(DerivativeFunction df) {
    if (df instanceof SineFunction) {
        SineFunction sf = (SineFunction) df;
        // Do something with sf here
    }
    else {
        // Do something else
    }
}
```

Typically, it is preferred to use inheritance and method overloading to prevent having to do these kind of type checks, but in some cases it can be very useful.
