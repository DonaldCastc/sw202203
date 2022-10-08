export interface IUsuario {
    usuario: string;
    nombre: string;
    apellido: string;
    email: string;
    estado: 'Activo' | 'Desactivado';
    type: 'Admin' | 'Basico' | 'Intermedio';
    date: Date;
    _id?: unknown;
};