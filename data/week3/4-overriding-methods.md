---
path: '/week3/4-overriding-methods'
title: 'Overriding Methods'
ready: true
hidden: false
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You understand that within subclasses, a methods implementation can be overriden by a new implementation
- You know that the behavior of a overridden method of a superclass can be accessed via the `super` keyword
- You know that the `final` keyword forbids that a method can be overridden in subclasses
- You know how an object's executed method is determined, and you are familiar with the concept of polymorphism.

</text-box>

## Methods of a superclass
Sometimes it is useful to redefine the body of one or more methods of the superclass.
This can be done by creating a method with the same signature in the subclass. If we
want to redefine what a method does, it is good practice to add the
`@Override` annotation to such a method: in case there is a typo method name or
a mistake in the arguments, the compiler will warn that the method is not
overriding something. This is very helpful, because these are often very nasty
types of mistakes to debug.

Consider the following example, where we have an elementary algorithm
that we can use to numerical perform root-finding for continuous functions where
a certain range is sweeped with a certain step size to find the input for the
`compute` method that yields an output as close to zero as possible.
Since the `findClostestToZero` calls this `compute` function, it is interesting
to change the behavior of `compute` in a subclass in order to find roots for
functions other than `y = x`.

```java
// Contents of SimpleFunction.java
public class SimpleFunction {

    public double compute(double x) {
        return x;
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

// Contents of Polynomial.java
public class Polynomial extends SimpleFunction {

    private double[] factors;

    public Polynomial(double[] coefficients) {
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

the following output would be printed:

<sample-output>
2.0
12.0
12.0
</sample-output>

When we override a method, we redefine the body of a method. Sometimes it is useful to call the original method in the overriden method,
using the reference `super`. For example, if we want to create a subclass of `ArrayList` where we print a value as soon as it is added
to the list by a call to `.add()`.

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

Apart from overriding the method of a subclass, we can redefine a method of a super-class in the same way as we write a regular method.
Which implementation of a method is executed, depends on the type of object, not on the type of variable referring to it.

It is possible to forbid that a method can be overridden in subclasses by adding the `final` keyword to the method header,
for example: `public final void doSomething() { ... }`.

<Exercise title="Test your knowledge">

In this quiz, you can test your knowledge on the subjects covered in this chapter.

Why should you put the `@Override` annotation above an overriden class?

<Solution>

It is good practice to add the `@Override` annotation to such a method: in case there is a typo method name or a mistake in the arguments, the compiler will warn that the method is not overriding something. This is very helpful, because these are often very nasty types of mistakes to debug.
    
</Solution>

What does overriding a method do?

<Solution>

The ability of a subclass to override a method allows a class to inherit from a superclass whose behavior is "close enough" and then to modify behavior as needed. The overriding method has the same name, number and type of parameters, and return type as the method that it overrides.

</Solution>

Can your classes use all methods of a superclass?

<Solution>

Yes, they can; this can be very useful!
    
</Solution>

</Exercise>
