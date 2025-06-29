import { Injectable,NgZone } from '@angular/core';
import { Router } from '@angular/router';
export interface User {
  id: number;
  email: string;
  displayName?: string;
  firstName?: string,
  lastName?: string,
  photoURL?: string;
  emailVerified?: boolean;
  phoneNumbe?: string;
  phoneNumberConfirmed?: boolean,
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
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

  registerWithEmail(email: string, password: string) {
    // return this.afu
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((user: any) => {
    //     this.authState = user;
    //   })
    //   .catch((_error: any) => {
    //     console.log(_error);
    //     throw _error;
    //   });
  }

  loginWithEmail(email: string, password: string) {
    // return this.afu
    //   .signInWithEmailAndPassword(email, password)
    //   .then((user: any) => {
    //     this.authState = user;
    //   })
    //   .catch((_error: any) => {
    //     console.log(_error);
    //     throw _error;
    //   });
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
          this.SetUserData(result.user);
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
      // Set user
  SetUserData(user:any) {
    // const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      email: user.email,
      displayName: user.displayName,
      id: user.uid,
      photoURL: user.photoURL || 'src/favicon.ico',
      emailVerified: user.emailVerified
    };
    // userRef.delete().then(function () {})
    //       .catch(function (error:any) {});
    // return userRef.set(userData, {
    //   merge: true
    // });
  }
 // sign in function
 SignIn(email:any, password:any) {
  return this.afAuth.signInWithEmailAndPassword(email, password)
    .then((result:any) => {
      if (result.user.emailVerified !== true) {
        this.SetUserData(result.user);
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
