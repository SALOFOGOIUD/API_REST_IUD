const express = require('express');
const { connectDB } = require('./BD/server');
const genreRoutes = require('./routes/genreRoutes'); 
const directorRoutes = require('./routes/directorRoutes'); 
const producerRoutes = require('./routes/producerRoutes'); 
const typeRoutes = require('./routes/typeRoutes'); 
const mediaRoutes = require('./routes/MediaRoutes'); 

const app = express();
const port = 4000;

app.use(express.json());

connectDB();

app.use('/api/genres', genreRoutes);
app.use('/api/directors', directorRoutes);
app.use('/api/producers', producerRoutes);
app.use('/api/types', typeRoutes);
app.use('/api/Medias', mediaRoutes);

app.listen(port, () => {
  console.log(`API ON en http://localhost:${port}`);
});