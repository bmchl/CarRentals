import { Injectable } from "@angular/core";
import { Observable, Subject, catchError, of } from "rxjs";
import { Reservation } from "../../../../common/reservation";
import { Vehicle } from "../../../../common/vehicle";
import { HttpClient } from "@angular/common/http";
import { LocationPK } from "../../../../common/location";
import {Member} from '../../../../common/member';

@Injectable()
export class CommunicationService {
  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private readonly http: HttpClient) {}

  private _listeners: any = new Subject<any>();

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string): void {
    this._listeners.next(filterBy);
  }

  get(path: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${path}`).pipe(
      catchError(this.handleError("get", []))
    );
    return new Observable();
  }

  insertReservation(reservation: Reservation): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/reservations/insert", reservation)
      .pipe(catchError(this.handleError<number>("insertReservation")));
  }
  getReservations(): Observable<Reservation[]> {
    return this.http
      .get<Reservation[]>(this.BASE_URL + "/reservation")
      .pipe(catchError(this.handleError<Reservation[]>("getReservations")));
  }

  getMembers(searchQuery: string): Observable<Member[]> {
    return this.http
      .get<Member[]>(this.BASE_URL + `/search/members?searchQuery=${searchQuery}`)
      .pipe(catchError(this.handleError<Member[]>("getMembers")));
  }  

  getAllMembers(): Observable<Member[]> {
    return this.http
      .get<Member[]>(this.BASE_URL + `/members`)
      .pipe(catchError(this.handleError<Member[]>("getMembers")));
  }

  formatDate(date: Date): string {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  getHybridPKs(location: string, startDate: Date, endDate: Date): Observable<Vehicle[]> {
    return this.http
      .get<Vehicle[]>(this.BASE_URL + `/vehicles?type=Hybride&location=${location}&startDate=${this.formatDate(startDate)}&endDate=${this.formatDate(endDate)}`)
      .pipe(catchError(this.handleError<Vehicle[]>("getHybrids")));
  }
  getSedanPKs(location: string, startDate: Date, endDate: Date): Observable<Vehicle[]> {
    return this.http
      .get<Vehicle[]>(this.BASE_URL + `/vehicles?type=Berline&location=${location}&startDate=${this.formatDate(startDate)}&endDate=${this.formatDate(endDate)}`)
      .pipe(catchError(this.handleError<Vehicle[]>("getSedans")));
  }
  getSuvPKs(location: string, startDate: Date, endDate: Date): Observable<Vehicle[]> {
    return this.http
      .get<Vehicle[]>(this.BASE_URL + `/vehicles?type=MiniCamionette&location=${location}&startDate=${this.formatDate(startDate)}&endDate=${this.formatDate(endDate)}`)
      .pipe(catchError(this.handleError<Vehicle[]>("getSuvs")));
  }

  getLocationPKs(): Observable<LocationPK[]> {
    return this.http
      .get<LocationPK[]>(this.BASE_URL + "/locations")
      .pipe(catchError(this.handleError<LocationPK[]>("getLocations")));
  }

  authenticateUser(username: string, password: string): Observable<boolean> {
    return this.http
      .get<boolean>(this.BASE_URL + `/authenticate?username=${username}&password=${password}`)
      .pipe(catchError(this.handleError<boolean>("authenticateUser")));
  }

  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
