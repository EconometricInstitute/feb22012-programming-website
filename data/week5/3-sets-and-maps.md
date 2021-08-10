---
path: '/week5/3-sets-and-maps'
title: 'Sets and Maps'
hidden: false
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You will brush up on using classes and objects.
- You know what a `null` reference is, and what causes the NullPointerException error.
- You can use an object as an object variable and a method parameter.
- You can create a method that returns an object.
- You can create the method equals, which can be used to check if two objects of the same type have the same contents or state.

</text-box>

## Set&lt;E&gt; interface
Sometimes, we want to work with data while we do not care about the order elements were added or how often they occur. In such cases, we should use a `Set` instead of a `List`. For example, when finding repeated values in a set of data or when keeping track of whether we have seen something before.
Set data structures are thus different from lists. They specialize in checking efficiently whether an element is in the set. If the same element gets added multiple times, it will be in the set only once.

The `Set<E>` interface extends the `Collection<E>` interface, but does not add any methods on top of it. It indicates there are no repeated values.
Since a `Set` behaves differently from a `List`, we can interpret some of the operations in the `Collection<E>` interface as operations on mathematical sets:
- The set union (𝑆 ∪ 𝑇) can be performed via the addAll method: `public boolean addAll(Collection<? extends E> arg0);`
- The set intersection (𝑆 ∩ 𝑇) can be performed via the retainAll method: `public boolean retainAll(Collection<?> arg0);`
- The set difference (S \ 𝑇) can be performed via the removeAll method: `public boolean removeAll(Collection<?> arg0);`
- Checking for subsets (S ⊆ 𝑇) can be done via the containsAll method: `public boolean containsAll(Collection<?> arg0);`

### HashSet&lt;E&gt; class
In order to check if an element is already in the set, you could iterate over all elements in the set. But this is inefficient.
The `HashSet<E>` class uses the contract between `equals()` and `hashCode()` to find objects much faster.
It maintains a list of _m_ buckets. When a new element _o_ is added, the it is added to the bucket with index `o.hashCode() % m`.
When we check whether an element is already in the set, we only need to compare the element to other elements in its bucket.
Here is a visual example of how the `HashSet` works:
<img width="683" alt="In the picture six buckets are depicted. Object 1 and 4 are in the first bucket, having the same Hash. Object 1 contains string aab and object 4 contains aabaab. The other buckets either contain one or zero objects, with all different hash codes and (slightly) different string elements." src="https://user-images.githubusercontent.com/67587903/128778160-0cd013d4-b381-441c-b1ff-8e29799d03e8.PNG">

The `HashSet` has two constructors:

- public HashSet()
- public HashSet(Collection&lt;? extends E&gt; c)

If the hash codes of the objects added to a `HashSet` are distributed uniformly, they will distribute nicely over the different buckets with high probability and it will be very efficient. To work properly, `HashSet` really depends on the contracts for `hashCode()` and `equals()`. Calling the contains() method on a `HashSet` with a 10.000 elements will be a lot faster than calling it on a `List`, approximately 100 to 1000 times faster.

## SortedSet&lt;E&gt; interface
The `HashSet<E>` stores it elements in a very random order, depending on the current number of buckets and the hashCodes of the objects. If there is some order available we may want to obtain all objects in the set greater than some object `fromElement` or smaller than some object `toElement`.
The `SortedSet<E>` interface defines the following methods:

- E first();
- E last();
- SortedSet&lt;E&gt; headSet(E toElement);
- SortedSet&lt;E&gt; tailSet(E fromElement);
- SortedSet&lt;E&gt; subSet(E fromElement, E toElement);

### TreeSet&lt;E&gt; class
`TreeSet<E>` implements the `SortedSet<E>` interface and requires some order of the elements of type E. This can be the natural order, if E implements `Comparable<E>`, or it can be provided by passing a `Comparator<E>` to the constructor.
The `TreeSet` stores its elements in the nodes of a binary tree, such that the following properties hold at all time:
- All nodes in the left subtree of the node hold smaller (or equal) elements
- All nodes in the right subtree of the node hold greater (or equal) elements

Here is an example:

<img width="724" alt="The TreeSet&lt;Integer%gt; object contains the reference to the root node of the TreeSet and an integer value of the size. A node has a pointer to a node object with a smaller value, a pointer to a node object with a greater value and a pointer to the integer value of the node itself. In this example, the root node has two children and they also have two children each. If you go to the left from one node, you obtain node objects with smaller values. On the right, however, are nodes with greater values." src="https://user-images.githubusercontent.com/67587903/128865316-5ff48ad7-eb80-409d-a9c6-eb7b4fc79421.PNG">

The `TreeSet<E>` class has the advantage that iterating over the elements happens according to the specified order. Ranged subsets can be selected efficiently. 
However, in practice `HashSet` is faster (unless you end up in the very unlikely case that all objects end up in the same bucket). However, `HashSet`s have random order, while a `TreeSet` has a reliable order.
`TreeSet` also requires the order to be consistent with equals in order to work correctly.

Three of TreeSet’s constructors are:

- public TreeSet()
- public TreeSet(Comparator&lt;? super E&gt; comparator)
- public TreeSet(Collection&lt;? extends E&gt; c)

## Map&lt;K,V%gt; interface
Another very useful type of data structure is the `Map`. In other languages it is sometimes called a *dictionary* or a *hash table*. Maps store **key-value pairs**.
The keys in a map are unique: the keys of a map form the **key set**. For every key in the key set, the map will contain an associated value. The values are not necessarily a set.
Maps have many uses. Some examples include:
- Counting how often a String occurs in a file (keys: `String`, values: `Integer`)
- Keep track of the reputation of a Player (keys: `Player`, values: `Double`)
- Check which files contain a certain line (keys: `String`, values: `List<File>`)

The interface `Map<K,V>` has two type parameters: one for the keys (K) and one for the values (V). It does **not** extend `Collection<E>` because `Collection`s only hold values of a single type. 
The interface `Map<K,V>` defines the following methods:

- boolean containsKey(Object key);
- boolean containsValue(Object value);
- V get(Object key);
- V put(K key, V value);
- V remove(Object key);
- void putAll(Map&lt;? extends K, ? extends V&gt; m);
- void clear();
- Set&lt;K&gt; keySet();
- int size();
- boolean isEmpty();

If a value for a non-existing key is requested, `get()` returns `null`.

Here is an example of the use of a `Map`:
```java
Map<String,Integer> myMap = … ;
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

will print the following:

<sample-output>
12
true
true
{Java=12, world=5} 
</sample-output>  

### HashMap&lt;K,V&gt; class
The way `HashMap` stores it key-value pairs is very similar to the way `HashSet` works: it depends on the `hashCode()` and `equals()` methods of the key objects.
Two constructors for HashMap<K,V> are:
- public HashMap() { … }
- public HashMap(Map&lt;? extends K, ? extends V&gt; m) { … }

## SortedMap&lt;K,V%gt; interface
The `SortedMap<K,V>` interface extends the `Map<K,V>` interface in the same manner `SortedSet<K>` extends `Set<K>`. It assumes there is an order defined on the keys, but the values do not need to have an order.
The additional methods defined are:
- SortedMap&lt;K,V&gt; subMap(K fromKey, K toKey);
- SortedMap&lt;K,V&gt; headMap(K toKey);
- SortedMap&lt;K,V&gt; tailMap(K fromKey);
- K firstKey();
- K lastKey();

### TreeMap&lt;K,V&gt; class
Like `TreeSet<E>` is an implementation of `SortedSet<E>`, `TreeMap<K,V>` is an implementation of `SortedMap<K,V>`.
It has the following constructors:
- public TreeMap() { … }
- public TreeMap(Comparator<? super K> comparator) { … }
- public TreeMap(Map<? extends K, ? extends V> m) { … }

