---
path: '/week5/3-sets-and-maps'
title: 'Sets and Maps'
hidden: false
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You are familiar with the Set interface and its inheritances.
- You are familiar with the Map interface and its inheritances.
- You know how a hashMap works and when to use it.

</text-box>

## Set&lt;E&gt; interface
Sometimes, we want to work with data while we do not care about the order elements were added or how often they occur. In such cases, we should use a `Set` instead of a `List`. The Set interface describes functionality related to sets. In Java, sets always contain either 0 or 1 amounts of any given object. For example, when finding repeated values in a set of data or when keeping track of whether we have seen something before.
Set data structures are thus different from lists. They specialize in checking efficiently whether an element is in the set. If the same element gets added multiple times, it will be in the set only once.

The `Set<E>` interface extends the `Collection<E>` interface, but does not add any methods on top of it. It indicates there are no repeated values.
Since a `Set` behaves differently from a `List`, we can interpret some operations in the `Collection<E>` interface as operations on mathematical sets:
- The set union (𝑆 ∪ 𝑇) can be performed via the addAll method: `public boolean addAll(Collection<? extends E> arg0);`
- The set intersection (𝑆 ∩ 𝑇) can be performed via the retainAll method: `public boolean retainAll(Collection<?> arg0);`
- The set difference (S \ 𝑇) can be performed via the removeAll method: `public boolean removeAll(Collection<?> arg0);`
- Checking for subsets (S ⊆ 𝑇) can be done via the containsAll method: `public boolean containsAll(Collection<?> arg0);`

 Here's how to go through the elements of a set.

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

Note that HashSet in no way assumes the order of a set of elements. If objects created from custom classes are added to the HashSet object, they must have both the `equals` and `hashCode` methods defined.

### HashSet&lt;E&gt; class
As an example, the set interface is implemented by `HashSet`. In order to check if an element is already in the set, you could iterate over all elements in the set. But this is inefficient. The `HashSet<E>` class uses the contract between `equals()` and `hashCode()` to find objects much faster.
It maintains a list of _m_ buckets. When a new element _o_ is added, it is added to the bucket with index `o.hashCode() % m`. When we check whether an element is already in the set, we only need to compare the element to other elements in its bucket.

Here is a visual example of how the `HashSet` works:

<img width="683" alt="In the picture six buckets are depicted. Object 1 and 4 are in the first bucket, having the same Hash. Object 1 contains string aab and object 4 contains aabaab. The other buckets either contain one or zero objects, with all different hash codes and (slightly) different string elements." src="https://user-images.githubusercontent.com/67587903/128778160-0cd013d4-b381-441c-b1ff-8e29799d03e8.PNG">

The `HashSet` has two constructors:

- public HashSet()
- public HashSet(Collection&lt;? extends E&gt; c)

If the hash codes of the objects added to a `HashSet` are distributed uniformly, they will distribute nicely over the different buckets with high probability, and it will be very efficient. To work properly, `HashSet` really depends on the contracts for `hashCode()` and `equals()`. Calling the contains() method on a `HashSet` with a 10,000 elements will be a lot faster than calling it on a `List`, approximately 100 to 1,000 times faster.

## SortedSet&lt;E&gt; interface
The `HashSet<E>` stores it elements in a very random order, depending on the current number of buckets and the hashCodes of the objects. If there is some order available, we may want to obtain all objects in the set greater than some object `fromElement` or smaller than some object `toElement`.
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
However, in practice, `HashSet` is faster (unless you end up in the very unlikely case that all objects end up in the same bucket). However, `HashSet`s have random order, while a `TreeSet` has a reliable order.
`TreeSet` also requires the order to be consistent with equals in order to work correctly.

Three of TreeSet’s constructors are:

- public TreeSet()
- public TreeSet(Comparator&lt;? super E&gt; comparator)
- public TreeSet(Collection&lt;? extends E&gt; c)

## Map&lt;K,V%gt; interface
Another very useful type of data structure is the `Map`. In other languages, it is sometimes called a *dictionary* or a *hash table*. Maps store **key-value pairs**.
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
A HashMap is, in addition to ArrayList, one of the most widely used of Java's pre-built data structures. The hash map is used whenever data is stored as key-value pairs, where values can be added, retrieved, and deleted using keys.
The way `HashMap` stores it key-value pairs is very similar to the way `HashSet` works: it depends on the `hashCode()` and `equals()` methods of the key objects.
Two constructors for HashMap<K,V> are:
- public HashMap() { … }
- public HashMap(Map&lt;? extends K, ? extends V&gt; m) { … }

In the example below, a HashMap object has been created to search for cities by their postal codes, after which four postal code-city pairs have been added to the HashMap object. At the end, the postal code "00710" is retrieved from the hash map. Both the postal code and the city are represented as strings.

```java
HashMap<String, String> postalCodes = new HashMap<>();
postalCodes.put("00710", "Helsinki");
postalCodes.put("90014", "Oulu");
postalCodes.put("33720", "Tampere");
postalCodes.put("33014", "Tampere");

System.out.println(postalCodes.get("00710"));
```

<sample-output>
  
Helsinki
  
</sample-output>

If the hash map does not contain the key used for the search, its `get` method returns a `null` reference.

Two type parameters are required when creating a hash map - the type of the key and the type of the value added. If the keys of the hash map are of type `String`, and the values of type `Integer`, the hash map is created with the following statement `HashMap<String, Integer> hashmap = new HashMap<>();`
Adding to the hash map is done through the `put(*key*, *value*)` method that has two parameters, one for the key, the other for the value. Retrieving from a hash map happens with the help of the `get(*key*)` method that is passed the key as a parameter and returns a value.

<programming-exercise name='Nicknames' tmcname='part08-Part08_06.Nicknames'>
  
In the main-method create a new HashMap&lt;String,String&rt; object. Store the names and nicknames of the following people in this hashmap so, that the name is the key and the nickname is the value. Use only lower case letters.

 -  matthew's nickname is matt
 -  michael's nickname is mix
 -  arthur's nickname is artie

Then get Matthew's nickname from the hashmap, and print it.
  
</programming-exercise>

#### Hash Map Keys Correspond to a Single Value at Most
The hash map has a maximum of one value per key. If a new key-value pair is added to the hash map, but the key has already been associated with some other value stored in the hash map, the old value will vanish from the hash map.

```java
HashMap<String, String> numbers = new HashMap<>();
numbers.put("Uno", "One");
numbers.put("Dos", "Zwei");
numbers.put("Uno", "Ein");

String translation = numbers.get("Uno");
System.out.println(translation);

System.out.println(numbers.get("Dos"));
System.out.println(numbers.get("Tres"));
System.out.println(numbers.get("Uno"));
```

<sample-output>

Ein
Zwei
null
Ein

</sample-output>

#### A Reference Type Variable as a Hash Map Value
Let's take a look at how a spreadsheet works using a library example. You can search for books by book title. If a book is found with the given search term, the library returns a reference to the book. Let's create a hash map that uses the book's name as a key, i.e., a String-type object, and a `Book` type as the value.

```java
HashMap<String, Book> directory = new HashMap<>();
```

The hash map above uses a`String` object as a key. Let's expand the example so that two books are added to the directory, `"Sense and Sensibility"` and `"Pride and Prejudice"`.

```java
Book senseAndSensibility = new Book("Sense and Sensibility", 1811, "...");
Book prideAndPrejudice = new Book("Pride and Prejudice", 1813, "....");

HashMap<String, Book> directory = new HashMap<>();
directory.put(senseAndSensibility.getName(), senseAndSensibility);
directory.put(prideAndPrejudice.getName(), prideAndPrejudice);
```

Books can be retrieved from the directory by book name. A search for `"Persuasion"` will not produce any results, in which case the hash map returns a `null`-reference. The book "Pride and Prejudice" is found, however.

```java
Book book = directory.get("Persuasion");
System.out.println(book);
System.out.println();
book = directory.get("Pride and Prejudice");
System.out.println(book);
```

<sample-output>

null

Name: Pride and Prejudice (1813)
Content: ...

</sample-output>

####  Hash Map as an Instance Variable
The example considered above on storing books is problematic in that the book's spelling format must be remembered accurately. Someone may search for a book with a lowercase letter, while another may, for example, enter a space to begin typing a name. Let's take a look at a slightly more forgiving search by book title.

We make use of the tools provided by the String-class to handle strings. The `toLowerCase()` method creates a new string with all letters converted to lowercase. The `trim()` method, on the other hand, creates a new string where empty characters such as spaces at the beginning and end have been removed.

```java
String text = "Pride and Prejudice ";
text = text.toLowerCase(); // text currently "pride and prejudice "
text = text.trim(); // text now "pride and prejudice"
```

The conversion of the string described above will result in the book being found, even if the user happens to type the title of the book with lower-case letters.

Let's create a `Library` class that encapsulates a hash map containing books, and enables you to case-independent search for books. We'll add methods for adding, retrieving and deleting to the `Library` class. Each of these is based on a sanitized name - this involves converting the name to lowercase and removing extraneous spaces from the beginning and end.

Let's first outline the method for adding. The book is added to the hash map with the book name as the key and the book itself as the value. Since we want to allow for minor misspellings, such as capitalized or lower-cased strings, or ones with spaces at the beginning and/or end, the key - the title of the book - is converted to lowercase, and spaces at the beginning and end are removed.

```java
public class Library {
    private HashMap<String, Book> directory;

    public Library() {
        this.directory = new HashMap<>();
    }

    public void addBook(Book book) {
        String name = book.getName()
        if (name == null) {
            name = "";
        }

        name = name.toLowerCase();
        name = name.trim();

        if (this.directory.containsKey(name)) {
            System.out.println("Book is already in the library!");
        } else {
            directory.put(name, book);
        }
    }
}
```

The `containsKey` method of the hash map is being used above to check for the existence of a key. The method returns `true` if any value has been added to the hash map with the given key. Otherwise, the method returns `false`.

We can already see that code dealing with string sanitizion is needed in every method that handles a book, which makes it a good candiate for a separate helper method. The method is implemented as a class method since it doesn't handle object variables.

```java
public static String sanitizedString(String string) {
    if (string == null) {
        return "";
    }

    string = string.toLowerCase();
    return string.trim();
}
```

Let's take a look at the class in use.
```java
Book senseAndSensibility = new Book("Sense and Sensibility", 1811, "...");
Book prideAndPrejudice = new Book("Pride and Prejudice", 1813, "....");

Library library = new Library();
library.addBook(senseAndSensibility);
library.addBook(prideAndPrejudice);

System.out.println(library.getBook("pride and prejudice");
System.out.println();

System.out.println(library.getBook("PRIDE AND PREJUDICE");
System.out.println();

System.out.println(library.getBook("SENSE"));
```

<sample-output>

Name: Pride and Prejudice (1813)
Content: ...

Name: Pride and Prejudice (1813)
Content: ...

null

</sample-output>

In the above example, we adhered to the DRY (Don't Repeat Yourself) principle according to which code duplication should be avoided. Sanitizing a string, i.e., changing it to lowercase, and *trimming*, i.e., removing empty characters from the beginning and end, would have been repeated many times in our library class without the `sanitizedString` method. Repetitive code is often not noticed until it has already been written, which means that it almost always makes its way into the code. There's nothing wrong with that - the important thing is that the code is cleaned up so that places that require tidying up are noticed.

#### Going Through A Hash Map's Keys
We may sometimes want to search for a book by a part of its title. The `get` method in the hash map is not applicable in this case, as it's used to search by a specific key. Searching by a part of a book title is not possible with it.
We can go through the values of a hash map by using a for-each loop on the set returned by the `keySet()` method of the hash map.
Below, a search is performed for all the books whose names contain the given string.

```java
public ArrayList<Book> getBookByPart(String titlePart) {
    titlePart = sanitizedString(titlePart);

    ArrayList<Book> books = new ArrayList<>();

    for(String bookTitle : this.directory.keySet()) {
        if(!bookTitle.contains(titlePart)) {
            continue;
        }

        // if the key contains the given string
        // we retrieve the value related to it
        // and add it tot the set of books to be returned

        books.add(this.directory.get(bookTitle));
    }

    return books;
}
```

This way, however, we lose the speed advantage that comes with the hash map. The hash map is implemented in such a way that searching by a single key is extremely fast. The example above goes through all the book titles when looking for the existence of a single book using a particular key.

#### Going Through A Hash map's Values
The preceding functionality could also be implemented by going through the hash map's values. The set of values can be retrieved with the hash map's `values​​()` method. This set of values can also be iterated over with a for-each loop.

```java
public ArrayList<Book> getBookByPart(String titlePart) {
    titlePart = sanitizedString(titlePart);

    ArrayList<Book> books = new ArrayList<>();

    for(Book book : this.directory.values()) {
        if(!book.getName().contains(titlePart)) {
            continue;
        }

        books.add(book);
    }

    return books;
}
```

As with the previous example, the speed advantage that comes with the hash map is lost.

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


Finally, we provide you with a full overview of the interfaces and classes we have learned about this week:

<img width="744" alt="a visual summary of the Collections, Maps and Sets interfaces and inheritances is provided here. The information is not new from this week's text." src="https://user-images.githubusercontent.com/67587903/129039074-6c5b1469-7394-41a4-84b2-1b0a69044ede.PNG">
