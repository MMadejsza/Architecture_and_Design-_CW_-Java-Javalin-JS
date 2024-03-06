package Java.CoreManagementSystem;

import Java.Customer_Manager.Customer;

public class Login implements ILogin {

    private String login;
    private String password;
    private Customer customerManager;

    public void Login(String login, String password) {
        this.login = login;
        this.password = password;
    }

    public boolean ValidateCredentials() {
        // if (customerManager.checkCustomer(getLogin(), getPassword())) {
        //     return true;
        // } else return false;

        // test return (to be deleted)
        return true;
    }

    public void GrantAccess() {
        if (this.ValidateCredentials()) {
            // piece of code calling html/website to remove blocking overlay
        } else {
            // error alert
        }
    }

    public String getLogin() {
        return login;
    }

    public String getPassword() {
        return password;
    }
}
