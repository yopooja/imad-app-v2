var express = require('express');  // express is a library for port handling and http connections
var morgan = require('morgan');     // morgan is a library for output log - what reuest are comming to server and how we are responding
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article-one',function(req,res){
    res.send('Article one request will be served here');
});

app.get('/article-two',function(req,res){
    res.send('Article two request will be served here');
});

app.get('/article-three',function(req,res){
    res.send('Article three request will be served here');
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
