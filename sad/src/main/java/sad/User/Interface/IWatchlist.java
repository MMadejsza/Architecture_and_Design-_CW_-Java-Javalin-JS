package sad.User.Interface;

public interface IWatchlist {
  void addStockToWatchList(String stock, Double price);
  void deleteStockInWatchList(String stock);
}
