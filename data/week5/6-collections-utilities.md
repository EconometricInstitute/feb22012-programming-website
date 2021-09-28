---
path: '/week5/6-collections-utilities'
title: 'Collection interfaces'
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You are aware of the utility methods in the `Collections` class that can help you deal with `Collection` objects

</text-box>

### Collections class

Java contains a number of classes that provide handy, `static` utility methods. Example of this you may have see before are
`Math`, using `Math.pow()` or `Math.sin()`, or `Arrays`, using `Arrays.toString()` to convert an array to a string you can
print conveniently.

There is a similar class with useful utility methods that can be used to deal with all kinds of `Collection` objects.

Some useful methods for List types:

```java
public static <T extends Comparable<? super T>> void sort(List<T> list)
public static <T> void sort(List<T> list, Comparator<? super T> c)
public static void reverse(List<?> list)
public static void shuffle(List<?> list, Random rnd)
```

The `sort` method has been discussed last week, and can be used to sort a `List`,
either by relying on the natural order of an object, or specifying a custom order
by providing a `Comparator` as a second argument. We can also reverse the order of
the list, or randomize the order of the elements by using a `Random` object with
the `shuffle` method, which randomizes the order like you would shuffle a deck of
cards.

The are also a number of useful methods for very basic statistics:

```java
public static <T> T max(Collection<? extends T> coll, Comparator<? super T> comp)
public static <T> T min(Collection<? extends T> coll, Comparator<? super T> comp)
public static int frequency(Collection<?> c, Object o)
```

We can find the minimum or maximum value in any `Collection` (so this works for
both `Set` and `List` objects) according to an order specified by a given `Comparator`
with the `min` and `max` methods. The `frequency` method can be used to determine
how often a certain element appeart in a `Collection`, which will work on a `Set`
and a `List`, even though a typical `Set` will contain an element at most once.

If we want to return a version of a `List`, `Set` or `Map` that cannot be modified (and we don’t want to copy it),
there are helper methods that wrap the `List`, `Set` or `Map` in a so-called *proxy* that will
throw an `Exception` as soon as you call any mutator method on it, but which can still be used
to read the data from the data structure.

```java
public static <T> Set<T> unmodifiableSet(Set<? extends T> s)
public static <T> List<T> unmodifiableList(List<? extends T> list)
public static <K,V> Map<K,V> unmodifiableMap(Map<? extends K, ? extends V> m)
```

With these methods, we have a very powerful and flexible toolkit to handle large collections
of objects.
