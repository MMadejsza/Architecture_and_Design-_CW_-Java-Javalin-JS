package sad.Database.Interface;

import java.util.List;

import sad.User.Class.UserDetails;

public interface IRetrieveData {
  //This links the database to the stocks class and stores all the stocks
  void getStockData(String stockName, float stockValue);
  boolean checkUser(String login, String password);
  List<UserDetails> getUsersList();
}
