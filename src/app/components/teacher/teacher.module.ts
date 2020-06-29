import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { CounselDataComponent } from './counsel-data/counsel-data.component';
import { TeacherDataComponent } from './teacher-data/teacher-data.component';
import { StudentUploadComponent } from './student-upload/student-upload.component';



@NgModule({
  declarations: [CounselDataComponent, TeacherDataComponent, StudentUploadComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule
  ]
})
export class TeacherModule { }
