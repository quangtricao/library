import { AccountType } from '../types/account';

const TOKEN_KEY = 'qtricao-library-token';
const ACCOUNT_KEY = 'qtricao-library-account';
const THEME_KEY = 'qtricao-library-theme';

export const saveTokenToLocalStorage = (token: string) => {
  window.localStorage.setItem(TOKEN_KEY, token);
};

export const getTokenFromLocalStorage = (): string | null => {
  const token = window.localStorage.getItem(TOKEN_KEY);
  return token ? token : null;
};

export const clearTokenFromLocalStorage = () => {
  window.localStorage.removeItem(TOKEN_KEY);
};

export const saveAccountToLocalStorage = (account: AccountType | null) => {
  window.localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
};

export const getAccountFromLocalStorage = (): AccountType | null => {
  const account = window.localStorage.getItem(ACCOUNT_KEY);
  return account ? JSON.parse(account) : null;
};

export const clearAccountFromLocalStorage = () => {
  window.localStorage.removeItem(ACCOUNT_KEY);
};

export const saveThemeToLocalStorage = (theme: string) => {
  window.localStorage.setItem(THEME_KEY, JSON.stringify(theme));
};

export const getThemeFromLocalStorage = (): string | null => {
  const theme = window.localStorage.getItem(THEME_KEY);
  return theme ? JSON.parse(theme) : null;
};
