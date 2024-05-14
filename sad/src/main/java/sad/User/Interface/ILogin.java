package sad.User.Interface;

public interface ILogin {
    boolean validateCredentials();
    void addUser(String login, String password);
}