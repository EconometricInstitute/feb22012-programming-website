---
path: '/week7/5-other-languages'
title: 'Data visualization'
hidden: false
---

<hint>
 <h3> This subject will <b>not</b> be part of the exam, but you need it for the assignment! </h3>
</hint>

## C#
C# is (probably) the language most similar to Java. The type system and implementation of Object Oriented Programming concepts can be learned without much effort if you already know Java.
It has some additional features compared to Java, but these won’t be too hard to learn or are not strictly necessary to know.
However, some things are named differently:
- Instead of extends, you write a colon (i.e. `class MySubClass : MyClass` ).
- The enhanced for-loop uses the foreach keyword.
- A Map datatype is called a Dictionary in C#.

The Microsoft Visual Studio Community Edition is free for students. An Open-Source alternative, Mono, also exists (but it usually a bit behind
the Microsoft version and doesn’t have the Microsoft GUI library).

## C
C is not an object oriented language, but code involving computations with only if statemtents and for loops that work with numeric values is syntactically similar to Java.
You have things called structs which allows you to define a type which is a bundle of variables.
Instead of methods that operate on objects, you can write functions in C that take a struct as a first argument (i.e. an explicit this) and do some object-based programming that way.
However, you don’t have inheritance and overridden methods.
Learning some C is probably not very difficult when you know Java, but you will have to learn how pointers work in C. (Related to references)

## C++
C++ is an Object Oriented Language, which adds a lot of features on top of C. Many C programs will compile in C++ as well (but not all).
C++ is even more verbose than Java but allows more precise control over memory. Some people see it as the holy grail of writing highperformance applications (but Java and C# come close for many applications).
It has no Garbage Collection, so you have to think for yourself when you want to clean up your objects. You have both constructors and destructors that you need to call with new and delete.
Classes are often separated over two files, header files (.h) defining the public interface and source code files (.c, .cpp).

- C++ has no _generics_ but templates which are more powerful and likely harder to master.
- C++ has no _cosmic super-class_ like Object.
- C++ has more keywords than Java with more fine-grained meanings and control opportunities.
- C++ allows for multiple inheritance, so a class can have multiple superclasses.
- C++ allows for operator overloading, so you can define what it means to add two of your objects using the + operator.

You will probably have to read a book to learn it, but knowing Java should help you to understand concepts a lot quicker.

## Python
Python is more of a scripting language (but compilers exist).
It has syntax a lot more powerful and elegant than MATLAB. Volunteers have created free modules that mimic a lot of MATLAB functionality (e.g. numpy, scipy, matplotlib).
Python also has Object Oriented Programming features such as inheritance.
The `this` reference, called `self`, is always passed explicitly to methods of a class, which takes some getting used to.
It is weakly typed, so your IDE and Compiler can’t help you and check as much as when working in Java, C#, C++, C.
It is free, but can be hard to set up all modules in Windows or on Mac (a lot easier on Linux). You can install distribution that contains many useful modules like [Anaconda](https://www.continuum.io/).

## R
R is becoming more and more popular as a scripting language for statistical analysis.
As far as I know it has no support for “real” Object Oriented Programming (i.e. inheritance and the like).
There are lots of modules available for all kinds of specialized statistical analysis algorithms, and these modules can be installed easily.
The language itself is quite old and does not have a very nice syntax compared to modern standards. It can be quirky.
It focuses around working with data frames, which can be regarded as matrices with labeled columns and rows. Reading and writing data from and to csv files or Excel or even SPSS is not very difficult.
Get it for free at: [r-project](https://www.r-project.org/)

## Databases: SQL
Relational Databases are very common in all companies that store at least some data.
Almost all websites use Database systems such as MySQL or PostgreSQL. More commercial variants are Databases sold by Oracle or Microsoft.
Getting data in and out of databases is often done with the Standard Query Language: SQL
```sql
SELECT * FROM grades WHERE student.erna = ‘123456ab’;
SELECT AVG(grade) FROM grades GROUP BY student.erna;
```
It is very likely that you will need to get some data from a database at some point in your career, so it can be worthwhile to learn some SQL.

## Programming on the web
A number of key-technologies
- Hypertext Markup Language (HTML): this is mostly a data format,
indicating the structure of your document. Lots of tutorials online
- Cascading Style Sheets (CSS): used to define the design of web pages.
- Javascript (JS): scripting language used to add interaction to webpages.

Runs in the browser. Although the name suggests otherwise, it is a very different language from Java.
You need software called a web server to host webpages in HTML. These are often generated by programs, written in Java, PHP or other languages.
Databases are used to store user accounts, shopping baskets, orders, news articles, etc.
Security is a major concern when programming for the web.
