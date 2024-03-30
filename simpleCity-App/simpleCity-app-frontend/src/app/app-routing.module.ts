import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { CartDetailsComponent } from './component/cart-details/cart-details.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { LoginComponent } from './component/login/login.component';
import OktaAuth from '@okta/okta-auth-js';

import {
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG
} from '@okta/okta-angular';
import appConfig from './config/app-config';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

  const oktaConfig = appConfig.oidc;
  const oktaAuth = new OktaAuth(oktaConfig)


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            BrowserModule,
          HttpClientModule,
          NgbModule,
          ReactiveFormsModule,
        OktaAuthModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
