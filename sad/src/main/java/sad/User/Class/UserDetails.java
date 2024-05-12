package sad.User.Class;

import sad.User.Interface.ILogin;
import sad.User.Interface.IPortfolio;
import sad.User.Interface.IStockOptions;
import sad.User.Interface.IUser;
import sad.User.Interface.IUserPreferences;
import sad.User.Interface.IWatchlist;

public class UserDetails implements IUser, ILogin,IPortfolio, IStockOptions, IWatchlist, IUserPreferences {

  private String name;
  private String password;

  // Constructor
  public UserDetails(String name, String password) {
    this.name = name;
    this.password = password;
  }

  // Getters and setters
  public String getName() {
    return name;
  }

  public String getPassword() {
    return password;
  }

  @Override
  public void addStockToWatchList(Watchlist stock) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'addStockToWatchList'");
  }

  @Override
  public void deleteStockInWatchList(Watchlist stock) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'deleteStockInWatchList'");
  }

  @Override
  public void portfolioView() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'portfolioView'");
  }

  @Override
  public void addCompanyInPortfolio(Portfolio company) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'addCompanyInPortfolio'");
  }

  @Override
  public void deleteCompanyInPortfolio(Portfolio company) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'deleteCompanyInPortfolio'");
  }

  @Override
  public boolean validateCredentials() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'validateCredentials'");
  }

  @Override
  public void grantAccess() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'grantAccess'");
  }
}
