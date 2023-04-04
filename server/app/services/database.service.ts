import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";

@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "postgres",
    password: "admin",
    port: 5432,          // Attention ! Peut aussi être 5433 pour certains utilisateurs
    host: "127.0.0.1",
    keepAlive: true
  };

    public async filterVehicles(
    vehicleType: string,
    make?: string,
    model?: string
  ): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    // const searchTerms: string[] = [];
    // if (make.length > 0) searchTerms.push(`marque = '${make}'`);
    // if (model.length > 0) searchTerms.push(`model = '${model}'`);

    // let queryText = `SELECT * FROM bdschema.${vehicleType}`;
    // if (searchTerms.length > 0)
    //   queryText += " WHERE " + searchTerms.join(" AND ");
    // queryText += ";";

    const res = await client.query(`select distinct V.immatriculation, marque, modele from ${vehicleType} h, Vehicule v
WHERE h.immatriculation = v.immatriculation;`);
    client.release();
    return res;
  }


  public pool: pg.Pool = new pg.Pool(this.connectionConfig);
}
