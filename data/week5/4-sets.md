---
path: '/week5/4-sets'
title: 'Sets'
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You are familiar with the Set interface and the `SortedSet` interface.
- You are aware of the `HashSet` and `TreeSet` classes and have a general idea how they speed up containment queries.

</text-box>

## Set&lt;E&gt; interface
Sometimes, we want to work with data while we do not care about the order elements were added or how often they occur.
In such cases, we should use a `Set` instead of a `List`. The Set interface describes functionality related to sets,
similar to the concept of a set in mathematics. That means that a `Set` either contains or does not contain an
object/element, but that these elements are not organized sequentially, nor that it is possible to have multiple copies
of the same element/object in the set. In Java `Set` objects, duplicate element are filtered using the `equals` method.
For example, when finding repeated values in a set of data or when keeping track of whether we have seen something before,
a `Set` is very useful, as adding multiple objects that are equal according to their `equals` implementation will make
sure only a single one of them is contained in the set.

Set data structures are thus different from lists. They specialize in checking efficiently whether an element is in the
set, without any notion of position or indices on these elements.

The `Set<E>` interface extends the `Collection<E>` interface, but does not add any methods on top of it.
The semantics, i.e. meaning, of a class that implements the `Set` interface is that there are no repeated values.
Since a `Set` behaves differently from a `List`, we can interpret some operations in the `Collection<E>` interface
as operations on mathematical sets:
- The set union (𝑆 ∪ 𝑇) can be performed via the addAll method: `public boolean addAll(Collection<? extends E> arg0);`
- The set intersection (𝑆 ∩ 𝑇) can be performed via the retainAll method: `public boolean retainAll(Collection<?> arg0);`
- The set difference (S \ 𝑇) can be performed via the removeAll method: `public boolean removeAll(Collection<?> arg0);`
- Checking for subsets (S ⊆ 𝑇) can be done via the containsAll method: `public boolean containsAll(Collection<?> arg0);`

Since sets do not have a notion of position or sequence, it is not possible to iterate over the elements of the
set via indices. Here's how to go through the elements of a set.

```java
Set<String> set = new HashSet<>();
set.add("one");
set.add("one");
set.add("two");

for (String element: set) {
    System.out.println(element);
}
```

<sample-output>

one
two

</sample-output>

<text-box variant='hint' name='Use the for-each loop'>

In this course we encourage you to use the for-each loop when you can.
Consider the following snippet:

```java
for (Object obj : col) {
    System.out.println(obj);
}
```

This snippet will work whether `col` is a `List`, a `Set` or even another
type of `Collection` or `Iterable`. It is thus an extremely general pattern.

This is contrary to the following snippet:

```java
for (int i=0; i < col.size(); i++) {
    System.out.println(col.get(i));
}
```

This snippet only works if `col` is a `List`, but will fail when `col` is a
`Set`, `Collection` or even an `Iterable`. Thus, if you are required to write
code that iterates through all elements on an exam, you are always safe with
the for-each loop (assuming you do not need an index), but you would make a
severe mistake if you use the index-based loop on anything else than a `List`.

</text-box>

Note that `Set` does not assume or guarantee anything about the order of a set of elements.
A `Set` only knows which elements are contained in the `Set`, and which elements are
not.
If you iterate over a `Set`, the elements may show up in a completely different order
than the order in which you added them, and for some types of `Set` it may even
seem different every time you run your program. This is very different from `List`
objects, where the order of the elements is dictated by their *indices*.

### HashSet&lt;E&gt; class
As an example, the set interface is implemented by `HashSet`. In order to check if an element is already in the set, you could iterate over all elements in the set.
However, this require a lot of work, as in the worst case all elements in the set have to be checked, which can become very slow for large datasets.
The `HashSet<E>` class will be much more efficient by clever use of the contract between `equals()` and `hashCode()` by making sure only a small number of elements
need to be considered and compared.

The basic idea is that the `HashSet`maintains a list of _m_ buckets.
When a new element _o_ is added, it is added to the bucket with index `o.hashCode() % m`.
When we check whether an element is already in the `Set`, we only need to compare the element to other elements in its bucket.
Remember that if two objects are equal according to their `equals` method, it must be the case that their `hashCode` is equal.
As a result, the bucket with the same index will be used when two objects are equal according to `equals`, and we know for
sure that objects stored in the other buckets can never be equal according to their `equals` methods, assuming they respect
the rules in the contract between `equals` and `hashCode`.

Here is a visual example from the slides that shows how a `HashSet` with six objects is organized in the memory:

<img width="100%" alt="In the picture six buckets are depicted. Object 1 and 4 are in the first bucket, having the same Hash. Object 1 contains string aab and object 4 contains aabaab. The other buckets either contain one or zero objects, with all different hash codes and (slightly) different string elements." src="https://user-images.githubusercontent.com/67587903/128778160-0cd013d4-b381-441c-b1ff-8e29799d03e8.PNG">

The `HashSet` class has the following two constructors:

```java
public HashSet()
public HashSet(Collection<? extends E> c)
```

If the hash codes of the objects added to a `HashSet` are distributed uniformly, they will distribute nicely over the different buckets with high probability, and it will be very efficient. To work properly, `HashSet` really depends on the contracts for `hashCode()` and `equals()`. Calling the contains() method on a `HashSet` with a 10,000 elements will be a lot faster than calling it on a `List`, approximately 100 to 1,000 times faster.

<text-box variant='hint' name='Use a LinkedHashSet'>

While a `HashSet` is usually quite efficient, the disadvantage is that the order of the elements may appear to change each time you re-run your program (although this depends a bit on the implementation of `hashCode` in the objects you add).
As an alternative, you can use the `LinkedHashSet`, which internally maintains both a `HashSet` that allows checking for quick containment, and a `LinkedList` that keeps track of the order in which elements were added to the set.
The main convenience is that when you iterate through the elements in the `LinkedHashSet`, the order in which they were originally inserted is used rather than the random order in which the elements appear in the various buckets.

The `LinkedHashSet` is a drop-in replacement for the `HashSet`. In you use the `Set` type to declare your variables, it is typically a matter of replacing a call to the constructor of `HashSet` with a call to the
constructor of `LinkedHashSet`. For example, the following example always ensures that the Strings `"Hello"` and `"World!"` are always printed in that order.

```java
Set<String> set = new LinkedHashSet<>();
set.add("Hello");
set.add("World!");
for (String str : set) {
    System.out.println(str);
}
```

This will always print `Hello` first and `World!` second, while this is not guaranteed with a regular `HashSet`.

</text-box>

## SortedSet&lt;E&gt; interface

The `HashSet<E>` stores its elements in a more or less random order, depending on the current number of buckets and the hashCodes of the objects.
If there is some order available, as defined by an implementation of the `Comparable` interface (natural order) or the `Comparator` interface,
we may want to obtain the minimum or maximum element, a subset of all objects in the set greater than some object `fromElement` or a subset smaller than some object `toElement`.
The `SortedSet<E>` interface is a sub-interface of `Set` that defines the following additional methods:

```java
E first();
E last();
SortedSet<E> headSet(E toElement);
SortedSet<E> tailSet(E fromElement);
SortedSet<E> subSet(E fromElement, E toElement);
```

Since the `HashSet` interface only implements the `Set` interface, but not the `SortedSet` interface, these methods are not available on a `HashSet`.
However, `HashSet` is not the only `Set` offered in the Collections framework.

### TreeSet&lt;E&gt; class

`TreeSet<E>` implements the `SortedSet<E>` interface and requires some order of the elements of type `E`. This can be the natural order, if E implements `Comparable<E>`, or it can be provided by passing a `Comparator<E>` to the constructor.
The `TreeSet` stores its elements in the nodes of a binary tree, such that the following properties hold at all time:

- All nodes in the left subtree of the node hold smaller elements
- All nodes in the right subtree of the node hold greater elements

The advantage of this way to organize the data is that if the tree is balanced, i.e. for each node the subtree on its left side contains roughly as many nodes as the subtree on its right side, in every step half of the remaining elements
in the tree can be ignored. The number of steps needed to detect if an element is present or not then becomes the base-2 logarithm of the number of elements stored in the tree.
This results in a huge speed up: searching a balanced tree of a million element requires that we only check 20 elements. While these details are beyond the scope of this course, clever tricks exist to make sure that the tree will be
kept relatively balanced when elements are inserted or removed.

Below is an example of how a `TreeSet` could organize seven integer values in the computer's memory with this approach. In practice, the *value* variable in each node would be a reference to some object,
which is then compared using the `Comparable`/`Comparator` implementation.

<img width="100%" alt="The TreeSet&lt;Integer%gt; object contains the reference to the root node of the TreeSet and an integer value of the size. A node has a pointer to a node object with a smaller value, a pointer to a node object with a greater value and a pointer to the integer value of the node itself. In this example, the root node has two children and they also have two children each. If you go to the left from one node, you obtain node objects with smaller values. On the right, however, are nodes with greater values." src="https://user-images.githubusercontent.com/67587903/128865316-5ff48ad7-eb80-409d-a9c6-eb7b4fc79421.PNG">

The `TreeSet<E>` class has the advantage that iterating over the elements happens according to the specified order, and that minimum/maximum elements and ranged subsets can be selected efficiently.
However, in practice, `HashSet` is faster (unless you end up in the very unlikely case that all objects end up in the same bucket). However, `HashSet`s have random order, while a `TreeSet` has a reliable order,
as defined by the `Comparable`/`Comparator` used by the `TreeSet`. Therefore, iterating over a `TreeSet<String>` would return all the elements in an alphabetical order, regardless of the order in which the elements
were inserted. `TreeSet` does require the order defined in the `compareTo`/`compare` methods to be consistent with `equals` in order to work correctly.

Three of `TreeSet`’s constructors are:

```java
public TreeSet()
public TreeSet(Comparator<? super E> comparator)
public TreeSet(Collection<? extends E> c)
```

<Exercise title="Test your knowledge">

In this quiz, you can test your knowledge on the subjects covered in this chapter.

What is the difference between a `Set` and `List`? Is there a difference in the
methods that can be called on these two types?

<Solution>

A `Set` has no notion of the order or method of storage of objects, and contains each
object only once. A `List` has a notion of order, works with indices, and can store the
same object multiple times at different indices in the list.

With a `Set` we only have operations that are defined in the `Collection` interface.
A `List`, additional methods are added that deal with indices.

</Solution>

---

Will the following code run without problems? If yes, what will it print. If not, what
is the problem?

```java
Set<String> mySet = Set.of("hello", "there", "set");
for (int i=0; i < mySet.size(); i++) {
    System.out.println(mySet.get(i));
}
```

<Solution>

This code will not compile, because the method `get` with an index is not supported on a
`Set`. It is only available on `List`. The proper way to iterate over the elements in a
set is using an `Iterator`, which can be done most conveniently using the enhanced for loop:

```java
Set<String> mySet = Set.of("hello", "there", "set");
for (String str : mySet) {
    System.out.println(str);
}
```

This version will print:

<sample-output>

hello
there
set

</sample-output>

</Solution>

---

What is the difference between a `HashSet` and a `TreeSet`? What assumptions are needed to make
sure a `HashSet` or a `TreeSet` work correctly?

<Solution>

The `HashSet` makes use of the `hashCode` method to divide the objects in the `Set` over various
buckets. This way, if we want to check if a new object is already contained in the set, we only
need to check a single bucket and can skip performing an `equals()` check on the objects in all
other buckets. In order to work correctly, it is important that the objects stored in a `HashSet`
adhere to the contract between the `hashCode()` and `equals()` methods.

A `TreeSet` makes use of an order and stores the elements in the set in a binary search tree,
where for each node the objects in the left subtree come earlier in the order, and the objects
in the right subtree come later in the order.
This way, if we want to check if a new object is already contained in the set, we only need to
check one of the subtrees of each node. This way, in the worst case we need to check only a
number of elements equal to the depth of the tree. In order to work correctly, the objects that
are stored in a `TreeSet` need to have an order. This can either be due to these objects have the
`Comparable` type, so a natural order can be used. Alternatively, we can provide a `Comparator`
object to the constructor of `TreeSet` to use an ad-hoc order.

A `TreeSet` also implements the `SortedSet` interface, which provides a number of additional
methods.

</Solution>

---

Suppose you get a set of `String` objects containing different words, and you want to find all
the words that are between the words `"d"` and `"k"` according to an alphabetical order. Would
you choose to use a `HashSet` or a `TreeSet` to find these words?

<Solution>

Here a `TreeSet` is more convenient because it implements the `SortedSet` interface. Therefore,
we can use something like this:

```java
SortedSet<String> words = new TreeSet<>(providedWords);
SortedSet<String> subset = words.subSet("d", "k");
```

Note that making clever use of the `SortedSet` interface results in
much shorter code than when you perform the comparison yourself:

```java
Set<String> subset = new HashSet<>();
for (String word : providedWords) {
    if  ("d".compareTo(word) < 0 && word.compareTo("k") < 0) {
        subset.add(word);
    }
}
```

</Solution>

---

What methods can you use to compute a set difference, a set union and a set intersection?

<Solution>

The method `removeAll()` can be used to compute the set difference, a set union can be
computed using `addAll()` and a set intersection can be computed using the `retainAll()`
method.

</Solution>

</Exercise>
