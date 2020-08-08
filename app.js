const express = require('express');
const app = express(); // an express instance
const path = require('path');
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 5000;

//handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//set handlebar routes
app.get('/', function  (req, res) {
	res.render('home', {
		stuff: "This is stuff"
	});
});
//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//start listening
app.listen(PORT, () => console.log("Server listening on port " + PORT));



