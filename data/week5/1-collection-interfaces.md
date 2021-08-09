---
path: '/week5/1-collection-interfaces'
title: 'Collection interfaces'
hidden: false
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You know what an Iterable object is for.
- You can use an Iterable object.
- You know that the Collection interface extends the Iterable interface.

</text-box>

## Collections
To store much data and be able to retrieve it efficiently, Java implements several data structure. We already know some of them, such as the `ArrayList` and the array. The `ArrayList` is part of the `List` interface. The `List` interface implements more sorts of lists. Also, the `Set` interface and `Map` interface are part of the `Collection` interface. To navigate through all these data structures, the `Collection` implements the `Iterable` interface. We will cover all these interfaces in the next section.

### Iterable interface
The interface `Iterable<E>` are all types that we can use the **enhanced for-loop** on.
It specifies only one method: `public Iterator<E> iterator()`. 
An iterator is able to indicate whether there are any elements left to iterate on (with `hasNext()`) and to produce the next element with `next()`)
When we work with a collection of data containing a bunch of objects, it is often useful to do something _for each_ object.
The enhanced for-loop should be preferred in such cases. It will use the most efficient way to iterate over a collection.

Let us first obtain an `Iterable` from a `List`:
```java
List<Integer> numbers = Arrays.asList(24, 36, 48);
Iterable<Integer> iterable = numbers;
``` 

You can use an `Iterable` in various equivalent ways, for instance in a while loop:
```java
Iterator<Integer> iter = iterable.iterator();
while (iter.hasNext()) {
  Integer i = iter.next();
  System.out.println(i);
}
```

Or in a regular for-loop:
```java
for (Iterator<Integer> iter = iterable.iterator(); iter.hasNext();) {
  Integer i = iter.next();
  System.out.println(i);
}
```

Or when iterating in a enhanced for loop, also known as a for each loop:
```java
for (Integer i : iterable) {
  System.out.println(i);
}
```

## Collection interface
The `Collection<E>` interface extends `Iterable<E>` so we can use the enhanced for loop on any `Collection`.
On top of that, it defines a number of methods:

- public boolean add(E arg0);
- public boolean addAll(Collection<? extends E> arg0);
- public void clear();
- public boolean contains(Object arg0)
- public boolean containsAll(Collection<?> arg0);
- public boolean isEmpty();
- public boolean remove(Object arg0);
- public boolean removeAll(Collection<?> arg0);
- public boolean retainAll(Collection<?> arg0);
- public int size();

The names of these methods are very descriptive. For most of the methods the boolean returned indicates whether the collection changed.

In the following sections, the following collections will be covered: 
- Lists and Queues
- Sets: HashSets and TreeSets
- Maps
- Utilities

