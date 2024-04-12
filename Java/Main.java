package Java;

import java.util.Scanner;

import Java.CoreManagementSystem.Database;
import Java.CoreManagementSystem.IRetrieveData;
import Java.Customer_Manager.Customer;
import Java.Graph_Manager.Graph;
import Java.Graph_Manager.IRetrieveGraph;

public class Main {

    public static void main(String[] args) {
        //Creating new instances for each class
        Scanner scanner = new Scanner(System.in);
        IRetrieveData database = new Database();
        IRetrieveGraph graph = new Graph(database);
        
        //Stocks created for the database
        database.getStockData("Apple", 150.0f);
        database.getStockData("Google", 200.0f);
        database.getStockData("Tesla", 450.0f);

        Database.usersList.add(new Customer("Adam", "Password"));
        
        String user;
        String password;
        int x = 1;
        
        //See all stocks
        while (x == 1)
        {
            System.out.println("Enter Username: ");
            user = scanner.nextLine();
            System.out.println("Enter Password: ");
            password = scanner.nextLine();
            if(database.checkUser(user, password) == true)
            {
                x = 0;
            }
            
        }
        
        int input;
        input = scanner.nextInt();
        while (input != 0) {
            switch (input) {

            case 0:
                break;

            case 1:
                graph.visualizeData();

            case 2:
                

            default:
                System.out.println("There was a bad input please try again\n");
                break;
        }
        }
        
        scanner.close();
        
    }
}
