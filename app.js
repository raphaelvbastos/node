var express = require('express');
var app = express();
var router = express.Router();

app.use(express.static('public'));
app.get('/', function (req, res) {
    res.sendfile('./public/index.html');
    console.log("PRINC");
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

var path = require('path');
var mime = require('mime');


// app.get('/arquivos/:uid', function (req, res, next) {
//     console.log("ARQUIVO");
//     res.sendfile('./arquivos/' + req.params.uid);
// });

// app.get('/download/:uid', function(req, res){
//     var fs = require('fs');

//     var file = fs.readFileSync('./arquivos/' + req.params.uid, 'binary');


// //   var file = fs.createReadStream("./arquivos/" + req.params.uid);

// //   var file = req.params.uid;
//   var filename = path.basename(file);
//   var mimetype = mime.lookup(file);

//   res.setHeader('Content-disposition', 'attachment; filename=' + filename);
//   res.setHeader('Content-type', mimetype);

//   var filestream = fs.createReadStream(file);
//   filestream.pipe(res);
// });

app.get('/download/:uid', function(req, res){
    const file = './arquivos/' + req.params.uid;
    res.download(file); // Set disposition and send it.
  });

var porta = process.env.PORT || 8080;
app.listen(porta);