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

  storage: Storage = sessionStorage;
  userFullName: string = '';

//   isAuthenticated: boolean = false;

//   constructor(private oktaAuthService: OktaAuthStateService,
//            @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {}


//   ngOnInit(): void {
//     //Subscribe to the authenticate state
//     this.oktaAuthService.authState$.subscribe(
//       (result) => {
//         debugger
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

// Alternative

  title = 'SimpleCity';
  public isAuthenticated$!: Observable<boolean>;

  constructor(private _router: Router, private _oktaStateService: OktaAuthStateService, 
    @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth) { }

  public ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );

    this.getUserDetails();
  }

  public async signIn() : Promise<void> {
    await this._oktaAuth.signInWithRedirect();
  }

  public async signOut(): Promise<void> {
    await this._oktaAuth.signOut();

  }

  getUserDetails() {
    if (this.isAuthenticated$) {
    
      this._oktaAuth.getUser().then(
        (res) => {
          this.userFullName = res.name as string;

          //save user's email
          const customerEmail = res.email;
          this.storage.setItem('userEmail', JSON.stringify(customerEmail));
        }          
      );
    }
  }
}