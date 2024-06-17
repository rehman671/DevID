import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../enviroments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule , MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  url = environment.apiUrl + 'api/v1/login/';
  email: string = '';
  http = inject(HttpClient)
  toastr = inject(ToastrService)
  login_btn_signal = signal(false);
  errorMessage: string = '';
  constructor(private router: Router , toastr: ToastrService) {}
  clearToasts() {
    this.toastr.clear();
  }

  
  // Success Notifier
  showSuccess() {
    this.toastr.success('OTP sent to your email', '',{
      "progressBar":true,
      "progressAnimation":"increasing",
      "timeOut":2500,
    });
  }

  showWarning(message:string){
    this.clearToasts()
    this.toastr.warning(message , '',{
      "progressBar":true,
      "progressAnimation":"increasing",
      "timeOut":2500,
      
    });
  }
  showError(message:string){
    this.clearToasts()
    this.toastr.error(message , '',{
      "progressBar":true,
      "progressAnimation":"increasing",
      "timeOut":2500,
    });
  }

  login_btn_state(disable:boolean){
    this.login_btn_signal.set(disable)
  }
  // Login Logic
  login(email:string) {
    this.login_btn_state(true)
    if (email == ''){
      this.showWarning("Email can't be empty")
      this.login_btn_state(false)
      return
    }
    const payload = {
      "email" :email
    }
    this.http.post(this.url, payload).subscribe({
      next: (loginResponse: any) => {
        localStorage.setItem('devid_email',email)
        this.login_btn_state(false)
        this.showSuccess()
        this.router.navigate(['/otp'])
      },
      error: (error: any) => {
        this.showError(error.error.email[0])
        this.login_btn_state(false)
        this.email = ''
      }
    });
  }
}
