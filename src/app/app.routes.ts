import { Routes } from '@angular/router';
import { BlockComponent } from './pages/block/block.component';
import { TableComponent } from './pages/table/table.component';
import { DetailComponent } from './pages/detail/detail.component';

export const routes: Routes = [
  {
    path: 'block',
    component: BlockComponent,
  },
  {
    path: 'table',
    component: TableComponent,
  },
  {
    path: 'details/:id',
    component: DetailComponent,
  },
  {
    path: '**',
    redirectTo: 'block'
  }
];
