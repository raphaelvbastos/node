var express = require('express');
var app = express();
var router = express.Router();

app.use(express.static('public'));
app.get('/', function(req, res) {
    res.sendfile('./public/index.html');
});

var porta = process.env.PORT || 8080;
app.listen(porta);