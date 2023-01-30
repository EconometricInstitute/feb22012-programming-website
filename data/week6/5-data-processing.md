---
path: "/week6/5-data-processing-pipelines"
title: "Data Processing Pipelines"
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

 - You understand there are common patterns in how data in a dataset can be processed
 - You understand that for many of those patterns, a pipeline is a useful way to look at data processing

</text-box>

## A common pattern
The following method contains a common pattern in data processing:

```java
public class StreamExamples {
    private List<Course> courses;
    // Constructor
    public List<String> getNamesAfterYear(int year) {
        List<String> result = new ArrayList<>();
        for (Course c : courses) {
            if (c.getCourseYear() >= year) {
                result.add(c.getCourseName());
            }
        }
        return result;
    }
}
```

Note that the `NamesAfterYear` method accepts a year and looks at all `Course` objects current stored in the list `courses`. If the year a course takes places is greater our equal to the `year` provided as input, the name of the course is extracted and added to the output list.

There are two common concepts in this method. First, we *select* or *filter* only the elements of the list that are interesting according to some rule, i.e. whether the year of the course is greater or equal to a given year. Second, we *transform* our `Course` data into `String` data by retrieving the name of the course from the `Course` objects.

Before, we discussed a number of *functional interfaces* that were introduced together with the *lambda expressions*. Do you recall them? If not, have a look at the table that was provided to refresh your memory.

Let us first consider the concept of *selecting* or *filtering* data. Here, for each element in the source data set, we want to determine if they should be included in the output data according to some *condition*. Do you know which functional interface would be best suited to model the task of checking whether a condition holds or not?

The functional interface that is useful in this context is called `Predicate<T>`. A predicate has a method `boolean test(T arg)` that accepts an argument of type `T` and outputs a boolean whether a property or condition of that input is true or false. In our case, we can generalize our method to accept a `Predicate` to check which `Course` objects to include, rather than a year. This gives the following code:

```java
public List<String> getNamesConditional(Predicate<Course> p) {
    List<String> result = new ArrayList<>();
    for (Course c : courses) {
        if (p.test(c)) {
            result.add(c.getCourseName());
        }
    }
    return result;
}
```

and we can rewrite our `namesAfterYear` method by writing the condition as the lambda expression `c -> c.getCourseYear() >= year`. In full, this becomes:

```java
public List<String> getNamesAfterYear(int year) {
    return getNamesConditional(c -> c.getCourseYear() >= year);
}
```

Next we consider the concept of *transforming* the `Course` objects to data we want to store in the data list. In the example, `Course` objects are transformed to `String` objects by calling the `getCourseName` method of the `Course` class. Can you guess which functional interface from the table is most suited to represent the task of transforming one type of data to another type of data?

The functional interface that is useful in this context is called `Function<T,R>`. A function has a method `R apply(T arg)` that accepts an object of type `T` and transforms it to an object of type `R`. In our case, we are transforming a `Course` object to a `String` object by calling the `getCourseName` method from the `Course` class. We can generalize our `getNamesConditional` method to work with different transformations by using a `Function<Course,String>` object as follows:

```java
public List<String> transformToString(Function<Course,String> f, Predicate<Course> p) {
    List<String> result = new ArrayList<>();
    for (Course c : courses) {
        if (p.test(c)) {
            String ans = f.apply(c);
            result.add(ans);
        }
    }
    return result;
}
```

and we can rewrite our `namesAfterYear` method by providing the condition as a `Predicate<Course>` object, and use a method reference to `getCourseName` to construct the `Function` object.

```java
public List<String> getNamesAfterYear(int year) {
    Function<Course,String> f = Course::getCourseName;
    Predicate<Course> p = c -> c.getCourseYear() >= year;
    return transformToString(f, p);
}
```

Note that the output type is now `List<String>`. But we may want to transform `Course` objects to `Integer` (using the `getCourseYear()` method) or `Double` (using the `getEcts()` method). We can make our `transformToString` method even more general by defining a method specific type variable `E` for the output type. Both the `Function` and the method itself should have this type `E` as their output. This results in the following method:

```java
public <E> List<E> transform(Function<Course,E> f, Predicate<Course> p) {
    List<E> result = new ArrayList<>();
    for (Course c : courses) {
        if (p.test(c)) {
            E ans = f.apply(c);
            result.add(ans);
        }
    }
    return result;
}
```

We can rewrite the `getNamesAfterYear` method as follows:
```java
public List<String> getNamesAfterYear4(int year) {
    return transform(Course::getCourseName, c -> c.getCourseYear() >= year);
}
```

While it may seem cumbersome to split up our original method into two methods, our `transform` method makes it rather easy to extract different data out of our list of `Course` objects. Two examples are:

```java
public List<String> getTeacherNamesInYear(int year) {
    return transform(Course::getTeacher, c -> c.getCourseYear() == year);
}

public List<Double> getECTSForTeacher(String teacherName) {
    return transform(Course::getEcts, c -> c.getTeacher().equals(teacherName));
}
```

The first of these methods computes a list of the names of teachers of courses that take place in a given year. The second method computes a list of course ECTS for courses taught by a particular teacher. Thanks to the generality of the `transform` method, we can *declaratively* write queries on our data set of courses, rather than having to write an explicit imperative program with `for` and `each`.

As we have seen, using lambda expressions and method references allow us to write queries on a list of data in a more declarative and more concise way. However, we still implemented the transform method by our self. One of the main innovations that was introduced in Java 8, the Stream API, can help us to avoid writing our own `transform` method and many variants of it for similar but slightly different patterns.

## A data processing pipeline
An alternative way to think about the `transform` method we developed in Listing [\[lst:transform\]][1] is to visualize it as a data processing *pipeline*. Through this data pipeline, we have the *source* list `courses`, which can emit its `Course` objects into the pipeline. The first step these objects hit in the pipeline is a *filter* unit that removes any `Course` objects that only lets objects flow through it if they adhere to a given condition, removing any objects from the flow that fail to meet the condition. After the filter unit, there is a *transform* unit that takes `Course` objects that flow into it through the pipeline, and transforms them into some other kind of object of a generic type `E`. Finally, there is a *terminal unit* at the end of the pipeline, that takes any objects of type `E` that reach it, and puts them in a `List<E>`. Thus, this *terminal unit* has the task of assembling the final output. In the figure below, you can see a visual representation of this pipeline:

<img width="593" alt="In the figure, the visual representation shows four stadia. The first is the Source List, that points to the second, which says Filter. The Filter points to Transform and Transform points to Output list." src="https://user-images.githubusercontent.com/67587903/129425492-74770591-9e7c-44cc-83c7-0c81034ae125.PNG">

When we think about data processing pipelines, it is useful to think about three categories of units that make up the pipeline. At the beginning of the pipeline, there is a **data source** that is able to emit data objects that flow through the pipeline. After the data source, the data objects flow through a sequence of **intermediate operations**, that can perform various tasks: filter out data objects based on some condition, transform data objects into different data objects, shut down the flow of data objects after a certain number of objects have passed through it and many other tasks. At the end of the pipeline, there is a single **terminal operation** that consumes all objects flowing through the pipeline and does something with them: store them in a data structure such as a `List` or `Set`, compute some aggregate statistic based on them such as a sum or maximum value, or perform a task for each object that flows out of the pipeline.

In Java 8, the `Stream` API was introduced that allows us to define data processing pipelines such as the one visualized in the figure above. When we want to implement data processing tasks that fit the paradigm of the pipeline well, this `API` enables you to write very concise code, that typically leaves little room for accidental programming mistakes. It often holds that if your code compiles, it behaves as intended.

The concept of data processing pipelines has proven to be quite popular since the advent of the *Big Data* hype.
Traditional procedural implementations of data processing methods require programmers to write statement like: for each element in the list, check if some condition holds, then call some method on it, if that succeeds put it in an output list.
However, if the data is distributed over a number of different computers or if we want to perform the data processing in a parallel fashion, it often requires a lot of work to convert the procedural approach to the new setting.
If we think about data processing in terms of a pipeline, we do not need to define how all steps are precisely executed, but only what should happen in each of the processing units of the pipeline.
This *declarative* way of thinking has a major advantage: when we want to execute the pipeline in a distributed or parallel fashion, we only need to think if the different steps in our pipeline support this.
We can leave the actual execution of the steps in the pipeline to the library that implements the `Stream` API, whether it is applied to a standard data structure, executed in a parallel fashion or perform on many computers connected to each other via a network.

<Exercise title="Test your knowledge">

In this quiz, you can test your knowledge on the subjects covered in this chapter.

In a imperative coding style, we write instructions to the computer in steps that state *do this*, then *do that*, *repeat that* etcetera. In a declarative coding style, we aim to write programs that state *what we want to achieve*.

Think of two possible advantages of a declarative coding style. Also think of at least one possible disadvantage of a declarative coding style.

<Solution>

A (non-exhaustive) list of possible advantages are:

* Declarative programs are often shorter
* Declarative programs are often easier to read and understand
* Declarative programs can reduce the amount of code we need to write for common tasks
* Using declarative programs we can more easily rely on the expertise, effort and optimization of existing frameworks (such as parallel or distributed computing)

A (non-exhaustive) list of possible disadvantages are:

* Declarative programs require that you give up control over what the computer does exactly
* Declarative programs require that you understand how to write code such that the used framework understand it
* Declarative programs may more easily result in logical errors if you make wrong assumptions about the meaning of the code you write
* Declarative programs are a different style which you have to learn, and you could also just write thousands of lines of code using the concepts you already know

</Solution>

---

Which elements are important for a typical data-processing pipeline?

<Solution>

For a typical data processing pipeline, you want a **data source**, that provides the data you are interested in,
an optional number of **intermediate operations** that can transform and filter the data while the data flows
through the pipeline, and finally a **terminal operation** that extracts the data through the pipeline and
constructs the final result of the data processing operation.

</Solution>

</Exercise>
