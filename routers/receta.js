const express = require('express');
const fs = require('fs').promises;
const router = express.Router();
const recetas = require('./recetas.json');

router.get('/recetas', (req, res) => {
  res.json(recetas);
});

router.post('/recetas', async (req, res) => {
  try {
    const nuevaReceta = req.body;
    recetas.push(nuevaReceta);

    // Guardar las recetas actualizadas en el archivo recetas.json
    await fs.writeFile('./recetas.json', JSON.stringify(recetas, null, 2), 'utf-8');

    res.status(201).json({ message: 'Receta agregada correctamente', receta: nuevaReceta });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar la receta' });
  }
});

export default router
