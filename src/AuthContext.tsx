import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CompanyDetails {
  name: string;
  companyEmail: string;
  phone: string;
  companyName: string;
  employeeSize: string;
}

interface AuthContextType {
  companyDetails: CompanyDetails;
  setCompanyDetails: React.Dispatch<React.SetStateAction<CompanyDetails>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  login: (token: string, details: CompanyDetails) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails>({
    name: '',
    companyEmail: '',
    phone: '',
    companyName: '',
    employeeSize: ''
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = (token: string, details: CompanyDetails) => {
    localStorage.setItem('token', token);
    localStorage.setItem('companyDetails', JSON.stringify(details));
    setIsAuthenticated(true);
    setCompanyDetails(details);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('companyDetails');
    setIsAuthenticated(false);
    setCompanyDetails({
      name: '',
      companyEmail: '',
      phone: '',
      companyName: '',
      employeeSize: ''
    });
  };

  const value = {
    companyDetails,
    setCompanyDetails,
    isAuthenticated,
    setIsAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
