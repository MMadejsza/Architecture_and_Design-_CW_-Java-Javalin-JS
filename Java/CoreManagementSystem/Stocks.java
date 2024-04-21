package Java.CoreManagementSystem;

import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

public class Stocks implements IObatainSharePrice {
    int MAX_DATA;
    Date[] dates;
    int[] AppleStock;
    int[] GoogleStock;
    int[] MicrosoftStock;
    int[] BingStock;
    int[] WayneStock;
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
            AppleStock[currentIndex] = (int) (Math.random() * 500) + 200;
            dates[currentIndex] = new Date();
            currentIndex++;
        }
        else{
            for(int i = 0; i< MAX_DATA - 1; i++){
                AppleStock[i] = AppleStock[i + 1];
                dates[i] = dates[i + 1];
                AppleStock[MAX_DATA - 1] = (int) (Math.random() * 500) + 200;
                dates[MAX_DATA - 1] = new Date();
            }
        }
    };

    public int[] AppleStocksUpdater(){
        Timer appleTimer = new Timer();
        appleTimer.schedule(new TimerTask() {
        @Override
        public void run() {
            AppleStocksInfo();
        }
    }, 0, 5000);
    return AppleStock;
    }
    

    private void GoogleStocksInfo() {
        
        if (currentIndex < MAX_DATA){
            GoogleStock[currentIndex] = (int) (Math.random() * 1000) + 600;
            dates[currentIndex] = new Date();
            currentIndex++;
        }
        else{
            for(int i = 0; i< MAX_DATA - 1; i++){
                GoogleStock[i] = GoogleStock[i + 1];
                dates[i] = dates[i + 1];
                GoogleStock[MAX_DATA - 1] = (int) (Math.random() * 1000) + 600;
                dates[MAX_DATA - 1] = new Date();
            }
        }
    }

    public int[] GoogleStocksUpdater(){
        Timer googleTimer = new Timer();
        googleTimer.schedule(new TimerTask() {
        @Override
        public void run() {
            GoogleStocksInfo();
        }
    }, 0, 5000);
    return GoogleStock;
    }

    private void MicrosoftStocksInfo() {
        
        if (currentIndex < MAX_DATA){
            MicrosoftStock[currentIndex] = (int) (Math.random() * 200) + 75;
            dates[currentIndex] = new Date();
            currentIndex++;
        }
        else{
            for(int i = 0; i< MAX_DATA - 1; i++){
                MicrosoftStock[i] = MicrosoftStock[i + 1];
                dates[i] = dates[i + 1];
                MicrosoftStock[MAX_DATA - 1] = (int) (Math.random() * 200) + 75;
                dates[MAX_DATA - 1] = new Date();
            }
        }
    }

    public int[] MicrosoftStocksUpdater(){
        Timer microsoftTimer = new Timer();
        microsoftTimer.schedule(new TimerTask() {
        @Override
        public void run() {
            MicrosoftStocksInfo();
        }
    }, 0, 5000);
    return MicrosoftStock;
    }

    private void BingStocksInfo() {
        
        if (currentIndex < MAX_DATA){
            BingStock[currentIndex] = (int) (Math.random() * 100) + 20;
            dates[currentIndex] = new Date();
            currentIndex++;
        }
        else{
            for(int i = 0; i< MAX_DATA - 1; i++){
                BingStock[i] = BingStock[i + 1];
                dates[i] = dates[i + 1];
                BingStock[MAX_DATA - 1] = (int) (Math.random() * 100) + 20;
                dates[MAX_DATA - 1] = new Date();
            }
        }
    }

    public int[] BingStocksUpdater(){
        Timer bingTimer = new Timer();
        bingTimer.schedule(new TimerTask() {
        @Override
        public void run() {
            BingStocksInfo();
        }
    }, 0, 5000);
    return BingStock;
    }

    private void WayneEnterprisesStocksInfo() {
        
        if (currentIndex < MAX_DATA){
            WayneStock[currentIndex] = (int) (Math.random() * 1200) + 200;
            dates[currentIndex] = new Date();
            currentIndex++;
        }
        else{
            for(int i = 0; i< MAX_DATA - 1; i++){
                WayneStock[i] = WayneStock[i + 1];
                dates[i] = dates[i + 1];
                WayneStock[MAX_DATA - 1] = (int) (Math.random() * 1200) + 200;
                dates[MAX_DATA - 1] = new Date();
            }
        }
    }

    public int[] WayneEnterprisesStocksUpdater(){
        Timer wayneTimer = new Timer();
        wayneTimer.schedule(new TimerTask() {
        @Override
        public void run() {
            WayneEnterprisesStocksInfo();
        }
    }, 0, 5000);
    return WayneStock;
    }
}
