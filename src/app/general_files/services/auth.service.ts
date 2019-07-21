import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isAuthenticated = false;

  logIn() {
      this.isAuthenticated = true;
  }
  logOut() {
      this.isAuthenticated = false;
      window.localStorage.clear();
      window.sessionStorage.clear();
  }

  isLoginIn(): boolean {
      return  this.isAuthenticated;
  }
}