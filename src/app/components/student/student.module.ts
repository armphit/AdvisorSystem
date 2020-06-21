import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { SharedModules } from 'src/app/shared-modules';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModules
  ]
})
export class StudentModule { }
