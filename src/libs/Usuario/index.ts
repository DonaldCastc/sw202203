import { getConnection } from '@models/sqlite/SqliteConn';
import { UsuarioDao } from '@server/dao/models/sqlite/UsuarioDao';

interface IUsuario {
    usuario: string;
    nombre: string;
    apellido: string;
    email: string;
    estado: 'Activo' | 'Desactivado';
    type: 'Admin' | 'Basico' | 'Intermedio';
    date: Date;
};

class Usuario {
    private dao: UsuarioDao;
    public constructor(){
        getConnection()
            .then(conn=>{
                this.dao = new UsuarioDao(conn);
            })
            .catch(ex=>console.error(ex));
    }

    private UsuarioItems : IUsuario[] = [];
    //Consultas
    public getAllUsuario() {
        return this.dao.getUsuarios();// select * from Usuario
    }

    public getUsuarioByIndex( index:number) {
        return this.dao.getUsuarioById({_id:index});
    }

    public addUsuario( Usuario:IUsuario){
        return this.dao.insertNewUsuario(Usuario);
    }

    public updateUsuario(index:number, Usuario:IUsuario): boolean {
        if( index >= 0 && index < this.UsuarioItems.length){
            this.UsuarioItems[index] = Usuario;
            return true;
        }
        return false;
    }

    public deleteUsuario( index:number) {
        return this.dao.deleteUsuario({_id:index});
    }
}

export {IUsuario, Usuario};