---
path: '/week5/3-sets'
title: 'Sets'
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

The `Set&lt;E&gt;` interface extends the `Collection&lt;E&gt;` interface, but does not add any methods on top of it. It indicates there are no repeated values.
Since a `Set` behaves differently from a `List`, we can interpret some of the operations in the `Collection&lt;E&gt;` interface as operations on mathematical sets:
- The set union (𝑆 ∪ 𝑇) can be performed via the addAll method: `public boolean addAll(Collection&lt;? extends E&gt; arg0);`
- The set intersection (𝑆 ∩ 𝑇) can be performed via the retainAll method: `public boolean retainAll(Collection&lt;?&gt; arg0);`
- The set difference (S \ 𝑇) can be performed via the removeAll method: `public boolean removeAll(Collection&lt;?&gt; arg0);`
- Checking for subsets (S ⊆ 𝑇) can be done via the containsAll method: `public boolean containsAll(Collection<?> arg0);`

### HashSet&lt;E&gt; class
In order to check if an element is already in the set, you could iterate over all elements in the set. But this is inefficient.
The `HashSet&lt;E&gt;` class uses the contract between `equals()` and `hashCode()` to find objects much faster.
It maintains a list of _m_ buckets. When a new element _o_ is added, the it is added to the bucket with index `o.hashCode() % m`.
When we check whether an element is already in the set, we only need to compare the element to other elements in its bucket.
Here is a visual example of how the `HashSet` works:
<img width="683" alt="In the picture six buckets are depicted. Object 1 and 4 are in the first bucket, having the same Hash. Object 1 contains string aab and object 4 contains aabaab. The other buckets either contain one or zero objects, with all different hash codes and (slightly) different string elements." src="https://user-images.githubusercontent.com/67587903/128778160-0cd013d4-b381-441c-b1ff-8e29799d03e8.PNG">

The `HashSet` has two constructors:

- public HashSet()
- public HashSet(Collection&lt;? extends E&gt; c)

If the hash codes of the objects added to a `HashSet` are distributed uniformly, they will distribute nicely over the different buckets with high probability and it will be very efficient. To work properly, `HashSet` really depends on the contracts for `hashCode()` and `equals()`. Calling the contains() method on a `HashSet` with a 10.000 elements will be a lot faster than calling it on a `List`, approximately 100 to 1000 times faster.

## SortedSet&lt;E&gt; interface
The HashSet&lt;E&gt; stores it elements in a very random order, depending on the current number of buckets and the hashCodes of the objects. If there is some order available we may want to obtain all objects in the set greater than some object `fromElement` or smaller than some object `toElement`.
The SortedSet&lt;E&gt; interface defines the following methods:

- E first();
- E last();
- SortedSet&lt;E&gt; headSet(E toElement);
- SortedSet&lt;E&gt; tailSet(E fromElement);
- SortedSet&lt;E&gt; subSet(E fromElement, E toElement);

### TreeSet&lt;E&gt; class
`TreeSet&lt;E&gt;` implements the `SortedSet&lt;E&gt;` interface and requires some order of the elements of type E. This can be the natural order, if E implements `Comparable&lt;E&gt;`, or it can be provided by passing a `Comparator&lt;E&gt;` to the constructor.
The `TreeSet` stores its elements in the nodes of a binary tree, such that the following properties hold at all time:
- All nodes in the left subtree of the node hold smaller (or equal) elements
- All nodes in the right subtree of the node hold greater (or equal) elements

Here is an example:
