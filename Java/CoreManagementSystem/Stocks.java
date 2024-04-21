package Java.CoreManagementSystem;

import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

public class Stocks {
    int MAX_DATA;
    Date[] dates;
    int[] stockPrices;
    int currentIndex;

    private int getMaxValue(int[] array){
        int max = Integer.MIN_VALUE;
        for (int value : array){
            if (value > max){
                max = value;
            }
        }
        return max;
    }

    private void AppleStocksInfo() {
        if (currentIndex < MAX_DATA){
            stockPrices[currentIndex] = (int) (Math.random() * 500) + 200;
            dates[currentIndex] = new Date();
            currentIndex++;
        }
        else{
            for(int i = 0; i< MAX_DATA - 1; i++){
                stockPrices[i] = stockPrices[i + 1];
                dates[i] = dates[i + 1];
                stockPrices[MAX_DATA - 1] = (int) (Math.random() * 500) + 200;
                dates[MAX_DATA - 1] = new Date();
            }
        }
    };

    public void AppleStocksUpdater(){
        Timer appleTimer = new Timer();
        appleTimer.schedule(new TimerTask() {
        @Override
        public void run() {
            AppleStocksInfo();
        }
    }, 0, 5000);
    }
    

    private void GoogleStocksInfo() {
        
        if (currentIndex < MAX_DATA){
            stockPrices[currentIndex] = (int) (Math.random() * 500) + 200;
            dates[currentIndex] = new Date();
            currentIndex++;
        }
        else{
            for(int i = 0; i< MAX_DATA - 1; i++){
                stockPrices[i] = stockPrices[i + 1];
                dates[i] = dates[i + 1];
                stockPrices[MAX_DATA - 1] = (int) (Math.random() * 500) + 200;
                dates[MAX_DATA - 1] = new Date();
            }
        }
    }

    public void GoogleStocksUpdater(){
        Timer appleTimer = new Timer();
        appleTimer.schedule(new TimerTask() {
        @Override
        public void run() {
            GoogleStocksInfo();
        }
    }, 0, 5000);
    }

    private void MicrosoftStocksInfo() {
        
        if (currentIndex < MAX_DATA){
            stockPrices[currentIndex] = (int) (Math.random() * 500) + 200;
            dates[currentIndex] = new Date();
            currentIndex++;
        }
        else{
            for(int i = 0; i< MAX_DATA - 1; i++){
                stockPrices[i] = stockPrices[i + 1];
                dates[i] = dates[i + 1];
                stockPrices[MAX_DATA - 1] = (int) (Math.random() * 500) + 200;
                dates[MAX_DATA - 1] = new Date();
            }
        }
    }

    public void MicrosoftStocksUpdater(){
        Timer appleTimer = new Timer();
        appleTimer.schedule(new TimerTask() {
        @Override
        public void run() {
            MicrosoftStocksInfo();
        }
    }, 0, 5000);
    }

    private void BingStocksInfo() {
        
        if (currentIndex < MAX_DATA){
            stockPrices[currentIndex] = (int) (Math.random() * 500) + 200;
            dates[currentIndex] = new Date();
            currentIndex++;
        }
        else{
            for(int i = 0; i< MAX_DATA - 1; i++){
                stockPrices[i] = stockPrices[i + 1];
                dates[i] = dates[i + 1];
                stockPrices[MAX_DATA - 1] = (int) (Math.random() * 500) + 200;
                dates[MAX_DATA - 1] = new Date();
            }
        }
    }

    public void BingStocksUpdater(){
        Timer appleTimer = new Timer();
        appleTimer.schedule(new TimerTask() {
        @Override
        public void run() {
            BingStocksInfo();
        }
    }, 0, 5000);
    }

    private void WayneEnterprisesStocksInfo() {
        
        if (currentIndex < MAX_DATA){
            stockPrices[currentIndex] = (int) (Math.random() * 500) + 200;
            dates[currentIndex] = new Date();
            currentIndex++;
        }
        else{
            for(int i = 0; i< MAX_DATA - 1; i++){
                stockPrices[i] = stockPrices[i + 1];
                dates[i] = dates[i + 1];
                stockPrices[MAX_DATA - 1] = (int) (Math.random() * 500) + 200;
                dates[MAX_DATA - 1] = new Date();
            }
        }
    }

    public void WayneEnterprisesStocksUpdater(){
        Timer appleTimer = new Timer();
        appleTimer.schedule(new TimerTask() {
        @Override
        public void run() {
            WayneEnterprisesStocksInfo();
        }
    }, 0, 5000);
    }
}
