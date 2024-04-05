import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../common/cart';
import { OrderHistory } from '../common/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private cartUrl = 'http://localhost:8080/api/carts'

  constructor( private httpClient: HttpClient ) { }

  getCartHistory(userEmail: string): Observable<GetResponseCartHistory> {
    //Build url  on customer email
    const cartHistoryUrl = `${this.cartUrl}/search/findByCustomerEmailOrderByCreateDateDesc?email=${userEmail}`;

    return this.httpClient.get<GetResponseCartHistory>(cartHistoryUrl);
  }
}

interface GetResponseCartHistory {
  _embedded: {
    carts: OrderHistory[];
  }
}
