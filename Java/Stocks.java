package Java;

public class Stocks {
    public String stockName;
    public float stockValue;

    public Stocks(String stockName, float stockValue) {
        this.stockName = stockName;
        this.stockValue = stockValue;
    }

    public String getStockNames(){
        return stockName;
    }

    public float getStockValues(){
        return stockValue;
    }
}
