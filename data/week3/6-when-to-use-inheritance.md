---
path: '/week3/6-when-to-use-inheritance'
title: 'When to use inheritance'
hidden: false
extra: true
---

<text-box variant='learningObjectives' name='Learning Objectives'>

- You can assess when to use inheritance, and you can come up with an example that is ill-suited for inheritance.

</text-box>

# When is inheritance worth using?
Inheritance is a tool for building and specializing hierarchies of concepts; a subclass is always a special case of the superclass. If the class to be created is a special case of an existing class, this new class could be created by extending the existing class. For example, in the previously discussed car part scenario an engine **is** a part, but an engine has extra functionality that not all parts have.

When inheriting, the subclass receives the functionality of the superclass. If the subclass doesn't need or use some of the inherited functionality, inheritance is not justifiable. Classes that inherit will inherit all the methods and interfaces from the superclass, so the subclass can be used in place of the superclass wherever the superclass is used. It's a good idea to keep the inheritance hierarchy shallow, since maintaining and further developing the hierarchy becomes more difficult as it grows larger. Generally speaking, if your inheritance hierarchy is more than 2 or 3 levels deep, the structure of the program could probably be improved.

Inheritance is not useful in every scenario. For instance, extending the class `Car` with the class `Part` (or `Engine`) would be incorrect. A car **includes** an engine and parts, but an engine or a part is not a car. More generally, **if an object owns or is composed of other objects, inheritance should not be used**.

When using inheritance, you should take care to ensure that the [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle) holds true. There should only be one reason for each class to change. If you notice that inheriting adds more responsibilities to a class, you should form multiple classes of the class.

## Example of misusing inheritance
Let's consider a postal service and some related classes. `Customer` includes the information related to a customer, and the class `Order` that inherits from the `Customer` class and includes the information about the ordered item. The class `Order` also has a method called `postalAddress` which represents the postal address that the order is shipped to.

```java
public class Customer {

    private String name;
    private String address;

    public Customer(String name, String address) {
        this.name = name;
        this.address = address;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
```

```java
public class Order extends Customer {

    private String product;
    private String count;

    public Order(String product, String count, String name, String address) {
        super(name, address);
        this.product = product;
        this.count = count;
    }

    public String getProduct() {
        return product;
    }

    public String getCount() {
        return count;
    }

    public String postalAddress() {
        return this.getName() + "\n" + this.getAddress();
    }
}
```

Above inheritance is not used correctly. When inheriting, the subclass must be a special case of the superclass; an order is definitely not a special case of a customer. The misuse shows itself in how the code breaks the single responsibility principle: the `Order` class is responsible both for maintaining the customer information and the order information.

The problem becomes very clear when we think of what a change in a customer's address would cause.
In the case that an address changes, we would have to change *every* order object that relates to that customer. This is hardly ideal. A better solution would be to encapsulate the customer as an object variable of the `Order` class. Thinking more closely on the semantics of an order, this seems intuitive. *An order has a customer*.

Let's modify the `Order` class so that it includes a reference to a `Customer` object.

```java
public class Order {

    private Customer customer;
    private String product;
    private String count;

    public Order(Customer customer, String product, String count) {
        this.customer = customer;
        this.product = product;
        this.count = count;
    }

    public String getProduct() {
        return product;
    }

    public String getCount() {
        return count;
    }

    public String postalAddress() {
        return this.customer.getName() + "\n" + this.customer.getAddress();
    }
}
```

This version of the `Order` class is better. The method `postalAddress` uses the *customer* reference to obtain the postal address instead of inheriting the class `Customer`. This helps both the maintenance of the program and its concrete functionality.

Now, when a customer changes, all you need to do is change the customer information; there is no need to change the orders.
