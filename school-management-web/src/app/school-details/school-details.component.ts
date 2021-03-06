import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SchoolDetailsService } from './school-details.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-school-details',
  templateUrl: './school-details.component.html',
  styleUrls: ['./school-details.component.css']
})

export class SchoolDetailsComponent implements OnInit, AfterViewInit {

  constructor(private schoolService: SchoolDetailsService, private spinner: NgxSpinnerService) { }

  // Default Pagination Values
  pageNumber = '1';
  noOfRows = '10';
  searchBy = '';

  schoolslist: any = [];
  stateslist: any = [];
  displayedColumns: string[] = ['No', 'SchoolName', 'Address', 'NoOfStudents', 'buttons'];
  selectedTblRow: any = [];
  successMessage = "";
  // this is used to capture what functionality user choose, Add, Edit or Delete
  typeId: string = '0';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('editbtn', { static: true }) editbtn: ElementRef;
  @ViewChild('warningbtn', { static: true }) warningbtn: ElementRef;
  @ViewChild('successbtn', { static: true }) successbtn: ElementRef;
  @ViewChild('errorbtn', { static: true }) errorbtn: ElementRef;

  updateSchoolFrm = new FormGroup({
    SchoolId: new FormControl('0'),
    SchoolName: new FormControl('', [Validators.required]),
    Street: new FormControl('', [Validators.required]),
    Suburb: new FormControl(''),
    PostCode: new FormControl('', [Validators.required]),
    StateId: new FormControl('', [Validators.required]),
    NoOfRegisteredStudents: new FormControl(0),
    Type: new FormControl('0')
  });

  ngOnInit() {
  }

  // To get list of schools
  getSchoolsList() {
    this.spinner.show();
    this.schoolService.getListOfSchools(this.pageNumber, this.noOfRows, this.searchBy).subscribe((data: any) => {
      this.schoolslist = new MatTableDataSource<any>(data);
      this.schoolslist.paginator = this.paginator;
      this.spinner.hide();
    });
  }

  getStatesList() {
    this.spinner.show();
    this.schoolService.getStatesList().subscribe((response: Response) => {
      if (response.status == 200) {
        this.stateslist = response.body;
      }
      else {
        this.errorbtn.nativeElement.click();
      }
      this.spinner.hide();
    });
  }

  ngAfterViewInit() {
    this.getSchoolsList();
    this.getStatesList();
  }

  deleteRecord() {
    let selectedRow = this.schoolslist.filteredData[this.selectedTblRow];
    this.typeId = '3'
    this.spinner.show();
    this.schoolService.updateSchool(
      selectedRow['SchoolId'],
      selectedRow['SchoolName'],
      selectedRow['Suburb'],
      selectedRow['Street'],
      selectedRow['StateId'],
      selectedRow['PostCode'],
      selectedRow['NoOfRegisteredStudents'],
      this.typeId).subscribe((response: Response) => {
        if (response.status == 200) {
          this.schoolslist.data.splice(this.selectedTblRow, 1);
          this.schoolslist._updateChangeSubscription();
          this.successMessage = "Successfully deleted.";
          this.successbtn.nativeElement.click();
        }
        else {
          this.errorbtn.nativeElement.click();
        }

        this.spinner.hide();
      });

  }

  triggerWarningModal(rowindex: number) {
    this.selectedTblRow = rowindex;
    this.warningbtn.nativeElement.click();
  }

  triggerAddEditModal(rowindex: number, type: number) {
    
    this.selectedTblRow = rowindex;
    this.updateSchoolFrm.reset();

    if (type == 2) {
      this.updateSchoolFrm.controls.SchoolId.setValue(this.schoolslist.filteredData[rowindex].SchoolId);
      this.updateSchoolFrm.controls.SchoolName.setValue(this.schoolslist.filteredData[rowindex].SchoolName);
      this.updateSchoolFrm.controls.Street.setValue(this.schoolslist.filteredData[rowindex].Street);
      this.updateSchoolFrm.controls.Suburb.setValue(this.schoolslist.filteredData[rowindex].Suburb);
      this.updateSchoolFrm.controls.PostCode.setValue(this.schoolslist.filteredData[rowindex].PostCode);
      this.updateSchoolFrm.controls.StateId.setValue(this.schoolslist.filteredData[rowindex].StateId);
      this.updateSchoolFrm.controls.NoOfRegisteredStudents.setValue(this.schoolslist.filteredData[rowindex].NoOfRegisteredStudents);
    }

    this.editbtn.nativeElement.click();
    this.typeId = type.toString();
  }


  addEditRecord() {

    this.spinner.show();
    this.schoolService.updateSchool(
      this.updateSchoolFrm.controls.SchoolId.value,
      this.updateSchoolFrm.controls.SchoolName.value,
      this.updateSchoolFrm.controls.Suburb.value,
      this.updateSchoolFrm.controls.Street.value,
      this.updateSchoolFrm.controls.StateId.value,
      this.updateSchoolFrm.controls.PostCode.value,
      this.updateSchoolFrm.controls.NoOfRegisteredStudents.value,
      this.typeId).subscribe((response: Response) => {
        if (response.status == 200) {
          this.schoolslist.data = [];
          this.schoolslist._updateChangeSubscription();
          this.successMessage = "Successfully saved.";
          this.successbtn.nativeElement.click();
          this.spinner.hide();
          this.getSchoolsList();
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.schoolslist.filter = filterValue.trim().toLowerCase();
  }

  clearFilter() {
    this.schoolslist.filter = '';
    this.searchBy=''
  }


}
