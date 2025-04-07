const express = require('express');
const router = express.Router();
const Media = require('../Models/Media');

// GET - Select de objetos
router.get('/', async (req, res) => {
  try {
    const Medias = await Media.find();
    res.json(Medias);
  } catch (error) {
    console.error("Error en GET /Medias:", error);    
    res.status(500).json({ message: "Error al obtener los Medias", error });
  }
});

// POST - Creación de objetos
router.post('/', async (req, res) => {
  try {
    const {serial, title, type, director, producer, genre, releaseYear, duration, synopsis, status } = req.body;
    if (!serial || !title || !type || !director || !producer || !genre || !releaseYear || !duration || !synopsis) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
    const newMedia = new Media({serial,title, type, director, producer, genre, releaseYear, duration, synopsis, status});
    const savedMedia = await newMedia.save();
    console.log("guardado correctamente Media");
    res.status(201).json(savedMedia);
  } catch (error) {
    console.error("Error en POST /Medias:", error);
    res.status(500).json({ message: "Error al crear el Media", error: error.message });
  }
});

// PUT - Actualizar objetos
router.put('/:id', async (req, res) => {
  try {
    const {title, type, director, producer, genre, releaseYear, duration, synopsis, status } = req.body;
    const updatedMedia = await Media.findByIdAndUpdate(req.params.id, {title, type, director, producer, genre, releaseYear, duration, synopsis, status, updatedAt: Date.now() }, { new: true });    
    if (!updatedMedia) {
      return res.status(404).json({ message: "Media no encontrado" });
    }  
    res.json(updatedMedia);
    console.log("Actaulizado correctamente Media");      
  } catch (error) {
    console.error("Error en Put /Medias:", error);    
    res.status(500).json({ message: "Error al actualizar el Media", error });
  }
});

// DELETE - Eliminar objeto
router.delete('/:id', async (req, res) => {
  try {
    const deletedMedia = await Media.findByIdAndDelete(req.params.id);
    if (!deletedMedia) {
      return res.status(404).json({ message: "Media no encontrado" });
    }
    res.json({ message: "Media eliminado exitosamente" });
    console.log("Eliminado correctamente Media");      
} catch (error) {
    console.error("Error en delete /Medias:", error);    
    res.status(500).json({ message: "Error al eliminar el Media", error });
  }
});

module.exports = router;