package sad.User.Class;

import java.util.ArrayList;
import java.util.List;

import sad.User.Interface.IStockOptions;

public class StockOptions implements IStockOptions {
    List<StockOptions> ownedStocks = new ArrayList<>();

    @Override
    public void BuyStock(StockOptions company, int quantity) {
        for (int i = 0; i < quantity; i++) {
            ownedStocks.add(company);
        }
    }

    @Override
    public void SellStock() {
        if (!ownedStocks.isEmpty()) {
            ownedStocks.remove(0);
        } else {
            System.out.println("No stocks to sell.");
        }
    }

}
