package sad.Graph;

import java.util.List;

import sad.Stocks.IGetStocks;

public interface IRetrieveGraph {
  //This interface links the graph to the database and gets all of the data that is stored in the database
  void getGraphData(List<IGetStocks> stocksList);

  void visualizeData();
}
