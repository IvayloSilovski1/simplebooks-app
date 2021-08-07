const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/db');

// connect to mongodb
connectDB();

// body-parser middleware
app.use(express.json({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'));


// Routes
app.use('/', require('./routes/index'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));