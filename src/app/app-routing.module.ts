import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootNavComponent } from './root-nav/root-nav.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: RootNavComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'admin',
        loadChildren: () =>
          import('./components/admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'student',
        loadChildren: () =>
          import('./components/student/student.module').then(
            (m) => m.StudentModule
          ),
      },
      {
        path: 'teacher',
        loadChildren: () =>
          import('./components/teacher/teacher.module').then(
            (m) => m.TeacherModule
          ),
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
