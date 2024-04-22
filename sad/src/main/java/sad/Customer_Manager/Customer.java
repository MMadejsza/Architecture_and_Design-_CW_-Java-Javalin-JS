package sad.Customer_Manager;

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

  public String getPassword() {
    return password;
  }
}
