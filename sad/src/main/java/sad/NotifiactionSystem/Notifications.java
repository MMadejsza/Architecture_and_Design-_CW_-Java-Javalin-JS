package sad.NotifiactionSystem;

import java.util.List;

import sad.Database.Class.Database;
import sad.Database.Interface.IRetrieveData;
import sad.User.Class.UserDetails;
import sad.User.Interface.ISetWatchPrice;

public class Notifications implements INotifications, ISetWatchPrice, IRetrieveData {

  public String notification;
  public String status;

  public Notifications(String notification, String status) {
    this.notification = notification;
    this.status = status;
  }

 
  @Override
  public void getStockData(String stockName, float stockValue) {
      // Retrieve stock data from the Database class
      new Database().getStockData(stockName, stockValue);
  }
  
  @Override
  public boolean checkUser(String login, String password) {
      // Check user credentials using Database class
      return new Database().checkUser(login, password);
  }
  
  @Override
  public List<UserDetails> getUsersList() {
      // Retrieve users list from the Database class
      return new Database().getUsersList();
  }

  @Override
  public void sendData(Object data) {
    
  }

  @Override
  public int receiveData() {
    return 0;
  }

  @Override
  public void pushNotification(String notification, String status) {
    System.out.println(notification + " has reached " + status + " on your watchlist");
  }

}
