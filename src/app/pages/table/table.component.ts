import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { UsersService } from '../../data/api/users.service';
import { UsersResponse } from '../../data/models/users.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, take, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'g5-table',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule
  ]
})
export class TableComponent implements OnDestroy {
  #usersService = inject(UsersService);
  #router = inject(Router);

  users: WritableSignal<UsersResponse | null> = signal(null)

  searchControl: FormControl;

  private destroy$: Subject<void> = new Subject<void>();


  constructor() {
    this.searchControl = new FormControl('');
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public search(): void {
    if (!this.searchControl.value) {
      this.users.set(null);
      return;
    }
    this.#usersService.getUsers(this.searchControl.value).pipe(
      take(1),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (users) => this.users.set(users),
      error: (error) => console.error(error)
    });
  }

  public goToDetails(id: number): void {
    this.#router.navigate(['/details/' + id]);
  }
}