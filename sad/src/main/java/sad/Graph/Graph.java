package sad.Graph;

import java.util.List;

import sad.Database.IRetrieveData;
import sad.Stocks.IGetStocks;

//Creates a visual representation of stock values
public class Graph implements IRetrieveGraph {

  private IRetrieveData dataRetrieved;

  //Gets the data from the database
  public Graph(IRetrieveData dataRetrieved) {
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
}
