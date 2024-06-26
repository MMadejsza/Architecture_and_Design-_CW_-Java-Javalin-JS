package sad;

import de.neuland.jade4j.JadeConfiguration;
import de.neuland.jade4j.template.JadeTemplate;
import io.javalin.Javalin;
import java.io.File;
import java.io.File;
import java.util.HashMap;
import java.util.HashMap;
import java.util.Map;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import sad.Database.Class.Database;
import sad.Stocks.Stocks;
import sad.User.Class.UserDetails;

public class Main {

  public static void main(String[] args) {
    Stocks stocksManager = new Stocks();
    Database.usersList.add(new UserDetails("a@a.com", "a"));
    Database databaseManager = new Database();

    // Create a new Javalin instance
    Javalin app = Javalin
      .create(config -> {
        // Specify the directory to serve static files from
        String resourcePath = "/resources";
        config.staticFiles.add(resourcePath);

        // Specify the location of CSS and JavaScript files
        config.staticFiles.add(resourcePath + "/css");
        config.staticFiles.add(resourcePath + "/js");
      })
      .start(3001);

    // Define a route to handle the button click
    app.get(
      "/",
      ctx -> {
        ctx.contentType("text/html"); // Set content type to HTML
        ctx.result(getFileContent("index.pug"));
      }
    );

    app.get(
      "/login",
      ctx -> {
        ctx.contentType("text/html"); // Set content type to HTML
        ctx.result(getFileContent("login.pug"));
      }
    );

    app.get(
      "/stocks",
      ctx -> {
        ctx.contentType("text/html"); // Set content type to HTML
        ctx.result(getFileContent("stocks.pug"));
      }
    );
    app.get(
      "/watchList",
      ctx -> {
        ctx.contentType("text/html"); // Set content type to HTML
        ctx.result(getFileContent("watchList.pug"));
      }
    );
    app.get(
      "/portfolio",
      ctx -> {
        ctx.contentType("text/html"); // Set content type to HTML
        ctx.result(getFileContent("portfolio.pug"));
      }
    );

    app.get(
      "/about",
      ctx -> {
        ctx.contentType("text/html"); // Set content type to HTML
        ctx.result(getFileContent("about.pug"));
      }
    );

    app.get(
      "/fetchedStocks",
      ctx -> {
        // Get the startDate and endDate query parameters from the frontend to use in yahoo stocks call
        String name = ctx.queryParam("name");
        String test = stocksManager.StocksInfo(name);

        ctx.contentType("application/json").result(test);
      }
    );

    app.get(
      "/loginCredentialsCheck",
      ctx -> {
        // Get the startDate and endDate query parameters from the frontend to use in yahoo stocks call
        String login = ctx.queryParam("name");
        String password = ctx.queryParam("password");
        System.out.println("name: " + login);
        System.out.println("password: " + password);
        // Sample data

        //Make the function selfcontaining, and when the stock is called produce the data
        boolean test = databaseManager.checkUser(login, password);
        // Create a JSON object representing the result
        // Construct JSON string representing the result
        String resultJson = "{\"authorized\": " + test + "}";

        ctx.contentType("application/json").result(resultJson);
      }
    );

    app.post(
      "/register",
      ctx -> {
        // Get the body of the request
        String requestBody = ctx.body();

        // Manually parse the JSON body to extract the name and password using regular expressions
        String login = null;
        String password = null;

        // Define a regular expression pattern to match the "name" field
        Pattern namePattern = Pattern.compile("\"name\"\\s*:\\s*\"([^\"]+)\"");
        Matcher nameMatcher = namePattern.matcher(requestBody);
        if (nameMatcher.find()) {
          login = nameMatcher.group(1);
        }

        // Define a regular expression pattern to match the "password" field
        Pattern passwordPattern = Pattern.compile(
          "\"password\"\\s*:\\s*\"([^\"]+)\""
        );
        Matcher passwordMatcher = passwordPattern.matcher(requestBody);
        if (passwordMatcher.find()) {
          password = passwordMatcher.group(1);
        }

        // Print the received data to the console for debugging
        System.out.println("Received body: " + requestBody);
        System.out.println("Extracted login: " + login);
        System.out.println("Extracted password: " + password);

        //Make the function selfcontaining, and when the stock is called produce the data
        boolean userExists = databaseManager.checkUser(login, password);
        String msg = null;
        String status = null;
        if (!userExists) {
          Database.usersList.add(new UserDetails(login, password));
          msg = "Registered! You can log in.";
          status = "1";
        } else {
          msg = "User already exists";
          status = "0";
        }

        // Create a JSON object representing the result
        String confirmationJson =
          "{\"status\": \"" + status + "\", \"msg\": \"" + msg + "\"}";

        // Set the content type to JSON and send the result back to the client
        ctx.contentType("application/json").result(confirmationJson);
      }
    );

    app.get(
      "/log",
      ctx -> {
        // Get the startDate and endDate query parameters from the frontend to use in yahoo stocks call
        String log = ctx.queryParam("value");

        System.out.println(' ');
        System.out.println(log);
        System.out.println(' ');
      }
    );
  }

  // Method to read file content as a String
  private static String getFileContent(String fileName) {
    try {
      // Construct the path to the file in the resources directory
      String resourcePath = "src/main/resources/" + fileName;
      File file = new File(resourcePath); // Create a File object using the resource path
      if (!file.exists()) {
        System.out.println("File not found: " + resourcePath);
        return "Error loading file";
      }

      JadeConfiguration config = new JadeConfiguration();
      config.setPrettyPrint(true); // Optional: Makes the generated HTML readable

      // Load the Pug template file
      JadeTemplate template = config.getTemplate(file.getAbsolutePath());

      // Render the template with an empty model (if no model is needed)
      Map<String, Object> model = new HashMap<>();
      return config.renderTemplate(template, model); // Render Pug template
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
