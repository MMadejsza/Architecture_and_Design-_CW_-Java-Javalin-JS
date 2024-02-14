package Java;

import java.util.ArrayList;
import java.util.List;

public class Database {
    List<String> stockNameList = new ArrayList<>();
    List<Float> stockValueList = new ArrayList<>();

    public void stockData(IGetStocks stocks){
        String stockName = stocks.getStocksNames();
        float stockValue = stocks.getStockValues();
    };

    public void addStockData(String stockName, float stockValue){
        stockNameList.add(stockName);
        stockValueList.add(stockValue);
    }
}
