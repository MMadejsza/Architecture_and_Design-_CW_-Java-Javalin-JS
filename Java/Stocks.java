package Java;

//This provides structure to the stocks, stocks will be formatted and saved through here
public class Stocks implements IGetStocks{
    public String stockName;
    public float stockValue;

    // These are the variables listed for stock
    public Stocks(String stockName, float stockValue) {
        this.stockName = stockName;
        this.stockValue = stockValue;
    }

    //retrives the name of the stocks
    public String getStockNames(){
        return stockName;
    }

    //retrives the value of the stocks
    public float getStockValues(){
        return stockValue;
    }
}