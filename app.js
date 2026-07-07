require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./db/database');

const envelopeRoutes = require('./routes/envelopes');
const transactionRoutes = require('./routes/transactions');
const authRoutes = require('./routes/auth');

const PORT = process.env.PORT || 3000;

const {
  swaggerUi,
  swaggerSpec
} = require('./swagger/swagger');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use('/envelopes', envelopeRoutes);
app.use('/transactions', transactionRoutes);
app.use('/auth', authRoutes);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Personal Budget API',
    version: '1.0.0',
    documentation: '/api-docs'
  });
});


sequelize.sync()
  .then(() => {
    console.log('Database connected');
  })
  .catch(error => {
    console.error(error);
  });

app.listen(PORT, () => {
  console.log('Listening on port 3000');
});
