const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const route = require('./Routes/router');
const cors = require('cors');

if (process.env.NODE_ENV != 'PRODUCTION') {
	dotenv.config({ path: './.env' });
}
mongoose.connect(process.env.DATABASE_ACCESS, () => console.log('Server Connected...'));
app.use(express.json());
app.use(cors());
app.use('', route); // will append the routes in 'router' file with ''

app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, './client/build/index.html'));
});

app.listen(process.env.PORT || 4000, () => console.log('server is running', process.env.PORT));
