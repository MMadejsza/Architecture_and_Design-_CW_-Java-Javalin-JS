package sad.StocksInfo_Manager;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

//This provides structure to the stocks, stocks will be formatted and saved through here
public class Stocks implements IGetStocks {

  public String StocksInfo(String stockName) {
    try {
      String apiUrl =
        "https://query1.finance.yahoo.com/v8/finance/chart/" +
        stockName +
        "?range=max&dataGranularity=1d";
      URL url = new URL(apiUrl);
      HttpURLConnection connection = (HttpURLConnection) url.openConnection();
      connection.setRequestMethod("GET");

      BufferedReader in = new BufferedReader(
        new InputStreamReader(connection.getInputStream())
      );
      String inputLine;
      StringBuilder response = new StringBuilder();
      while ((inputLine = in.readLine()) != null) {
        response.append(inputLine);
      }
      in.close();
      return response.toString();
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }
}
