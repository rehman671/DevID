import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
  <mat-toolbar class="mat-elevation-z3">
    <button mat-icon-button (click)="collapsed.set(!collapsed())">
            <mat-icon>menu</mat-icon>
    </button>
  </mat-toolbar>
  <mat-sidenav-container>
    <mat-sidenav opened mode="side" [style.width]="sideNavWidth()"> 
    <app-custom-sidenav [collapsed]="collapsed()"></app-custom-sidenav>
    </mat-sidenav>
    <mat-sidenav-content class="content" [style.margin-left]="sideNavWidth()">
      <router-outlet></router-outlet>
  </mat-sidenav-content>
  </mat-sidenav-container>
 ` ,
  styles: [
    `

    mat-toolbar {
      position:relative;
      z-index:5;
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
  sideNavWidth = computed(() => this.collapsed() ? '65px' : '250px');
}
