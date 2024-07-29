import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomSidenavComponent } from './components/custom-sidenav/custom-sidenav.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    CustomSidenavComponent,
    ToastrModule,
  ],
  template: `
    <router-outlet *ngIf="isLoginPage()"></router-outlet>
    <mat-toolbar *ngIf="!isLoginPage()" class="mat-elevation-z3">
      <button mat-icon-button (click)="collapsed.set(!collapsed())">
        <mat-icon>menu</mat-icon>
      </button>
      <div class="logout-div" (click)="logout()">
        <span class="material-symbols-outlined"> power_settings_new </span>
      </div>
    </mat-toolbar>
    <mat-sidenav-container *ngIf="!isLoginPage()">
      <mat-sidenav opened mode="side" [style.width]="sideNavWidth()">
        <app-custom-sidenav [collapsed]="collapsed()"></app-custom-sidenav>
      </mat-sidenav>
      <mat-sidenav-content class="content" [style.margin-left]="sideNavWidth()">
        <router-outlet *ngIf="!isLoginPage()"></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');
      
      mat-toolbar {
        position: relative;
        z-index: 5;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      
      .material-symbols-outlined {
        font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
      }
      .logout-div {
        background-color: white;
        border: 1px solid grey;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        display:flex;
        justify-content:center;
        align-items:center;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
      }

      .logout-div:hover {
        background-color: #ff8e8e;
        border: 0px;
        width: 45px;
        height: 45px;
        color:white;

      }
      .content {
        padding: 24px;
      }

      mat-sidenav-container {
        height: calc(100vh - 64px);
      }

      mat-sidenav-content,
      mat-sidenav {
        transition: all 500ms ease-in-out;
      }
    `,
  ],
})
export class AppComponent {
  title = 'DevID';
  collapsed = signal(false);

  constructor(private router: Router, private tokenService: TokenService) {
    // Ensure the token service starts token refresh process
  }

  isLoginPage(): boolean {
    return (
      this.router.url.includes('/login') || this.router.url.includes('/otp')
    );
  }

  sideNavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));

  logout() {
    this.tokenService.clearToken().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error during logout', err);
        this.router.navigate(['/login']); // Navigate to login even if there's an error
      },
    });
  }
}
