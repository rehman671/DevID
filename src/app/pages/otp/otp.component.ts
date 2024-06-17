import { Component, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgOtpInputModule } from 'ng-otp-input';
import { CommonModule } from '@angular/common';
import { environment } from '../../enviroments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, NgOtpInputModule],
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  url = environment.apiUrl + 'api/v1/verify-otp/'
  http = inject(HttpClient)
  otpFormControl = new FormControl('');
  otpValid: boolean = false;
  otpInvalid: boolean = false;
  timeLeft: number = 180;
  minutes: number = 3;
  seconds: number = 0;
  interval: any;

  constructor(private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.minutes = Math.floor(this.timeLeft / 60);
        this.seconds = this.timeLeft % 60;
      } else {
        this.toastr.warning('OTP expired, please resend', '', {
          "progressBar": true,
          "progressAnimation": "increasing",
          "timeOut": 2500,
        })
        clearInterval(this.interval);
      }
    }, 1000);
  }

  onOtpChange(otp: string) {
    this.otpFormControl.setValue(otp);
  }

  submitOTP(event: Event) {
    const enteredOtp = this.otpFormControl.value;
    const payload = {
      "email": localStorage.getItem('devid_email'),
      "otp": enteredOtp
    }
    this.http.post(this.url, payload).subscribe({
      next: (loginResponse: any) => {
        const access_token = loginResponse.response.access_token
        const refresh_token = loginResponse.response.refresh_token
        localStorage.setItem('accessToken' , access_token)
        localStorage.setItem('refreshToken' , refresh_token)
        localStorage.removeItem('devid_email')
        this.otpValid = true;
        this.otpInvalid = false;
        this.toastr.success('OTP verified successfully!', '', {
          "progressBar": true,
          "progressAnimation": "increasing",
          "timeOut": 2500,
        });
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        console.log(error)
        this.otpValid = false;
        this.otpInvalid = true;
        this.toastr.error('Invalid OTP, please try again.', '', {
          "progressBar": true,
          "progressAnimation": "increasing",
          "timeOut": 2500,
        });
       
      }
    });
  }

  resendOtp() {
    // Logic to resend OTP
    this.timeLeft = 180;
    this.startTimer();
    this.toastr.info('OTP resent, please check your email.', '', {
      "progressBar": true,
      "progressAnimation": "increasing",
      "timeOut": 2500,
    });
  }
}
