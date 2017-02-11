var express = require('express');  // express is a library for port handling and http connections
var morgan = require('morgan');     // morgan is a library for output log - what reuest are comming to server and how we are responding
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one': {
    title: 'Article One | Pooja Suthar',
    heading: 'Article One',
    date : 'Feb 11 2017',
    content :   `
           <p>
            This is a paragraph. This is a paragraph. This is a paragraph.This is a paragraph. This is a paragraph. This is a paragraph.
            This is a paragraph. This is a paragraph. This is a paragraph.
        </p>
        <p>
            This is a paragraph. This is a paragraph. This is a paragraph.This is a paragraph. This is a paragraph. This is a paragraph.
            This is a paragraph. This is a paragraph. This is a paragraph.
        </p>
        <p>
            This is a paragraph. This is a paragraph. This is a paragraph.This is a paragraph. This is a paragraph. This is a paragraph.
            This is a paragraph. This is a paragraph. This is a paragraph.
        </p>
      `
},
    'article-two': {
    title: 'Article Two | Pooja Suthar',
    heading: 'Article Two',
    date : 'Feb 15 2017',
    content :   `
            <p>
                This is a article two.
            </p>
      `
},
    'article-three': {
    title: 'Article Three | Pooja Suthar',
    heading: 'Article Three',
    date : 'Feb 11 2017',
    content :   `
            <p>
                This is a article two.
            </p>
      `
}
};

function createTemplate(data){
    var title = data.title;
    var date  = data.date;
    var heading = data.heading;
    var content = data.content;
    
    var htmlTemplate =`
    <html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" contact="width=device-width ,inital-scale=1"/>
        <link href="/ui/style.css" rel="stylesheet"/>
    </head>
    <body>
        <div class="container">
            <div>
                <a href="/">Home</a>
            </div>
            <hr/>
            <h3>
                ${heading}
            </h3>
            <div>
                ${date}
            </div>
            <div>
                ${content}
            </div>
        </div>
    </body>
</html>
    `;return htmlTemplate;
} 
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName',function(req,res){
    // /: express framework property
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
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
