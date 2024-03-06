package Java.CoreManagementSystem;

public class Login implements ILogin {

    private String login;
    private String password;
    private Database database;

    public void Login(String login, String password) {
        this.login = login;
        this.password = password;
    }

    public boolean ValidateCredentials() {
        if (database.checkUser(getLogin(), getPassword())) {
            return true;
        } else return false;
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
