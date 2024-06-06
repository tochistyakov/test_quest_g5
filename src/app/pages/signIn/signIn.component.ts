import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../data/api/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'g5-signIn',
  templateUrl: 'signIn.component.html',
  styleUrls: ['signIn.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]

})

export class SignInComponent {

  #authService = inject(AuthService)
  #router = inject(Router)

  public form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),

    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
  })

  public signInWithMailPassword() {
    if (this.form.invalid || !this.form.controls.email.value || !this.form.controls.password.value) {
      this.form.markAllAsTouched();
      this.form.controls.email.markAsDirty();
      this.form.controls.password.markAsDirty();
      return
    };

    this.#authService.signInWithMailPassword(this.form.controls.email.value, this.form.controls.password.value)
  }

  public signInWithGoogle() {
    this.#authService.signInWithGoogle()
    
  }

  public signInWithGithub() {
    this.#authService.signInWithGithub()
  }

  public goToSignUp() {
    this.#router.navigate(['/signUp'])
  }

}