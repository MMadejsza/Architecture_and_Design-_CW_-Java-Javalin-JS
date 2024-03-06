package Java.CoreManagementSystem;

import Java.StocksInfo_Manager.IGetStocks;
import Java.StocksInfo_Manager.Stocks;
import java.util.ArrayList;
import java.util.List;

//Stock data is stored in here for graphical updates, it also allows the stocks to remain even if an internet connection error occurs
public class Database implements IRetrieveData {

    private List<IGetStocks> stocksList = new ArrayList<>();
    private List<IGetStocks> usersList = new ArrayList<>();

    //Stores the stock data and formats it
    public void getStockData(String stockName, float stockValue) {
        Stocks stock = new Stocks(stockName, stockValue);
        stocksList.add(stock);
    }

    public boolean checkUser(String login, String password) {
        List<IGetStocks> userlist = GetUsersList()
        return userlist.contains()
    };

    public List<IGetStocks> getStocksList() {
        return stocksList;
    }
    public List<IGetStocks> GetUsersList() {
        return usersList;
    }
}
