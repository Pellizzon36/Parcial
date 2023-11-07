import { readFile } from "fs/promises"

const fileIng = await readFile('./ingredientes.json', 'utf-8')
const userData = JSON.parse(fileIng)

export const get_user_byNom = (Nombre) =>{
    return userData.find(e => e.Nombre === Nombre)
}
export const get_user_byCan = (Cantidad) =>{
        return userData.find(e => e.Cantidad === Cantidad)
}