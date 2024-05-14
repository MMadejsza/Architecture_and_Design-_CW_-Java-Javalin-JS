package sad.User.Class;

import java.util.ArrayList;
import java.util.List;

import sad.User.Interface.IWatchlist;

public class Watchlist implements IWatchlist {

    private List<Stock> watchList = new ArrayList<>();

    public Watchlist() {}

    @Override
    public void addStockToWatchList(String stockName, Double price) {
        Stock stock = new Stock(stockName, price);
        watchList.add(stock);
    }

    @Override
    public void deleteStockInWatchList(String stockName) {
        watchList.removeIf(stock -> stock.getName().equals(stockName));
    }

    private class Stock {
        private String name;
        public Stock(String name, double price) {
            this.name = name;
        }

        public String getName() {
            return name;
        }
    }
}
