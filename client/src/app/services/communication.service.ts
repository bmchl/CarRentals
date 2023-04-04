// À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
import { Injectable } from "@angular/core";
import { Observable, Subject, catchError, of } from "rxjs";
import { Reservation } from "../../../../common/reservation";
import { Vehicle } from "../../../../common/vehicle";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CommunicationService {
  // À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
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
    // À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
    return this.http.get(`${this.BASE_URL}/${path}`).pipe(
      catchError(this.handleError("get", []))
    );
    return new Observable();
  }

  public insertReservation(reservation: Reservation): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/reservations/insert", reservation)
      .pipe(catchError(this.handleError<number>("insertReservation")));
  }

  getHybridPKs(): Observable<Vehicle[]> {
    return this.http
      .get<Vehicle[]>(this.BASE_URL + "/hybrids")
      .pipe(catchError(this.handleError<Vehicle[]>("getHybrids")));
  }
  getSedanPKs(): Observable<Vehicle[]> {
    return this.http
      .get<Vehicle[]>(this.BASE_URL + "/sedans")
      .pipe(catchError(this.handleError<Vehicle[]>("getSedans")));
  }
  getSuvPKs(): Observable<Vehicle[]> {
    return this.http
      .get<Vehicle[]>(this.BASE_URL + "/suvs")
      .pipe(catchError(this.handleError<Vehicle[]>("getSedans")));
  }

  // À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
