var shelljs = require('shelljs');
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/hw04.html');
});

app.get ('/api', function (req, res) {

	var rbx_shelljs = req.query.R_max_x;
	var rby_shelljs = req.query.R_max_y;
	var rsx_shelljs = req.query.R_min_x;
	var rsy_shelljs = req.query.R_min_y;
	var cx_shelljs = req.query.C_x;
	var cy_shelljs = req.query.C_y;
	var rad_shelljs = req.query.Rad;
		
	shelljs.exec('main.exe ' + rbx_shelljs + ' ' + rby_shelljs + ' ' + rsx_shelljs + ' ' + rsy_shelljs + ' ' + cx_shelljs + ' ' + cy_shelljs + ' ' + rad_shelljs, function(status, output) {
	  console.log('Exit status:', status);
	  console.log('Program output:', output);

      var output = {
        status: status,
        output: output
      };

		
      /*
        The response header for supporting CORS:
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      */

	  res.writeHead(200, {
		  "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type"
	  });
	
	  res.write( JSON.stringify(output) );
	  res.end();

	});

});


// or simply
// app.listen (1337); 
// will do

var server = app.listen (1337, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log ('server started on http://' + host + ':' + port);
});
