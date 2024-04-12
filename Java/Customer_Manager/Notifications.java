package Java.Customer_Manager;

public class Notifications implements INotifications {
    public String notification;
    public String status;
    
    public Notifications(String notification, String status){
        this.notification = notification;
        this.status = status;
    }

    public void pushNotification(String notification, String status){
        System.out.println(notification + " has gone " + status + " your set threshold");
    }

}
