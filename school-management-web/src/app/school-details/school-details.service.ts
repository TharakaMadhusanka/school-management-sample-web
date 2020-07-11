import { Injectable } from '@angular/core';
import { AppConfigService } from 'src/common/service/app-config.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SchoolDataModel } from 'src/data-model/school-model';

@Injectable()
export class SchoolDetailsService {

  constructor(
    private appConfig: AppConfigService,
    private http: HttpClient
  ) { }

  url = this.appConfig.appConfigData.apiBaseUrl;

  getListOfSchools(pageNumber: string, noOfRows: string, searchFor: string): Observable<any> {
    let params = new HttpParams().set('noOfRows', noOfRows)
      .set("pageNumber", pageNumber)
      .set("searchFor", searchFor);


    return this.http.get<any>(this.url, { params: params });
  }

  updateSchool(SchoolId: string,
    SchoolName: string, Suburb: string, Street: string, StateId: string,
    PostCode: string, NoOfRegisteredStudents: string,
    Type: string): Observable<any> {

    let requestBody = {
      "SchoolName": SchoolName,
      "SchoolId": SchoolId,
      "Suburb": Suburb,
      "Street": Street,
      "StateId": StateId,
      "PostCode": PostCode,
      "NoOfRegisteredStudents": NoOfRegisteredStudents,
      "Type": Type
    };

    return this.http.post<any>(this.url + 'UpdateSchool', requestBody, { observe: 'response' });
  }

  getStatesList(): Observable<any> {
    return this.http.get<any>(this.url + 'getstates', { observe: 'response' });
  }
}
