---
path: '/week5/5-maps'
title: 'Sets and Maps'
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You are familiar with the `Map` interface and its important subtypes.
- You know how a `HashMap` and `TreeMap` works and when to use it.

</text-box>

## Maps

In this part, we will discuss the third main type of data structure
introduced in the Java Collections framework: the `Map`. Maps are
very useful and many languages, including Python, provide special
syntax to use them in an convenient and easy way. In this section
we first consider how `Map` work and are implemented in the
Collections framework, and then consider some practical examples
of how they can be used.

### Map&lt;K,V&gt; interface

Another very useful type of data structure is the `Map`. In other languages, it is sometimes called a *dictionary* or a *hash table*. Maps store **key-value pairs**.
The keys in a map are unique: the keys of a map form the **key set**. For every key in the key set, the map will contain an associated value. The values are not necessarily a set.
Maps have many uses. Some examples include:
- Counting how often a String occurs in a file (keys: `String`, values: `Integer`)
- Keep track of the reputation of a Player (keys: `Player`, values: `Double`)
- which line of text is contained in which files (keys: `String`, values: `List<File>`)

The interface `Map<K,V>` has two type parameters: one for the keys (K) and one for the values (V).
It does **not** extend `Collection<E>` because `Collection`s only hold values of a single type,
whereas the maps holds pairs of values where the keys are unique and thus form a *set*.

The interface `Map<K,V>` defines the following methods:

```java
boolean containsKey(Object key);
boolean containsValue(Object value);
V get(Object key);
V put(K key, V value);
V remove(Object key);
void putAll(Map<? extends K, ? extends V> m);
void clear();
Set<K> keySet();
int size();
boolean isEmpty();
```

In order to store or update a value associated with a particular key,
you call the `put` method. If there is already an associated value
with the particular key, the current value is replaced by the new
one (and the `put` method then returns the old value).

If you want to iterate over all *keys* of a `Map`, you can use the `keySet()` method
to obtain a `Set` and iterate over that set using a for-each loop.

If a value for a non-existing key is requested, the `get` method returns `null`.
This means you may have to be careful with values returned by `get` and perform
a *null-check* before using in case it is possible a `null` value is returned.

Here is an example of the use of a `Map`:
```java
Map<String,Integer> myMap = new HashMap<>() ;
myMap.put("hello", 5);
myMap.put("world", 3);
myMap.put("Java", 12);
myMap.put("world", 5);
myMap.remove("hello");

System.out.println(myMap.get("Java"));
System.out.println(myMap.get("other") == null);
System.out.println(myMap.containsKey("world"));
System.out.println(myMap);
```

will print the following (the order of key/value pairs in the last line can differ):

<sample-output>

12
true
true
{Java=12, world=5}

</sample-output>

### HashMap&lt;K,V&gt; class

A HashMap is, in addition to ArrayList, one of the most widely used of Java's pre-built data structures. The hash map is used whenever data is stored as key-value pairs, where values can be added, retrieved, and deleted using keys.
The way `HashMap` stores it key-value pairs is very similar to the way `HashSet` works: it depends on the `hashCode()` and `equals()` methods of the key objects.
Two constructors for `HashMap<K,V>` are:

```java
public HashMap() { ... }
public HashMap(Map<? extends K, ? extends V> m) { ... }
```

The `HashMap` class uses the same concept as the `HashSet` to keep track of which keys are present in the `HashMap`, and it is therefore important that the objects used as keys do not violate the contract of the `hashCode`
and `equals` methods.



<text-box variant='hint' name='Use a LinkedHashMap'>

While a `HashMap` is usually quite efficient, the disadvantage is that the order of the key/value pairs may appear to change each time you re-run your program (although this depends a bit on the implementation of `hashCode` in the objects your add).
As an alternative, you can use the `LinkedHashMap`, which internally maintains both a `HashMap` that allows checking for quick containment, and a `LinkedList` that keeps track of the order in which keys were added to the map.
The main convenience is that when you iterate through the key-value pairs in the `LinkedHashMap`, the order in which they were originally inserted is used rather than the random order in which the key-value pairs appear in the various buckets.

The `LinkedHashMap` is a drop-in replacement for the `HashMap`. In you use the `Map` type to declare your variables, it is typically a matter of replacing a call to the constructor of `HashMap` with a call to the
constructor of `LinkedHashMap`. For example, the following example always ensures that the Strings`"Hello"` and `"World!"` are always printed in that order.

```java
Map<String,Integer> map = new LinkedHashMap<>();
map.put("Poster", 23);
map.put("Photo", 5);
for (String key : map.keySet()) {
    Integer val = map.get(key);
    System.out.println(key + " : " + val);
}
```

which will always print

<sample-output>

Poster : 23
Photo : 5

</sample-output>

in this exact order. With a regular `HashMap` this order may differ between runs.

</text-box>

## SortedMap&lt;K,V&gt; interface
The `SortedMap<K,V>` interface extends the `Map<K,V>` interface in the same manner `SortedSet<K>` extends `Set<K>`.
It assumes there is an order defined on the keys, and provides methods that allow us to find the minimum and maximum
keys according to the order, and select a part of the map.

The additional methods defined are:

```java
SortedMap<K,V> subMap(K fromKey, K toKey);
SortedMap<K,V> headMap(K toKey);
SortedMap<K,V> tailMap(K fromKey);
K firstKey();
K lastKey();
```

Analogous to `SortedSet` and `TreeSet`, the Collections framework provides an implementation of `SortedMap` called
`TreeMap`.

### TreeMap&lt;K,V&gt; class

`TreeMap<K,V>` is an implementation of `SortedMap<K,V>`, that uses a similar way to organize the set of key/value pairs
as the `TreeSet` does.

It has the following constructors:

```java
public TreeMap() { ... }
public TreeMap(Comparator<? super K> comparator) { ... }
public TreeMap(Map<? extends K, ? extends V> m) { ... }
```

Finally, we provide you with a full overview of the interfaces and classes we have learned about this week:

<img width="744" alt="a visual summary of the Collections, Maps and Sets interfaces and inheritances is provided here. The information is not new from this week's text." src="https://user-images.githubusercontent.com/67587903/129039074-6c5b1469-7394-41a4-84b2-1b0a69044ede.PNG">
