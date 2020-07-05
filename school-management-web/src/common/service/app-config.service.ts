import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  public appConfigData: any;

  constructor(private http: HttpClient) { }

  async loadAppConfig() {
    const data = await this.http.get('/assets/app.config.json')
                                .toPromise();
    this.appConfigData = data;
  }

}
