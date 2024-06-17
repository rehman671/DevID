import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from '../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private refreshTokenUrl = `${environment.apiUrl}api/v1/token/refresh/`;
  private blacklistTokenUrl = `${environment.apiUrl}api/v1/logout/`;
  private tokenKey = 'accessToken';
  private refreshTokenKey = 'refreshToken';

  constructor(private http: HttpClient) {
    // Start the token refresh process
    this.startTokenRefresh();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.tokenKey);
    console.log("Everything removed");
  }

  clearToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${refreshToken}`,
    });

    return this.http.post(this.blacklistTokenUrl, { 'refresh': refreshToken }, { headers }).pipe(
      tap((response: any) => {
        console.log("Blacklisted Token");
        this.removeToken();
      })
    );
  }
  
  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${refreshToken}`,
    });

    return this.http.post(this.refreshTokenUrl, {
      'refresh': localStorage.getItem(this.refreshTokenKey)
    }, { headers }).pipe(
      tap((response: any) => {
        this.setToken(response.access);
      })
    );
  }

  startTokenRefresh(): void {
    // Refresh the token every hour (3600000 milliseconds)
    interval(3600).pipe(
      switchMap(() => this.refreshToken())
    ).subscribe({
      next: () => console.log('Token refreshed successfully'),
      error: (err) => console.error('Error refreshing token', err)
    });
  }
}
