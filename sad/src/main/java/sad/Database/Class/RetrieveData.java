package sad.Database.Class;

import java.util.List;

import sad.Database.Interface.IReadData;
import sad.Database.Interface.IRetrieveData;
import sad.Stocks.IGetStocks;
import sad.User.Class.UserDetails;

public class RetrieveData implements IReadData, IRetrieveData {

    @Override
    public void getStockData(String stockName, float stockValue) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getStockData'");
    }

    @Override
    public List<IGetStocks> getStocksList() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getStocksList'");
    }

    @Override
    public boolean checkUser(String login, String password) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'checkUser'");
    }

    @Override
    public List<UserDetails> getUsersList() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getUsersList'");
    }
    
}
