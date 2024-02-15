package Java;

class Customer {

    //Gets the data from the graph and uses it. This represents the customer view
    private IRetrieveGraph graph;

    //Customer Object will be the user once a user interface is established
    public Customer(IRetrieveGraph graph) {
        this.graph = graph;
    }

    //Prints the graph in the terminal
    public void viewStockData() {
        graph.visualizeData();
    }
}
