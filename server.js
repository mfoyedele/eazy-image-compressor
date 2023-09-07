const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

var corsOptions = {
  origin: 'http://localhost:6000',
};

const app = express();
// dotenv.config();

app.use(cors(corsOptions));
app.use(express.json());

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to memories keeper application.' });
});



const uri = "mongodb+srv://image_compressor:alximage123@cluster0.msasavb.mongodb.net/?retryWrites=true&w=majoritye";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})
})
.catch(err => console.log('Connection error', err))