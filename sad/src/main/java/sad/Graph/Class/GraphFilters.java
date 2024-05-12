package sad.Graph.Class;

import java.util.List;

import sad.Database.Interface.IRetrieveData;
import sad.Graph.Interface.IPlotGraph;
import sad.Stocks.IGetStocks;
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

    for (IGetStocks stock : stocksList) {
      System.out.println(
        "----------------------------------------------------------------------------\n"
      );

    }
    System.out.println(
      "----------------------------------------------------------------------------\n"
    );
  }

  public void visualizeData() {
    List<IGetStocks> stocksList = dataRetrieved.getStocksList();
    getGraphData(stocksList);
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
}
