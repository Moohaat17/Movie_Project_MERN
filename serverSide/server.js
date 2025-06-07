const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 7030;
const cors = require('cors')
app.use(cors())

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const movieRoute = require('./router/movie.routes');
require('./config/db')();

app.use(express.json());
app.use(express.urlencoded());
app.use('/api/movies', movieRoute);

app.get('/', (req, res) => res.send("API created!"));

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
