package sad.Database.Class;

import java.util.List;

import sad.Database.Interface.IReadData;
import sad.Database.Interface.IRetrieveData;
import sad.Stocks.IGetStocks;
import sad.User.Class.UserDetails;

public class RetrieveData implements IReadData, IRetrieveData {

    private Database database;

    public RetrieveData(Database database) {
        this.database = database;
    }
    @Override
    public List<UserDetails> getUsersList() {
        return Database.usersList;
    }

    @Override
    public void getStockData(String stockName, float stockValue) {
        getStockData(stockName, stockValue);
    }

    @Override
    public boolean checkUser(String login, String password) {
        for (UserDetails user : Database.usersList) {
            if (user.getName().equals(login) && user.getPassword().equals(password)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public String GetDataFromDB(String stockName) {
         List<IGetStocks> stocksList = database.getStocksList();

        
        for (IGetStocks stock : stocksList) {
            if (stock.GetStocksInfo().equalsIgnoreCase(stockName)) {  
                return stock.toString();
            }
        }
        return "Stock not found";
    }
}
    

