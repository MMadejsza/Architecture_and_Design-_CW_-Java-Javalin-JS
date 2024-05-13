package sad.NotifiactionSystem;

import java.util.List;

import sad.Database.Interface.IRetrieveData;
import sad.Stocks.IGetStocks;
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
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'getStockData'");
  }

  @Override
  public List<IGetStocks> getStocksList() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'getStocksList'");
  }

  @Override
  public boolean checkUser(String login, String password) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'checkUser'");
  }

  @Override
  public List<UserDetails> getUsersList() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'getUsersList'");
  }

  @Override
  public void sendData(Object data) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'sendData'");
  }

  @Override
  public int receiveData() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'receiveData'");
  }

  @Override
  public void pushNotification(String notification, String status) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'pushNotification'");
  }


}
