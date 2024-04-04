import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'
import { CustomSidenavComponent } from './components/custom-sidenav/custom-sidenav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, CustomSidenavComponent],
  template: `
    <router-outlet  *ngIf="isLoginPage()" ></router-outlet>
  <mat-toolbar  *ngIf="!isLoginPage()" class="mat-elevation-z3">
    <button mat-icon-button (click)="collapsed.set(!collapsed())">
            <mat-icon>menu</mat-icon>
    </button>
    <div class="user-detail">
    <img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="">
    </div>
  </mat-toolbar>
  <mat-sidenav-container *ngIf="!isLoginPage()">
    <mat-sidenav  opened mode="side" [style.width]="sideNavWidth()"> 
      <app-custom-sidenav [collapsed]="collapsed()"></app-custom-sidenav>
    </mat-sidenav>
    <mat-sidenav-content class="content" [style.margin-left]="sideNavWidth()">
      <router-outlet  *ngIf="!isLoginPage()"></router-outlet>
    </mat-sidenav-content>
  </mat-sidenav-container>
 ` ,
  styles: [
    `

    mat-toolbar {
      position:relative;
      z-index:5;
      display:flex;
      flex-direction:row;
      justify-content:space-between;
    }

    .user-detail{
      background-color:white;
      border:1px solid grey;
      width:40px;
      height:40px;
      border-radius:100%;
      transition:all 0.3s ease-in-out;
      overflow:hidden;
      
      >img{
        width:100%;
        height:100%;
        transition:all 0.3s ease-in-out;

      }
    }

    .user-detail:hover{
      background-color:grey;
      border:1px solid black;
      width:45px;
      height:45px;
      >img{
        filter: invert(1);
      }
    }
    .content{
      padding:24px
    }

    mat-sidenav-container {
      height:calc(100vh - 64px)
    }

    mat-sidenav-content, mat-sidenav{
      transition:all 500ms ease-in-out
    }
    `
  ],
})
export class AppComponent {
  title = 'DevID';
  collapsed = signal(false);
  constructor(private router: Router) { }
  isLoginPage(): boolean {
    return (this.router.url === '/login');
  }
  sideNavWidth = computed(() =>  this.collapsed() ? '65px' : '250px');

}
