import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../data/api/users.service';
import { UserDetails } from '../../data/models/users.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'g5-detail',
  templateUrl: 'detail.component.html',
  styleUrls: ['detail.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule
  ]
})
export class DetailComponent {
  #route = inject(ActivatedRoute)
  #usersService = inject(UsersService)

  user: Signal<UserDetails | undefined> = toSignal(this.#usersService.getUser(this.#route.snapshot.params['id']))

}