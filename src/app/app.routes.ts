import { Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { FormFileComponent } from './pages/form-file/form-file.component';

export const routes: Routes = [
    {
        path: "places",
        component: ListComponent
    },
    {
        path: "form",
        component: FormFileComponent
    }
];
