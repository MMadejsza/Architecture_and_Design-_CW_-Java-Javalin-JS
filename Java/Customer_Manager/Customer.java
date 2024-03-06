package Java.Customer_Manager;

public class Customer implements ICustomer {

    private String name;
    private String password;

    // Constructor
    public Customer(String name, String password) {
        this.name = name;
        this.password = password;
    }

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
