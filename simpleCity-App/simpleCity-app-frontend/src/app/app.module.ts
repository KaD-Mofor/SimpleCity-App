import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductService } from './service/product.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './component/search/search.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './component/cart-status/cart-status.component';
import { CartDetailsComponent } from './component/cart-details/cart-details.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginStatusComponent } from './component/login-status/login-status.component';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { ProfileComponent } from './component/profile/profile.component';
import { MembersComponent } from './component/members/members.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { OrderHistoryComponent } from './component/order-history/order-history.component';
import { ProductCategoryMenuComponent } from './component/product-category-menu/product-category-menu.component';
import appConfig from './config/app-config';
// import { LoginComponent } from './component/login/login.component';

  // const oktaConfig = appConfig.oidc;
   const oktaAuth = new OktaAuth(appConfig.oidc)

  // Alternative

  // const oktaAuth = new OktaAuth({
  //   issuer: 'https://dev-52454893.okta.com/oauth2/default',
  //   clientId: '0oag4hoawrrsSNJoW5d7',
  //   redirectUri: 'http://localhost:4200/login/callback',
  //   scopes: ['openid', 'profile', 'email'],
  //   // redirectUri: window.location.origin + '/login/callback'
  // });

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginStatusComponent,
    ProfileComponent,
    MembersComponent,
    ContactUsComponent,
    OrderHistoryComponent,
    // LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule.forRoot({ oktaAuth }) //For Alternative
    // OktaAuthModule
  ],
  providers: [HttpClient, ProductService, 
          {provide: OKTA_CONFIG, useValue: {oktaAuth}}
        ],
  bootstrap: [AppComponent]
})
export class AppModule { }
