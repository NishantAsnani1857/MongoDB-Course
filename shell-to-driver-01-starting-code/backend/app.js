const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');

const app = express();

const mongoose=require('mongoose')

app.use(bodyParser.json());
app.use('/images', express.static(path.join('backend/images')));

const url='mongodb+srv://nishant:PQMGapIvIUXmt8na@cluster0.7f0jd5b.mongodb.net/shop?retryWrites=true&w=majority'
mongoose.connect(url)
  .then((client) => {
    console.log("Successfully connected to database")
  })
  .catch((err) => {
    console.log(`Oh no some error occured ${err}`)
  })





app.use((req, res, next) => {
  // Set CORS headers so that the React SPA is able to communicate with this server
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/products', productRoutes);
app.use('/', authRoutes);

app.listen(3100);
