import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

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

  public signInWithGoogle(): Promise<void> {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider).then(
      (result) => {
        this.user.set(result.user);
        this.router.navigate(['/block'])
      }
    )
  }

  public signInWithGithub(): Promise<void> {
    return this.afAuth.signInWithPopup(new GithubAuthProvider).then(
      (result) => {
        this.user.set(result.user);
        this.router.navigate(['/block'])
      }
    )
  }

  public signUpWithMailPassword(email: string, password: string): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(
      (result) => {
        this.user.set(result.user);
        this.router.navigate(['/block'])
      }
    )
  }

  public signInWithMailPassword(email: string, password: string): Promise<void> {
    return this.afAuth.signInWithEmailAndPassword(email, password).then(
      (result) => {
        this.user.set(result.user);
        this.router.navigate(['/block'])
      }
    )
  }

  public signOut(): Promise<void> {
    return this.afAuth.signOut().then(
      () => {
        this.user.set(null)
        this.router.navigate(['/signIn'])
      }
    );
  }
}