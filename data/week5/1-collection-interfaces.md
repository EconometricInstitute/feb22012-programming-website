---
path: '/week5/1-collection-interfaces'
title: 'Collection interfaces'
hidden: false
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- To revise the concepts of class and object.
- To realize that a program that has been written without objects can also be written using objects.
- To realize that the use of objects can make a program more understandable.

</text-box>

## Collections
To store much data and be able to retrieve it efficiently, Java implements several data structure. We already know some of them, such as the `ArrayList` and the array. The `ArrayList` is part of the `List` interface. The `List` interface implements more sorts of lists. Also the `Set` interface and `Map` interface are part of the `Collection` interface. To navigate through all these data structures, the `Collection` implements the `Iterable` interface. We will cover all these interfaces in the next section.

### Iterable interface
The interface `Iterable<E>` are all types that we can use the **enhanced for-loop** on.
It specifies only one method: `public Iterator<E> iterator()`. 
An iterator is able to indicate whether there are any elements left to iterate on (with `hasNext()`) and to produce the next element with `next()`)
When we work with a collection of data containing a bunch of objects, it is often useful to do something _for each_ object.
The enhanced for-loop should be preferred in such cases. It will use the most efficient way to iterate over a collection.
