import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../data/api/auth.service';

@Component({
  selector: 'g5-nav',
  templateUrl: 'nav.component.html',
  styleUrls: ['nav.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule
  ]
})
export class NavComponent {
  #router = inject(Router);
  authService = inject(AuthService)

  lastSegment: WritableSignal<string> = signal('');

  constructor() {
    this.#router.events.pipe(
      takeUntilDestroyed()
    ).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.lastSegment.set(event.url)        
      }
    });
  }

  goToPage(pageName: string) {
    this.#router.navigate([pageName]);
  }

  public signOut() {
    this.authService.signOut()
  }
}