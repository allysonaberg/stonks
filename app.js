const express = require('express');
const app = express(); // an express instance
const path = require('path');
const exphbs = require('express-handlebars');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
//TOKEN: pk_5534c341a1544f6d872b333d1bbc6be6

function call_api(completion, ticker) {
	request('https://cloud.iexapis.com/stable/stock/'+ticker+'/quote?token=pk_5534c341a1544f6d872b333d1bbc6be6', { json: true }, (err, res, body) => {
	if (err) { return console.log(err);}
		if (res.statusCode === 200) {
			completion(body)
		};
	});
};



//handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));

//set handlebar index route
//GET
app.get('/', function  (req, res) {
	res.render('home', {
		// stock: completion
	});
});

//POST
app.post('/', function  (req, res) {
	//get output from 'ticker' var
	//output = req.body.ticker
	call_api(function(completion) {
		res.render('home', {
			stock: completion
		});
	}, req.body.ticker);
});


//create about page route
//set handlebar routes
app.get('/about.html', function  (req, res) {
	res.render('about');
});

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//start listening
app.listen(PORT, () => console.log("Server listening on port " + PORT));



