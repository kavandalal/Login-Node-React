const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const route = require('./Routes/router');
const cors = require('cors');
const path = require('path');

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

// after completing the project in local and now its time to deploy in heroku. Things to do :
// 1 - add .gitignore file in the backend file (must include "/node_modules" , ".env")
// 2 - remove all the localhost api call from frontend part
// 3 - run "npm run build" in the frontend folder
// 4 - include
//    ``` app.use(express.static(path.join(__dirname, './client/build'))) ```
//    and
//    ``` app.get('*', (req, res) => { res.sendFile(path.resolve(__dirname, './client/build/index.html'));}); ```
// 	  for the status build folder and index.html in build (place it directly above the app.listen line)
// 5 - package.json add
//    ``` "start": "node server.js", ```
//    and
//    ``` "heroku-postbuild":"NPM_CONFIG_PRODUCTION=false && npm install --prefix client && npm run build --prefix client" ```
//		in the scripts
// 6 - make github repository
// 		-> git init
// 		-> git remote ...
// 		-> git add .
// 		-> git commit -m "message"
// 		-> git push -u origin master
// 7 - make "Procfile" for heroku and write the path to initial file in backend, with syntax Ex : "web: node server.js"
// 8 - make heroku repository in web -> go to "Deploy" -> connect github repo with heroku -> Enable automatically deploy
// 9 - paste all the variables from .env file to heroku
