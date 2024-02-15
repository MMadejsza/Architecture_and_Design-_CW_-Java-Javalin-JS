package Java;

public class Main {

    public static void main(String[] args) {
        //Creating new instances for each class
        IRetrieveData database = new Database();
        IRetrieveGraph graph = new Graph(database);
        Customer customer = new Customer(graph);

        //Stocks created for the database
        database.getStockData("Apple", 150.0f);
        database.getStockData("Google", 200.0f);
        database.getStockData("Tesla", 450.0f);

        //See all stocks
        customer.viewStockData();
    }
}
