import { Component, OnInit } from '@angular/core';
import { OrderHistory } from '../../common/order-history';
import { OrderHistoryService } from '../../service/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit {

  orderHistoryList: OrderHistory[] = [];
  storage: Storage = sessionStorage;

  constructor( private orderHistoryService: OrderHistoryService){}

  ngOnInit(): void {
    this.handleOrderHistory();
  }

  handleOrderHistory() {
    //read the userEmail from session storage and save it to uEmail
    const uEmail = JSON.parse(this.storage.getItem('userEmail')!);
    //using uEmail, retrieve customer's data
    this.orderHistoryService.getCartHistory(uEmail).subscribe(
      data => {
        this.orderHistoryList = data._embedded.carts;
      }
    );
  }

}
