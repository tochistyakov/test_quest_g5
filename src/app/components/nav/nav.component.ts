import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

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
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #cdr = inject(ChangeDetectorRef);

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
}