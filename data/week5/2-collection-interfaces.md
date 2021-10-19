---
path: '/week5/2-collection-interfaces'
title: 'Collection interfaces'
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You know what an Iterable object is for.
- You can use an Iterable object.
- You know that the Collection interface extends the Iterable interface.

</text-box>

## Collections
A very important application of computer programs is to manipulate, analyze and process a lot of data.
In an Object Oriented language, the data is often converted to objects, for example an object per
transaction in a financial dataset, one object per observation in a scientific experiment, or
one object per product in a retailer's databased.
To store many of such objects while being able to retrieve them efficiently,
Java implements several data structures. We already know some of them, such as the
`ArrayList` and the array. The `ArrayList` implements the `List` interface.
`ArrayList` is the most commonly used implementation of the `List`, but there are others.
The `List` interface is a subtype of the `Collection` interface, and the `Collection`
interface itself is a subtype of the `Iterable` interface.

Also, the `Set` interface and `Map` interface are part of the `Collection` interface. To navigate through all these data structures, the `Collection` implements the `Iterable` interface. We will cover all these interfaces in the next section.

### Iterable interface
The interface `Iterable<T>` are all types that we can use the **enhanced for-loop** on.
It specifies only one method: `public Iterator<T> iterator()`.
An iterator is able to indicate whether there are any elements left to iterate on (with `hasNext()`) and to produce the next element (with `next()`)
When we work with a collection of data containing a bunch of objects, it is often useful to do something _for each_ object.
The enhanced for-loop should be preferred in such cases. It will use the most efficient way to iterate over a collection.

Let us first obtain an `Iterable` from a `List`:
```java
List<Integer> numbers = Arrays.asList(24, 36, 48);
Iterable<Integer> iterable = numbers;
```

You can use an `Iterable` in various equivalent ways, the preferred way being the
for-each loop:

```java
for (Integer i : iterable) {
  System.out.println(i);
}
```

It is helpful to realize that the for-each loop is just more efficient syntax to
iterate over an iterator. You could do this with slightly longer code as well,
for example using a while loop:
```java
Iterator<Integer> iter = iterable.iterator();
while (iter.hasNext()) {
  Integer i = iter.next();
  System.out.println(i);
}
```

You can use a regular for-loop as well, where you leave the increment part of the
for empty:
```java
for (Iterator<Integer> iter = iterable.iterator(); iter.hasNext();) {
  Integer i = iter.next();
  System.out.println(i);
}
```

<text-box variant='hint' name='Difference between Iterable and Iterator'>

Since the names of the `Iterator` and `Iterable` interfaces are so similar,
learners often struggle with the difference. However, the names are quite
inuitive. In English, the word *Iterator*  means *something that can
perform iteration*, whereas *Iterable* means something that can be iterated.

One possible analogy is *water* and a *faucet*. Water can flow, and thus
we can say that *water* is *flowable*. When we open a *faucet*, the water
starts flowing. However, a *faucet* itself is not something that can flow.

With `Iterable`, it is similar: it is a thing that can produce some number
of objects. Often these objects come from some container, such as a list.
The object that performs the iteration, i.e. keeps track of which objects
have been seen and which ones are still to come, is an `Iterator`.

</text-box>

## Collection interface

As mentioned before, it is often used to store a large number of objects
that represent some kind of data: *transactions*, *products*, *observations*,
and many other things. In Java, the `Collection` interface can be used to
indicate that something holds zero or more objects. It does not define
any properties yet on how these objects are organized: they could be
sequentially stored, as happens in a list or array, but they might also
be stored in different ways.

The Collection interface describes functionality related to these collections.
The two main subtypes of the collection interface are `Set` and `List`.
The `Collection` interface provides, for instance, methods for adding
objects to the collection (`add`), adding all elements from another `Collection`
(`addAll`), for checking
the existence of an item (the method `contains`) and determining the size of a collection (the method `size`).

The `Collection<E>` interface extends `Iterable<E>` so we can use the *enhanced for-loop* on any `Collection`.
On top of that, it defines a number of methods:

```java
boolean add(E arg0);
boolean addAll(Collection<? extends E> arg0);
void clear();
boolean contains(Object arg0)
boolean containsAll(Collection<?> arg0);
boolean isEmpty();
boolean remove(Object arg0);
boolean removeAll(Collection<?> arg0);
boolean retainAll(Collection<?> arg0);
int size();
```

The names of these methods are very descriptive. For most of the methods the boolean returned indicates whether the collection changed.

You may wonder why many of the methods, such as `add` and `remove` return a boolean. Often, the returned value
of these methods is ignored. It is quite common to write `myList.add("Hello!");` ignoring the fact that a
boolean is returned. This boolean indicates wheter something has changed in collections. If we add something to a `List`,
this will always happen, but as we will see a bit later, this may not be the case for a `Set`. Furthermore, removing an
object from a `List` may result in the `List` being unchanged if it turns out the given object was not present in the `List`
to begin with. If you find it handy to determine if your `Collection` has changed as a result of these calls, it can be
useful to use the boolean value that is returned, but in most cases you will be fine ignoring the boolean.

In the following sections, the following data structure will be introduced that are or can provide subtypes of the `Collection`
interface:

- Lists and Queues
- Sets: HashSets and TreeSets
- Maps: HashMaps and TreeMaps
