---
path: '/week2/6-character encoding'
title: 'Background: Character Encodings'
hidden: false
ready: true
extra: true
---

## Character Encodings Background

Within computers, all data is stores in a binary format. A `String` contains textual
data, but in order to store textual data the text must be represented using binary
values that we can easily interpret as number, also called code points. In order to'
do so, a mapping between texual values and numeric values is defined.
The American Standard Code for Information Interchange (ASCII) defines the relation
between numbers 0 to 127, where for example the decimal numbers 65 to 90 for the
characters `A` to `Z`,  and the decimal numbers 97 to 122 correspond to the
characters `a` to `z`. This relationship between numbers and characters is called
a *character encoding* or a *character set*.

When computers became more widespread, the need to have additional characters beyond
the initial 128 rose, and in different countries different character encoding
standards were defined. This could lead to issues when transferring data between
computers using different character encodings, as a numbers stored in the binary file
could map to different characters within different encodings. Since the 1990's,
the Unicode Consortium has worked on creating a universal standard
character set that covers most of the scripts and ways of writing around the world,
including symbols and support for right-to-left languages, and even Emoji. The most
common and popular encoding is UTF-8, and the Unicode specification released in
March 2020 support 143,859 unique characters.

When we want to read or write textual data, for example to files, most software and
programming languages allow us to specify which character encoding should be used.
If we do not specify this, some software relies on the default character set of
the operating system. On Windows, this depends on your regional and language settings, that in Western
countries is typically `latin1` (also known as ISO 8859-1). Mac OS and Linux usually have `utf-8` as the
standard character encoding and it is a strong recommendation that modern
applications use as the default utf-8 as well. To this day, you may
have to be careful when you store textual data, such as `.txt`, `.csv` or even source
code files such as `.java`, in particular if these files contain characters outside
the original 128 characters in the ASCII standard. When you notice that data in
your software looks mostly correct, except for certain symbols, it is likely
different encodings were used to read and write the data, and the solution is
usually to make sure the software uses the correct encoding for reading and/or writing.

### Character Encoding in Java

As you might have noticed, one of the read methods that are provided by the `Files` class,
takes a [Charset](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/nio/charset/Charset.html) as an argument.
The Charset defines charsets, decoders, and encoders, for translating between bytes and characters.

If you are reading and writing text data, it makes a huge difference which charset you use for decoding.
If you notice that certain special characters or letters with diacritics look weird, make sure you specify
the encoding to use. For example, if you want to read a file `my-data-latin1.txt` with a `latin1` encoding,
and want to write it to a file `my-data-utf8.txt` with an `utf-8` encoding, you can do the following:

```java
List<String> lines = Files.readAllLines("my-data-latin1.txt", Charset.forName("latin1"));
Files.write(Path.of("my-data-utf8.txt"), lines, Charset.forName("utf-8"))
```

Java has a number of older and newer classes to read and write files, but also a more modern set of classes for the
same purpose. The `Files` class is part of the more modern set of classes, and if we use methods such as
`Files.readAllLines` or `Files.write` without providing a particular character encoding, those methods
will use the UTF-8 encoding. However, some of the older classes, such as `Scanner` and `BufferedReader`
will use the default encoding as provided by the operating system.

To be safe, we can specify which character encoding to use with a scanner in the following way:

```java
try (Scanner scan = new Scanner(new File("myfile.txt"), "utf-8")) {
    // Do something with the Scanner
}
```

In order to specify the encoding when we work with a `BufferedReader`,  the following approach can be
used:

```java
File f = new File("myfile.txt");
try (BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(f), "utf-8"))) {
    // Do something with the BufferedReader
}
```

In order to specify the encoding used with a `PrintWriter`, the following approach can be used:

```java
try (PrintWriter pw = new PrintWriter(new File("my-output.txt"), "utf-8")) {
    pw.println("J'écris dans le fichier")
}
```


<text-box variant='hint' name='Default encoding in future Java versions'>

At the time of writing, there is [a proposal to make UTF-8 the default encoding for all Java classes](https://openjdk.java.net/jeps/400).
This is currently aimed for Java version 18, to be released in March 2022 and which is a version with limited support.
This also means that the first long term support release of Java that will include this behavior is currently scheduled to be version 23, which
is planned to be released in September 2023.

</text-box>
