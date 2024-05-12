package sad.Database;

import java.util.List;

import sad.Stocks.IGetStocks;
import sad.User.Customer;

public interface IRetrieveData {
  //This links the database to the stocks class and stores all the stocks
  void getStockData(String stockName, float stockValue);
  List<IGetStocks> getStocksList();
  boolean checkUser(String login, String password);
  List<Customer> getUsersList();
}
