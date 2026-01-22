import { Routes } from '@angular/router';
import { EditComponent } from './edit.component';

export const EDIT_ROUTES: Routes = [
    {
        path: ':id',
        component: EditComponent
    }
];
