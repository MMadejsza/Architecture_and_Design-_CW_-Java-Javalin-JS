package sad;

import java.nio.file.Files;
import java.nio.file.Paths;

import io.javalin.Javalin;
import sad.CoreManagementSystem.Database;
import sad.Customer_Manager.Customer;
import sad.StocksInfo_Manager.Stocks;

public class Main {

  public static void main(String[] args) {
    Stocks stocksManager = new Stocks();
    Database databaseManager = new Database();
    Database.usersList.add(new Customer("a", "a"));
    


    // Create a new Javalin instance
    Javalin app = Javalin
      .create(config -> {
        // Specify the directory to serve static files from
        String resourcePath = getResourcePath();
        config.staticFiles.add(resourcePath);

        // Specify the location of CSS and JavaScript files
        config.staticFiles.add(resourcePath + "/css");
        config.staticFiles.add(resourcePath + "/js");
      })
      .start(3001);

    // Define a route to handle the button click
    app.get("/", ctx -> ctx.html(getFileContent("index.html")));
    app.get("/login", ctx -> ctx.html(getFileContent("login.html")));
    app.get("/portfolio", ctx -> ctx.html(getFileContent("portfolio.html")));
    app.get("/about", ctx -> ctx.html(getFileContent("about.html")));

    app.get(
      "/fetchedStocks",
      ctx -> {
        // Get the startDate and endDate query parameters from the frontend to use in yahoo stocks call
        String name = ctx.queryParam("name");
        String startDate = ctx.queryParam("startDate");
        String endDate = ctx.queryParam("endDate");

      

        String test = stocksManager.StocksInfo(name);

        ctx.contentType("application/json").result(test);
      }
    );

    app.get(
      "/loginCredentials",
      ctx -> {
        // Get the startDate and endDate query parameters from the frontend to use in yahoo stocks call
        String login = ctx.queryParam("name");
        String password = ctx.queryParam("password");
        // Sample data

        //Make the function selfcontaining, and when the stock is called produce the data
        boolean test = databaseManager.checkUser(login, password);
        // Create a JSON object representing the result
        // Construct JSON string representing the result
        String resultJson = "{\"authorized\": " + test + "}";

        ctx.contentType("application/json").result(resultJson);
      }
    );
  }

  // Method to read file content as a String
  private static String getFileContent(String fileName) {
    try {
      // Obtain the absolute path to the resources directory within the java directory
      String resourceDir = Paths
        .get("src", "main", "java", "resources")
        .toString();
      // Read the file content using the absolute path
      return new String(Files.readAllBytes(Paths.get(resourceDir, fileName)));
    } catch (Exception e) {
      e.printStackTrace();
      return "Error loading file";
    }
  }

  // Method to get the absolute path to the resources directory
  public static String getResourcePath() {
    try {
      String resourcePath =
        Main.class.getClassLoader().getResource("resources").getPath();
      System.out.println("Resource path: " + resourcePath);
      return resourcePath;
    } catch (Exception e) {
      e.printStackTrace();
      return "";
    }
  }
}
