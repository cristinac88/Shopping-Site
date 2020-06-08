const express = require('express');
//const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const session=require('express-session');
const app = express();

const port = 6789;

// directorul 'views' va conține fișierele .ejs (html + js executat la server)
app.set('view engine', 'ejs');

//app.use(expressLayouts);
// directorul 'public' va conține toate resursele accesibile direct de către client (e.g., fișiere css, javascript, imagini)
app.use(express.static('continut'))
// corpul mesajului poate fi interpretat ca json; datele de la formular se găsesc în format json în req.body
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session( {
    secret:'secret',
	resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 10000
    }
}));

app.get('/index', (req, res) =>
{
    res.render('index');
});

/*app.post('/autentificare', function (req, res) {
	var post = req.body;
	if (post.utilizator === 'john' && post.parola === 'johnspassword') {
	  req.session.user_id = johns_user_id_here;
	  res.redirect('/index');
	} else {
	  res.send('Bad user/pass');
	}
});*/

var mesaj=null;
app.get('/autentificare', (req, res) =>
{
	res.render('autentificare',
	{
		mesaj: req.cookies.mesajEroare
	});
});

app.post('/verificare-autentificare', (req, res) => {
	console.log(req.body);

	if(req.body.utilizator=="Cristina" && req.body.parola == "cris") {
		res.cookies('utilizator', req.body.utilizator);
		res.redirect('/index');
	} else {
		res.cookies('mesajEroare',"Utilizator sau parola greșite. Reintroduceți datele.");
		res.redirect('/autentificare');
	}
});

app.get('/admin', (req, res) =>
{
	if(res.cookie.utilizator == 'Cristina')
	{
		res.redirect('/');
		return;
	}
	res.redirect('/admin');
});

app.get('/mag', (req, res) =>
{
    res.render('mag');
});

app.get('/contact', (req, res) =>
{
    res.render('contact');
});

app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:`));