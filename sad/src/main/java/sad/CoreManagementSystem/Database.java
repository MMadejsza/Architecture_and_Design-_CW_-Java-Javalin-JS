package sad.CoreManagementSystem;

import java.util.ArrayList;
import java.util.List;

import sad.Customer_Manager.Customer;
import sad.StocksInfo_Manager.IReadStocks;
import sad.StocksInfo_Manager.Stocks;

public class Database implements IRetrieveData, IReadStocks {

  private List<String> stockDataList = new ArrayList<>();
  public static List<Customer> usersList = new ArrayList<>();

  @Override
  public void getStockData(String stockName, float stockValue) {
    // You can add your logic to store stock data here if needed
  }

  @Override
  public boolean checkUser(String login, String password) {
    List<Customer> usersList = getUsersList();
    for (Customer customer : usersList) {
      if (customer.getName().equals(login)) {
        if (customer.getPassword().equals(password)) return true; 
        else {
          System.out.println("Wrong password");
          return false;
        }
      }
    }
    System.out.println("Wrong login");
    return false;
  }

  @Override
  public List<IReadStocks> getStocksList() {
    // You can implement this method if needed
    return null;
  }

  @Override
  public List<Customer> getUsersList() {
    return usersList;
  }

  @Override
  public String StocksInfo(String stockName){
    Stocks stocks = new Stocks(); 
    String stockInfo = stocks.StocksInfo(stockName); 
    if (stockInfo != null) {
      stockDataList.add(stockInfo);
      return stockInfo; 
    } else {
      return "Failed to retrieve stock information";
    }
  }

  public List<String> getStockDataList() {
    return stockDataList;
  }
}
