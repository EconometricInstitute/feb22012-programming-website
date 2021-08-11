---
path: '/week5/3-lists-and-queues'
title: 'Lists and queues'
hidden: false
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You know globally what a double ended queue is.
- You know what a LinkedList is and how it is intertwined with both the List and Deque.
- You understand the Collection hierarchy diagram.

</text-box>

## Deque&lt;E&gt; interface
The **Double Ended Queue**, Deque in short, extends the `Collection` interface via the `Queue` interface (which we won’t discuss).   
It allows us to store elements into both the front and the back of the queue. They can also be taken out at either the front of the end of the queue.
The methods defined in the Deque interface are:

- public void addFirst(E arg0);
- public void addLast(E arg0);
- public E getFirst();
- public E getLast();
- public E removeFirst();
- public E removeLast();

## List&lt;E&gt; interface
The `List<E>` interface also extends the `Collection<E>` interface. A list models sequential data. Elements of a `List` are indexed by integers starting at 0 and ending at `size()`-1.
It adds the following methods:

- public void add(int arg0, E arg1);
- public E get(int arg0);
- public int indexOf(Object arg0);
- public E remove(int arg0);
- public List &lt;E&gt; subList(int arg0, int arg1);
- public E set(int arg0, E arg1);

### ArrayList&lt;E&gt; class
The List you are most familiar with is the ArrayList. It implements the `List&lt;E&gt;` interface.
As a result it implements all methods in `List&lt;E&gt;` and its super interfaces `Collection&lt;E&gt;` and `Iterable&lt;E&gt;`.    
Two of its constructors are:
    
- public ArrayList() { … }
- public ArrayList(Collection&lt;? extends E&gt; c) { … }

Under the hood it uses an array, which makes it very efficient to obtain an element at a random index. However, adding elements to the front of an `ArrayList&lt;E&gt;` requires it to shift all elements by one position.

### LinkedList&lt;E&gt; class
A different type of `List` is the `LinkedList`. It stores every element in its own object, which keeps a reference to the objects associated with the next and previous elements. if no next or previous element exists, it keeps a `null` reference.
It implements both the `List<E>` interface and the `Deque<E>` interface. (`ArrayList` does not implement `Deque<E>`).
It has two constructors:

- public LinkedList() { … }
- public LinkedList(Collection&lt;? extends E&gt; c) { … }

Due to the way it works, adding and removing elements at the front or the end of the list is very efficient, but accessing an element at a fixed index requires it to walk over the elements in the list. Since it needs to create objects for every element it is often slower than `ArrayList` for many list-related applications.

<img width="558" alt="The description of the diagram that depicts an example of a linked list, is directly under the picture." src="https://user-images.githubusercontent.com/67587903/128730017-50f2fada-1fb8-4217-8b61-bd8e9081299c.PNG">
This figure shows schematically how a LinkedList works. The LinkedList object contains a reference to the first and last object of the list and an integer that represents its size. Each object contains a reference to its previous and next object and the value it contains. The reference of the first object to its previous object is null, because it is the first object. The next reference of the last object is also null, because no next object exists.

Let us finally have a look at the `Collection`s hierarchy until know, which we will update during the rest of this section.
<img width="529" alt="The diagram shows graphically which interfaces inherit each other, as was already described in the text." src="https://user-images.githubusercontent.com/67587903/128775590-0eaf46f5-1416-4cef-bdf8-eed6f5f633ea.PNG">
