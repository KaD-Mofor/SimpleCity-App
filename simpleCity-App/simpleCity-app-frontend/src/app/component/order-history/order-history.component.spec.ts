import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { OrderHistoryComponent } from './order-history.component';
import { OrderHistoryService } from '../../service/order-history.service';
import { OrderHistory } from '../../common/order-history';

describe('OrderHistoryComponent', () => {
  let component: OrderHistoryComponent;
  let fixture: ComponentFixture<OrderHistoryComponent>;
  let orderHistoryService: jasmine.SpyObj<OrderHistoryService>;

  beforeEach(async () => {
    orderHistoryService = jasmine.createSpyObj('OrderHistoryService', ['getCartHistory']);

    await TestBed.configureTestingModule({
      declarations: [OrderHistoryComponent],
      providers: [{ provide: OrderHistoryService, useValue: orderHistoryService }]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderHistoryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch order history from service', () => {

    const mockOrderHistory: OrderHistory[] = [
      {
        id: 1, createDate: new Date(), totalQuantity: 5, totalPrice: 100,
        orderTrackingNumber: 'SIMPLE--OUJSHUNSKSH8977NSHS',
        status: 'ordered'
      },
      {
        id: 2, createDate: new Date(), totalQuantity: 3, totalPrice: 75,
        orderTrackingNumber: 'SIMPLE--IOSNSDJKMOAJKSOK87698',
        status: 'pending'
      }
    ];

    orderHistoryService.getCartHistory.and.returnValue(of({ _embedded: { carts: mockOrderHistory } }));

    fixture.detectChanges();

    expect(component.orderHistoryList).toEqual(mockOrderHistory);
  });
});
