package sad.User.Class;

import java.util.ArrayList;
import java.util.List;

import sad.User.Interface.IPortfolio;

public class Portfolio implements IPortfolio {

  List<Portfolio> portfolioList = new ArrayList<>();

  public Portfolio() {}

  @Override
  public void portfolioView() {
    for (int i = 0; i < portfolioList.size(); i++) {
      
      System.out.println(portfolioList.get(i));
      
    }
  }

  public void addCompanyInPortfolio(Portfolio company) {
    portfolioList.add(company);
  }

  public void deleteCompanyInPortfolio(Portfolio company) {
    portfolioList.remove(company);
  }
}
