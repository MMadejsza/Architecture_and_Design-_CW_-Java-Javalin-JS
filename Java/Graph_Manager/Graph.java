package Java.Graph_Manager;

import java.util.List;

import Java.CoreManagementSystem.IRetrieveData;
import Java.StocksInfo_Manager.IGetStocks;


import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.Timer;


//Creates a visual representation of stock values
public class Graph implements IRetrieveGraph and extends JPanel {

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

        // Generate initial sample data
        generateInitialData();

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
        add(buttonPanel, BorderLayout.SOUTH);

        // Start timer to update the graph every 5 seconds
        Timer timer = new Timer(5000, new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                updateGraph();
            }
        });
        timer.start();
    }

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
        int maxValue = getMaxValue(stockPrices);
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

    private void updateGraph() {
        if (currentIndex < MAX_DATA_POINTS) {
            // Generate a new random data point
            Random rand = new Random();
            stockPrices[currentIndex] = rand.nextInt(200 - 50 + 1) + 50; // Generate random price between 50 and 200
            dates[currentIndex] = generateRandomDate(); // Generate random date
            currentIndex++;
        } else {
            // Shift all data points to the left
            for (int i = 0; i < MAX_DATA_POINTS - 1; i++) {
                stockPrices[i] = stockPrices[i + 1];
                dates[i] = dates[i + 1];
            }
            // Generate a new random data point for the last position
            Random rand = new Random();
            stockPrices[MAX_DATA_POINTS - 1] = rand.nextInt(200 - 50 + 1) + 50; // Generate random price between 50 and 200
            dates[MAX_DATA_POINTS - 1] = generateRandomDate(); // Generate random date
        }
        repaint();
    }
    
}
