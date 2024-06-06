import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  #toastr = inject(ToastrService)

  user: WritableSignal<firebase.User | null> = signal(null);

  public isLoggedIn: Signal<boolean> = computed(() => {
    return this.user() ? true : false
  })

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
  ) {
    this.getUser().subscribe((user) => {
      this.user.set(user)
    })
  }

  public getUser(): Observable<firebase.User | null> {
    return this.afAuth.authState
  }

  public signInWithGoogle() {
    this.afAuth.signInWithPopup(new GoogleAuthProvider).then(
      (result) => {
        this.user.set(result.user);
        this.router.navigate(['/block'])
      }
    )
  }

  public signInWithGithub() {
    this.afAuth.signInWithPopup(new GithubAuthProvider).then(
      (result) => {
        this.user.set(result.user);
        this.router.navigate(['/block'])
      }
    )
  }

  public signUpWithMailPassword(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password).then(
      (result) => {
        this.user.set(result.user);
        this.router.navigate(['/block'])
      }
    ).catch((error) => {
      this.#toastr.error(error.message)
    })
  }

  public signInWithMailPassword(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password).then(
      (result) => {
        this.user.set(result.user);
        this.router.navigate(['/block'])
      }
    ).catch((error) => {
      this.#toastr.error(error.message)
    })
  }

  public signOut() {
    this.afAuth.signOut().then(
      () => {
        this.user.set(null)
        this.router.navigate(['/signIn'])
      }
    );
  }
}