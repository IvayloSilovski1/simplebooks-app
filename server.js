const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

// connect to mongodb
connectDB();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
// body-parser middleware
app.use(express.json({ extended: false, limit: '10mb' }));

// Routes
app.use('/', require('./routes/index'));
app.use('/authors', require('./routes/authors'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
