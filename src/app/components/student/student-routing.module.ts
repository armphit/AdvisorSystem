import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student.component';
import { UploadfileDataComponent } from './uploadfile-data/uploadfile-data.component';
import { CounselDataComponent } from './counsel-data/counsel-data.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [
      {
        path: 'uploadfile-data',
        component: UploadfileDataComponent,
      },
      {
        path: 'counsel-data',
        component: CounselDataComponent,
      },
      {
        path: '',
        redirectTo: '/student',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/student',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
