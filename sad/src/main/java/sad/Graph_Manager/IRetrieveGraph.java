package sad.Graph_Manager;

import java.util.List;
import sad.StocksInfo_Manager.IGetStocks;

public interface IRetrieveGraph {
  //This interface links the graph to the database and gets all of the data that is stored in the database
  void getGraphData(List<IGetStocks> stocksList);

  void visualizeData();
}
