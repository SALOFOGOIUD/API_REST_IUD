const express = require('express');
const router = express.Router();
const Producer = require('../Models/Producer');

// GET - Select de objetos
router.get('/', async (req, res) => {
  try {
    const Producers = await Producer.find();
    res.json(Producers);
  } catch (error) {
    console.error("Error en GET /Producers:", error);    
    res.status(500).json({ message: "Error al obtener los Produceres", error });
  }
});

// POST - Creación de objetos
router.post('/', async (req, res) => {
  try {
    const { name, country, foundedYear, status} = req.body;
    if (!name || !country || !foundedYear || !status) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
    const newProducer = new Producer({ name, country, foundedYear, status});
    const savedProducer = await newProducer.save();
    console.log("guardado correctamente Producer");
    res.status(201).json(savedProducer);
  } catch (error) {
    console.error("Error en POST /Producers:", error);
    res.status(500).json({ message: "Error al crear el Producer", error: error.message });
  }
});

// PUT - Actualizar objetos
router.put('/:id', async (req, res) => {
  try {
    const { name,country, foundedYear, status} = req.body;
    const updatedProducer = await Producer.findByIdAndUpdate(req.params.id, { name,country, foundedYear, status, updatedAt: Date.now() }, { new: true });    
    if (!updatedProducer) {
      return res.status(404).json({ message: "Producer no encontrado" });
    }  
    res.json(updatedProducer);
    console.log("Actaulizado correctamente Producer");      
  } catch (error) {
    console.error("Error en Put /Producers:", error);    
    res.status(500).json({ message: "Error al actualizar el Producer", error });
  }
});

// DELETE - Eliminar objeto
router.delete('/:id', async (req, res) => {
  try {
    const deletedProducer = await Producer.findByIdAndDelete(req.params.id);
    if (!deletedProducer) {
      return res.status(404).json({ message: "Producer no encontrado" });
    }
    res.json({ message: "Producer eliminado exitosamente" });
    console.log("Eliminado correctamente Producer");      
} catch (error) {
    console.error("Error en delete /Producers:", error);    
    res.status(500).json({ message: "Error al eliminar el Producer", error });
  }
});

module.exports = router;