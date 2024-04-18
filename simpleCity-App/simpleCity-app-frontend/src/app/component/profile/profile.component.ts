import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { filter, map, Observable } from 'rxjs';
import OktaAuth, { AuthState } from '@okta/okta-auth-js';
// import OktaSignIn from '@okta/okta-signin-widget';
import appConfig from '../../config/app-config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',

  template: `
  <div class="profile-card">
    <div class="shield"></div>
    <p *ngIf="name$ | async as name">
        Hello {{name}}!
    </p>
  </div>
  `,
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  public name$!: Observable<string>;

  constructor(private _oktaAuthStateService: OktaAuthStateService) {  }

  public ngOnInit(): void {
    this.name$ = this._oktaAuthStateService.authState$.pipe(
      filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
      map((authState: AuthState) => authState.idToken?.claims.name ?? '')
    );

  }

// oktaSignIn: any;

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

}

  
