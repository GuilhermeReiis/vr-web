import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IStoreCreate } from './interfaces/interfaces.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private http: HttpClient) {}
  URL = 'http://localhost:3000';

  async list() {
    return this.http
      .get(`${this.URL}/store`, {
        // headers: this.getHeaders(),
      })
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  async create(body: IStoreCreate) {
    try {
      return this.http.post(`${this.URL}/store`, body).toPromise();
    } catch (error) {
      throw error;
    }
  }
}
