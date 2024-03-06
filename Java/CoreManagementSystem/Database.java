package Java.CoreManagementSystem;

import Java.Customer_Manager.Customer;
import Java.StocksInfo_Manager.IGetStocks;
import Java.StocksInfo_Manager.Stocks;
import java.util.ArrayList;
import java.util.List;

//Stock data is stored in here for graphical updates, it also allows the stocks to remain even if an internet connection error occurs
public class Database implements IRetrieveData {

    private List<IGetStocks> stocksList = new ArrayList<>();
    private List<Customer> usersList = new ArrayList<>();

    //Stores the stock data and formats it
    public void getStockData(String stockName, float stockValue) {
        Stocks stock = new Stocks(stockName, stockValue);
        stocksList.add(stock);
    }

    public boolean checkUser(String login, String password) {
        List<Customer> usersList = GetUsersList();
        for (Customer customer : usersList) {
            if (customer.getName() == login) {
                if (customer.getPassword() == password) return true; else {
                    // case if correct login but wrong password
                    System.out.println("Wrong password");
                    return false;
                }
            }
        }
        // case if no customer name found
        System.out.println("Wrong login");
        return false;
    }

    public List<IGetStocks> getStocksList() {
        return stocksList;
    }

    public List<Customer> GetUsersList() {
        return usersList;
    }
}
