import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { IProductCreate } from './interfaces/interfaces.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  URL = 'http://localhost:3000';

  async list(filters: any) {
    return this.http
      .get(`${this.URL}/product`, {
        params: new HttpParams({ fromObject: filters }),
      })
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  async create(body: IProductCreate) {
    try {
      const res = await this.http.post(`${this.URL}/product`, body).toPromise();
      return res;
    } catch (error) {
      throw error;
    }
  }

  async update(body: IProductCreate) {
    try {
      const res = await this.http.put(`${this.URL}/product`, body).toPromise();
      return res;
    } catch (error) {
      throw error;
    }
  }

  async delete(_productId: string) {
    try {
      const res = await this.http
        .delete(`${this.URL}/product/${_productId}`)
        .toPromise();
      return res;
    } catch (error) {
      throw error;
    }
  }

  async searchById(_productId: string) {
    try {
      const res = await this.http
        .get(`${this.URL}/product/${_productId}`)
        .toPromise();
      return res;
    } catch (error) {
      throw error;
    }
  }
}
