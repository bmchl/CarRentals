import { Component, NgZone, OnInit } from '@angular/core';
import { Reservation } from '../../../../common/reservation';
import { CommunicationService } from '../services/communication.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.css']
})
export class ReservationsListComponent implements OnInit {
  data: Reservation[] = [];
  displayedColumns = ['reservationId', 'dateDebut', 'dateFin', 'numMembreReserve', 'immatriculationVehicule', 'exigencesSupplementaires'];

  constructor(private zone: NgZone, public router: Router, private communicationService: CommunicationService, private auth: AuthenticationService) { }

  ngOnInit() {
    this.communicationService.getReservations().subscribe((res: Reservation[]) => {
      this.data = res;
      res.sort((a, b) => { return (a.reservationid as number) - (b.reservationid as number)});
    })
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    return date.toLocaleDateString("fr-FR", options);
  }

  createNewReservation() {
    if (!this.auth.loggedIn) {
      window.alert("Vous devez être connecté pour réserver un véhicule.");
    }
    else {
      this.zone.run(() => this.router.navigate(["/new"]))
    }
  }
}
