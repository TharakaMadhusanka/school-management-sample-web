import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolDetailsComponent } from './school-details.component';
import { SchoolDetailsService } from './school-details.service';
import { SchoolDetailsRoutingModule } from './school-details-routing.module';
import { MatInputModule, MatFormFieldModule } from '@angular/material';


@NgModule({
  declarations: [
    SchoolDetailsComponent
  ],
  imports: [
    CommonModule,
    SchoolDetailsRoutingModule,
    MatInputModule,
    MatFormFieldModule
    
  ],
  providers: [
    SchoolDetailsService
  ]

})
export class SchoolDetailsModule { }