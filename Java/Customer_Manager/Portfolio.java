package Java.Customer_Manager;

import java.util.ArrayList;
import java.util.List;

public class Portfolio implements IPortfolio {
    List <Portfolio> portfolioList = new ArrayList<>();

    public Portfolio(){

    }

    @Override
    public void portfolioView() {
        for(int i = 0; i < portfolioList.size(); i++){
            System.out.println("\n---------------------------------");
            System.out.println(portfolioList.get(i));
            System.out.println("---------------------------------\n");
        }
        
    }

    public void addCompanyInPortfolio(Portfolio company){
        portfolioList.add(company);
    }

    public void deleteCompanyInPortfolio(Portfolio company){
        portfolioList.remove(company);
    }
}
