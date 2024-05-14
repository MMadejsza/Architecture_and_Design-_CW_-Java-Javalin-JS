package sad.User.Class;

import java.util.ArrayList;
import java.util.List;

import sad.User.Interface.IPortfolio;

public class Portfolio implements IPortfolio {

    List<Portfolio> portfoliolList = new ArrayList<>();
@Override
public void addCompanyInPortfolio(Portfolio company) {
    portfoliolList.add(company);
}

@Override
public void deleteCompanyInPortfolio(Portfolio company) {
    portfoliolList.remove(company);
}
}