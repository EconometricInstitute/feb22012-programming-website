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

2.0
12.0
12.0


