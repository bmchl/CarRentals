import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/database.service";
import Types from "../types";
import { Vehicle } from "../../../common/vehicle";
import * as pg from "pg";


@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService) private readonly databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();

    router.get("/hybrids", (req: Request, res: Response, _: NextFunction) => {
      var vehicleType = 'Hybride';
      var make = req.params.make ? req.params.make : "";
      var model = req.params.model ? req.params.model : "";

      this.databaseService
        .filterVehicles(vehicleType, make, model)
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

    router.get("/sedans", (req: Request, res: Response, _: NextFunction) => {
      var vehicleType = 'Berline';
      var make = req.params.make ? req.params.make : "";
      var model = req.params.model ? req.params.model : "";

      this.databaseService
        .filterVehicles(vehicleType, make, model)
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

    router.get("/subs", (req: Request, res: Response, _: NextFunction) => {
      var vehicleType = 'MiniCamionette';
      var make = req.params.make ? req.params.make : "";
      var model = req.params.model ? req.params.model : "";

      this.databaseService
        .filterVehicles(vehicleType, make, model)
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
    
    return router;
  }
}
