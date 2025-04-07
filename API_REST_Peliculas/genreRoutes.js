const express = require('express');
const router = express.Router();
const Genre = require('../Models/Genre');

// GET - Select de objetos
router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (error) {
    console.error("Error en GET /genres:", error);    
    res.status(500).json({ message: "Error al obtener los géneros", error });
  }
});

// POST - Creación de objetos
router.post('/', async (req, res) => {
  try {
    const { name, status, description } = req.body;
    if (!name || !status || !description) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
    const newGenre = new Genre({ name, status, description });
    const savedGenre = await newGenre.save();
    console.log("guardado correctamente genero");
    res.status(201).json(savedGenre);
  } catch (error) {
    console.error("Error en POST /genres:", error);
    res.status(500).json({ message: "Error al crear el género", error: error.message });
  }
});

// PUT - Actualizar objetos
router.put('/:id', async (req, res) => {
  try {
    const { name, status, description } = req.body;
    const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, { name, status, description, updatedAt: Date.now() }, { new: true });    
    if (!updatedGenre) {
      return res.status(404).json({ message: "Género no encontrado" });
    }
    res.json(updatedGenre);
    console.log("Actualizado correctamente genero");    
  } catch (error) {
    console.error("Error en Put /genres:", error);    
    res.status(500).json({ message: "Error al actualizar el género", error });
  }
});

// DELETE - Eliminar objeto
router.delete('/:id', async (req, res) => {
  try {
    const deletedGenre = await Genre.findByIdAndDelete(req.params.id);
    if (!deletedGenre) {
      return res.status(404).json({ message: "Género no encontrado" });
    }
    res.json({ message: "Género eliminado exitosamente" });
    console.log("Eliminado correctamente genero");       
} catch (error) {
    console.error("Error en delete /genres:", error);    
    res.status(500).json({ message: "Error al eliminar el género", error });
  }
});

module.exports = router;