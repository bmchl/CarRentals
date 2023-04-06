import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/database.service";
import Types from "../types";
import { Vehicle } from "../../../common/vehicle";
import { LocationPK } from "../../../common/location";
import * as pg from "pg";
import {Reservation} from '../../../common/reservation';
import {Member} from '../../../common/member'


@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService) private readonly databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();
    
    router.get('/reservation', (req:Request, res: Response, _: NextFunction) => {
      this.databaseService.getReservation().then((result: pg.QueryResult) => {
        const reservations: Reservation[] = result.rows.map((reservation: Reservation) => ({
          reservationid: reservation.reservationid,
          datedebutres: reservation.datedebutres,
          datefinres: reservation.datefinres,
          nummembrereserve: reservation.nummembrereserve,
          immatriculationvehicule: reservation.immatriculationvehicule,
          exigencessupplementaires: reservation.exigencessupplementaires,
        }));
        res.json(reservations);
      })
      .catch((e: Error) => {
        console.error(e.stack);
      });
    });

    router.get('/members', (req:Request, res: Response, _: NextFunction) => {
      this.databaseService.getAllMembers().then((result: pg.QueryResult) => {
        const members: Member[] = result.rows.map((member: Member) => ({
          nummembre: member.nummembre,
          prenom: member.prenom,
          nomfamille: member.nomfamille,  
        }));
        res.json(members);
      })
      .catch((e: Error) => {
        console.error(e.stack);
      });
    });

    router.get('/search/members', (req: Request, res: Response, _: NextFunction) => {
      this.databaseService.filterMembers(req.query.searchQuery as string).then((result: pg.QueryResult) => {
        const members: Member[] = result.rows.map((member: Member) => ({
          nummembre: member.nummembre,
          prenom: member.prenom,
          nomfamille: member.nomfamille,
        }));
        res.json(members);
      })
      .catch((e: Error) => {
        console.error(e.stack);
      });
    });

    router.get("/vehicles", (req: Request, res: Response, _: NextFunction) => {
      const type = req.query.type ? req.query.type : "";
      const location = req.query.location ? req.query.location : "";
      const startDate = req.query.startDate ? req.query.startDate : "";
      const endDate = req.query.endDate ? req.query.endDate : "";

      this.databaseService
        .filterVehicles(type as string, location as string, startDate as string, endDate as string)
        .then((result: pg.QueryResult) => {
          const vehicles: Vehicle[] = result.rows.map((vehicle: Vehicle) => ({
            immatriculation: vehicle.immatriculation,
            marque: vehicle.marque,
            modele: vehicle.modele,
          }));
          res.json(vehicles);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });


    router.get("/locations", (req: Request, res: Response, _: NextFunction) => {
      this.databaseService
        .getLocations()
        .then((result: pg.QueryResult) => {
          const locations: LocationPK[] = result.rows.map((location: LocationPK) => ({
            emplacementid: location.emplacementid,
            codepostal: location.codepostal,
            numrue: location.numrue,
            rue: location.rue,
          }));
          res.json(locations);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });

    router.get('/authenticate', (req: Request, res: Response, _: NextFunction) => {
      this.databaseService.authenticate(req.query.username as string, req.query.password as string).then((result: pg.QueryResult) => {
        res.json(result.rowCount);
      }).catch((e: Error) => {
          console.error(e.stack);
          res.json(-1);
        });
    });
    
    router.post(
      "/reservations/insert",
      (req: Request, res: Response, _: NextFunction) => {
        const newReservation: Reservation = {
          datedebutres: req.body.datedebutres,
          datefinres: req.body.datefinres,
          nummembrereserve: req.body.nummembrereserve,
          immatriculationvehicule: req.body.immatriculationvehicule.toUpperCase(),
          exigencessupplementaires: req.body.exigencessupplementaires,
        };
        this.databaseService
          .createReservation(newReservation)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );
    
    return router;
  }
}