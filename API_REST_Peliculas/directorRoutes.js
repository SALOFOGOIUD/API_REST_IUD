const express = require('express');
const router = express.Router();
const Director = require('../Models/Director');

// GET - Select de objetos
router.get('/', async (req, res) => {
  try {
    const Directors = await Director.find();
    res.json(Directors);
  } catch (error) {
    console.error("Error en GET /directors:", error);    
    res.status(500).json({ message: "Error al obtener los directores", error });
  }
});

// POST - Creación de objetos
router.post('/', async (req, res) => {
  try {
    const { name, status} = req.body;
    if (!name || !status) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
    const newDirector = new Director({ name, status});
    const savedDirector = await newDirector.save();
    console.log("guardado correctamente director");
    res.status(201).json(savedDirector);
  } catch (error) {
    console.error("Error en POST /directors:", error);
    res.status(500).json({ message: "Error al crear el director", error: error.message });
  }
});

// PUT - Actualizar objetos
router.put('/:id', async (req, res) => {
  try {
    const { name, status} = req.body;
    const updatedDirector = await Director.findByIdAndUpdate(req.params.id, { name, status, updatedAt: Date.now() }, { new: true });    
    if (!updatedDirector) {
      return res.status(404).json({ message: "director no encontrado" });
    }  
    res.json(updatedDirector);
    console.log("Actaulizado correctamente director");      
  } catch (error) {
    console.error("Error en Put /directors:", error);    
    res.status(500).json({ message: "Error al actualizar el director", error });
  }
});

// DELETE - Eliminar objeto
router.delete('/:id', async (req, res) => {
  try {
    const deletedDirector = await Director.findByIdAndDelete(req.params.id);
    if (!deletedDirector) {
      return res.status(404).json({ message: "director no encontrado" });
    }
    res.json({ message: "director eliminado exitosamente" });
    console.log("Eliminado correctamente director");      
} catch (error) {
    console.error("Error en delete /directors:", error);    
    res.status(500).json({ message: "Error al eliminar el director", error });
  }
});

module.exports = router;