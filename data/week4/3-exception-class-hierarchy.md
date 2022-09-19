---
path: "/week4/3-exception-class-hierarchy"
title: 'The Exception Class Hierarchy'
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

 - You know why class hierarchies can provide you with better understanding of inheritance.
 - You know how to read a class hierarchy diagram and what the different shapes mean.
 - You know how the Exceptions class hierarchy can be divided in checked and unchecked exceptions.

</text-box>

In your own small projects, you may end up with a few classes which use inheritance, but often not more than a few.
However, many useful libraries, which you are likely to end up using, make extensive use of it. Often these libraries
have a lot of classes, which can be daunting to the uninitiated, but with a diagram it is often easy to understand
the structure of these libraries. For example, when you create Graphical User Interfaces (GUIs) there are different
classes that represent component (e.g. a button, a text field) and containers that contain multiple components but
are also containers themselves. They also contain classes that allow you to specify the layout of components, and
classes that help specify actions, that can for example be used if a user clicks a button.

Understanding such hierarchies of classes, a *class hierarchy diagram* provides insight into the structure of
a library you are using. In these diagrams, we follow the following conventions:

<img width="759" alt="a class is depicted as a rectangle, an abstract class as a parallelogram, and an interface as a rhombus." src="https://user-images.githubusercontent.com/67587903/128322543-447d0abd-831d-43c4-91b4-3fdef2a050d1.PNG">

<img width="471" alt="Also, an arrow depicts the superclass/subclass or supertype/subtype relationship by pointing towards the superclass or supertype." src="https://user-images.githubusercontent.com/67587903/128322544-828b4d41-320f-44f1-8230-aeb8c7d89b07.PNG">

Note that the superclass has the form of a rhombus and is thus an abstract class here, whilst the subclass has the form of a rectangle and is therefore a regular class.

We will now consider one class hierarchies from the standard library: the Exception class hierarchy. We hope that this will give you even more insight on the exceptions we learned about last week.

<img width="789" alt="The picture gives an overview of the relations between different sorts of exceptions and errors. These have also been described in the text." src="https://user-images.githubusercontent.com/67587903/128322542-70b1c15f-76cc-4004-8817-cb790e80f9c0.PNG">

*Unchecked exceptions* (those we do not need to catch) are either subclasses of `Error` or `RuntimeException`. These have a green background in our picture.
All other exceptions must be caught and are called *checked exceptions*. These have a blue background in our picture.

The answer on whether an exception must be caught or may be caught can thus be found by looking at the Exception hierarchy. *Unchecked Exceptions* do not have to be caught and are either a subclass of `Error` or `RuntimeException`. All other exceptions are *Checked Exceptions* and must be caught.
You can even create your own exception types by writing `public class MyException extends IllegalArgumentException {...}`. If you want it to be unchecked, you put them underneath the `RuntimeException` in the Exception class hierarchy, and otherwise, in case of a checked exception, you let it be a subclass of `Exception`, but not of `RuntimeException`.

**NB.** Please note that you do *not* have to learn the upper hierarchy diagram by heart. You can always figure out these relationship from the *reference* that is provided during the exam. You do need to remember that *unchecked* exceptions are all types that are subtypes of `Error` and `RuntimeException`, and you should be able to figure out the rest using the `extends` relationships listed in the *reference*.

<Exercise title="Test your knowledge">

In this quiz, you can test your knowledge on the subjects covered in this chapter.

How do you determine if a particular exception is a *checked* or an *unchecked* exception?

<Solution>

If the class of the exception is a sub-class of `Error` or a sub-class of `RuntimeException` it is an *unchecked* exception. If that is not the case, it is a *checked* exception.

</Solution>

---

When we call `readLine()` on a `BufferedReader`, we are required to handle a potential `IOException`. When we call `.get(index)` on a `List`, we are not required to handle a
potential `IndexOutOfBoundsException`. Explain why this is the case.

<Solution>

As `IndexOutOfBoundsException` is a subclass of `RuntimeException`, it is an *unchecked* exception and thus we are not required to handle it. As `IOException` is a direct
subclass of `Exception` and does not have `RuntimeException` or `Error` as it's super class, it is a *checked* exception and thus we have to handle it.

</Solution>

---

Under what circumstances should you use a `catch` block to handle an exception, and under what circumstances should you propagate it to the caller with a `throws` clause in
the method header? Are there circumstances where you want to do both?

<Solution>

This is discussed in earlier materials. Generally, we prefer to *throw early* and *catch late*. That means that we should only use a `catch` block if we have a good way
to handle an Exception. As using a `catch` block means that the exception is not propagated to the caller of the method, the caller will not know that something went
wrong. If this information would be relevant for the caller, we should thus prefer to propagate to the caller. If there is a good solution to solve the problem in the
current method, a `catch` block should be used.

We never should use both approaches for the same type of exception. The only case when it is appropriate for a method to both propagate exception to the caller and use
a catch block, is if one type of exception can occur that can be handle appropriately in the method, and another type of exception can occur that should be propagated
to the caller.

</Solution>

</Exercise>
