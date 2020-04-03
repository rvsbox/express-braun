const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// установка механизма представления handlebars
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

var fortuneCookies = [
  "Conquer your fears or they will conquer you.",
  "Rivers need springs.",
  "Do not fear what you don't know.",
  "You will have a pleasant surprise.",
  "Whenever possible, keep it simple.",
];

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/about', function (req, res) {
  var randomFortune =
    fortuneCookies[Math.floor(Math.random() * fortuneCookies.length)];
  res.render('about', { fortune: randomFortune });
});

// обобщенный обработчик 404 (промежуточное ПО)
app.use(function (req, res, next) {
  res.status(404);
  res.render('404');
});

// обработчик ошибки 500 (промежуточное ПО)
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
});

app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.');
});