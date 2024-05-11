package sad.User.Interface;

import sad.User.Class.Portfolio;

public interface IPortfolio {
  void portfolioView();
  void addCompanyInPortfolio(Portfolio company);
  void deleteCompanyInPortfolio(Portfolio company);
}
