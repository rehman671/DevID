import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if access token is present in local storage
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      return true; // Allow navigation to the requested route
    } else {
      // Redirect to the login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
