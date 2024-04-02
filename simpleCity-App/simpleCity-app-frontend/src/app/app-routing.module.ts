import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { CartDetailsComponent } from './component/cart-details/cart-details.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { OktaAuthModule, OktaCallbackComponent } from '@okta/okta-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './component/profile/profile.component';

  // const oktaConfig = appConfig.oidc;
  // const oktaAuth = new OktaAuth(oktaConfig)


const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'login/callback', component: OktaCallbackComponent },
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
