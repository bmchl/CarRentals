import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reservation } from '../../../../common/reservation';
import { CommunicationService } from '../services/communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent {
  reservationForm: FormGroup;
   constructor(private zone: NgZone, private router: Router, private communicationService: CommunicationService, private fb: FormBuilder) { }

  ngOnInit() {
    this.reservationForm = this.fb.group({
      location: ['', Validators.required],
      vehicleType: ['', Validators.required],
      dateTime: ['', Validators.required],
      requirements: ['']
    });
  }

  submit() {
    if (this.reservationForm.valid) {
      const newReservation: Reservation = {
        location: this.reservationForm.value.location,
        vehicleType: this.reservationForm.value.vehicleType,
        dateTime: this.reservationForm.value.dateTime,
        requirements: this.reservationForm.value.requirements
      };
      this.communicationService.insertReservation(newReservation).subscribe((res: number) => {
        if (res > 0) {
          this.communicationService.filter("update");
        }
        this.zone.run(() => {
          this.router.navigate(['/reservations']);
        });
      });
    }
  }
}
