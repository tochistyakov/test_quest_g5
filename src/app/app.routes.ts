import { Routes } from '@angular/router';
import { BlockComponent } from './pages/block/block.component';
import { TableComponent } from './pages/table/table.component';
import { DetailComponent } from './pages/detail/detail.component';
import { SignInComponent } from './pages/signIn/signIn.component';
import { SignUpComponent } from './pages/signUp/signUp.component';
import { AuthGuard } from './data/guards/auth.guard';
import { UnAuthGuard } from './data/guards/unauth.guard';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/block',
    pathMatch: 'full',
  },
  // {
  //   path: '',
  //   component: AppComponent,
  //   children: [
      {
        path: 'block',
        component: BlockComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'table',
        component: TableComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'detail/:id',
        component: DetailComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'signIn',
        component: SignInComponent,
        canActivate: [UnAuthGuard]
      },
      {
        path: 'signUp',
        component: SignUpComponent,
        canActivate: [UnAuthGuard]
      },
  //   ]
  // },
  
  {
    path: '**',
    redirectTo: 'block'
  }
];
