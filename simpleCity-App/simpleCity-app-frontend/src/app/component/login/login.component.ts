// import { Component, Inject, OnInit } from '@angular/core';
// import { OKTA_AUTH } from '@okta/okta-angular';
// import OktaAuth from '@okta/okta-auth-js';
// import OktaSignIn from '@okta/okta-signin-widget';

// import appConfig from '../../config/app-config'

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent implements OnInit{

//   oktaSignIn: any;

//   constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {

//     this.oktaSignIn = new OktaSignIn({
//       logo: 'assets/images/products/Simple City.png',
//       baseUrl: appConfig.oidc.issuer.split('/oauth2')[0],
//       clientId: appConfig.oidc.clientId,
//       redirectUri: appConfig.oidc.redirectUri,
//       authParams: {
//         pkce: true,
//         issuer: appConfig.oidc.issuer,
//         scopes: appConfig.oidc.scopes
//       },
//       // authClient: oktaAuth,
//     });

//   }

//   ngOnInit(): void {
//     this.oktaSignIn.remove();

//     debugger

//     this.oktaSignIn.renderEl({
//       el: '#okta-sign-in-widget'},
//       (response: any) => {
//         if (response.status === 'SUCCESS') { 

//             debugger

//           this.oktaAuth.signInWithRedirect();
//         }
//       },
//       (error: any) => {
//         throw error;
//       }
//     );
//   }
// }
