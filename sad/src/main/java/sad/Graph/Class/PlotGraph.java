package sad.Graph.Class;

import java.util.List;

import sad.Graph.Interface.IPlotGraph;
import sad.Graph.Interface.IRetrieveGraph;
import sad.Stocks.IGetStocks;

public class PlotGraph implements IPlotGraph, IRetrieveGraph {

    @Override
    public void getGraphData(List<IGetStocks> stocksList) {
    }

    @Override
    public void visualizeData() {
        
    }
    
}
