package Java.Graph_Manager;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.List;

import javax.swing.JButton;
import javax.swing.JOptionPane;
import javax.swing.JPanel;

import Java.CoreManagementSystem.IRetrieveData;
import Java.CoreManagementSystem.Stocks;
import Java.StocksInfo_Manager.IGetStocks;


//Creates a visual representation of stock values
public class Graph extends JPanel implements IRetrieveGraph  {

    private IRetrieveData dataRetrieved;

    private int[] stockPrices;
    private String[] dates;
    private static final int MAX_DATA_POINTS = 15;
    private int currentIndex = 0;

    //Gets the data from the database
    public Graph(IRetrieveData dataRetrieved) {
        this.dataRetrieved = dataRetrieved;

        // Initialize empty arrays for stockPrices and dates
        stockPrices = new int[MAX_DATA_POINTS];
        dates = new String[MAX_DATA_POINTS];


        // Create Buy button
        JButton buyButton = new JButton("Buy");
        buyButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // Implement buy action here
                JOptionPane.showMessageDialog(null, "Buy button clicked!");
            }
        });

        // Create Sell button
        JButton sellButton = new JButton("Sell");
        sellButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // Implement sell action here
                JOptionPane.showMessageDialog(null, "Sell button clicked!");
            }
        });

        // Create Login button
        JButton loginButton = new JButton("Login");
        loginButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // Implement login action here
                JOptionPane.showMessageDialog(null, "Login button clicked!");
            }
        });

        // Add buttons to panel
        setLayout(new BorderLayout());
        JPanel buttonPanel = new JPanel();
        buttonPanel.add(buyButton);
        buttonPanel.add(sellButton);
        buttonPanel.add(loginButton);
        add(buttonPanel, BorderLayout.SOUTH);}

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);

        Graphics2D g2d = (Graphics2D) g;

        int width = getWidth();
        int height = getHeight();

        // Drawing y-axis
        g2d.drawLine(50, 50, 50, height - 50); // y-axis

        // Drawing x-axis
        g2d.drawLine(50, height - 50, width - 50, height - 50); // x-axis

        // Drawing y-axis labels (stock prices)
        int maxValue = Stocks.getMaxValue(stockPrices);
        for (int i = 0; i <= 10; i++) {
            int y = height - 50 - i * (height - 100) / 10;
            g2d.drawString(String.valueOf(i * maxValue / 10), 25, y + 5);
        }

        // Drawing x-axis labels (dates)
        for (int i = 0; i < dates.length; i++) {
            String date = dates[i];
            int x = 50 + i * (width - 100) / (dates.length - 1);
            g2d.drawString(date, x - 10, height - 30);
        }

        // Drawing data points
        g2d.setColor(Color.RED);
        for (int i = 0; i < currentIndex - 1; i++) {
            int x1 = 50 + i * (width - 100) / (currentIndex - 1);
            int y1 = height - 50 - (int) ((double) stockPrices[i] / maxValue * (height - 100));
            int x2 = 50 + (i + 1) * (width - 100) / (currentIndex - 1);
            int y2 = height - 50 - (int) ((double) stockPrices[i + 1] / maxValue * (height - 100));
            g2d.drawLine(x1, y1, x2, y2);
        }
    }


    @Override
    public void getGraphData(List<IGetStocks> stocksList) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getGraphData'");
    }

    @Override
    public void visualizeData() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'visualizeData'");
    }
    
}
