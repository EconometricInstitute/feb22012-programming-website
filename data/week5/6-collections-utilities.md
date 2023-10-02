---
path: '/week5/6-collections-utilities'
title: 'The Collections utility class'
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You are aware of the utility methods in the `Collections` class that can help you deal with `Collection` objects.

</text-box>

Before starting this last paragraph, let us first test our knowledge of what we have learned so far.

<Exercise title="Test your knowledge">

In this quiz, you can test your knowledge on the subjects covered in this chapter.

What is the difference between a `List` and a `Set` object?

<Solution>

In a `List`, we store items in an order, and preserve the order. We can iterate through the list by index. In a `Set`, however, we also store items, but without keeping track of any order.
Another difference is that an item might occur twice in a `List`, but in a `Set` each item can occur at most once.

</Solution>

What is a `Map`?

<Solution>

A `Map` is a `Collection` interface that provides data structures to store pairs of things. Each pair has a **key** and a **value**. For each key, a certain value is stored. This means that each key may occur only once, as otherwise it would not be clear which key the program should return the value of.
The values, on the other hand, may occur multiple times, as different keys can hold the same value.
The most commonly used `Map` is the `HashMap`.

</Solution>

</Exercise>

### Collections class

Java contains a number of classes that provide handy, `static` utility methods. Examples of this you may have see before are
`Math`, using `Math.pow()` or `Math.sin()`, or `Arrays`, using `Arrays.toString()` to convert an array to a string you can
print conveniently.

`Collections` is a similar class with useful utility methods that can be used to deal with all kinds of `Collection` objects.

Some useful methods for `List` types:

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

There are also a number of useful methods for very basic statistics:

```java
public static <T> T max(Collection<? extends T> coll, Comparator<? super T> comp)
public static <T> T min(Collection<? extends T> coll, Comparator<? super T> comp)
public static int frequency(Collection<?> c, Object o)
```

For both `min` and `max`, if the type `T` implements the `Comparable` interface, the `Comparator` doesn't have to be passed.

We can find the minimum or maximum value in any `Collection` (so this works for
both `Set` and `List` objects) according to an order specified by a given `Comparator`
with the `min` and `max` methods. The `frequency` method can be used to determine
how often a certain element appears in a `Collection`, which will work on a `Set`
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


<Exercise title="Test your knowledge">

In this quiz, you can test your knowledge on the subjects covered in this chapter.

What is the difference between the `Collection` and the `Collections` type?

<Solution>

`Collection` is an interface that is a subtype of the `Iterable` interface and super-type
of the `List` and `Set` interfaces. It has therefore a central role in the Collections
framework, and defines important methods such as `add`, `size`, `contains`, etcetera.

`Collections` is a utility class with *static* helper methods, very much like the `Math`
class. We thus never use the `Collections` type, but use it to compute the `min` or `max`
of an `Collection`.

</Solution>

---

Suppose you have a `Set<String> documents` and a `List<Integer> numbers`. You want to compute
the first and last documents from `documents` according to their alphabetical order, and the
smallest and greatest number in `numbers`. Can you do this without writing a loop yourself?

<Solution>

```java
String firstDocument = Collections.min(documents);
String lastDocument = Collections.max(documents);
Integer smallest = Collections.min(numbers);
Integer greatest = Collections.max(numbers);
```

</Solution>

---

Now that you have seen the different collection types, determine for each of the following use cases
which data structure (e.g. `LinkedList`, `ArrayList`, `HashSet`, `TreeSet`, `HashMap` or `TreeMap`)
you would prefer to use.

1. You have set of unique specimens, each with an unique numerical identifier. You want to be able to keep tracks of which specimens were involved in various experiments, but do not care about the order or frequency of occurrence. You also want to be able to access a subset from those specimens within a certain range of IDs.
2. There is an interface `EventType` with different classes implementing this interface. You want to keep track how often each `EventType` occurs during a simulation. There is no natural order of `EventType` objects available.
3. You need to analyze the history of `Product` objects that are viewed by a user of your store's website. The order of the products that were visited is important and you need to have quick access to products at various locations in the list.
4. You want to keep track of `Task` objects that represent work you still need to perform in a first-in first-out order. After a task is completed, you want to remove it, and when a new task comes up you want to add it.
5. You want to associate the names of different persons with those persons' phone numbers. Preferably, you want to have the persons' names in alphabetical order when you print them.
6. You write an algorithm that wants to visit all `Location` objects in a certain `Environment`. While exploring, you want to keep track of `Location` objects you have visited at least once. No natural order of `Location` objects is available.

<Solution>

1. Here, a `TreeSet<Integer>` or `TreeSet<Long>` could be appropriate, as these support selecting a sub-range of IDs. Furthermore, they keep only track of unique occurrences which is sufficient for this use case.
2. Here a `HashMap<EventType,Integer>` is appropriate. The event types are the keys, and the values correspond to the currently held counts. When a new event is observed, the count can be updated in the `HashMap`. A `TreeMap` is not appropriate since we can not easily get an order of the `EventType` objects.
3. Since order is important, we should use a `List<Product>`. In this particular case, the `ArrayList<Product>` is most appropriate, since quick access of elements at different indices is desired.
4. Since we want to maintain a first-in first-out order, and we only need to add and remove from the two ends, a `Deque` is appropriate. Thus, a `LinkedList<Task>` is the only option we can select.
5. To associate two types of objects, it makes sense to use a `Map`. In this case, a `Map<String,String>` is best to link names to phone numbers (which could contain non-numerical symbols). As we prefer to have the names of the persons (keys) in alphabetical order, it makes sense to work with a `TreeMap<String,String>`.
6. As we only need to keep track of visited location objects, we should use a `Set`. A `HashSet<Location>` is most appropriate. As we do not have an order available, it is more difficult to work with a `TreeSet<Location>`.

</Solution>

</Exercise>
