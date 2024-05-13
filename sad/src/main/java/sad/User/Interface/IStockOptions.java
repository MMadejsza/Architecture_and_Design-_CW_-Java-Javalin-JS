package sad.User.Interface;

import sad.User.Class.StockOptions;

public interface IStockOptions{
    
    void BuyStock(StockOptions company, int quantity);
    void SellStock();
}
