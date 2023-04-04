import { Component } from '@angular/core';
import { Reservation } from '../../../../common/reservation';

@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.css']
})
export class ReservationsListComponent {
  data: Reservation[] = [];
  displayedColumns = ['location', 'vehicleType', 'dateTime', 'requirements'];
}
