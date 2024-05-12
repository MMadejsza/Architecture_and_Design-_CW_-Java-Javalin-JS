package sad.Graph.Class;

import java.util.List;

import sad.Graph.Interface.IPlotGraph;
import sad.Graph.Interface.IRetrieveGraph;
import sad.Stocks.IGetStocks;

public class PlotGraph implements IPlotGraph, IRetrieveGraph {

    @Override
    public void getGraphData(List<IGetStocks> stocksList) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getGraphData'");
    }

    @Override
    public void visualizeData() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'visualizeData'");
    }
    
}
