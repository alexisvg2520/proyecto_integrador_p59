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
    database: 'dimensional_inec',
    password: '1234',
    port: 5432,
})




/* Actualizar tabla natalidad */
app.post('/actualizar', (req, res) => {
    const { ndato, total, variable } = req.body;
    pool.query(`UPDATE fact_inec SET ${variable} = ${total} WHERE sk_natalidad = ${ndato}`, (error, results) => {
        if (error) {
            res.send("Error No se puede obtener Conexion Con base de datos")
        } else {
            res.send("Datos Enviados")
        }
    })
});



app.post('/actualizar1', (req, res) => {
    const { ndato, total, variable } = req.body;
    pool.query(`UPDATE fact_inec SET ${variable} = ${total} WHERE sk_muertes_no_violentas = ${ndato}`, (error, results) => {
        if (error) {
            res.send("Error No se puede obtener Conexion Con base de datos")
        } else {
            res.send("Datos Enviados")
        }
    })
});




/* Borrar tabla natalidad */
app.post('/borrar', (req, res) => {
    const { anios } = req.body;
    pool.query(`delete from fact_inec where sk_natalidad=(select sk_natalidad from dim_natalidad where pk_natalidad = ${anios});  delete from dim_natalidad where pk_natalidad=${anios} ; delete from dim_muertes_no_violentas where pk_muertes_no_violentas=${anios} ;`, (error, results) => {
        if (error) {
            res.send("Error No se puede obtener Conexion Con base de datos")
        } else {
            res.send("Datos Borrados")
        }
    })

});

/* Insertar tabla natalidad */
app.post('/insertar', (req, res) => {
    const { ndato, anios, total, masculina, femenina } = req.body;
    pool.query(`insert into dim_natalidad  (sk_natalidad,pk_natalidad) VALUES (${ndato},${anios}) ; insert into dim_muertes_no_violentas (sk_muertes_no_violentas,pk_muertes_no_violentas) VALUES (${ndato},${anios}) ;  insert into fact_inec (sk_natalidad,sk_natalidad_naj,sk_muertes_violentas,sk_muertes_no_violentas,total_natalidad,total_hombres_natalidad,total_mujeres_natalidad) VALUES (${ndato},${ndato},${ndato},${ndato},${total},${masculina},${femenina}) ;`, (error, results) => {
        if (error) {
            res.send("Error No se puede obtener Conexion Con base de datos")
        } else {
            res.send("Datos Enviados")
        }
    })

});


app.post('/insertar1', (req, res) => {
    const { ndato, anios, total, masculina, femenina } = req.body;
    pool.query(`insert into dim_natalidad  (sk_natalidad,pk_natalidad) VALUES (${ndato},${anios}) ; insert into dim_muertes_no_violentas  (sk_muertes_no_violentas,pk_muertes_no_violentas) VALUES (${ndato},${anios}) ; insert into fact_inec (sk_natalidad,sk_natalidad_naj,sk_muertes_violentas,sk_muertes_no_violentas,total_muertes_accidente,total_hombres_accidente,total_mujeres_accidente) VALUES (${ndato},${ndato},${ndato},${ndato},${total},${masculina},${femenina}) ;`, (error, results) => {
        if (error) {
            res.send("Error No se puede obtener Conexion Con base de datos")
        } else {
            res.send("Datos Enviados")
        }
    })

});




app.get('/usuarios', function(request, response) {
    console.log('GET request received at /')
    pool.query(`select usuario,contrasena from usuarios;`, function(err, result) { // consulta de base de datos a postgres
        if (err) {
            response.send("error")
        } else {
            response.send(result.rows) // se manda el JSON
        }
    });
});




/* Consulta: todo tabla natalidad */
app.get('/default', function(request, response) {
    console.log('GET request received at /')
    pool.query(`select fact_inec.sk_natalidad as "Numero_de_Dato" ,pk_natalidad as "Año" ,total_natalidad ,total_hombres_natalidad ,total_mujeres_natalidad  from fact_inec,dim_natalidad where fact_inec.sk_natalidad
    =dim_natalidad.sk_natalidad`, function(err, result) { // consulta de base de datos a postgres
        if (err) {
            response.send("error")
        } else {
            response.send(result.rows) // se manda el JSON
        }
    });
});


app.get('/default1', function(request, response) {
    console.log('GET request received at /')
    pool.query(`select fact_inec.sk_muertes_no_violentas as "Numero_de_Dato" , pk_muertes_no_violentas as "Año" ,total_muertes_accidente ,total_hombres_accidente ,total_mujeres_accidente 
    from fact_inec,dim_muertes_no_violentas where fact_inec.sk_muertes_no_violentas = dim_muertes_no_violentas.sk_muertes_no_violentas`, function(err, result) { // consulta de base de datos a postgres
        if (err) {
            response.send("error")
        } else {
            response.send(result.rows) // se manda el JSON
        }
    });
});


/* Consulta: años masculino tabla natalidad */
app.get('/opcion1', function(request, response) {
    console.log('GET request received at /')
    pool.query(`select fact_inec.sk_natalidad as "Numero_de_Dato" ,pk_natalidad as "Año"  ,total_hombres_natalidad from fact_inec,dim_natalidad where fact_inec.sk_natalidad
    =dim_natalidad.sk_natalidad`, function(err, result) { // consulta de base de datos a postgres
        if (err) {
            response.send("error")
        } else {
            response.send(result.rows) // se manda el JSON
        }

    });
});

/* Consulta: años femenino tabla natalidad */
app.get('/opcion2', function(request, response) {
    console.log('GET request received at /')
    pool.query(`select fact_inec.sk_natalidad as "Numero_de_Dato" ,pk_natalidad as "Año" ,total_mujeres_natalidad from fact_inec,dim_natalidad where fact_inec.sk_natalidad
    =dim_natalidad.sk_natalidad`, function(err, result) { // consulta de base de datos a postgres
        if (err) {
            response.send("error")
        } else {
            response.send(result.rows) // se manda el JSON
        }

    });
});

/* Consulta: años total tabla natalidad */
app.get('/opcion3', function(request, response) {
    console.log('GET request received at /')
    pool.query(`select fact_inec.sk_natalidad as "Numero_de_Dato" ,pk_natalidad as "Año" ,total_natalidad from fact_inec,dim_natalidad where fact_inec.sk_natalidad
    =dim_natalidad.sk_natalidad`, function(err, result) { // consulta de base de datos a postgres
        if (err) {
            response.send("error")
        } else {
            response.send(result.rows) // se manda el JSON
        }

    });
});


app.get('/opcion4', function(request, response) {
    console.log('GET request received at /')
    pool.query(`select fact_inec.sk_muertes_no_violentas as "Numero_de_Dato" , pk_muertes_no_violentas as "Año" ,total_muertes_accidente 
    from fact_inec,dim_muertes_no_violentas where fact_inec.sk_muertes_no_violentas = dim_muertes_no_violentas.sk_muertes_no_violentas`, function(err, result) { // consulta de base de datos a postgres
        if (err) {
            response.send("error")
        } else {
            response.send(result.rows) // se manda el JSON
        }

    });
});


app.get('/opcion5', function(request, response) {
    console.log('GET request received at /')
    pool.query(`select fact_inec.sk_muertes_no_violentas as "Numero_de_Dato" , pk_muertes_no_violentas as "Año" , total_hombres_accidente 
    from fact_inec,dim_muertes_no_violentas where fact_inec.sk_muertes_no_violentas = dim_muertes_no_violentas.sk_muertes_no_violentas`, function(err, result) { // consulta de base de datos a postgres
        if (err) {
            response.send("error")
        } else {
            response.send(result.rows) // se manda el JSON
        }

    });
});


app.get('/opcion6', function(request, response) {
    console.log('GET request received at /')
    pool.query(`select fact_inec.sk_muertes_no_violentas as "Numero_de_Dato" , pk_muertes_no_violentas as "Año" ,total_mujeres_accidente 
    from fact_inec,dim_muertes_no_violentas where fact_inec.sk_muertes_no_violentas = dim_muertes_no_violentas.sk_muertes_no_violentas`, function(err, result) { // consulta de base de datos a postgres
        if (err) {
            response.send("error")
        } else {
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


app.get('/dashboard1', (req, res) => {
    res.render('dashboard1', {
        titulo: "Dashboard1",
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