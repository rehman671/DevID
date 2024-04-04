import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule here



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  template: `
 <div class="login-container">
    <div class="login-card">
      <img src="assets/logo.png" alt="Logo" class="logo">
      <h2 class="login-heading">Login</h2>
      <form class="login-form" (submit)="login()">
        <div class="form-group">
          <input type="email" id="email" name="email" placeholder="Email" [(ngModel)]="email">
        </div>
        <div class="form-group">
          <input type="password" id="password" name="password" placeholder="Password" [(ngModel)]="password">
        </div>
        <div class="form-group">
          <button type="submit" class="btn-login">Login</button>
        </div>
        <div *ngIf="errorMessage" class="error-message">{{ errorMessage }}</div>
      </form>
    </div>
  </div>


  `,
  styles: `
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.login-card {
  max-width: 400px;
  width: 100%;
  padding: 40px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease-in-out;
}

.login-card:hover {
  transform: translateY(-5px);
}

.logo {
  width: 100px;
  height: auto;
  margin-bottom: 20px;
  transition: transform 0.3s;
}

.logo:hover {
  transform: scale(1.1);
}

.login-heading {
  margin-bottom: 20px;
  color: #333;
}

.login-form .form-group {
  margin-bottom: 20px;
}

.login-form input[type="email"],
.login-form input[type="password"] {
  width: 90%;
  padding: 15px;
  border: 1px solid grey;
  border-radius: 10px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.login-form input[type="email"]:focus,
.login-form input[type="password"]:focus {
  border-color: #008080;
}

.btn-login {
  width: 100%;
  padding: 15px;
  background-color: teal;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;

  transition: background-color 0.3s;
}

.btn-login:hover {
  background-color: #0056b3;
}

.error-message {
    color: red;
    margin-top: 10px;
  }
  `
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  login() {
    // Hardcoded credentials
    const hardcodedEmail = 'admin@devid.com';
    const hardcodedPassword = 'admin';

    // Check if email and password match the hardcoded values
    if (this.email === hardcodedEmail && this.password === hardcodedPassword) {
      localStorage.setItem('accessToken', 'TestingToken');
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Invalid email or password. Please try again.';
      this.email = '';
      this.password = '';
    }
  }
}