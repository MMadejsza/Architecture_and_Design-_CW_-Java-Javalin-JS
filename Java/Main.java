package Java;

import java.awt.Component;
import java.util.Scanner;

import javax.swing.JFrame;

import Java.CoreManagementSystem.Database;
import Java.CoreManagementSystem.IRetrieveData;
import Java.Customer_Manager.Customer;
import Java.Graph_Manager.Graph;

public class Main {

    public static void main(String[] args) {
        //Creating new instances for each class
        Scanner scanner = new Scanner(System.in);
        IRetrieveData database = new Database();
        Component graph = new Graph(database);
        JFrame GUI = new JFrame("Stocks and Shares");
        
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
        
        scanner.close();
        GUI.add(graph);
        GUI.setSize(800,600);
        GUI.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        GUI.setVisible(true);
        
    }
}
