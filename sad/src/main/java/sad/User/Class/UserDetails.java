package sad.User.Class;

import sad.Database.Class.Database;
import sad.User.Interface.ILogin;
import sad.User.Interface.IPortfolio;
import sad.User.Interface.IStockOptions;
import sad.User.Interface.IUser;
import sad.User.Interface.IUserPreferences;
import sad.User.Interface.IWatchlist;

public class UserDetails implements IUser, ILogin,IPortfolio, IStockOptions, IWatchlist, IUserPreferences {

  private String name;
  private String password;

// Creating the constructor for User Details
  public UserDetails(String name, String password) {
    this.name = name;
    this.password = password;
  }

//Getters
  public String getName() {
    return name;
  }

  public String getPassword() {
    return password;
  }

  //Adds stock to the watchlist as well as price of it
 @Override
public void addStockToWatchList(String stock, Double price) {
    IWatchlist watchlist = new Watchlist();
    watchlist.addStockToWatchList(stock, price);
}

//Deletes the stock in a watchlist
@Override
public void deleteStockInWatchList(String stock) {
    IWatchlist watchlist = new Watchlist();
    watchlist.deleteStockInWatchList(stock);
}

//Allows the user to buy stocks and adds it to a list
@Override
public void BuyStock(StockOptions company, int quantity) {
  StockOptions stock = new StockOptions();
    stock.BuyStock(company, quantity);
}

//Allows a user to sell stock and removes the stock from the list
@Override
public void SellStock() {
    StockOptions stockOptions = new StockOptions();
    stockOptions.SellStock();
}

//Portfolio gets updated
@Override
public void addCompanyInPortfolio(Portfolio company) {
    company.addCompanyInPortfolio(company);
}

//Company gets deleted from portfolio
@Override
public void deleteCompanyInPortfolio(Portfolio company) {
    company.deleteCompanyInPortfolio(company);
}

//User can login
@Override
public boolean validateCredentials() {
    ILogin login = new Login(name, password, new Database());
    return login.validateCredentials();
}

//A new user is added
@Override
public void addUser(String login, String password) {
    // Add user
    ILogin newUser = new Login(login, password, new Database());
    newUser.addUser(login, password);
}
}
