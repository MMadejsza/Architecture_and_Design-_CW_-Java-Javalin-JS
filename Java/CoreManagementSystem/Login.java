package Java.CoreManagementSystem;

public class Login implements ILogin {

    private String login;
    private String password;
    private Database database;

    public Login(String login, String password, Database database) {
        this.login = login;
        this.password = password;
        this.database = database;
    }

    public boolean ValidateCredentials() {
        return database.checkUser(getLogin(), getPassword());
    }

    public void GrantAccess() {
        if (this.ValidateCredentials()) {
            // piece of code calling html/website to remove blocking overlay
        } else {
            // error alert
            System.out.println("Try to log in again.");
        }
    }

    public String getLogin() {
        return login;
    }

    public String getPassword() {
        return password;
    }
}
