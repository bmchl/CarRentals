import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  numbersOnly: RegExp = /^[0-9]+$/;
  usernameValidator = new FormControl('', [Validators.required, Validators.pattern(this.numbersOnly)]);
  passwordValidator = new FormControl('', [Validators.required]);
  password: string;
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    if (this.auth.loggedIn) {
      this.auth.disconnect();
    }
    this.username = "1";
    this.password = "password";
  }

  async authenticate() {
    if (this.username === '' || this.password === '') {
      window.alert('Veuillez entrer un numéro de membre et un mot de passe.');
      return;
    }
    const success = await this.auth.authenticateUser(this.username, this.password);
    if (success) {
      this.router.navigate(['/reservations']);
    }
    else {
      window.alert('Le numéro de membre ou mot de passe entré est invalide. Veuillez réessayer.');
      this.username = '';
      this.password = '';
    }
    // console.log(this.auth.loggedIn);
    // if (this.auth.loggedIn) {
    //   this.router.navigate(['/reservations']);
    // }
    // else {
    //   window.alert('Le numéro de membre ou mot de passe entré est invalide. Veuillez réessayer.');
    //   this.username = '';
    //   this.password = '';
    // }m m m mm    mm,m m,
  }
}
