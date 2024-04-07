import { Component, Input, computed, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


export type MenuItem = {
  icon: string;
  label: string;
  route?: any
}

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatListModule, RouterModule],
  template: `
    <div class="sidenav-header">
      <img [width]="logoSize()" [height]="logoSize()" src='/assets/logo.png' alt="">
      <div class="header-text" [class.hide-text]="sideNavCollapsed()">
        <h2>DevID</h2>
      </div>
    </div>
  <mat-nav-list>
        <a mat-list-item *ngFor="let item of menuItems()" [routerLink]="item.route"
        routerLinkActive="selected-menu-item"
        #rla="routerLinkActive"
        [activated]="rla.isActive">
        <mat-icon matListItemIcon >{{ item.icon }}</mat-icon>
        <span [class.hide-text]="sideNavCollapsed()" matListItemTitle>{{ item.label }}</span>
      </a>
  </mat-nav-list>
  `,
  styles: [
    `
    :host *{
      transition:all 500ms ease-in-out
    }
    .sidenav-header{
      padding-top:24px;
      text-align:center;
      >img{
        border-radius: 100%;
        object-fit:cover;
        margin-bottom:10px;
      }

      .header-text{
        >h2{
          margin:0;
          font-size:1rem;
          line-height:1.5rem;

        }

        > p {
          margin:0;
          font-size:0.8rem;
        }
      }
    }

    .hide-text{
      display:None
    }

    .selected-menu-item{
      border-left:5px solid #008080 ;
    }
    `
  ]
})
export class CustomSidenavComponent {

  sideNavCollapsed = signal(false)
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dashboard'
    },
    {
      icon: 'network_wifi',
      label: 'Scan',
      route: 'scan'
    },
    {
      icon: 'dvr',
      label: 'Machine Learning',
      route: 'ml'
    },
    
  ])

  logoSize = computed(() => this.sideNavCollapsed() ? '32' : '100')
}
