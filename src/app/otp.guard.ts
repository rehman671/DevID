import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export const OtpGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): 
  Observable<boolean | UrlTree> 
  | Promise<boolean | UrlTree> 
  | boolean 
  | UrlTree => {
    const email = localStorage.getItem('devid_email');
    const router = inject(Router);
    if (email) {
      return true;
    } else {
      return router.createUrlTree(['login']);
    }
}
