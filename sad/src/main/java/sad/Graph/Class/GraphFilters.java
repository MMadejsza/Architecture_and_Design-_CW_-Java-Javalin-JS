package sad.Graph.Class;

import java.util.List;

import sad.Database.Class.Database;
import sad.Database.Interface.IRetrieveData;
import sad.Graph.Interface.IPlotGraph;
import sad.Stocks.IGetStocks;
import sad.User.Class.Login;
import sad.User.Class.UserDetails;

//Creates a visual representation of stock values
public class GraphFilters implements IPlotGraph, IRetrieveData {

  private IRetrieveData dataRetrieved;

  //Gets the data from the database
  public GraphFilters(IRetrieveData dataRetrieved) {
    this.dataRetrieved = dataRetrieved;
  }

  //Prepares the graph from the data provided
  public void getGraphData(List<IGetStocks> stocksList) {
    System.out.println("Stocks: ");

    for (@SuppressWarnings("unused") IGetStocks stock : stocksList) {
      System.out.println(
        "----------------------------------------------------------------------------\n"
      );

    }
    System.out.println(
      "----------------------------------------------------------------------------\n"
    );
  }

 // Retrieve stock data from the Database class
  @Override
  public void getStockData(String stockName, float stockValue) {
      dataRetrieved.getStockData(stockName, stockValue);
  }

// Check user credentials using Database class
  @Override
  public boolean checkUser(String login, String password) {
    Login log = new Login(password, password, null);
    boolean user;
    user = log.validateCredentials();
    return user;
}


// Retrieve users list from the Database class
  @Override
  public List<UserDetails> getUsersList() {
      
      return new Database().getUsersList();
  }
}

