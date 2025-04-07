const express = require('express');
const router = express.Router();
const Type = require('../Models/Type');

// GET - Select de objetos
router.get('/', async (req, res) => {
  try {
    const Types = await Type.find();
    res.json(Types);
  } catch (error) {
    console.error("Error en GET /Types:", error);    
    res.status(500).json({ message: "Error al obtener los Types", error });
  }
});

// POST - Creación de objetos
router.post('/', async (req, res) => {
  try {
    const { name, description} = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
    const newType = new Type({ name, description});
    const savedType = await newType.save();
    console.log("guardado correctamente Type");
    res.status(201).json(savedType);
  } catch (error) {
    console.error("Error en POST /Types:", error);
    res.status(500).json({ message: "Error al crear el Type", error: error.message });
  }
});

// PUT - Actualizar objetos
router.put('/:id', async (req, res) => {
  try {
    const { name, description} = req.body;
    const updatedType = await Type.findByIdAndUpdate(req.params.id, { name, description, updatedAt: Date.now() }, { new: true });    
    if (!updatedType) {
      return res.status(404).json({ message: "Type no encontrado" });
    }  
    res.json(updatedType);
    console.log("Actaulizado correctamente Type");      
  } catch (error) {
    console.error("Error en Put /Types:", error);    
    res.status(500).json({ message: "Error al actualizar el Type", error });
  }
});

// DELETE - Eliminar objeto
router.delete('/:id', async (req, res) => {
  try {
    const deletedType = await Type.findByIdAndDelete(req.params.id);
    if (!deletedType) {
      return res.status(404).json({ message: "Type no encontrado" });
    }
    res.json({ message: "Type eliminado exitosamente" });
    console.log("Eliminado correctamente Type");      
} catch (error) {
    console.error("Error en delete /Types:", error);    
    res.status(500).json({ message: "Error al eliminar el Type", error });
  }
});

module.exports = router;