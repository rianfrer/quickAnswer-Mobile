import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private url: string =
  //   'https://us-south.functions.appdomain.cloud/api/v1/web/75a6c58b-8400-4fff-aac1-11d1bc743b16/default/crud_prjbarber.json?all_docs';

  // private DEV_URL: "http://localhost:3000/all_docs"

  constructor(private http: HttpClient) {}

  getClientes() {
    return this.http.get('http://localhost:3000/all_docs');
  }
}
