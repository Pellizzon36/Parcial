import express from 'express'
import dotenv from 'dotenv'
import { readFile, writeFile } from 'fs/promises';
import ingRouter from './routers/ing.router.js'

//Traer variable de entornos
dotenv.config()

//Crear Instancia
const app = express()

app.use(express.json());

//Configurar Puerto
const port = process.env.port
//Levantar Servidor
app.listen(port, () =>{
    console.log(`Servidor Levantado en el Puerto ${port}`)
    
    //altgr + } Hace las Comillas `

app.use('/user', ingRouter)

app.put('user/Ingredientes/:userID', (req,res)=>{
    const user_id = req.params.userID
    const new_ing = req.body.Cantidad

    try{
        const index = userData.findIndex(e => e.id == user_id)
        if(index != -1){
            userData[index].salary = new_ing
            writeFile('./Ingredientes.json', JSON.stringify(userData,null,2))
            res.status(200).json('Cantidad Actualizada')
        }else{
            res.status(400).json('No se encontro el Ingrediente')
        }
    }catch(error){
        res.status(500).json('Error al Actualizar')
    }

    
})
app.delete('/user/delete/:userID', (req,res)=>{
    const user_id = req.params.userID

    try{
        const index = userData.findIndex(e => e.id == user_id)
        if(index !== -1){
            userData.splice(index,1)
            writeFile('./Ingrediente.json', JSON.stringify(userData,null,2))
            res.status(200).json('Ingrediente Eliminado')
        }else{
            res.status(400).json('No se encontro el Ingrediente')
        }
    }catch(error){
        res.status(500).json('Error al Eliminar Ingrediente')
    }
})

})
