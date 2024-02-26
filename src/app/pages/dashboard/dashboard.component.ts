import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PieChartComponent } from './../../graph/piechart/piechart.component';
import { LinechartComponent } from '../../graph/linechart/linechart.component';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule, matDatepickerAnimations} from '@angular/material/datepicker';
import { MatIconModule} from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule , PieChartComponent , MatButtonModule , LinechartComponent , MatFormFieldModule , MatInputModule , MatDatepickerModule , MatIconModule],
  providers: [provideNativeDateAdapter()],

  template: `
  <div class="top-section">
    <div class="heading">
      <h1>
        Dashboard
      </h1>
    </div>
    <div class="other-btns-container">
      <button mat-stroked-button color="primary">Save Changes</button>
      <mat-form-field class="date-filter">
        <mat-label>Add date filter</mat-label>
        <input matInput [matDatepicker]="picker">
        <mat-datepicker-toggle matIconSuffix [for]="picker">
          <mat-icon matDatepickerToggleIcon>keyboard_arrow_down</mat-icon>
        </mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
    </div>
  </div>
  <div class="mid-section">
    <app-piechart></app-piechart>
    <div class="current-profile">
        <table>
          <thead>
            <tr>
              <th colspan="2">Current Device</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>IP:</td>
              <td>192.168.1.100</td>
            </tr>
            <tr>
              <td>Connected Subnet:</td>
              <td>192.168.1.0/24</td>
            </tr>
            <tr>
              <td>Device Type:</td>
              <td>Desktop</td>
            </tr>
            <tr>
              <td>Device OS:</td>
              <td>Windows 10</td>
            </tr>
          </tbody>
        </table>
</div>

  </div>
  <div class="midlower-section">
    <app-linechart></app-linechart>
  </div>
  `,
  styles: `
  @keyframes wave {
  0% {
    border-radius: 2% 15%;
  }
  50% {
    border-radius: 15% 2%;
  }
  100% {
    border-radius: 2% 15%;
  }
}
  .top-section{
    height:12vh;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    animation: wave 5s ease-in-out infinite;
    padding:2%;
    background-color:white;
    border:2px solid #D3D3D3;
    margin:1%;
    transition:all 0.5s ease-in-out;
    
    >.other-btns-container{
      display:flex;
      height:100%;
      flex-direction:row;
      justify-content:center;
      align-items:center;
      >button{
        margin-right:5%;
        width:50%;
        height:40%;
        margin-bottom:4%;
      }
      >.date-filter{
        // height:80%;
        font-size:15px
      }
    }
  }

  .top-section:hover{
    border-color:teal;
    box-shadow:1px 2px 10px 2px #E0E0E0;

  }
  
  .midlower-section{
    width:80vw;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-bottom:5%;

    >app-linechart{
      width:90%;
      height:100%;
    }


  }

  .mid-section{
    display:flex;
    width:100%;
    flex-direction:row;
    margin:2%;


    >app-piechart{
      color:white;
      width:49%;
    }

    >.current-profile{
      width:49%;
      margin-left:1%;
      border-radius:5% 5%;
      border:1px solid teal;
      display:flex;
      justify-content:center;
      align-items:center;
      
      >table{
        border-radius:15% 0%;
        width:100%;
        height:100%;
        padding:2%;
        >tbody{
          >tr{
            >td{
              padding:2%;
              border-bottom:1px solid grey;
              border-top:1px solid grey;


            }
          }
          >tr:last-child td{
            border-bottom:none;
          }
          >tr:first-child td{
            border-top:none;
          }
        }
      }
    }
  }
  `
})
export class DashboardComponent {

}
