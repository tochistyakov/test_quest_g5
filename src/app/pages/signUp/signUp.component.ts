import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../data/api/auth.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  #router = inject(Router)

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirm_password: new FormControl('', [Validators.required, Validators.minLength(6), this.passwordMatchValidator()])
  });

  public signUpWithMailPassword() {
    if (this.form.invalid || !this.form.controls.email.value || !this.form.controls.password.value) {
      this.form.markAllAsTouched();
      this.form.controls.email.markAsDirty();
      this.form.controls.password.markAsDirty();
      this.form.controls.confirm_password.markAsDirty();
      return
    };

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

  public goToSignIn() {
    this.#router.navigate(['/signIn'])
  }

}