const express = require('express');
const app = express();
const hbs = require('hbs');
var bodyParser = require('body-parser')

require('./hbs/helpers');

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'relacionaldatos',
    password: '1234',
    port: 5432,
})


app.post('/actualizarm', (req, res) => {
    const { anios, masculina } = req.body;

    pool.query(`UPDATE tasanatalidad SET masculina = $2 WHERE años = $1`, [anios, masculina], (error, results) => {
        if (error) {
            throw error
        }

    })

    res.send({
        anios,
        masculina,
    });
});

app.post('/actualizarf', (req, res) => {
    const { anios, femenina } = req.body;

    pool.query(`UPDATE tasanatalidad SET femenina = $2 WHERE años = $1`, [anios, femenina], (error, results) => {
        if (error) {
            throw error
        }

    })

    res.send({
        anios,
        femenina,
    });
});

app.post('/actualizart', (req, res) => {
    const { anios, total } = req.body;

    pool.query(`UPDATE tasanatalidad SET total = $2 WHERE años = $1`, [anios, total], (error, results) => {
        if (error) {
            throw error
        }

    })

    res.send({
        anios,
        total,
    });
});

app.post('/borrar', (req, res) => {
    const { anios } = req.body;

    pool.query(`DELETE FROM tasanatalidad WHERE años = $1`, [anios], (error, results) => {
        if (error) {
            throw error
        }

    })
    res.send({
        anios,
    });
});




app.post('/insertar', (req, res) => {
    const { anios, total, masculina, femenina } = req.body;

    pool.query('INSERT INTO tasanatalidad (años, total, masculina, femenina) VALUES ($1, $2, $3, $4)', [anios, total, masculina, femenina], (error, results) => {
        if (error) {
            throw error
        }

    })

    res.send({
        anios,
        total,
        masculina,
        femenina,
    });
});





app.get('/default', function(request, response) {
    console.log('GET request received at /')
    pool.query('select * from tasanatalidad', function(err, result) { // consulta de base de datos a postgres
        if (err) throw err;
        else {
            response.send(result.rows) // se manda el JSON
        }

    });
});

app.get('/opcion1', function(request, response) {
    console.log('GET request received at /')
    pool.query('select años,masculina from tasanatalidad', function(err, result) { // consulta de base de datos a postgres
        if (err) throw err;
        else {
            response.send(result.rows) // se manda el JSON
        }

    });
});

app.get('/opcion2', function(request, response) {
    console.log('GET request received at /')
    pool.query('select años,femenina from tasanatalidad', function(err, result) { // consulta de base de datos a postgres
        if (err) throw err;
        else {
            response.send(result.rows) // se manda el JSON
        }

    });
});

app.get('/opcion3', function(request, response) {
    console.log('GET request received at /')
    pool.query('select años,total from tasanatalidad', function(err, result) { // consulta de base de datos a postgres
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