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
  
  async authenticateUser(username: string, password: string): Promise<boolean> {
    return new Promise<boolean>((res) => {
      this.communicationService.authenticateUser(username, password).subscribe((data) => {
        console.log(data);
        if (data === 1) {
          this.loggedIn = true;
          this.memberId = username;
        } else if (data === 0 || data === -1) {
          this.loggedIn = false;
          this.memberId = null;
        }
        res(this.loggedIn);
      });
    });
  }

}
