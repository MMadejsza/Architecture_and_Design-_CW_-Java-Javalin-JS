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

  private List<IGetStocks> stocksList = new ArrayList<>();
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
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'validateCredentials'");
  }


  @Override
  public void grantAccess() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'grantAccess'");
  }
}
