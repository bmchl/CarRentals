import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public memberId: string | null;
  public loggedIn: boolean = false;
  constructor(private communicationService: CommunicationService) { }

  disconnect() {
    this.memberId = null;
    this.loggedIn = false;
  }
  
  async authenticateUser(username: string, password: string) {
    this.communicationService.authenticateUser(username, password).subscribe((data) => {
      this.loggedIn = data;
      if (this.loggedIn) {
        this.memberId = username;
      }
    });
  }

}
