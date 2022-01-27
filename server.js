const express = require('express');
const app = express();
const hbs = require('hbs');
var bodyParser = require('body-parser')

require('./hbs/helpers');

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'relacionaldatos',
    password: '1234',
    port: 5432,
})

app.get('/list', function(request, response) {
    console.log('GET request received at /')
    pool.query('select * from tasanatalidad', function(err, result) { // consulta de base de datos a postgres
        if (err) throw err;
        else {
            response.send(result.rows) // se manda el JSON
        }

    });
});




hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs'); //rendiriza la vista 

app.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        titulo: "Dashboard",
        pgtitulo: "REPORTES",
        tipo: "Home"
    });
});

app.get('/', (req, res) => {
    res.render('login', {
        titulo: "Login"
    });
});

app.get('/acerca', (req, res) => {
    res.render('acerca', {
        titulo: "Acerca",
        pgtitulo: "AUTORES",
        tipo: "Autores"
    });
});

app.get('/mantenimiento', (req, res) => {
    res.render('mantenimiento', {
        titulo: "Mantenimiento",
        pgtitulo: "MANTENIMIENTO",
        tipo: "Administrador"
    });
});


app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`);
});