package sad.User.Class;

import sad.User.Interface.IUser;

public class UserDetails implements IUser {

  private String name;
  private String password;

  // Constructor
  public UserDetails(String name, String password) {
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
