package sad.Database.Class;

import java.util.ArrayList;
import java.util.List;

import sad.Database.Interface.IReadData;
import sad.Database.Interface.IStoreData;
import sad.Stocks.IGetStocks;
import sad.User.Class.UserDetails;
import sad.User.Interface.ILogin;

//Stock data is stored in here for graphical updates, it also allows the stocks to remain even if an internet connection error occurs
public class Database implements IStoreData, IReadData, ILogin{

  List<IGetStocks> stocksList = new ArrayList<>();
  public static List<UserDetails> usersList = new ArrayList<>();

  //Stores the stock data and formats it
  public void getStockData(String stockName, float stockValue) {
  }


  public List<IGetStocks> getStocksList() {
    return stocksList;
  }

  public List<UserDetails> getUsersList() {
    return usersList;
  }

@Override
public boolean validateCredentials() {
    return false;
}


@Override
public void addUser(String login, String password) {
  UserDetails newUser = new UserDetails(login, password);
  usersList.add(newUser);
}


@Override
public String GetDataFromDB(String stockName) {
  return null;
}


public boolean checkUser(String login, String password) {
  List<UserDetails> userList = getUsersList(); // Access the user list from the Database class
  for (UserDetails user : userList) {
      if (user.getName().equals(login) && user.getPassword().equals(password)) {
          return true;
      }
  }
  return false;
}
}
