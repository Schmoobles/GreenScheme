export const isAuthenticated = () => {
    return localStorage.getItem('authenticated') === 'true';
  };
  
  export const loginUser = (username, password) => {
    if (username && password) {
      localStorage.setItem('authenticated', 'true');
      return true;
    }
    return false;
  };
  
  export const logoutUser = () => {
    localStorage.removeItem('authenticated');
  };
  