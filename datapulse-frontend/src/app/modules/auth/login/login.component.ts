import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  loginForm!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  onSubmit() {

    if (this.loginForm.invalid) return;

    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({

      next: (res) => {

        console.log('LOGIN OK', res);

        this.authService.saveToken(res.access);

        this.router.navigate(['/dashboard']);

      },

      error: () => {
        this.errorMessage = 'Credenciales inválidas';
      }

    });

  }

}