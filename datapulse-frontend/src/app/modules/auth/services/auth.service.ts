import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: any) {
    return this.http.post(`${this.apiUrl}/auth/login/`, credentials)
      .pipe(
        tap((response: any) => {
          localStorage.setItem('access', response.access);
          localStorage.setItem('refresh', response.refresh);
        })
      );
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/auth/register/`, data);
  }

  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }

  getToken() {
    return localStorage.getItem('access');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

}