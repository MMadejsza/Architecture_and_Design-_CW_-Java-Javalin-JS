package sad.Database.Class;

import sad.Database.Interface.IStoreData;
import sad.Stocks.IGetStocks;
import sad.Stocks.Stocks;

public class UpdateDatabase implements IGetStocks, IStoreData {

    @Override
    public String StocksInfo(String stockName) {
        // Create an instance of the Stocks class
        Stocks stocks = new Stocks();
        
        // Call the static method StocksInfo from the Stocks class
        String info = stocks.StocksInfo(stockName);
        
        return info;
    }

    @Override
    public String GetStocksInfo() {
        return null;
    }
    
}
