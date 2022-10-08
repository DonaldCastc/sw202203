import { Router } from "express";
import { IUsuario, Usuario} from '@libs/Usuario';

const router = Router();
const UsuarioInstance = new Usuario();

router.get('/', async (_req, res)=>{
    try {
        res.json(await UsuarioInstance.getAllUsuario());
    }catch (ex) {
        console.error(ex);
        res.status(503).json({error:ex});
    }
    
});

router.get('/byindex/:index', async (req, res)=> {
    try {
        const { index } = req.params;
        res.json(await UsuarioInstance.getUsuarioByIndex(+index));
    }catch (error) {
        console.log("Error", error);
        res.status(500).json({'msg': 'Error al obtener Registro'});
    }
});

router.post('/new', async (req, res)=>{
    try {
      const newUsuario = req.body as unknown as IUsuario;
      const newUsuarioIndex = await UsuarioInstance.addUsuario(newUsuario);
      res.json({newIndex: newUsuarioIndex});
    } catch (error) {
      res.status(500).json({error: (error as Error).message});
    }
   });
  
router.put('/update/:index', (req, res)=>{
try {
    const { index } = req.params;
    const UsuarioFromForm = req.body as IUsuario;
    const UsuarioUpdate = Object.assign(
        UsuarioInstance.getUsuarioByIndex(+index), UsuarioFromForm);
    if (UsuarioInstance.updateUsuario(+index, UsuarioUpdate)){
        res.json(UsuarioUpdate);
    } else {
        res.status(404).json({"msg":"Update not posible"})
    }
}catch (error) {
    res.status(500).json({error: (error as Error).message});
    }
});
  
router.delete('/delete/:index', (req, res)=>{
    try {
        const { index } = req.params;
        if (UsuarioInstance.deleteUsuario(+index)){
            res.status(200).json({"msg":"Registro Eliminado"});
        } else {
            res.status(500).json({'msg': 'Error al eliminar el Registro'});
        }
    }catch (error) {
        console.log("Error", error);
        res.status(500).json({'msg': 'Error al obtener Registro'});
    }
});

export default router;