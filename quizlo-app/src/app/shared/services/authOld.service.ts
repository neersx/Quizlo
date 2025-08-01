import { Injectable,NgZone } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthServiceOld {
  authState: any;
  afAuth: any;
  afs: any;
  public showLoader:boolean=false;

  constructor( private router: Router,public ngZone: NgZone) {

  }

  // all firebase getdata functions

  get isUserAnonymousLoggedIn(): boolean {
    return this.authState !== null ? this.authState.isAnonymous : false;
  }

  get currentUserId(): string {
    return this.authState !== null ? this.authState.uid : '';
  }

  get currentUserName(): string {
    return this.authState['email'];
  }

  get currentUser(): any {
    return this.authState !== null ? this.authState : null;
  }

  get isUserEmailLoggedIn(): boolean {
    if (this.authState !== null && !this.isUserAnonymousLoggedIn) {
      return true;
    } else {
      return false;
    }
  }


  singout(): void {
    // this.afu.signOut();
    this.router.navigate(['/login']);
  }
  

    // Sign up with email/password
    SignUp(email:any, password:any) {
      return this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((result:any) => {
          /* Call the SendVerificaitonMail() function when new user sign
          up and returns promise */
          this.SendVerificationMail();
          // this.SetUserData(result.user);
        }).catch((error:any) => {
          window.alert(error.message)
        })
    }


    // main verification function
    SendVerificationMail() {
      return this.afAuth.currentUser.then((u:any) => u.sendEmailVerification()).then(() => {
          this.router.navigate(['/dashboard/sales']);
        })
    }

    
 // sign in function
 SignIn(email:any, password:any) {
  return this.afAuth.signInWithEmailAndPassword(email, password)
    .then((result:any) => {
      if (result.user.emailVerified !== true) {
        this.SendVerificationMail();
        this.showLoader = true;
      } else {
        this.showLoader = false;
        this.ngZone.run(() => {
          this.router.navigate(['/auth/login']);
        });
      }
    }).catch((error:any) => {
      throw error;
    })
}
ForgotPassword(passwordResetEmail:any) {
  return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error:any) => {
      window.alert(error);
    });
}
}
