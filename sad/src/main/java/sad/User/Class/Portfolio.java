package sad.User.Class;

import java.util.ArrayList;
import java.util.List;

import sad.User.Interface.IPortfolio;

public class Portfolio implements IPortfolio {

  private List<Company> portfolioList = new ArrayList<>();

  @Override
  public void portfolioView() {
      for (Company company : portfolioList) {
          System.out.println(company.getName());
      }
  }

  @Override
  public void addCompanyInPortfolio(Company company) {
      portfolioList.add(company);
  }

  @Override
  public void deleteCompanyInPortfolio(Company company) {
      portfolioList.remove(company);
  }
}