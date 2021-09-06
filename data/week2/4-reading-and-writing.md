---
path: '/week2/4-reading-and-writing'
title: 'Reading and Writing Files'
hidden: false
ready: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You refresh your memories of reading from files with use of Scanner.

- You can read a file with use of BufferedReader.

- You will be able to write to a file.

- You know how to filter a file line by line.

</text-box>

## Introduction to Files
Computers have several programs for browsing files. These programs are specific to the operating system. All programs used for browsing files make use of the file system of the computer in one way or another. The computer's **file system** has the responsibility of keeping track of the locations of files on storage devices, as well as providing the ability to create new files and modify them. The file system's main responsibility is abstracting the true structure of the hard drive; a user or a program using a file doesn't need to care about how, or where, the file is actually stored.

During your studies, you receive, use and create a lot of **files**. Files are containers of all types of data: textual data, source code, executable program code, audio or video data, econometric data, and many other kinds. Files are organized in a tree-shaped hierarchical structure of **folders**, which can contain files or subfolders. Folders are sometimes called **directories**. A **path** tells us where a file is located in this hierarchy of folders and subfolders, separated by a path separator. On Windows, the Path separator is `\`, whereas on Linux or macOS it is `/`. A path can be **relative** to the current folder or working directory, for example the path `myfile.txt` refers to a file in the current folder, whereas the path `data/myfile.txt` refers to a file in a subfolder `data` of the current folder. An absolute path, for example `C:\Users\Jane Doe\Documents\mydata.txt` on Windows or `/home/janedoe/documents/mydata.txt` on Linux or macOS, does not depend on what the current folder is.
However, absolute paths are likely to break once you transfer a file to another computer or user, as they will probably store the file in a different location. Therefore, in your programs, you should prefer to use relative paths. However, when you have trouble locating a certain file from within your program, it is helpful to look at the absolute paths for debugging purposes.

<text-box variant='hint' name='Organizing your file system'>

We strongly advise you to organize the file system on your personal devices well, so that searching for files remains simple. For work related to your studies can do this by creating a folder `Econometrics`, then create subfolders `Year 1`, `Year 2`, `Year 3` etcetera, and in these you can create a subfolder for each course you take. Feel free to come up with a scheme you like, but be aware that keeping all your important files in your `Download` folder is asking for trouble. For more inspiration on structuring your file system, watch this video on [how to structure your file system](https://www.youtube.com/watch?v=bKjRKZxr-KY&ab_channel=ThomasFrank).

Also, we highly recommend you to back up your files from time to time, or to synchronize your local files with a cloud service such as [Dropbox](https://www.dropbox.com/referrals/AACmbdSW9rvTWjuelMVNPq7xaUhsi3c65ao?src=global9) or [OneDrive](https://onedrive.live.com?invref=163a01a4ac2d7121&invscr=90). This way, you avoid losing valuable (study) work when a device breaks down. This can save you a lot of stress, in particular when close to a study deadline.

</text-box>


### Reading files using a Scanner
In the Introduction to Programming course, we introduced the Reading of files to you by use of the Scanner-class. When we want to read a file using the Scanner-class, we give the path for the file we want to read as a parameter to the constructor of the class. The path to the file can be acquired using Java's `Paths.get` command, which converts a path in string format to a `Path` object representing the path. For example, you can use `Paths.get("filename.extension")`. If you want to obtain a file in a subfolder, you can pass multiple arguments to `Path.get`, for example `Paths.get("data", "week1", "mydata.txt")`, which will obtain a `Path` object for a file that is located in a subsubfolder of the local directory.

When the `Scanner`-object that reads the file has been created, the file can be read using a while-loop. The reading proceeds until all the lines of the file have been read, i.e., until the scanner finds no more lines to read. Reading a file may result in an error, so that a try-catch block is necessary.

```java
// First, import required classes
import java.util.Scanner;
import java.nio.file.Paths;

// In the program:

// We create a Scanner for reading the file
try (Scanner scanner = new Scanner(Paths.get("file.txt"))) {

    // We read the file until all lines have been read
    while (scanner.hasNextLine()) {
        // We read one line
        String row = scanner.nextLine();
        // We print the line that we read
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
File f = Paths.get("myfile.txt").toFile();
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

- Trying to read/write a file, but don't have permission (for instance because the file is still open).

- Trying to write to a file, but disk space was no longer available.

## Writing files
Next, let's take a look at writing data to files. The [PrintWriter](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/io/PrintWriter.html) class offers the functionality to write to files. The constructor of the `PrintWriter` class receives as its parameter a string that represents the location of the target file.

```java
PrintWriter writer = new PrintWriter("file.txt");
writer.println("Hello file!"); //writes the string "Hello file!" and line change to the file
writer.println("More text");
writer.print("And a little extra"); // writes the string "And a little extra" to the file without a line change
writer.close(); //closes the file and ensures that the written text is saved to the file
```

In the example above, we write to the file "file.txt" the string "Hello file!", followed by a line change and some additional text. Take notice that when writing to the file, the method `print` does not add line changes, and you have to add them yourself. In contrast, the method `println` adds a new line change at the end of the parameter string it receives. You are already very familiar with this use because of `System.out.println()`.

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

In the `writeToFile` method above, we begin by creating a `PrintWriter` object. It writes data to the file that is located at the path that the string `fileName` indicates. After this, we write the text to the file by calling the `println` method. The possible exception that the constructor throws has to be handled with a `try-catch` block, or the handling responsibility has to be transferred elsewhere. In the `writeToFile` method, the responsibility to handle the exception is placed on the method that calls `writeToFile`.

Let's create a `main` method that calls the `writeToFile` of a `Storer` object. There is nothing to force the `main` method to handle the exception -- it, too, can state that it might throw an exception by adding `throws Exception` to the method definition.

```java
public static void main(String[] args) throws Exception {
    Storer storer = new Storer();
    storer.writeToFile("diary.txt", "Dear diary, today was a good day.");
}
```

By calling the method above, we create a file called "diary.txt" and write the text "Dear diary, today was a good day." into it. If the file already exists, the earlier contents are erased when we store the new text.

It is also possible to handle files in a way that adds the new text after the existing content. In that case, you might want to use the [FileWriter](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/io/FileWriter.html) class.

Other than the filename in the Storer method, it is also possible to pass a File to the constructor of the PrintWriter. Consider the following example:
```java
Random ran = new Random(233);
File f = new File("dicethrows.csv");
try (PrintWriter pw = new PrintWriter(f)) {
    pw.println("throw1, throw2");
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

As you can see, we have added a call to the PrintWriter's flush method. The PrintWriter maintains a buffer, as it is typically more efficient to write a lot of data to a storage device at once. If we want to be sure that all printed data is actually written to the file, we should call flush(). If the program crashes before the file is closed, non-flushed data may not have been written to the file. When the PrintWriter is closed, the flush method is called automatically. Since we have used the PrintWriter inside a `try-with-resources` environment, the PrintWriter would already have closed after the flush line, thus automatically calling it. Here, the flush() call is thus just for demonstration purposes, but it is good to know that you should remember to close or flush a PrintWriter if you keep a file open for a longer time.

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

## Files class
An alternative for reading files is given in the `Files` class. This class is extremely convenient for reading files.
As you can see in the [Documentation](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/nio/file/Files.html), the methods `Files.readAllLines(Path path)` and `Files.readAllLines(Path path, Charset cs)` are provided, that both read all the lines of a file and puts them into a `List<String>`.
This class also provides methods for writing, such as `write(Path path, byte[] bytes, OpenOption... options)`.
Below, a simple example of the use of this class is provided:

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class ReadAllLinesExample {
    public static void main(String[] args) throws IOException {
        Path path = Files.createTempFile("test-file", ".txt");
        Files.write(path, "Hello there!\n I love programming!\n".getBytes());
        List<String> lines = Files.readAllLines(path);
        for(String line : lines) {
           System.out.println(line);
        }
    }
}
```

In this example, a few things stand out. Firstly, the method throws an `IOException`, because there could occur quite some problems when writing and reading files. The exception is passed to the handler, who is in this case the programmer using the code.
Also, the file that is written in the second line, contains some `\n` arguments, that are equivalent to `enter`s.
After all lines from the just-made file are read, they are printed in a for-each loop.
The expected output is the following:

<sample-output>

Hello there!
I love programming!


</sample-output>

<text-box variant='hint' name='Character Encoding'>

As you might have noticed, one of the read methods that are provided by the `Files` class, takes a [Charset](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/nio/charset/Charset.html) as an argument.
This can be important when you deal with data that contains special characters such as &#233; or Emoji. You can read more in the [background content on this topic](./6-character encoding).

</text-box>
