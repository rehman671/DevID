import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../enviroments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  url = environment.apiUrl + 'api/v1/login/';
  email: string = '';
  http = inject(HttpClient)
  toastr = inject(ToastrService)
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


  // Login Logic
  login(email:string) {
    if (email == ''){
      this.showWarning("Email can't be empty")
      return
    }
    const payload = {
      "email" :email
    }
    this.http.post(this.url, payload).subscribe({
      next: (loginResponse: any) => {
        localStorage.setItem('email',email)
        this.showSuccess()
        this.router.navigate(['/otp'])
      },
      error: (error: any) => {
        this.showError(error.error.email[0])
        this.email = ''
      }
    });
  }
}
