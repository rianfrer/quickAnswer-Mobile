import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url: string =
    'https://us-south.functions.appdomain.cloud/api/v1/web/75a6c58b-8400-4fff-aac1-11d1bc743b16/default/crud_prjbarber.json?';

  // private DEV_URL: 'http://localhost:3000/all_docs';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${this.url}all_docs`);
  }

  update() {}

  delete(id: any) {
    return this.http.delete(`${this.url}_id=${id}_rev`);
  }
}
