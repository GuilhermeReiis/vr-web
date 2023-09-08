import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISaveProductStoreCreate } from './interfaces/interfaces.service';

@Injectable({
  providedIn: 'root',
})
export class ProductStoreService {
  constructor(private http: HttpClient) {}
  URL = 'http://localhost:3000';

  async list() {
    return this.http
      .get(`${this.URL}/product-store`, {
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

  async create(body: ISaveProductStoreCreate) {
    try {
      return this.http.post(`${this.URL}/product-store`, body).toPromise();
    } catch (error) {
      throw error; // Lança o erro para ser tratado no código que chama esta função
    }
  }

  async searchById(id: string) {
    try {
      return this.http.get(`${this.URL}/product-store/${id}`).toPromise();
    } catch (error) {
      throw error; // Lança o erro para ser tratado no código que chama esta função
    }
  }

  async delete(id: string) {
    try {
      return this.http.delete(`${this.URL}/product-store/${id}`).toPromise();
    } catch (error) {
      throw error; // Lança o erro para ser tratado no código que chama esta função
    }
  }

  async update(body: ISaveProductStoreCreate) {
    try {
      const res = await this.http
        .put(`${this.URL}/product-store`, body)
        .toPromise();
      return res;
    } catch (error) {
      throw error; // Lança o erro para ser tratado no código que chama esta função
    }
  }
}
