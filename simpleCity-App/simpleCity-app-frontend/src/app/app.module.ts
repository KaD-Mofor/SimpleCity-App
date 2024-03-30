import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './service/product.service';
import { Router, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './component/product-category-menu/product-category-menu.component';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { SearchComponent } from './component/search/search.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './component/cart-status/cart-status.component';
import { CartDetailsComponent } from './component/cart-details/cart-details.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginStatusComponent } from './component/login-status/login-status.component';
import { LoginComponent } from './component/login/login.component';
import {
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG
} from '@okta/okta-angular';
import appConfig from './config/app-config';
import OktaAuth from '@okta/okta-auth-js';
import { config } from 'rxjs';

  // const oktaConfig = appConfig.oidc;
   const oktaAuth = new OktaAuth(appConfig.oidc)

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [ProductService, 
          {provide: OKTA_CONFIG, 
          useFactory: () => {
            const oktaAuth = new OktaAuth(appConfig.oidc)
            return {
              oktaAuth,
              onAuthRequired: (_oktaAuth: OktaAuth, injector: Injector) => {
                const router = injector.get(Router);
                // Redirect the user to your custom login page
                router.navigate(['/login']);
              }
            }
          }
        },
        // { provide: APP_BASE_HREF, useValue: {oktaAuth} },
        ],
  bootstrap: [AppComponent]
})
export class AppModule { }
