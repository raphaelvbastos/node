var express = require('express');
const bodyParser = require("body-parser");
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: './arquivos' });

var app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));




var router = express.Router()









app.use(express.static('public'));
app.get('/', function (req, res) {
    res.sendfile('./public/index.html');
    console.log("PRINC");
});




// app.post('/', function (req, res, next) {
//     var formidable = require('formidable');
//     var fs = require('fs');
//     var mv = require('mv');
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields, files) {
//         var oldpath = files.filetoupload.path;
//         var newpath = './arquivos/' + files.filetoupload.name;

//         mv(oldpath, newpath, function (err) {
//             if (err) throw err;
//             res.write('File uploaded and moved!');
//             res.end();
//         });


//         // fs.rename(oldpath, newpath, function (err) {
//         //     if (err) throw err;
//         //     res.write('File uploaded and moved!');
//         //     res.end();
//         // });
//     });
// });

app.post('/upload', multipartMiddleware, (req, res) => {


    // var formidable = require('formidable');
    var fs = require('fs');
    var mv = require('mv');
    // var form = new formidable.IncomingForm();
    // form.parse(req, function (err, fields, files) {
    //     var oldpath = files.filetoupload.path;
    //     var newpath = './arquivos/' + files.filetoupload.name;

    //     mv(oldpath, newpath, function (err) {
    //         if (err) throw console.log(err);
    //         res.json({
    //             'message': 'File uploaded successfully'
    //         });
    //     });
    // });

    console.log(req.files);
    console.log(req.files.uploads[0].path);
    console.log(req.files.uploads[0].name);

    var tmp_path = req.files.uploads[0].path;
    var target_path = 'arquivos/' + req.files.uploads[0].name;
    mv(tmp_path, target_path, function (err) {
        if (err) throw console.log(err);
        res.json({
            'message': 'File uploaded successfully'
        });
    });

    // fs.rename(tmp_path, target_path, function(err) {
    //     if (err) throw err;
    //     fs.unlink(tmp_path, function() {
    //         if (err) throw err;
    //         res.send('File uploaded to: ' + target_path);
    //     });
    // });



    // res.json({
    //     'message': 'File uploaded successfully'
    // });
});

// app.post('/upload12334ds', function (req, res, next) {
//     console.log(req.files);
//     res.status(200).json({
//         "nome": "TESTE"
//     })
//     // var formidable = require('formidable');
//     // var fs = require('fs');
//     // var mv = require('mv');
//     // var form = new formidable.IncomingForm();
//     // form.parse(req, function (err, fields, files) {
//     //     var oldpath = files.filetoupload.path;
//     //     var newpath = './arquivos/' + files.filetoupload.name;


//     //     mv(oldpath, newpath, function (err) {
//     //         if (err) throw err;
//     //         res.write('File uploaded and moved!');
//     //         res.end();
//     //     });


//     //     fs.rename(oldpath, newpath, function (err) {
//     //         if (err) throw err;
//     //         res.write('File uploaded and moved!');
//     //         res.end();
//     //     });
//     // });
// });

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

app.get('/download/:uid', function (req, res) {
    const file = './arquivos/' + req.params.uid;
    res.download(file); // Set disposition and send it.
});

var porta = process.env.PORT || 8080;
app.listen(porta);


app.get('/pdf', function (req, res) {
    var fs = require('fs');
    var pdf = require('html-pdf');
    var html = fs.readFileSync('./public/index.html', 'utf8');
    var options = { format: 'Letter' };
    pdf.create(html).toStream(function (err, stream) {
        stream.pipe(fs.createWriteStream('./test1.pdf'))
        res.download('./test1.pdf');
    });
});



var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://teste:123mudar@clustermongo-gnycy.mongodb.net/test?retryWrites=true&w=majority');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function () {
    console.log('Conectado ao MongoDB.')
    //   console.log(db);

    //   var movieSchema = new Mongoose.Schema({
    //     title: { type: String },
    //     rating: String,
    //     releaseYear: Number,
    //     hasCreditCookie: Boolean
    //   });

    //   var Movie = Mongoose.model('movies', movieSchema);

    //   Movie.findOne({ title: 'Thor' }, function(err, thor) {
    //     if (err) return console.error(err);
    //     console.dir(thor._doc._id);
    //   });

    var Schema = mongoose.Schema;

    var autorSchema = new Schema(
        {
            nome: String,
            email: String,
            senha: String,
            admin: { type: Boolean, default: false }
        }
    );

    var AutorModel = mongoose.model('Autor', autorSchema);

    var autor = new AutorModel({
        nome: "nome",
        email: "email",
        senha: "senha",
        admin: true
    });


    app.get('/bd', function (req, res) {
        AutorModel.findOne({ nome: 'nome' }, function (err, autor) {
            if (err) return console.error(err);
            console.dir(autor);
            res.write(autor._doc.nome);
        });
    });



    // autor.save(function(erro, autor){
    //     if(erro) return console.error(erro);
    //     console.log(autor);
    // });

    // Buscando todos os filmes
    // Movie.find(function(err, movies) {
    //     if (err) return console.error(err);
    //     console.dir(movies);
    //   });

    //   var thor = new Movie({
    //     title: 'Thor',
    //     rating: 'PG-13',
    //     releaseYear: '2011',  // Note o uso de String ao inves de Number
    //     hasCreditCookie: true
    //   });

    //   thor.save(function(err, thor) {
    //     if (err) return console.error(err);
    //     console.dir(thor);
    //   });


    //   var movieSchema = new Mongoose.Schema({
    //     nome: String
    //   });

    //   var tabela = Mongoose.model('teste', movieSchema);

    //   tabela.findOne({ nome: 'TESTE' }, function(err, thor) {
    //     if (err) return console.error(err);
    //     console.dir(thor);
    //   });

    // Buscando todos os filmes
    //   tabela.find(function(err, movies) {
    //     if (err) return console.error(err);
    //     console.dir(movies);
    //   });



    // Vamos adicionar nossos Esquemas, Modelos e consultas aqui
});



// pdf.create(html).toStream(function (err, stream) {
//     stream.pipe(fs.createWriteStream('./teste.pdf'));
// });