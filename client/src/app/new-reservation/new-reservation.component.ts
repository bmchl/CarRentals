import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reservation } from '../../../../common/reservation';
import { CommunicationService } from '../services/communication.service';
import { Router } from '@angular/router';
import { Vehicle } from '../../../../common/vehicle';
import { LocationPK } from '../../../../common/location';
import { VehicleType } from './vehicle-type';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent {
  reservationForm: FormGroup;
  vehicles: VehicleType[] = [
    {
      name: 'Hybride', vehicles: []
    },
    {
      name: 'Berline', vehicles: []
    },
    {
      name: 'Mini-camionnette', vehicles: []
    }
  ];
  locations: LocationPK[];
   constructor(private zone: NgZone, private router: Router, private communicationService: CommunicationService, private fb: FormBuilder, public auth: AuthenticationService) { }

  ngOnInit() {
    this.reservationForm = this.fb.group({
      location: ['', Validators.required],
      vehiclePK: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      requirements: ['']
    });
    this.communicationService.getLocationPKs().subscribe((res: LocationPK[]) => {
      this.locations = res;
    });
    this.reservationForm.controls.vehiclePK.disable();
    
    this.reservationForm.controls.location.valueChanges.subscribe((value: string) => {
      if (this.reservationForm.value.startDate && this.reservationForm.value.endDate) {
        this.fetchVehicles(value, this.reservationForm.value.startDate, this.reservationForm.value.endDate);
        this.reservationForm.controls.vehiclePK.enable();
      }
    });
    this.reservationForm.controls.startDate.valueChanges.subscribe((value: Date) => {
      if (this.reservationForm.value.location && this.reservationForm.value.endDate) {
        this.fetchVehicles(this.reservationForm.value.location, value, this.reservationForm.value.endDate);
        this.reservationForm.controls.vehiclePK.enable();
      }
    });
    this.reservationForm.controls.endDate.valueChanges.subscribe((value: Date) => {
      if (this.reservationForm.value.startDate && this.reservationForm.value.location) {
        this.fetchVehicles(this.reservationForm.value.location, this.reservationForm.value.startDate, value);
        this.reservationForm.controls.vehiclePK.enable();
      }
    });
  }

  fetchVehicles(location: string, startDate: Date, endDate: Date) {
    this.communicationService.getHybridPKs(location, startDate, endDate).subscribe((res: Vehicle[]) => {
      this.vehicles[0].vehicles = res;
    });
    this.communicationService.getSedanPKs(location, startDate, endDate).subscribe((res: Vehicle[]) => {
      this.vehicles[1].vehicles = res;
    });
    this.communicationService.getSuvPKs(location, startDate, endDate).subscribe((res: Vehicle[]) => {
      this.vehicles[2].vehicles = res;
    });
  }

  submit() {
    if (this.reservationForm.valid && this.auth.loggedIn) {
      const newReservation: Reservation = {
        datedebutres: this.reservationForm.value.startDate,
        datefinres: this.reservationForm.value.endDate,
        nummembrereserve: parseInt(this.auth.memberId as string),
        immatriculationvehicule: this.reservationForm.value.vehiclePK,
        exigencessupplementaires: this.reservationForm.value.requirements,
      };
      this.communicationService.insertReservation(newReservation).subscribe((res: number) => {
        if (res > 0) {
          this.communicationService.filter("update");
        }
        this.zone.run(() => {
          window.alert("Votre réservation a été effectuée avec succès.");
          this.router.navigate(['/reservations']);
        });
      });
    }
    else {
      window.alert('Veuillez vous connecter et fournir toutes les informations nécessaires pour réserver un véhicule.');
    }
  }
}
