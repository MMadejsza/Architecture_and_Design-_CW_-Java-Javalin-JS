package Java.Customer_Manager;
import java.util.ArrayList;
import java.util.List;

public class Watchlist implements IWatchlist {

    List <Watchlist> watchList = new ArrayList<>();
    
    public Watchlist(){}

    @Override
    public void addStockToWatchList(Watchlist stock){
        watchList.add(stock);
    }

    @Override
    public void deleteStockInWatchList(Watchlist stock){
        watchList.remove(stock);
    }
}
