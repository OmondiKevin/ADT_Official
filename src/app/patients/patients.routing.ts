import { RouterModule, Routes } from "@angular/router";
import { PatientAddComponent } from './patient-add/patient-add.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientViewComponent } from './patient-view/patient-view.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';

export const routes: Routes = [
    {
        path: 'add',
        component: PatientAddComponent,
        data: { pageTitle: 'Add Patient' }
    },
    {
        path: 'list',
        component: PatientListComponent,
        data: { pageTitle: 'Patient List' }
    },
    {
        path: 'detail',
        component: PatientViewComponent,
        data: { pageTitle: 'Patient View' }
    },
    {
        path: 'edit',
        component: PatientEditComponent,
        data: { pageTitle: 'Edit Patient' }
    }
];

export const routing = RouterModule.forChild(routes);