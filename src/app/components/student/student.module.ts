import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { SharedModules } from 'src/app/shared-modules';
import { UploadfileDataComponent } from './uploadfile-data/uploadfile-data.component';
import { CounselDataComponent } from './counsel-data/counsel-data.component';


@NgModule({
  declarations: [UploadfileDataComponent, CounselDataComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModules
  ]
})
export class StudentModule { }
