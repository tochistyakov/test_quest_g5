import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../data/api/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'g5-signIn',
  templateUrl: 'signIn.component.html',
  styleUrls: ['signIn.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule
  ]

})

export class SignInComponent {

  #authService = inject(AuthService)
  #router = inject(Router)

  public form = new FormGroup({
    email: new FormControl<string>('', [Validators.required]),

    password: new FormControl<string>('', [Validators.required]),
  })

  public signInWithMailPassword() {
    if (this.form.invalid || !this.form.controls.email.value || !this.form.controls.password.value) return;

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