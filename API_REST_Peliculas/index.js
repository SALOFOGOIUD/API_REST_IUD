const express = require('express');
const { connectDB } = require('./BD/Server');
const genreRoutes = require('./routes/genreRoutes'); 
const directorRoutes = require('./routes/directorRoutes'); 
const producerRoutes = require('./routes/producerRoutes'); 
const typeRoutes = require('./routes/typeRoutes'); 
const mediaRoutes = require('./routes/MediaRoutes'); 
const cors = require("cors");
const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

// Conectar a la base de datos
connectDB();

// Rutas API
app.use('/api/genres', genreRoutes);
app.use('/api/directors', directorRoutes);
app.use('/api/producers', producerRoutes);
app.use('/api/types', typeRoutes);
app.use('/api/Medias', mediaRoutes);

app.listen(port, () => {
  console.log(`API ON en http://localhost:${port}`);
});
