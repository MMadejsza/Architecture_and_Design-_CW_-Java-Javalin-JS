package sad.Database.Class;

import java.util.ArrayList;
import java.util.List;

import sad.Database.Interface.IReadData;
import sad.Database.Interface.IStoreData;
import sad.Stocks.IGetStocks;
import sad.User.Class.UserDetails;

//Stock data is stored in here for graphical updates, it also allows the stocks to remain even if an internet connection error occurs
public class Database implements IStoreData, IReadData{

  private List<IGetStocks> stocksList = new ArrayList<>();
  public static List<UserDetails> usersList = new ArrayList<>();

  //Stores the stock data and formats it
  public void getStockData(String stockName, float stockValue) {
  }

  public boolean checkUser(String login, String password) {
    List<UserDetails> usersList = getUsersList();
    for (UserDetails customer : usersList) {
      if (customer.getName().equals(login)) {
        if (customer.getPassword().equals(password)) return true; 
        else {
          // case if correct login but wrong password
          System.out.println("Wrong password");
          return false;
        }
      }
    }
    // case if no customer name found
    System.out.println("Wrong login");
    return false;
  }

  public List<IGetStocks> getStocksList() {
    return stocksList;
  }

  public List<UserDetails> getUsersList() {
    return usersList;
  }
}
