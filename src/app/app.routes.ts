import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';

export const routes: Routes = [
    {
        path: '',
        component: ListComponent
    },
    {
        path: 'edit',
        loadChildren: () => import('./edit/edit.routes').then(m => m.EDIT_ROUTES)
    }

];
