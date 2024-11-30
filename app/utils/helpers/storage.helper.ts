import type { AuthUser } from "~/types/pre-built/1-auth";
import type { User } from "~/types/pre-built/2-user";

export const storageKeys = {
  user: "_user",
  token: "_app_login",
  carts: "carts",
};

export const storageHelper = {
  getAuth(): AuthUser | null {
    const authString = localStorage.getItem(storageKeys.token);

    return authString ? JSON.parse(authString) : null;
  },
  getUser(): User | null {
    const userString = localStorage.getItem(storageKeys.user);

    return userString ? JSON.parse(userString) : null;
  },

  setAuth(auth: AuthUser) {
    localStorage.setItem(storageKeys.token, JSON.stringify(auth));
  },

  setUser(user: User) {
    localStorage.setItem(storageKeys.user, JSON.stringify(user));
  },

  clearAuth() {
    localStorage.removeItem(storageKeys.token);
    localStorage.removeItem(storageKeys.user);
  },

  getCarts() {
    const carts = localStorage.getItem(storageKeys.carts);

    return carts ? JSON.parse(carts) : null;
  },

  setCarts(carts: any[]) {
    localStorage.setItem(storageKeys.carts, JSON.stringify(carts));
  },

  clearCarts() {
    localStorage.removeItem(storageKeys.carts);
  },
};
