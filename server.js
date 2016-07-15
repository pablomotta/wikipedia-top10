var express = require('express');
var app = express();

var port = process.env.PORT || 3131;

app.use(express.static(__dirname));

app.listen(port, function(){
    console.log('Server listening on port:  ' + port);
});
