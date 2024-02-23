import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
   <h1>
    Dashboard
   </h1>
  `,
  styles: ``
})
export class DashboardComponent {

}
