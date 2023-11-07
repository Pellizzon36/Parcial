import { Router } from 'express'
import { readFile, writeFile } from 'fs/promises'
import { get_user_byNom } from '../utils/ing.js'
import { get_user_byCan } from '../utils/ing.js'

const router = Router()

const fileIng = await readFile('./ingredientes.json', 'utf-8')
const ingNameData = JSON.parse(fileIng)


router.get('/all', (req, res) => {
    if(ingNameData.length){
        res.status(200).json(ingNameData)
    }else{
        res.status(400).json('No Hay ingredientes')
    }
})

router.post('/ingredientes', (req, res) => {
    const ingName = req.body.Nombre;
    let aux_name = '';
    let aux_can = '';
  
    try {
      const arr = ingNameData.filter(e => e.Nombre === Nombre);
  
      const result = arr.map(e => {
        aux_name = get_user_byNom(e.Descripcion);
        aux_name = aux_name.Nombre;
        aux_can = get_user_byCan(e.Cantidades);
        aux_can = aux_can.Cantidad;
  
        return {
          Descripcion: aux_name,
          Cantidades: aux_can
        };
      });
  
      if(result){
        res.status(200).json(result)
    }else{
        res.status(400).json("No existe el Ingrediente")
    }
    } catch (error) {
      res.status(500).json('Error al Buscar...'); // Corregido el código 500
    }
  })


  router.put('/cantidad/update/:userID', (req,res)=>{
    const user_id = req.params.userID
    const new_ing = req.body.cantidad

    try{
        const index = ingNameData.findIndex(e => e.id == user_id)
        if(index != -1){
            ingNameData[index].cantidad = new_ing
            writeFile('./Ingredientes.json', JSON.stringify(ingNameData,null,2))
            res.status(200).json('Cantidad Actualizada')
        }else{
            res.status(400).json('No se encontro el Ingrediente')
        }
    }catch(error){
        res.status(500).json('Error al Actualizar')
    }
  })

  router.delete('/delete/:userID', (req,res)=>{
    const user_id = req.params.userID

    try{
        const index = ingNameData.findIndex(e => e.id == user_id)
        if(index !== -1){
            ingNameData.splice(index,1)
            writeFile('./Ingredientes.json', JSON.stringify(ingNameData,null,2))
            res.status(200).json('Ingrediente Eliminado')
        }else{
            res.status(400).json('No se encontro el Ingrediente')
        }
    }catch(error){
        res.status(500).json('Error al Eliminar Ingrediente')
    }
  })
  
  export default router