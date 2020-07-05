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

  getListOfSchools(pageNumber: string, noOfRows: string, serachFor: string) : Observable<any> {
    const url = this.appConfig.appConfigData.apiBaseUrl + "api/school";
    let params = new HttpParams().set('noOfRows', noOfRows)
                                  .set("pageNumber", pageNumber)
                                  .set("searchFor", serachFor);
    

    return this.http.get<any>(url, {params: params});
  }
}
