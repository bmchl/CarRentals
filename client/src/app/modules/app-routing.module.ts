import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "../app.component";
import { MemberSearchComponent } from "../member-search/member-search.component";
import { NewReservationComponent } from "../new-reservation/new-reservation.component";
import { ReservationsListComponent } from "../reservations-list/reservations-list.component";
import { LoginComponent } from "../login/login.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "/", component: AppComponent},
  { path: "members", component: MemberSearchComponent },
  { path: "reservations", component: ReservationsListComponent },
  { path: "new", component: NewReservationComponent },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
