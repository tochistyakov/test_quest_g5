import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../data/api/auth.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { firebaseConfig } from '../../data/firebase.config';
import { catchError } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'g5-signUp',
  templateUrl: 'signUp.component.html',
  styleUrls: ['signUp.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]

})

export class SignUpComponent {

  #authService = inject(AuthService)

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(6)]),
    confirm_password: new FormControl('', [Validators.required, Validators.min(6), this.passwordMatchValidator()])
  });

  public signUpWithMailPassword() {
    if (this.form.invalid || !this.form.controls.email.value || !this.form.controls.password.value) return;

    this.#authService.signUpWithMailPassword(this.form.controls.email.value, this.form.controls.password.value)
  }

  private passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.form) {
        return null;
      }
      const password = this.form.get('password')?.value;
      if (!password) {
        return null;
      }
      const confirm_password = control.value;
      return password === confirm_password ? null : { passwordMismatch: true };
    };
  }

}