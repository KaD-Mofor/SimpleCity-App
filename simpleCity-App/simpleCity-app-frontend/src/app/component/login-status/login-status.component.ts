import { Component, Inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css'
})
export class LoginStatusComponent implements OnInit{

//   isAuthenticated: boolean = false;
//   userFullName: string = '';

//   constructor(private oktaAuthService: OktaAuthStateService,
//            @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {}


//   ngOnInit(): void {
//     //Subscribe to the authenticate state
//     this.oktaAuthService.authState$.subscribe(
//       (result) => {
//         this.isAuthenticated = result.isAuthenticated!;
//         this.getUserDetails();

//       }
//     )
//   }

//   getUserDetails() {
//     if (this.isAuthenticated) {

//       this.oktaAuth.getUser().then(
//         (res) => {
//           this.userFullName = res.name as string;
//         }
//       );
//     }
//   }

//   logout() {
//     //Kill session and tokens
//     this.oktaAuth.signOut();
//   }

// }

title = 'okta-angular-quickstart';
public isAuthenticated$!: Observable<boolean>;

constructor(private _router: Router, private _oktaStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth) { }

public ngOnInit(): void {
  this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
    filter((s: AuthState) => !!s),
    map((s: AuthState) => s.isAuthenticated ?? false)
  );
}

public async signIn() : Promise<void> {
  await this._oktaAuth.signInWithRedirect();
}

public async signOut(): Promise<void> {
  await this._oktaAuth.signOut();

}
}