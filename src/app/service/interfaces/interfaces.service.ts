import { Injectable } from '@angular/core';

export interface IProductCreate {
  description: string;
  amount: number;
  image: string;
}

export interface IStoreCreate {
  description: string;
}

export interface ISaveProductStoreCreate {
  store: string;
  _productId: number;
  amount: number;
}

export interface IProductEdit {
  description: string;
  amount: number;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class InterfacesService {}
