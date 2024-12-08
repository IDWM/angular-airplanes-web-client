import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginDto } from '../../interfaces/login-dto';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  protected readonly loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        this.alphanumericValidator(),
      ],
    ],
  });
  protected loading = false;

  protected onSubmit(): void {
    if (this.loginForm.invalid) {
      this.toastService.error('Por favor, revisa los campos del formulario');
      return;
    }

    const formValue = this.loginForm.value as LoginDto;
    const loginData: LoginDto = {
      email: formValue.email.trim().toLowerCase(),
      password: formValue.password,
    };

    this.loading = true;

    this.authService
      .login(loginData)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.toastService.success('¡Inicio de sesión exitoso!');
          this.router.navigate(['/']);
        },
        error: (error: HttpErrorResponse) =>
          this.toastService.error(error.error.error),
      });
  }

  private alphanumericValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const regex = /^[a-zA-Z0-9]*$/;
      return regex.test(control.value) ? null : { alphanumeric: true };
    };
  }

  protected getFieldError(fieldName: keyof LoginDto): string {
    const control = this.loginForm.get(fieldName);

    if (!control || !control.errors || !control.touched) return '';

    const errors = {
      required: 'Este campo es requerido',
      email: 'Correo electrónico inválido',
      minlength: `Mínimo ${control.errors['minlength']?.requiredLength} caracteres`,
      maxlength: `Máximo ${control.errors['maxlength']?.requiredLength} caracteres`,
      alphanumeric: 'Solo se permiten letras y números',
    };

    const firstError = Object.keys(control.errors)[0];
    return errors[firstError as keyof typeof errors] || 'Campo inválido';
  }
}
