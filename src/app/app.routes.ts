import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '',
        component: ListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'edit',
        loadChildren: () => import('./edit/edit.routes').then(m => m.EDIT_ROUTES),
        canActivate: [AuthGuard]
    }
];
