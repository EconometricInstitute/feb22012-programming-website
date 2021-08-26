---
path: '/week2/3-reading-and-writing'
title: 'Reading and Writing'
hidden: false
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You refresh your memories of reading from files with use of Scanner.

- You can read a file with use of BufferedReader.

- You will be able to write to a file.

- You know how to filter a file line by line.

</text-box>

## Reading files
Computers have several different programs for browsing files. These programs are specific to the operating system. All programs used for browsing files make use of the file system of the computer in one way or another. The computer's **file system** has the responsibility of keeping track of the locations of files on the hard drive as well as providing the ability to create new files and modify them. The file system's main responsibility is abstracting the true structure of the hard drive; a user or a program using a file doesn't need to care about how, or where, the file is actually stored.

<text-box variant='hint' name='Organizing your file system'>

During your studies, you receive, use and create a lot of files. We strongly advise you to organize your file system well, so that searching for files remains simple. You can do this by creating a folder `Econometrics`, then create subfolders `Year 1`, `Year 2`, `Year 3` et cetera, and in these you can create a subfolder for each course you take. Of course, you can make your own choices on this. For more inspiration on structuring your file system, watch this video on [how to structure your file system](https://www.youtube.com/watch?v=bKjRKZxr-KY&ab_channel=ThomasFrank).

Also, we highly recommend you to back-up your files from time to time, or to use a cloud service such as [Dropbox](https://www.dropbox.com/referrals/AACmbdSW9rvTWjuelMVNPq7xaUhsi3c65ao?src=global9) or [OneDrive](https://onedrive.live.com?invref=163a01a4ac2d7121&invscr=90).

</text-box>


### Reading files using a Scanner
In the Introduction to Programming course, we introduced the Reading of files to you by use of the Scanner-class. When we want to read a file using the Scanner-class, we give the path for the file we want to read as a parameter to the constructor of the class. The path to the file can be acquired using Java's `Paths.get` command, which is given the file's name in string format as a parameter: `Paths.get("filename.extension")`.

When the `Scanner`-object that reads the file has been created, the file can be read using a while-loop. The reading proceeds until all the lines of the file have been read, i.e., until the scanner finds no more lines to read. Reading a file may result in an error, so that a try-catch block is necessary.

```java
// first
import java.util.Scanner;
import java.nio.file.Paths;

// in the program:

// we create a scanner for reading the file
try (Scanner scanner = new Scanner(Paths.get("file.txt"))) {

    // we read the file until all lines have been read
    while (scanner.hasNextLine()) {
        // we read one line
        String row = scanner.nextLine();
        // we print the line that we read
        System.out.println(row);
    }
} catch (Exception e) {
    System.out.println("Error: " + e.getMessage());
}
```

A file is read from the project root by default ( when `new Scanner(Paths.get("file.txt"))` is called), i.e., the folder that contains the folder `src` (and possibly other files as well). The contents of this folder can the inspected using the `Project Files`-tab in IntelliJ.

### Reading files using a BufferedReader
Since the Scanner does not work properly on files with very long lines, you will also learn to read files with a BufferedReader. This method is highly recommended by us, because you do not have to think about your files having long lines or not.
The problem with long lines for the Scanner is a reported bug. When there are lines longer than 1024 characters in a file, the Scanner breaks down without giving any warning. The BufferedReader is a good alternative. We will provide you with an example here:

```java
File f = new File("myfile.txt");
try (BufferedReader reader = new BufferedReader(new FileReader(f))) {
    int numberOfLines = 0;
    int numberOfChars = 0;
    String line = reader.readLine();
    while (line != null) {
        numberOfLines++;
        numberOfChars += line.length();
        line = reader.readLine();
    }
    System.out.println("Number of lines : " + numberOfLines);
    System.out.println("Number of characters : " + numberOfChars);
}
catch (IOException e) {
    e.printStackTrace();
}
```

Linked to the example above, it is necessary to place some comments on the BufferedReader. Firstly, the input argument that is passed to the constructor can not be a file (name), but we need to pass on a Reader, such as FileReader.
Also, we detect the end of the file by checking whether the result of readLine() is null or not. We can not skip this check, since we would get a NullPointerException if we called the length method on the null object two rows later.
Lastly, note that not only a FileNotFoundException is possible, but we must catch an IOException as well. An I/O exception is short for Input/Output exception and can be thrown for whatever input or output error happening. Here is a non-exclusive list of examples that would throw an IOException:

- Reading a network file and got disconnected.

- Reading a local file that was no longer available.

- Trying to read/write a file, but don't have permission (for instance because the file is still opened).

- Trying to write to a file, but disk space was no longer available.

## Writing files
Next, let's take a look at writing data to files. The [PrintWriter](https://docs.oracle.com/javase/8/docs/api/java/io/PrintWriter.html) class offers the functionality to write to files. The constructor of the `PrintWriter` class receives as its parameter a string that represents the location of the target file.

```java
PrintWriter writer = new PrintWriter("file.txt");
writer.println("Hello file!"); //writes the string "Hello file!" and line change to the file
writer.println("More text");
writer.print("And a little extra"); // writes the string "And a little extra" to the file without a line change
writer.close(); //closes the file and ensures that the written text is saved to the file
```

In the example above, we write to the file "file.txt" the string "Hello file!", followed by a line change and some additional text. Take notice that when writing to the file the method `print` does not add line changes, and you have to add them yourself. In contrast, the method `println` adds a new line change at the end of the parameter string it receives. You are already very familiar with this use because of `System.out.println()`.

The constructor of the `PrintWriter` class might throw an exception that must be either handled or thrown so that it is the responsibility of the calling method. Here is what a method that receives as its parameters a file name and the text contents to write into it could look like.

```java
public class Storer {

    public void writeToFile(String fileName, String text) throws Exception {
        PrintWriter writer = new PrintWriter(fileName);
        writer.println(text);
        writer.close();
    }
}
```

In the `writeToFile` method above, we begin by creating a `PrintWriter` object. It writes data the the file that is located at the path that the string `fileName` indicates. After this, we write the text to the file by calling the `println` method. The possible exception that the constructor throws has to be handled with a `try-catch` block or the handling responsibility has to be transferred elsewhere. In the `writeToFile` method, the responsibility to handle the exception is placed on the method that calls `writeToFile`.

Let's create a `main` method that calls the `writeToFile` of a `Storer` object. There is nothing to force the `main` method to handle the exception -- it, too, can state that it might throw an exception by adding `throws Exception` to the method definition.

```java
public static void main(String[] args) throws Exception {
    Storer storer = new Storer();
    storer.writeToFile("diary.txt", "Dear diary, today was a good day.");
}
```

By calling the method above, we create a file called "diary.txt" and write the text "Dear diary, today was a good day." into it. If the file already exists, the earlier contents are erased when we store the new text.

It is also possible to handle files in a way that adds the new text after the existing content. In that case, you might want to use the [FileWriter](https://docs.oracle.com/javase/8/docs/api/java/io/FileWriter.html) class.

Other than the filename in the Storer method, it is also possible to pass a File to the constructor of the PrintWriter. Consider the following example:
```java
Random ran = new Random(233);
File f = new File("dicethrows.csv");
try (PrintWriter pw = new PrintWriter(f)) {
    pw.println("throw1, throw2);
    for (int t = 0; t < 100; t++) {
        int d1 = 1 + ran.nextInt(6);
        int d2 = 1 + ran.nextInt(6);
        pw.println(d1 + "," + d2);
    }
    pw.flush();
}
catch (FileNotFoundException e) {
    e.printStackTrace();
}
```

As you can see, we have added a call to the PrintWriter's flush method. The PrintWriter maintains a buffer. If we want to be sure that all printed data is actually written to the file, we should call flush(). If the program crashes before the file is closed, non-flushed data may not have been written to the file. When the PrintWriter is closed, the flush method is called automatically. Since we have used the PrintWriter inside a `try-with-recourses` environment, the PrintWriter would already have closed after the flush line, thus automatically calling it. Here, the flush() call is thus just for demonstration purposes, but it is good to know that you should remember to close or flush a PrintWriter if you keep a file open for a longer time.

<programming-exercise name='Saveable Dictionary (4 parts)' nocoins='true' tmcname='part11-Part11_13.SaveableDictionary'>

In this exercise we will extend the dictionary, so that it can read words from a file and write words to a file.
The dictionary must also be able to translate both from Finnish to another language and from another language to Finnish (in this exercise we ignore the fact that some words might be written the same in Finnish and in other languages). Your mission is to create a dictionary in the class `SaveableDictionary`. Implement the class in the package `dictionary`.

<h2>The basic functionality</h2>

For the dictionary, implement a constructor which takes no parameters, and the following methods:

 - `public void add(String words, String translation)` adds a word to the dictionary. Every word has just one translation, and if the same word is added for the second time, nothing happens.

 - `public String translate(String word)` returns the translation for the given word. If the word is not in the dictionary, returns null.

In this phase, the dictionary should work as follows:


```java
SaveableDictionary dictionary = new SaveableDictionary();
dictionary.add("apina", "monkey");
dictionary.add("banaani", "banana");
dictionary.add("apina", "apfe");

System.out.println(dictionary.translate("apina"));
System.out.println(dictionary.translate("monkey"));
System.out.println(dictionary.translate("ohjelmointi"));
System.out.println(dictionary.translate("banana"));
```

Prints

<sample-output>

monkey
apina
null
banaani

</sample-output>

As can be seen from the output, after a translation has been added to the dictionary, it can translate the word to and from Finnish.

<b>NB:</b> the methods `add` and `translate` do not read from a file or write to a file! The constructor does not use a file either.

<h2>Deleting words</h2>

Add the dictionary method `public void delete(String word)` which deletes the given word and its translation from the dictionary.

It might be worth reviewing the material concerning deleting objects from an ArrayList from previous weeks.

<b>NB:</b> the method `delete` does not write to a file.

In this phase, the dictionary should work as follows:

```java
SaveableDictionary dictionary = new SaveableDictionary();
dictionary.add("apina", "monkey");
dictionary.add("banaani", "banana");
dictionary.add("ohjelmointi", "programming");
dictionary.delete("apina");
dictionary.delete("banana");

System.out.println(dictionary.translate("apina"));
System.out.println(dictionary.translate("monkey"));
System.out.println(dictionary.translate("banana"));
System.out.println(dictionary.translate("banaani"));
System.out.println(dictionary.translate("ohjelmointi"));
```

Prints

<sample-output>

null
null
null
null
programming

</sample-output>

Deleting also works both ways: Both the word and its translation are removed if either the word or the translation are deleted.

<h2>Reading from file</h2>

Make a constructor `public SaveableDictionary(String file)` and method `public boolean load()`, which loads the dictionary from the file given to the constructor as a parameter. If the program is unable to open the file or read from it, the method returns false, otherwise it returns true.

<b>NB:</b> the constructor only tells the dictionary the name of the file to load the dictionary from. The constructor does not read the file. Only the method `load` reads the file.

In the dictionary file, one line contains a word and its translation separated by ":".
The exercise template contains a file `words.txt` which contains the following:

<sample-output>

apina:monkey
alla oleva:below
olut:beer

</sample-output>

Read the dictionary file line by line with the method `nextLine`. You can split a line using the String method `split` like so:

```java
Scanner fileReader = new ...
while (fileReader.hasNextLine()) {
    String line = fileReader.nextLine();
    String[] parts = line.split(":");   // split the line based on the ':' character

    System.out.println(parts[0]);     // part of line before :
    System.out.println(parts[1]);     // part of line after :
}
```

The dictionary can be used as follows:

```java
SaveableDictionary dictionary = new SaveableDictionary("words.txt");
boolean wasSuccessful = dictionary.load();

if (wasSuccessful) {
    System.out.println("Successfully loaded the dictionary from file");
}

System.out.println(dictionary.translate("apina"));
System.out.println(dictionary.translate("ohjelmointi"));
System.out.println(dictionary.translate("alla oleva"));
```

Prints

<sample-output>

Successfully loaded the dictionary from file
monkey
null
below

</sample-output>

<h2>Saving to a file</h2>

Create the method `public boolean save()`, which saves the dictionary to the file given to the dictionary as a parameter to the constructor. If the program cannot save to the file, the method returns false. Otherwise it returns true. The dictionary files have to be saved in the form described above, so the program can read the files it has written.

<b>NB:</b> Only the method `save` writes to the file.

**NB:** Even though the dictionary can translate both ways, the dictionary file should only contain one way. So if the dictionary, for example, knows that *computer = tietokone*, the file should contain:


<sample-output>

tietokone:computer

</sample-output>

or

<sample-output>

computer:tietokone

</sample-output>

but not both!

It is best to handle the saving to, such that the whole dictionary is written on top of the previously saved version, so it might not be the best to use the `append` method described in the material.

The final version of the dictionary works as follows:

```java
SaveableDictionary dictionary = new SaveableDictionary("words.txt");
dictionary.load();

// use the dictionary

dictionary.save();
```

In the beginning, the dictionary is loaded from a file, and, in the end, it is saved back to the file, so that changes made to the dictionary are kept for the next time the dictionary is used.

</programming-exercise>

## Filtering a file
Sometimes we want to read a file line by line and write it to another file line by line, filtering out the lines that we do not want to take.
The program that we will present in the upcoming example only keeps a single line of data in the memory. If the lines are not too long, it does not matter how many lines there are.
If a file has millions of lines, software such as Excel will try to read everything into memory at once and probably complain that the file is too large. In situations like that, it is very useful to process a file line-by-line.

```java
public void filter(File in, File out, String pattern) throws IOException {
    try (BufferedReader br = new BufferedReader(new FileReader(in)), PrintWriter pw = new PrintWriter(out)) {
        String line = br.readLine();
        while (line != null) {
            if (line.contains(pattern)) {
                pw.println(line);
            }
            line = br.readLine();
        }
        pw.flush();
   }
}
```
