package Java.CoreManagementSystem;

import Java.StocksInfo_Manager.IGetStocks;
import java.util.List;

public interface IRetrieveData {
    //This links the database to the stocks class and stores all the stocks
    void getStockData(String stockName, float stockValue);
    boolean checkUser(String login, String password);
}
