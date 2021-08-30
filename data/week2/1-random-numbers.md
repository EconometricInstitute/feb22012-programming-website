---
path: '/week2/1-random-numbers'
title: 'Random numbers'
hidden: false
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You know how to generate random numbers, and know some situations where random numbers are needed.

- You can use Java `Random` class to generate random numbers.

- You know what a seed is and how to use it.

</text-box>

## Randomness
In order to make encryption algorithms, machine learning, computer games and econometric simulations less predictable all require randomness.
It is hard to realize randomness on a computer, since a computer can't make decisions on its own: a computer works deterministically. But, we can model randomness using pseudo random numbers.
In Java, the most-used Pseudo Random Number (PRN) generator is a *Linear Congruential Generator*, following the recurrence relation of

<p>
X<sub>n+1</sub> = (a X<sub>n</sub> + c) mod m
</p>

<p> Where Java uses the constants multiplier a = 11, increment c = 25214903917 and modulus m = 2<sup>48</sup>. The starting number X<sub>0</sub> of a sequence is called a <b>seed</b>. The choices of a, c and m are made with the idea to have very long periods, so it takes a long time for the series to repeat itself. Also, it is meant to prevent the same sequence to occur twice, unless you pick the same seed. You can set a seed fixed, which will of course always generate the same sequence of numbers that appears to be randomly distributed. If you do not choose a seed, the seed will be based on some other source of randomness and a different sequence of numbers will be used every time you run your program. </p>

This PRN works well enough for this course, but suffers from serial correlation so that it is not the best PRN one could imagine. You will learn more on pseudo random numbers in the Simulation course (FEB22013(X)).

## Random class
Java offers the ready-made `Random` class for creating random numbers, which follows the linear congruential formula mentioned above. An instance of the Random class can be used as follows:

```java
import java.util.Random;

public class Raffle {
    public static void main(String[] args) {
        // Create Random object ladyLuck without a fixed seed
        Random ladyLuck = new Random();

        for (int i = 0; i < 10; i++) {
            // Draw and print a random number
            int randomNumber = ladyLuck.nextInt(10);
            System.out.println(randomNumber);
        }
    }
}
```

Above we create an instance of the `Random` class. It has `nextInt` method, which gets an integer as a parameter. The method returns a random number from the range `[0, integer)`. Please notice that the upper bound is not included.

The program output is not always the same, unless we would have created the Random ladyLuck using a seed, by `Random ladyLuck = new Random(233)` with 233 being the seed. Obviously, we did not set a seed here, so one possible output is the following:

<sample-output>

2
2
4
3
4
5
6
0
7
8

</sample-output>

We can use the `nextInt` method to create diverse randomness.
For example, we might need a program to give us a temperature between [-30,50].
We can do this by first creating a random number between 0 and 80 and then subtracting 30 from it.

```java
Random weatherMan = new Random();
int temperature = weatherMan.nextInt(81) - 30;
System.out.println(temperature);
```

## Random probabilities
A Random object can also be used to create random doubles. These can for example be used for calculating probabilities. Computers often simulate probabilities using doubles between [0,1].

The `nextDouble` method of the Random class creates random doubles.
Let's assume the weather follows these probabilities:

- There is 0.1 probability it rains (10%)
- There is 0.3 probability it snows (30%)
- There is 0.6 probability the sun shines (60%)

Let's create a weather forecast using these probabilities.

```java
import java.util.ArrayList;
import java.util.Random;

public class WeatherMan {
    private Random random;

    public WeatherMan() {
        this.random = new Random();
    }

    public String forecast() {
        // This gives a uniform random number in [0,1)
        double probability = this.random.nextDouble();

        // 0.1 is the 10% probability threshold
        if (probability <= 0.1) {
            return "It rains";
        // Using else if, 0.4 (0.1+0.3) gives the 30% probability threshold
        // based on the assumption that the uniform draw was above 0.1
        } else if (probability <= 0.4) {
            return "It snows";
        // The else gives us the 1-0.4 = 60% probability threshold
        } else {
            return "The sun shines";
        }
    }

    public int makeAForecast() {
        return (int) (4 * this.random.nextGaussian() - 3);
    }
}
```

The `makeAForecast` method is interesting in many ways. The `this.random.nextGaussian()` call is a regular method call. However, what is interesting is that this method of the `Random` class returns a normally distributed number. If you are curious about other random methods in Java, take a look at the methods of the [Random class](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Random.html), using Java Documentation!
In this method, we use explicit type casting to convert doubles to integers `(int)`. We can equally convert integers to doubles with `(double) integer`.

Let's now add a main which uses the `WeatherMan` class.

```java
// imports

public class Program {

    public static void main(String[] args) {
        WeatherMan forecaster = new WeatherMan();

        // save days of the week to a list
        ArrayList<String> days = new ArrayList<>();
        days.add("Mon");
        days.add("Tue");
        days.add("Wed");
        days.add("Thu");
        days.add("Fri");
        days.add("Sat");
        days.add("Sun");

        System.out.println("Next week's weather forecast:");

        for (String day : days) {
            String weatherForecast = forecaster.forecast();
            int temperatureForecast = forecaster.makeAForecast();

            System.out.println(day + ": " + weatherForecast + " "
                              + temperatureForecast + " degrees.");
        }
    }
}
```

The program output could be:

<sample-output>

Next week's weather forecast:

Mon: It snows 1 degrees.

Tue: It snows 1 degrees.

Wed: The sun shines -2 degrees.

Thu: The sun shines 0 degrees.

Fri: It snows -3 degrees.

Sat: It snows -3 degrees.

Sun: The sun shines -5 degrees

</sample-output>


<text-box variant='hint' name='On randomness of numbers'>

We can predict how computers work, because they slavishly execute any command we give them. Is a random number generated by a computer then really random?

Random numbers used by computer programs are typically pseudo random. They seem like random numbers, but in reality they follow some algorithmically created series of numbers.
Most of the time, pseudo random is good enough -- for example, the user will not notice any difference when YouTube random play is pseudo random.
On the other hand, if random numbers are used for scientific calculations, using a weak pseudo random number generator can lead to questionable results.
One example is IBM's  <a href="https://en.wikipedia.org/wiki/RANDU" target="_blank" norel>RANDU</a> which was used for a short while in the 1960s.
<br/>

Not all randomness in computer programs is pseudo random. Programs aiming for stronger randomness use, among other things, real life random phenomena to generate random numbers.
For example, space radiation or <a href="https://www.wired.com/2003/08/random/" target="_blank" norel>lava lamps</a> are thought to be random phenomena.

<br/>

You can read more about randomness from <a href="https://www.random.org/randomness/" target="_blank" norel>https://www.random.org/randomness/</a>.

</text-box>

Note that while the standard `Random` object of Java is good enough for this course, we will discuss how you can use pseudo random number generators with better statistical property at the end of the course, when we discuss the use of external libraries.
