const express = require('express');
const cors = require('cors')
const connectDB = require('./config/db');
const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs')

const app = express()
const port = process.env.PORT || 8080;


connectDB();

// Init Middleware
app.use(express.json());
app.use(cors());

// routes
app.use('/api/enquiry', require('./routes/enquiry'));
app.use('/api/admin', require('./routes/getCsv'));

app.get('/healthz', (req, res) => {
  res.send('Working fine!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})