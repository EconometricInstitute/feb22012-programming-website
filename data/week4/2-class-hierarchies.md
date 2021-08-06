---
path: "/week4/2-class-hierarchies"
title: 'Class hierarchies'
hidden: false
---

<text-box variant='learningObjectives' name='Learning Objectives'>

 - You know why class hierarchies can provide you with better understanding of inheritance.
 - You know how to read a class hierarchy diagram and what the different shapes mean.
 - You know how the Exceptions class hierarchy can be divided in checked and unchecked exceptions.

</text-box>

In your own small projects, you may end up with a few classes which use inheritance, but often not more than a few. However, many useful libraries, which you are likely to end up using, make extensive use of it. Often these libraries have a lot of classes, which can be daunting to the uninitiated, but with a diagram it is often easy to understand the structure of these libraries. For example, when you create Graphical User Interfaces (GUIs). 

In these diagrams, we follow the following conventions:

<img width="759" alt="week4-classhierarchies-conventions1" src="https://user-images.githubusercontent.com/67587903/128322543-447d0abd-831d-43c4-91b4-3fdef2a050d1.PNG">

Thus, a class is depicted as a rectangle, an abstract class as a parallelogram, and an interface as a rhombus.

<img width="471" alt="week4-classhierarchies-conventions2" src="https://user-images.githubusercontent.com/67587903/128322544-828b4d41-320f-44f1-8230-aeb8c7d89b07.PNG">

Also, an arrow depicts the superclass/subclass or supertype/subtype relationship by pointing towards the superclass or supertype.
Note that the superclass in the picture is an abstract class, whilst the subclass is a class.

We will now consider one class hierarchies from the standard library: the Exception class hierarchy. We hope that this will give you even more insight on the exceptions we learned about last week.

<img width="789" alt="classhierarchy example" src="https://user-images.githubusercontent.com/67587903/128322542-70b1c15f-76cc-4004-8817-cb790e80f9c0.PNG">

NB. Please note that you do *not* have to learn the upper hierarchy diagram by heart.

*Unchecked exceptions* (those we do not need to catch) are either subclasses of `Error` or `RuntimeException`. These have a green background in our picture. 
All other exceptions must be caught and are called *checked exceptions*. These have a blue background in our picture.

The answer on whether an exception must be caught or may be caught can thus be found by looking at the Exception hierarchy. *Unchecked Exceptions* do not have to be caught and are either a subclass of `Error` or `RuntimeException`. All other exceptions are *Checked Exceptions* and must be caught.
You can even create your own exception types by writing `public class MyException extends IllegalArgumentException {...}`. If you want it to be unchecked, you put them underneath the `RuntimeException` in the Exception class hierarchy, and otherwise, in case of a checked exception, you let it be a subclass of `Exception`, but not of `RuntimeException`.
