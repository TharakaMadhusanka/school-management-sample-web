import { Component, OnInit } from '@angular/core';
import { SchoolDetailsService } from './school-details.service';

@Component({
  selector: 'app-school-details',
  templateUrl: './school-details.component.html',
  styleUrls: ['./school-details.component.css']
})
export class SchoolDetailsComponent implements OnInit {

  constructor(private schoolService: SchoolDetailsService) { }

  // Default Pagination Values
  pageNumber = '1';
  noOfRows = '10';
  searchBy = '';

  ngOnInit() {
    this.getSchoolsList();
  }

  getSchoolsList() {
    this.schoolService.getListOfSchools(this.pageNumber, this.noOfRows, this.searchBy).subscribe((data:any) => {
      console.log(data);
    });
  }

}
