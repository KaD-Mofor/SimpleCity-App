import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductCategoryMenuComponent } from './component/product-category-menu/product-category-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './component/search/search.component';
import { CartStatusComponent } from './component/cart-status/cart-status.component';
import { CartDetailsComponent } from './component/cart-details/cart-details.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { LoginStatusComponent } from './component/login-status/login-status.component';
import { MembersComponent } from './component/members/members.component';
import { OrderHistoryComponent } from './component/order-history/order-history.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProfileComponent } from './component/profile/profile.component';
import {  OktaAuthStateService } from '@okta/okta-angular';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [
        RouterModule.forRoot([]), // Use RouterModule.forRoot([]) instead of RouterTestingModule
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        ProductCategoryMenuComponent,
        SearchComponent,
        CartStatusComponent,
        CartDetailsComponent,
        CheckoutComponent,
        ContactUsComponent,
        LoginStatusComponent,
        MembersComponent,
        OrderHistoryComponent,
        ProductDetailsComponent,
        ProductListComponent,
        ProfileComponent,
      ],providers: [
        { provide: OktaAuthStateService, useValue: { authenticationState$: of({}) } }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'SimpleCity-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('SimpleCity-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, SimpleCity-app');
  });
});

