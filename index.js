import express from 'express'
import dotenv from 'dotenv'
import { readFile, writeFile } from 'fs/promises';
import ingRouter from './routers/ing.router.js'
const fileIng = await readFile('./Ingredientes.json', 'utf-8')
const ingNameData = JSON.parse(fileIng)

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


app.delete('/user/delete/:userID', (req,res)=>{
    const user_id = req.params.userID

    try{
        const index = ingNameData.findIndex(e => e.id == user_id)
        if(index !== -1){
            userData.splice(index,1)
            writeFile('./Ingrediente.json', JSON.stringify(ingNameData,null,2))
            res.status(200).json('Ingrediente Eliminado')
        }else{
            res.status(400).json('No se encontro el Ingrediente')
        }
    }catch(error){
        res.status(500).json('Error al Eliminar Ingrediente')
    }
})

})
