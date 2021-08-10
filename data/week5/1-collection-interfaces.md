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

### Collections class
The `Collections` class contains a number of really useful static methods. This is similar to the many useful static methods in the `Math` class.

Some useful methods for List types:
- public static &lt;T extends Comparable&lt;? super T&gt;&gt; void sort(List&lt;T&gt; list)
- public static &lt;T&gt; void sort(List&lt;T&gt; list, Comparator&lt;? super T&gt; c)
- public static void reverse(List&lt;?&gt; list)
- public static void shuffle(List&lt;?&gt; list, Random rnd)

If we want to obtain some statistics:
- public static &lt;T&gt; T max(Collection&lt;? extends T&gt; coll, Comparator&lt;? super T&gt; comp)
- public static &lt;T&gt; T min(Collection&lt;? extends T&gt; coll, Comparator&lt;? super T&gt; comp)
- public static int frequency(Collection&lt;?&gt; c, Object o)

If we want to return a version of a `List`, `Set` or `Map` that cannot be modified (and we don’t want to copy it)
• public static &lt;T&gt; Set&lt;T&gt; unmodifiableSet(Set&lt;? extends T&gt; s)
• public static &lt;T&gt; List&lt;T&gt; unmodifiableList(List&lt;? extends T&gt; list)
• public static &lt;K,V&gt; Map&lt;K,V&gt; unmodifiableMap(Map&lt;? extends K, ? extends V&gt; m)

In the following sections, the following data structure will be introduced: 
- Lists and Queues
- Sets: HashSets and TreeSets
- Maps: HashMaps and TreeMaps
