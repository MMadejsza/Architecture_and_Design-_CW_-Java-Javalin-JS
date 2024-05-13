package sad.User.Class;

import java.util.ArrayList;
import java.util.List;

import sad.User.Interface.IWatchlist;

public class Watchlist implements IWatchlist {

  List<Watchlist> watchList = new ArrayList<>();

  public Watchlist() {}

  @Override
  public void addStockToWatchList(Watchlist stock, price) {
    watchList.add(stock, price);
  }

  @Override
  public void deleteStockInWatchList(Watchlist stock) {
    watchList.remove(stock);
  }
}
