import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { Reservation } from "../../../common/reservation";

@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "postgres",
    password: "admin", // Changez ce mot de passe pour votre environnement
    port: 5432,          // Attention ! Peut aussi être 5433 pour certains utilisateurs
    host: "127.0.0.1",
    keepAlive: true
  };

  public async filterVehicles(type: string, location: string, startDate: string, endDate: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    let queryText = `select distinct v.immatriculation, marque, modele
                      from bdschema.Vehicule v
                      JOIN bdschema.${type} b ON b.immatriculation = v.immatriculation 
                      LEFT JOIN bdschema.Reservation r ON v.immatriculation = r.immatriculationvehicule
                      WHERE v.emplacementid = ${location}
                      EXCEPT
                      SELECT DISTINCT v.immatriculation, marque, modele
                      FROM bdschema.Vehicule v
                      JOIN bdschema.${type} b ON b.immatriculation = v.immatriculation 
                      LEFT JOIN bdschema.Reservation r ON v.immatriculation = r.immatriculationvehicule
                      WHERE (r.dateDebutRes BETWEEN '${startDate}' AND '${endDate}'
                      OR r.dateFinRes BETWEEN '${startDate}' AND '${endDate}'
                      OR (r.dateDebutRes < '${startDate}' AND r.dateFinRes > '${endDate}'));`; 
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  public async getAllMembers(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query(`SELECT DISTINCT m.numMembre, m.prenom, m.nomFamille FROM bdschema.Membre m`);
    client.release();
    return res;
  }

  public async filterMembers(searchString: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query(`SELECT DISTINCT m.nummembre, m.prenom, m.nomfamille FROM bdschema.Membre m WHERE m.prenom ILIKE '%${searchString}%' OR m.nomfamille ILIKE '%${searchString}%'`);
    client.release();
    return res;
  }

  public async getLocations(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query(`select distinct e.emplacementId, e.adresseId, a.numRue, a.rue from bdschema.Emplacement e, bdschema.Adresse a WHERE e.adresseId = a.adresseId;`);
    client.release();
    return res;
  }

  public async authenticate(memberNumber:string, password:string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query(`select m.numMembre from bdschema.Membre m WHERE m.numMembre = ${memberNumber} AND m.motDePasse = '${password}';`);
    client.release();
    return res;
  }

  public async getReservation(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query(`select distinct * from bdschema.Reservation r;`);
    client.release();
    return res;
  }

  public async createReservation(newReservation: Reservation): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText = newReservation.exigencessupplementaires.length > 0 ? `INSERT INTO bdschema.Reservation (datedebutres, datefinres, nummembrereserve, immatriculationvehicule, exigencessupplementaires) VALUES ('${newReservation.datedebutres}', '${newReservation.datefinres}', ${newReservation.nummembrereserve}, '${newReservation.immatriculationvehicule}', '${newReservation.exigencessupplementaires}');` : `INSERT INTO bdschema.Reservation (datedebutres, datefinres, nummembrereserve, immatriculationvehicule) VALUES ('${newReservation.datedebutres}', '${newReservation.datefinres}', ${newReservation.nummembrereserve}, '${newReservation.immatriculationvehicule}');`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }


  public pool: pg.Pool = new pg.Pool(this.connectionConfig);
}
