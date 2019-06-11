var express = require('express');
var app = express();
var router = express.Router();

app.use(express.static('public'));
app.get('/', function (req, res) {
    res.sendfile('./public/index.html');
});

app.post('/', function (req, res, next) {
    var formidable = require('formidable');
    var fs = require('fs');
    var mv = require('mv');
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        var newpath = './arquivos/' + files.filetoupload.name;

        mv(oldpath, newpath, function (err) {
            if (err) throw err;
            res.write('File uploaded and moved!');
            res.end();
        });


        // fs.rename(oldpath, newpath, function (err) {
        //     if (err) throw err;
        //     res.write('File uploaded and moved!');
        //     res.end();
        // });
    });
});

var porta = process.env.PORT || 8080;
app.listen(porta);