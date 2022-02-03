var x=3;  

function myFunction() {
    if(document.getElementById('inputPassword').value=='1234' && document.getElementById('inputEmail').value=='milton'){
        location.replace("/dashboard")

    }
    else{
        
        if(x==0){
            document.getElementById('times').innerHTML="No hay mas intentos , Recarge la pagina para volver a intentarlo";
            
            }
            else{
            document.getElementById('times').innerHTML="Numero de Intento "+x;
            x=x-1;    
            }
        
    }
}

<script>      
      function   cargarnuevatabla() {
        const valor = document.getElementById('filtro');    /*SELECCIONAMOS LA CINTA DE OPCIONES POR SU ID FILTRO */
        const opcion = valor.options[valor.selectedIndex].text;  /*OBTENENMOS EL TEXTO DEPENDIENDO LA OPCION QUE ELIGA LA CINTA*/
        var url; 
        var tipo;
        switch(opcion) {   /*SE COMPARA EL TEXTO  Y SE CARGA EL PHP CORRESPONDIENTE DEPENDIENDO EL TIPO DE ORDENAMIENTO */
        
        case "Año-Genero-Masculino":
          url='http://157.245.81.9:3000/opcion1';
          tipo="masculina"
          $(document).ready(function () {
            $.ajax(url,   // request url
            {            
              success: function (data, status, xhr) {    // success callback function

                convertJsontoHtmlTable(data); 
                var datos = [];
                var chart = new CanvasJS.Chart("Grafico", {
                  animationEnabled: true,
                  theme: "dark2",
                  title: {
                    text: ""
                  },
                  axisY: {
                    title: "Tasa",
                    titleFontSize: 24,
                    includeZero: true
                  },
                  data: [{
                    type: "column",
                    yValueFormatString: "#,###.## Units",
                    dataPoints: datos 
                  }]
                });
                $.getJSON(url, addData);
                function addData(data) {
                  for (var i = 0; i < data.length; i++) {
                    datos.push({
                      x: new Date(data[i].años),
                      y: parseFloat(data[i].masculina)
                      
                    });   
                  }
                  chart.render();
                }  //  llamada ala funcion que transforma el JSON a tabla
              }
            });
          });
          break;
        case "Año-Genero-Femenino":
          url='http://157.245.81.9:3000/opcion2';
          $(document).ready(function () {
            $.ajax(url,   // request url
            {            
              success: function (data, status, xhr) {    // success callback function
                convertJsontoHtmlTable(data);
                var datos = [];
                var chart = new CanvasJS.Chart("Grafico", {
                  animationEnabled: true,
                  theme: "dark2",
                  title: {
                    text: ""
                  },
                  axisY: {
                    title: "Tasa",
                    titleFontSize: 24,
                    includeZero: true
                  },
                  data: [{
                    type: "column",
                    yValueFormatString: "#,###.## Units",
                    dataPoints: datos 
                  }]
                });
                $.getJSON(url, addData);
                function addData(data) {
                  for (var i = 0; i < data.length; i++) {
                    datos.push({
                      x: new Date(data[i].años),
                      y: parseFloat(data[i].femenina)
                      
                    });   
                  }

                  
                  chart.render();

                }   //  llamada ala funcion que transforma el JSON a tabla
              }
            });
          });
          break;
        case "Año-Total":
        url='http://157.245.81.9:3000/opcion3';
        $(document).ready(function () {
          $.ajax(url,   // request url
          {            
            success: function (data, status, xhr) {    // success callback function
              
              convertJsontoHtmlTable(data);   //  llamada ala funcion que transforma el JSON a tabla
              
              var datos = [];
    var chart = new CanvasJS.Chart("Grafico", {
      animationEnabled: true,
      theme: "dark2",
      title: {
        text: ""
      },
      axisY: {
        title: "Tasa",
        titleFontSize: 24,
        includeZero: true
      },
      data: [{
        type: "column",
        yValueFormatString: "#,###.## Units",
        dataPoints: datos 
      }]
    });
    $.getJSON(url, addData);
    function addData(data) {
      for (var i = 0; i < data.length; i++) {
        datos.push({
          x: new Date(data[i].años),
          y: parseFloat(data[i].total)
          
        });   
      }

      
      chart.render();

    }


            }
          });
            });
            break;
          }
          
          
          }
        </script>


      





    <script>

    /*SCRIPT PARA COONVERTIR TABLA A PNG*/
      function downloadtable() {

        var node = document.getElementById('tabledata');  /*LLAMADA ALA TABLA POR ID */

        domtoimage.toPng(node)
            .then(function (dataUrl) {
                var img = new Image();
                img.src = dataUrl;
                downloadURI(dataUrl, "tabla.png")
            })
            .catch(function (error) {
                console.error('Error', error);
            });

      }



      function downloadURI(uri, name) {
          var link = document.createElement("a");
          link.download = name;
          link.href = uri;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          delete link;
      }
    </script>

    {{!--     /*SCRIPT PARA COONVERTIR TABLA A PDF*/ --}}
    <script>
    function downloadDoc() {
            var sTable = document.getElementById('tabledata').innerHTML;

            var style = "<style>";
            style = style + "table {width: 100%;font: 17px Calibri;}";
            style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
            style = style + "padding: 2px 3px;text-align: center;}";
            style = style + "</style>";

            // CREATE A WINDOW OBJECT.
            var win = window.open('', '', 'height=700,width=700');

            win.document.write('<html><head>');
            win.document.write('<title>Profile</title>');   // <title> FOR PDF HEADER.
            win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
            win.document.write('</head>');
            win.document.write('<body>');
            win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
            win.document.write('</body></html>');

            win.document.close(); 	// CLOSE THE CURRENT WINDOW.

            win.print();    // PRINT THE CONTENTS.
        }
    </script>


    {{!-- /*SCRIPT PARA COONVERTIR TABLA A EXCEL*/ --}}
    <script>
      function exportData() {

        // Variable to store the final csv data
        var csv_data = [];

        // Get each row data
        var datos = document.getElementById('tabledata');
        var rows = datos.getElementsByTagName('tr');
        for (var i = 0; i < rows.length; i++) {

          // Get each column data
          var cols = rows[i].querySelectorAll('td,th');

          // Stores each csv row data
          var csvrow = [];
          for (var j = 0; j < cols.length; j++) {

              // Get the text data of each cell of
              // a row and push it to csvrow
              csvrow.push(cols[j].innerHTML);
          }

          // Combine each column value with comma
          csv_data.push(csvrow.join(","));
        }
        // combine each row data with new line character
        csv_data = csv_data.join('\n');

        downloadCSVFile(csv_data);

        /* We will use this function later to download
        the data in a csv file downloadCSVFile(csv_data);
        */
      }

      function downloadCSVFile(csv_data) {
      
        // Create CSV file object and feed
        // our csv_data into it
        CSVFile = new Blob([csv_data], {
            type: "text/csv"
        });

        // Create to temporary link to initiate
        // download process
        var temp_link = document.createElement('a');

        // Download csv file
        temp_link.download = "Tabla.csv";
        var url = window.URL.createObjectURL(CSVFile);
        temp_link.href = url;

        // This link should not be displayed
        temp_link.style.display = "none";
        document.body.appendChild(temp_link);

        // Automatically click the link to
        // trigger download
        temp_link.click();
        document.body.removeChild(temp_link);
      }
    /*FIN SCRIPT PARA COONVERTIR TABLA A EXCEL*/
    </script>    


    {{!-- /* Cargar la tabla al incio llamada a metodo get nodejs */ --}}
    <script>        
      $(document).ready(function () {
			$.ajax('http://157.245.81.9:3000/default',   // request url
			{            
				success: function (data, status, xhr) {    // success callback function

           convertJsontoHtmlTable(data);   //  llamada ala funcion que transforma el JSON a tabla
				}
			});
        });
        /*se llama ala funcion al cargar la pagina*/
        /*FIN SCRIPT TABLA AL INICIO*/
    </script>


  <script>

  function convertJsontoHtmlTable(data)       // funcion que convierte JSON en tabla
      {

          //Getting value for table header
          // {'EmployeeID', 'EmployeeName', 'Address' , 'City','Country'}
          var tablecolumns = [];
          for (var i = 0; i < data.length; i++) {
              for (var key in data[i]) {
                  if (tablecolumns.indexOf(key) === -1) {
                      tablecolumns.push(key);
                  }
              }
          }

          //Creating html table and adding class to it
          var tableemployee = document.createElement("table");
          tableemployee.classList.add("table");
          tableemployee.classList.add("table-striped");
          tableemployee.classList.add("table-bordered");
          tableemployee.classList.add("table-light");
          //Creating header of the HTML table using
          //tr
          var tr = tableemployee.insertRow(-1);

          for (var i = 0; i < tablecolumns.length; i++) {
              //header
              var th = document.createElement("th");
              th.innerHTML = tablecolumns[i];
              tr.appendChild(th);
          }

          // Add employee JSON data in table as tr or rows
          for (var i = 0; i < data.length; i++) {
              tr = tableemployee.insertRow(-1);
              for (var j = 0; j < tablecolumns.length; j++) {
                  var tabCell = tr.insertCell(-1);
                  tabCell.innerHTML = data[i][tablecolumns[j]];
              }
          }

          //Final step , append html table to the container div
          var employeedivcontainer = document.getElementById("tabledata");
          employeedivcontainer.innerHTML = "";
          employeedivcontainer.appendChild(tableemployee);
      }


  </script>

  <script>
  window.onload = function () {

  var datos = [];
  var datos1 = [];
  var datos2 = [];
  var chart = new CanvasJS.Chart("Grafico", {
    animationEnabled: true,
    theme: "dark2",
    title: {
      text: ""
    },
    axisY: {
      title: "Tasa Total Hombre Mujeres",
      titleFontSize: 24,
      includeZero: true
    },
    data: [{
      type: "column",
      yValueFormatString: "#,###.## Units",
      dataPoints: datos
    },
    {
      type: "column",
      yValueFormatString: "#,###.## Units",
      dataPoints: datos1
    },
    {
      type: "column",
      yValueFormatString: "#,###.## Units",
      dataPoints: datos2
    
    }]
  });
  $.getJSON("http://157.245.81.9:3000/default", addData);
  function addData(data) {
    for (var i = 0; i < data.length; i++) {
      datos.push({
        x: new Date(data[i].años),
        y: parseFloat(data[i].total)
        
      });
        datos1.push({
        x: new Date(data[i].años),
        y: parseFloat(data[i].masculina)
        
      });
      datos2.push({
        x: new Date(data[i].años),
        y: parseFloat(data[i].femenina)
        
      });
    }

    
    chart.render();

  }


  }
  </script>


  <script>
  function generaractual() {

  var datos = [];
  var datos1 = [];
  var datos2 = [];
  var chart = new CanvasJS.Chart("Grafico", {
    animationEnabled: true,
    theme: "dark2",
    title: {
      text: ""
    },
    axisY: {
      title: "Tasa Total Hombre Mujeres",
      titleFontSize: 24,
      includeZero: true
    },
    data: [{
      type: "column",
      yValueFormatString: "#,###.## Units",
      dataPoints: datos
    },
    {
      type: "column",
      yValueFormatString: "#,###.## Units",
      dataPoints: datos1
    },
    {
      type: "column",
      yValueFormatString: "#,###.## Units",
      dataPoints: datos2
    
    }]
  });
  $.getJSON("http://157.245.81.9:3000/default", addData);
  function addData(data) {
    for (var i = 0; i < data.length; i++) {
      datos.push({
        x: new Date(data[i].años),
        y: parseFloat(data[i].total)
        
      });
        datos1.push({
        x: new Date(data[i].años),
        y: parseFloat(data[i].masculina)
        
      });
      datos2.push({
        x: new Date(data[i].años),
        y: parseFloat(data[i].femenina)
        
      });
    }

    
    chart.render();

  }

    $(document).ready(function () {
        $.ajax('http://157.245.81.9:3000/default',   // request url
        {            
          success: function (data, status, xhr) {    // success callback function

            convertJsontoHtmlTable(data);   //  llamada ala funcion que transforma el JSON a tabla
          }
        });
          });

  }
  </script>
    
  <script>
      var veces=1;
    function insertar(){
    const valor = document.getElementById('filtro');    /*SELECCIONAMOS LA CINTA DE OPCIONES POR SU ID FILTRO */
    const opcion = valor.options[valor.selectedIndex].text;  /*OBTENENMOS EL TEXTO DEPENDIENDO LA OPCION QUE ELIGA LA CINTA*/
      
      switch(opcion) { 
      case "DIM_NATALIDAD":
      if(veces==1){
    veces=veces-1;
      
      $(document).ready(function() {
        
    $("div#form1").append(
    // Creating Form Div and Adding <h2> and <p> Paragraph Tag in it.
    $("<p/>").text("Inserte los datos para la dimension selccionada"), $("<form/>", {
    action: '#',
    method: '#'
    }).append(
    // Create <form> Tag and Appending in HTML Div form1.
    $("<input/>", {
    type: 'text',
    id: 'vaño',
    name: 'año',
    placeholder: 'Año'
    }), // Creating Input Element With Attribute.
    $("<input/>", {
    type: 'text',
    id: 'vtotal',
    name: 'total',
    placeholder: 'Total'
    }), $("<input/>", {
    type: 'text',
    id: 'vMasculinidad',
    name: 'Masculinidad',
    placeholder: 'Masculinidad'
    }),$("<input/>", {
    type: 'text',
    id: 'vmFemenina',
    name: 'Femenina',
    placeholder: 'Femenina'
    }), $("<br/>"), $("<input/>", {
    type: 'button',
    id: 'enviar',
    value: 'enviar'
    })))
    });
    }

    $(document).ready(function(){
      $("#enviar").click(function(){
        let anios = document.getElementById("vaño").value;
        let total = document.getElementById("vtotal").value;
        let masculina = document.getElementById("vMasculinidad").value;
        let femenina = document.getElementById("vmFemenina").value;
        $.post("http://localhost:3000/insertar",
        {
          anios: anios,
          total: total,
          masculina: masculina,
          femenina: femenina
        },
        
        function(data,status){
          alert("Data: " + data + "\nStatus: " + status + "\nEnvio Correcto");
        });
      });
    });

    break;
    }

    } /// fin funcion tablita
      
      
    </script>

    <script>
    var veces=1;
    function actualizar(){
    const valor = document.getElementById('filtro');    /*SELECCIONAMOS LA CINTA DE OPCIONES POR SU ID FILTRO */
    const opcion = valor.options[valor.selectedIndex].text;  /*OBTENENMOS EL TEXTO DEPENDIENDO LA OPCION QUE ELIGA LA CINTA*/
      
      switch(opcion) { 
      case "DIM_NATALIDAD":
      if(veces==1){
    veces=veces-1;
      
      $(document).ready(function() {
        
    $("div#form1").append(
    // Creating Form Div and Adding <h2> and <p> Paragraph Tag in it.
    $("<p/>").text("Inserte los datos para la actualizacion de la dimension selccionada"), $("<form/>", {
    action: '#',
    method: '#'
    }).append(
    // Create <form> Tag and Appending in HTML Div form1.
    $("<input/>", {
    type: 'text',
    id: 'vaño',
    name: 'año',
    placeholder: 'Año'
    }), // Creating Input Element With Attribute.
    $("<input/>", {
    type: 'text',
    id: 'vtotal',
    name: 'total',
    placeholder: 'Total'
    }), $("<input/>", {
    type: 'text',
    id: 'vMasculinidad',
    name: 'Masculinidad',
    placeholder: 'Masculinidad'
    }),$("<input/>", {
    type: 'text',
    id: 'vmFemenina',
    name: 'Femenina',
    placeholder: 'Femenina'
    }), $("<br/>"), $("<input/>", {
    type: 'button',
    id: 'actualizart',
    value: 'ActualizarTotal'
    }), $("<br/>"), $("<input/>", {
    type: 'button',
    id: 'actualizarf',
    value: 'ActualizarTasaF'
    })
    , $("<br/>"), $("<input/>", {
    type: 'button',
    id: 'actualizarm',
    value: 'ActualizarTasaM'
    })
    ))
    });

    }

    $(document).ready(function(){
      $("#actualizart").click(function(){
        let anios = document.getElementById("vaño").value;
        let total = document.getElementById("vtotal").value;
        $.post("http://localhost:3000/actualizart",
        {
          anios: anios,
          total: total
        },
        
        function(data,status){
          alert("Data: " + data + "\nStatus: " + status + "\nEnvio Correcto");
        });
      });
    });

    $(document).ready(function(){
      $("#actualizarm").click(function(){
        let anios = document.getElementById("vaño").value;
        let masculina = document.getElementById("vMasculinidad").value;
        $.post("http://localhost:3000/actualizarm",
        {
          anios: anios,
          masculina: masculina
        },
        
        function(data,status){
          alert("Data: " + data + "\nStatus: " + status + "\nEnvio Correcto");
        });
      });
    });


    $(document).ready(function(){
      $("#actualizarf").click(function(){
        let anios = document.getElementById("vaño").value;
        let femenina = document.getElementById("vmFemenina").value;
        $.post("http://localhost:3000/actualizarf",
        {
          anios: anios,
          femenina: femenina
        },
        
        function(data,status){
          alert("Data: " + data + "\nStatus: " + status + "\nEnvio Correcto");
        });
      });
    });

    break;
    }

    } 
        

    </script>


    <script>
    var veces=1;
    function borrar(){
    const valor = document.getElementById('filtro');    /*SELECCIONAMOS LA CINTA DE OPCIONES POR SU ID FILTRO */
    const opcion = valor.options[valor.selectedIndex].text;  /*OBTENENMOS EL TEXTO DEPENDIENDO LA OPCION QUE ELIGA LA CINTA*/
      
      switch(opcion) { 
      case "DIM_NATALIDAD":
      if(veces==1){
    veces=veces-1;
      
      $(document).ready(function() {
        
    $("div#form1").append(
    // Creating Form Div and Adding <h2> and <p> Paragraph Tag in it.
    $("<p/>").text("Inserte el dato comun para borrar la fila de la dimension selccionada"), $("<form/>", {
    action: '#',
    method: '#'
    }).append(
    // Create <form> Tag and Appending in HTML Div form1.
    $("<input/>", {
    type: 'text',
    id: 'vaño',
    name: 'año',
    placeholder: 'Año'
    }), $("<br/>"), $("<input/>", {
    type: 'button',
    id: 'borrar',
    value: 'BORRAR'
    })
    ))
    });

    }

    $(document).ready(function(){
      $("#borrar").click(function(){
        let anios = document.getElementById("vaño").value;
        $.post("http://localhost:3000/borrar",
        {
          anios: anios
        },
        
        function(data,status){
          alert("Data: " + data + "\nStatus: " + status + "\nEnvio Correcto");
        });
      });
    });


    break;
    }

    } 
        

    </script>
