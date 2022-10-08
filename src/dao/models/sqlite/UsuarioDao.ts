import { IUsuario } from "../entities/Usuario";
import { AbstractDao } from "./AbstractDao";
import sqlite from 'sqlite';

export class UsuarioDao extends AbstractDao<IUsuario> {
  public constructor(db: sqlite.Database){
    super('USUARIOS', db as sqlite.Database);
    super.exec('CREATE TABLE IF NOT EXISTS USUARIOS(_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,'
      + 'usuario TEXT NOT NULL UNIQUE,'
      + 'nombre TEXT ,'
      + 'apellido TEXT ,'
      + 'email TEXT ,'
      + 'estado TEXT ,'
      + 'type TEXT ,'
      + 'date TEXT );').then().catch(e=>console.error(e));
  }

    public async getUsuarios() {
      return  super.findAll()
    }

    public async getUsuarioById( identifier : Partial<IUsuario> ){
      try{
        const result = await super.findByID(identifier);
        return result;
      } catch( ex: unknown) {
        console.log("UsuariosDao sqlite:", (ex as Error).message);
        throw ex;
      }
    }

    public async insertNewUsuario( newUsuario: IUsuario){
        try{
            const result = await super.createOne(newUsuario);
            return result;
        }catch( ex: unknown) {
            console.log("UsuariosDao sqlite:", (ex as Error).message);
            throw ex;
        }
        
    }

    public async updateUsuario( updateUsuario: IUsuario) {
        try {
          const {_id, ...updateObject} = updateUsuario;
          const result = await super.update({_id}, updateObject);
          return result;
        } catch( ex: unknown) {
          console.log("UsuariosDao sqlite:", (ex as Error).message);
          throw ex;
      }
    }

    public async deleteUsuario( deleteUsuario: Partial<IUsuario>) {
      try {
        const {_id} = deleteUsuario;
        const result = await super.delete({_id});
        return result;
      } catch( ex: unknown) {
        console.log("UsuariosDao sqlite:", (ex as Error).message);
        throw ex;
      }
    }
}