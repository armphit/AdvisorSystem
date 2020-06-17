import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { TeacherComponent } from './manage-data/teacher/teacher.component';
import { GroupComponent } from './manage-data/group/group.component';
import { StudentComponent } from './manage-data/student/student.component';
import { ManageDataComponent } from './manage-data/manage-data.component';
import { DataAdviceComponent } from './data-advice/data-advice.component';
import { StudentDataComponent } from './student-data/student-data.component';


const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      {
        path: "manage-data", component: ManageDataComponent,
      children: [
        {
          path: "group", component: GroupComponent },
        {
          path: "teacher", component: TeacherComponent },
        {
          path: "student", component: StudentComponent },
      ] },
      {
        path: "",
        redirectTo: "/admin/manage-data",
        pathMatch: "full"
      },
      {
        path:"data-advice", component: DataAdviceComponent},
      {
        path:"student-data", component: StudentDataComponent},
    ]
  },
  {
    path: "",
    redirectTo: "/admin/manage-data",
    pathMatch: "full"
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
