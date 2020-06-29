import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherComponent } from './teacher.component';
import { CounselDataComponent } from './counsel-data/counsel-data.component';
import { TeacherDataComponent } from './teacher-data/teacher-data.component';
import { StudentUploadComponent } from './student-upload/student-upload.component';


const routes: Routes = [
  {
    path:'',
    component:TeacherComponent,
    children:[
      {
        path: 'counsel-data',
        component: CounselDataComponent,
      },
      {
        path: 'teacher-data',
        component: TeacherDataComponent,
      },
      {
        path: 'student-upload',
        component: StudentUploadComponent,
      },
      {
        path: '',
        redirectTo: '/teacher',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/teacher',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
