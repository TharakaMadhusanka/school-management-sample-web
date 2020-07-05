import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private appConfig: any;

  constructor(private http: HttpClient ) { }

  loadAppConfig() {
    return this.http.get('/assets/app.config.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }

  // To return the app config data
  get configdata () {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig;
  }

}
