---
path: '/week5/3-lists-and-queues'
title: 'Lists and queues'
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You know globally what a double ended queue is.
- You know what a `LinkedList` is and how it is related to both the `List` and `Deque`.
- You understand the `Collection` hierarchy diagram.

</text-box>

In this section we will consider two subtypes of the `Collection` interface that model
data that is stored *sequentially*. Remember that semantics (the meaning) of the
`Collection` interface only states that something is a container of multiple objects, but doesn't
give any information on how these objects are organized. Subtypes of `Collection`
give more details on the organization of objects. The most common, and perhaps, intuitive way
to organize objects is to treat them as sequential data. Lists, arrays, queues, vectors and series
are all examples of concepts that imply organization in a sequential way.

In this part we consider two subtypes of `Collection` that further specify how the
data is organized: `Deque` and `List`.

## Deque&lt;E&gt; interface
The **Double Ended Queue**, *Deque* in short, extends the `Collection` interface via the `Queue` interface (which we won’t discuss for
the sake of brevity).
It allows us to store and remove elements at both the front and the back of the queue,
and the insertion order of elements matters.

`Deque` is a subtype of the `Collection` interface, and defines the following additional methods:

```java
void addFirst(E arg0);
void addLast(E arg0);
E getFirst();
E getLast();
E removeFirst();
E removeLast();
```

Note that if we insert elements at the front of the queue and remove them at the end,
the have a *first in, first out* (FIFO) order. For example:

```java
Dequeue<String> q = new ArrayDeque<>();
q.addFirst("Hello");
q.addFirst("World");
System.out.println(q.removeLast());
System.out.println(q.removeLast());
```

will print

<sample-output>

Hello
World

</sample-output>

If we add and remove at the same end of the queue, we get what is called a *last in, first out* (LIFO)
order:

```java
Dequeue<String> q = new ArrayDeque<>();
q.addFirst("Hello");
q.addFirst("World");
System.out.println(q.removeFirst());
System.out.println(q.removeFirst());
```

<sample-output>

World
Hello

</sample-output>

As you can see, the order in which items are inserted into the `Deque` matters. However, the `Deque` interface
only allows us to interact with the front or the end of the queue. We do not have any methods that allow us
to access a particular element at a certain *index* in the middle of the queue. Indices are not part of the
semantics, the meaning, of the `Deque` interface. If we do want to be able to work with indices, we can use
data structures that implement the `List` interface.

## List&lt;E&gt;

The `List<E>` interface also extends the `Collection<E>` interface.
The semantics, or meaning, of the `List` interface is that a list organizes its data *sequentially*,
and also states that elements in the list have *indices* (starting at 0 for the first element).
Elements of a `List` are indexed by integers starting at 0 and ending at `size()`-1.
It adds the following methods :

```java
void add(int arg0, E arg1);
E get(int arg0);
int indexOf(Object arg0);
E remove(int arg0);
List <E> subList(int arg0, int arg1);
E set(int arg0, E arg1);
```

As you can see, all these methods involve some `int` that refers to an index.
While you can just perform `add` without an index on a `List`, that particular
method actually comes from the `Collection` interface and is not specific to
`List` types. However, inserting an item at a specific index, or retrieving
an item from a

### ArrayList&lt;E&gt; class
The List you are most familiar with is the ArrayList. It implements the `List<E>` interface.
As a result it implements all methods in `List<E>` and its super interfaces `Collection<E>` and `Iterable<E>`.
Two of its constructors are:

```java
public ArrayList() { ... }
public ArrayList(Collection<? extends E> c) { ... }
```

Under the hood it uses an array, which makes it very efficient to obtain an element at a random index.
However, adding elements to the front of an `ArrayList<E>` requires it to shift all elements by one position,
which may take a lot of time if the `ArrayList` is very long.

Another point to be aware of is that the `ArrayList` does not implement the `Deque` interface, and therefore
does not provide methods such as `addFirst` and `removeFirst`.

### LinkedList&lt;E&gt; class

A different type of `List` is the `LinkedList`. It stores every element in its own object, which keeps a reference to the objects associated with the next and previous elements. if no next or previous element exists, it keeps a `null` reference.
It implements both the `List<E>` interface and the `Deque<E>` interface. Thus, contrary to the `ArrayList`, it does implement `Deque<E>` methods such as `addFirst` and `removeFirst`.

It has two constructors:

```java
public LinkedList() { ... }
public LinkedList(Collection<? extends E> c) { ... }
```

Due to the way it works, adding and removing elements at the front or the end of the list is very efficient, but accessing an element at a fixed index requires it to walk over the elements in the list.
Since it needs to create objects for every element it is often slower than `ArrayList` for many list-related applications.

<img width="558" alt="The description of the diagram that depicts an example of a linked list, is directly under the picture." src="https://user-images.githubusercontent.com/67587903/128730017-50f2fada-1fb8-4217-8b61-bd8e9081299c.PNG">

This figure shows schematically how a LinkedList with four `Integer` objects is organized in the computer's memory.
The LinkedList object contains a reference to the first and last element objects of the list and also holds an integer that represents its size. Each object contains a reference to its previous and next object and the value it contains. The reference of the first object to its previous object is null, because it is the first object. The next reference of the last object is also null, because no next object exists. If another element would be added, another element object would be created, and the last (or first) node
could update the next/previous references.

<text-box variant='hint' name='Prefer interface types'>

In the materials we often create a new list with the following code:

```java
List<String> list = new ArrayList<>();
```

The reason why we prefer to use the more general `List` type for the variable, rather than
the specific `ArrayList` type is because this allows us to easily change the type of `List`
to use in our program. If at some point we expect that our program will run faster if we
use a `LinkedList` instead of an `ArrayList`, we only have to change the above line to

```java
List<String> list = new LinkedList<>();
```

If we consistenly use the `List` type in other spots in our program, this is the only
change needed to switch to a different `List` implementation. We can then simply benchmark
if it is indeed faster or slower to switch this kind of `List`. If we would use the `ArrayList`
type in many places in the code, we would have to go through all the code and replace the
`ArrayList` type by `LinkedList`. Of course, we like to avoid this type of work and it then
makes more sense to replace the type by `List` directly.

</text-box>

### Collection hierarchy with List objects

Let us finally have a look at the `Collection`s hierarchy until now, which we will update during the rest of this section.

<img width="529" alt="The diagram shows graphically which interfaces inherit each other, as was already described in the text." src="https://user-images.githubusercontent.com/67587903/128775590-0eaf46f5-1416-4cef-bdf8-eed6f5f633ea.PNG">
