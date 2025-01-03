const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routeRouter = require('./routes/route.routes');

dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
}));

app.use(express.json());

// Routes
app.use('/api/route', routeRouter);

const PORT = process.env.PORT || 5001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
}); 