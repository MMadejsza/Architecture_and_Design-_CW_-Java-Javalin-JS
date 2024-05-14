package sad.User.Class;

import sad.Database.Class.Database;
import sad.User.Interface.ILogin;

public class Login implements ILogin {

    private String login;
    private String password;
    private Database database;

    public Login(String login, String password, Database database) {
        this.login = login;
        this.password = password;
        this.database = database;
    }

    @Override
    public boolean validateCredentials() {
        return database.checkUser(login, password);
    }

    @Override
    public void addUser(String login, String password) {
        database.addUser(login, password);
    }
}

