import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolDetailsComponent } from './school-details.component';
import { SchoolDetailsService } from './school-details.service';
import { SchoolDetailsRoutingModule } from './school-details-routing.module';
import { MatInputModule, MatFormFieldModule, MatButtonModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NumbersOnlyDirective } from './numbers-only.directive';


@NgModule({
  declarations: [
    SchoolDetailsComponent,
    NumbersOnlyDirective
  ],
  imports: [
    CommonModule,
    SchoolDetailsRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule
    
    
  ],
  providers: [
    SchoolDetailsService
  ]

})
export class SchoolDetailsModule { }