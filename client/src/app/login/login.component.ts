import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    @ViewChild('usernameInput') usernameInput: ElementRef<HTMLInputElement>;
    @ViewChild('passwordInput') passwordInput: ElementRef<HTMLInputElement>;
    @ViewChild('invalidInput') invalidInput: ElementRef<HTMLHeadingElement>
  username: string;
  password: string;
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    if (this.auth.loggedIn) {
      this.auth.disconnect();
    }
  }

  async clickConfirm(){
      await this.auth.authenticateUser(this.username, this.password);
      if(!this.auth.loggedIn){
          this.router.navigate(['/']);
      }
      else{
          this.invalidInput.nativeElement.textContent = 'Veuillez entrer un untilisateur et mot de passe valides';
      }
  }
}
