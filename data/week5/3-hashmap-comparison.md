---
path: "/week5/3-hashmap-comparison"
title: "Approximate comparison with hashmap"
hidden: false
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You'll revise object equivalence comparison using the equals method.
- You'll know what the hashCode method does.
- You'll know how approximate equalities of objects can be compared.
- You'll know how to use the programming environment's ready-made tools to create equals and hashCode methods.

</text-box>

## Approximate Comparison With HashMap

In addition to `equals`, the `hashCode` method can also be used for **approximate comparison of objects**. The method creates from the object a "hash code", i.e, a number, that tells a bit about the object's content. If two objects have the same hash value, they may be equal. On the other hand, if two objects have different hash values, they are certainly unequal.

Hash codes are used in HashMaps, for instance. HashMap's internal behavior is based on the fact that key-value pairs are stored in an array of lists based on the key's hash value. Each array index points to a list. The hash value identifies the array index, whereby the list located at the array index is traversed. The value associated with the key will be returned if, and only if, the exact same value is found in the list (equality comparison is done using the equals method). This way, the search only needs to consider a fraction of the keys stored in the hash map.

So far, we've only used String and Integer-type objects as HashMap keys, which have conveniently had ready-made `hashCode` methods implemented. Let's create an example where this is not the case: we'll continue with the books and keep track of the books that are on loan. We'll implement the book keeping with a HashMap. The key is the book and the value attached to the book is a string that tells the borrower's name:

```java
HashMap<Book, String> borrowers = new HashMap<>();

Book bookObject = new Book("Book Object", 2000, "...");
borrowers.put(bookObject, "Pekka");
borrowers.put(new Book("Test Driven Development", 1999, "..."), "Arto");

System.out.println(borrowers.get(bookObject));
System.out.println(borrowers.get(new Book("Book Object", 2000, "...")));
System.out.println(borrowers.get(new Book("Test Driven Development", 1999, "...")));
```

<sample-output>

Pekka
null
null

</sample-output>

We find the borrower when searching for the same object that was given as a key to the hash map's `put` method. However, when searching by the exact same book but with a different object, a borrower isn't found, and we get the _null_ reference instead. The reason lies in the default implementation of the `hashCode` method in the `Object` class. The default implementation creates a `hashCode` value based on the object's reference, which means that books having the same content that are nonetheless different objects get different results from the hashCode method. As such, the object is not being searched for in the right place.

For the HashMap to work in the way we want it to, that is, to return the borrower when given an object with the correct _content_ (not necessarily the same object as the original key), the class that the key belongs to must overwrite the `hashCode` method in addition to the `equals` method. The method must be overwritten so that it gives the same numerical result for all objects with the same content. Also, some objects with different contents may get the same result from the hashCode method. However, with the HashMap's performance in mind, it is essential that objects with different contents get the same hash value as rarely as possible.

We've previously used `String` objects as HashMap keys, so we can deduce that the `String` class has a well-functioning `hashCode` implementation of its own. We'll _delegate_, i.e., transfer the computational responsibility to the `String` object.

```java
public int hashCode() {
    return this.name.hashCode();
}
```

The above solution is quite good. However, if `name` is _null_, we see a `NullPointerException` error. Let's fix this by defining a condition: if the value of the `name` variable is _null_, we'll return the year of publication as the hash value.

```java
public int hashCode() {
    if (this.name == null) {
        return this.published;
    }

    return this.name.hashCode();
}
```

Now, all of the books that share a name are bundled into one group. Let's improve it further so that the year of publication is also taken into account in the hash value calculation that's based on the book title.

```java
public int hashCode() {
    if (this.name == null) {
        return this.published;
    }

    return this.published + this.name.hashCode();
}
```

It's now possible to use the book as the hash map's key. This way the problem we faced earlier gets solved and the book borrowers are found:

```java
HashMap<Book, String> borrowers = new HashMap<>();

Book bookObject = new Book("Book Object", 2000, "...");
borrowers.put(bookObject, "Pekka");
borrowers.put(new Book("Test Driven Development",1999, "..."), "Arto");

System.out.println(borrowers.get(bookObject));
System.out.println(borrowers.get(new Book("Book Object", 2000, "...")));
System.out.println(borrowers.get(new Book("Test Driven Development", 1999)));
```

Output:

<sample-output>

Pekka
Pekka
Arto

</sample-output>

**Let's review the ideas once more:** for a class to be used as a HashMap's key, we need to define for it:

- the `equals` method, so that all equal or approximately equal objects cause the comparison to return true and all false for all the rest
- the `hashCode` method, so that as few objects as possible end up with the same hash value

<programming-exercise name='Same date' tmcname='part08-Part08_11.SameDate'>

The exercise template contains a class `SimpleDate`, which defines a date object based on a given day, month, and year. In this exercise you will expand the SimpleDate class with an equals method, which can tell if the dates are exactly the same.

Create a method `public boolean equals(Object object)` for the `SimpleDate` class, which returns true if the date of the object passed to the method as a parameter is the same as the date of the object used to call the method.

The method should work as follows:

<!-- ```java
Paivays p = new Paivays(1, 2, 2000);
System.out.println(p.equals("heh"));
System.out.println(p.equals(new Paivays(5, 2, 2012)));
System.out.println(p.equals(new Paivays(1, 2, 2000)));
``` -->

```java
SimpleDate d = new SimpleDate(1, 2, 2000);
System.out.println(d.equals("heh"));
System.out.println(d.equals(new SimpleDate(5, 2, 2012)));
System.out.println(d.equals(new SimpleDate(1, 2, 2000)));
```

<sample-output>

false
false
true

</sample-output>

</programming-exercise>

<programming-exercise name='Hash for date' tmcname='part08-Part08_12.HashedDate'>

Let's expand the `SimpleDate` class from the previous exercise to also have its own `hashCode` method.

Create a method `public int hashCode()` for the `SimpleDate` class, which calculates a hash for the the SimpleDate object. Implement the calculation of the hash in way that there are as few similar hashes as possible between the years 1900 and 2100.

</programming-exercise>
