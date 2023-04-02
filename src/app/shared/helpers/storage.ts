const TOKEN = 'token';

export class Storage {
  public static setItemToStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public static getItemFromStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  public static removeItemFromStorage(key: string): void {
    localStorage.removeItem(key);
  }

  public static setTokenToStorage(token: string): void {
    this.setItemToStorage(TOKEN, token);
  }

  public static getTokenFromStorage(): string | null {
    return this.getItemFromStorage(TOKEN);
  }

  public static removeTokenFromStorage(): void {
    this.removeItemFromStorage(TOKEN);
  }

}
