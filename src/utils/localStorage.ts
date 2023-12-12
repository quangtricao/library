import { AccountType } from '../types/account';
import { BookType } from '../types/book';

const TOKEN_KEY = 'qtricao-library-token';
const ACCOUNT_KEY = 'qtricao-library-account';
const THEME_KEY = 'qtricao-library-theme';
const BORROW_BOOK_IN_CART = 'qtricao-library-borrow';
const RETURN_BOOK_IN_CART = 'qtricao-library-return';

export const saveTokenToLocalStorage = (token: string) => {
  window.localStorage.setItem(TOKEN_KEY, token);
};
export const getTokenFromLocalStorage = (): string | null => {
  const token = window.localStorage.getItem(TOKEN_KEY);
  return token ? token : null;
};
export const saveAccountToLocalStorage = (account: AccountType | null) => {
  window.localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
};
export const getAccountFromLocalStorage = (): AccountType | null => {
  const account = window.localStorage.getItem(ACCOUNT_KEY);
  return account ? JSON.parse(account) : null;
};
export const clearTokenAndAccountFromLocalStorage = () => {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(ACCOUNT_KEY);
};

export const saveBorrowBookInCartToLocalStorage = (books: BookType[]) => {
  window.localStorage.setItem(BORROW_BOOK_IN_CART, JSON.stringify(books));
};
export const getBorrowBookInCartFromLocalStorage = (): BookType[] | [] => {
  const books = window.localStorage.getItem(BORROW_BOOK_IN_CART);
  return books ? JSON.parse(books) : [];
};
export const saveReturnBookInCartToLocalStorage = (books: BookType[]) => {
  window.localStorage.setItem(RETURN_BOOK_IN_CART, JSON.stringify(books));
};
export const getReturnBookInCartFromLocalStorage = (): BookType[] | [] => {
  const books = window.localStorage.getItem(RETURN_BOOK_IN_CART);
  return books ? JSON.parse(books) : [];
};
export const clearCartFromLocalStorage = () => {
  window.localStorage.removeItem(BORROW_BOOK_IN_CART);
  window.localStorage.removeItem(RETURN_BOOK_IN_CART);
};

export const saveThemeToLocalStorage = (theme: string) => {
  window.localStorage.setItem(THEME_KEY, JSON.stringify(theme));
};
export const getThemeFromLocalStorage = (): string | null => {
  const theme = window.localStorage.getItem(THEME_KEY);
  return theme ? JSON.parse(theme) : null;
};
