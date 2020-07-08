import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { SchoolDetailsService } from './school-details.service';


const ELEMENT_DATA = [];

@Component({
  selector: 'app-school-details',
  templateUrl: './school-details.component.html',
  styleUrls: ['./school-details.component.css']
})

export class SchoolDetailsComponent implements OnInit, AfterViewInit {

  constructor(private schoolService: SchoolDetailsService) { }

  // Default Pagination Values
  pageNumber = '1';
  noOfRows = '10';
  searchBy = '';

 
  schoolslist = new MatTableDataSource();
  displayedColumns: string[] = [ 'SchoolName', 'Address', 'NoOfStudents', 'Button'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.schoolslist.paginator = this.paginator;
  }

  // To get list of schools
  getSchoolsList() {
    this.schoolService.getListOfSchools(this.pageNumber, this.noOfRows, this.searchBy).subscribe((data:any) => {
      this.schoolslist = data;
    });


  }

  ngAfterViewInit() {
    this.getSchoolsList();
  }

  deleteRecord(record: any) {
    console.log(record);
  }


}
