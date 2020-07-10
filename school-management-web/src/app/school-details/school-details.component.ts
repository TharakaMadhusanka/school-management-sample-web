import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SchoolDetailsService } from './school-details.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


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


  schoolslist: any = [];
  displayedColumns: string[] = ['SchoolName', 'Address', 'NoOfStudents', 'buttons'];
  selectedTblRow: any = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('editbtn', { static: true }) editbtn: ElementRef;
  @ViewChild('warningbtn', { static: true }) warningbtn: ElementRef;

  updateSchoolFrm = new FormGroup({
    SchoolId: new FormControl(null),
    SchoolName: new FormControl('', [Validators.required]),
    Street: new FormControl('', [Validators.required]),
    Suburb: new FormControl(''),
    PostCode: new FormControl('', [Validators.required]),
    StateId: new FormControl('', [Validators.required]),
    NoOfRegisteredStudents: new FormControl(0),
    Type: new FormControl(null)
  });

  ngOnInit() {
  }

  // To get list of schools
  getSchoolsList() {
    this.schoolService.getListOfSchools(this.pageNumber, this.noOfRows, this.searchBy).subscribe((data: any) => {
      this.schoolslist = new MatTableDataSource<any>(data);
      this.schoolslist.paginator = this.paginator;
    });


  }

  ngAfterViewInit() {
    this.getSchoolsList();
  }

  deleteRecord() {
    let selectedRow = this.schoolslist.filteredData[this.selectedTblRow];
    console.log(selectedRow);
    this.schoolService.updateSchool(
      selectedRow['SchoolId'],
      selectedRow['SchoolName'],
      selectedRow['Suburb'],
      selectedRow['Street'],
      selectedRow['StateId'],
      selectedRow['PostCode'],
      selectedRow['NoOfRegisteredStudents'],
      '3').subscribe((response: Response) => {
        console.log(response);
      });

  }

  triggerWarningModal(rowindex: number) {
    this.selectedTblRow = rowindex;
    this.warningbtn.nativeElement.click();
  }


}
