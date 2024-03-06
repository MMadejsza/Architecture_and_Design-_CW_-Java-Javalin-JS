package Java.CoreManagementSystem;

import java.util.ArrayList;
import java.util.List;

import Java.StocksInfo_Manager.IGetStocks;
import Java.StocksInfo_Manager.Stocks;

//Stock data is stored in here for graphical updates, it also allows the stocks to remain even if an internet connection error occurs
public class Database implements IRetrieveData {
    private List<IGetStocks> stocksList = new ArrayList<>();

    //Stores the stock data and formats it
    public void getStockData(String stockName, float stockValue){
        Stocks stock = new Stocks(stockName, stockValue);
        stocksList.add(stock);
    };

    public List<IGetStocks> getStocksList(){
        return stocksList;
    }

}

