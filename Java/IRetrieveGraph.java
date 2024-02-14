package Java;

import java.util.List;

interface IRetrieveGraph {
    //This interface links the graph to the database and gets all of the data that is stored in the database
    void getGraphData(List<IGetStocks> stocksList);

    void visualiseData();
}
