export const setToken = (tokenKey: string, token: string): void => {
    sessionStorage.setItem(tokenKey, token);
};
  
export const getToken = (tokenKey: string): string | null => {
    return sessionStorage.getItem(tokenKey);
};
  
export const removeToken = (tokenKey: string): void => {
    sessionStorage.removeItem(tokenKey);
};