package Java.CoreManagementSystem;

import java.util.List;

import Java.StocksInfo_Manager.IGetStocks;

public interface IRetrieveData {
    //This links the database to the stocks class and stores all the stocks
    void getStockData(String stockName, float stockValue);
    List<IGetStocks> getStocksList();
    boolean checkUser(String login, String password);
}
