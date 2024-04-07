import { Injector, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { CartDetailsComponent } from './component/cart-details/cart-details.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { OktaAuthGuard, OktaAuthModule, OktaCallbackComponent } from '@okta/okta-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
// import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { MembersComponent } from './component/members/members.component';
import OktaAuth from '@okta/okta-auth-js';
import { OrderHistoryComponent } from './component/order-history/order-history.component';
import { LoginStatusComponent } from './component/login-status/login-status.component';
// import { Router } from '@okta/okta-signin-widget/types/packages/@okta/courage-dist/types';

  // const oktaConfig = appConfig.oidc;
  // const oktaAuth = new OktaAuth(oktaConfig)

  function sendToProfile(oktaAuth: OktaAuth, injector: Injector) {
    const router = injector.get(Router);

    router.navigate(['/profile']);
  }

const routes: Routes = [
  {path: 'order-history', component: OrderHistoryComponent, 
                    canActivate: [ OktaAuthGuard ],            //Viewable by authenticated users only
                    data: {onAuthRequired: sendToProfile}},    //Else, send to login
  { path: 'profile', component: LoginStatusComponent },
  // {path: 'login', component: LoginComponent},
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'members', component: MembersComponent, 
                    canActivate: [OktaAuthGuard],             //Viewable by authenticated users only
                    data: {onAuthRequired: sendToProfile} },  //Else, send to login
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
