var express = require('express');  // express is a library for port handling and http connections
var morgan = require('morgan');     // morgan is a library for output log - what request are comming to server and how we are responding
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');  // express library
var session = require('express-session');

var config = {
    user: 'yopooja',
    database: 'yopooja',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
}; 

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());  // in case u see json content load the req.body content
app.use(session({
    secret:'someRandomSecretValue',
    cookie:{maxAge: 1000*60*60*24*30}
}));

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
                ${date.toDateString()}
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

function hash(input,salt){
    var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function(req, res){
    var hashedString = hash(req.params.input, 'this-is-some-random-string');    
    res.send(hashedString);
});

app.post('/create-user',function(req,res){
   // username ,password
   //JSON
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbString],function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }
       else{
            res.send('User successfully created: '+ username);
       } 
    });
    
});

app.post('/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    
    pool.query('SELECT * FROM "user" WHERE username = $1',[username],function(err, result){
       if(err){
           res.status(500).send(err.toString());
       }else{
            if(result.rows.length === 0){
                res.status(403).send('username/password is invalid');
            }else{
                //Match the password
                //Extract the password
                var dbString = result.rows[0].password;
                var salt = dbString.split('$')[2];
                var hashedPassword = hash(password,salt);
                //Create a hash based on password submitted and the original salt
                res.send('hasedPassword');
                if(hashedPassword === dbString){
                    //Set secession
                    req.session.auth = {userId:result.rows[0].id};                    
                    res.status(200).send('credentials correct');
                }else{
                    res.status(403).send('username/password is invald2');
                }
            }
       } 
    });
});

app.get('/check-login',function(req,res){
   if(req.session && req.session.auth && req.session.auth.userId){
       res.send('You are logged in:'+req.session.auth.userId.toString());
   }else{
       res.send('You are not logged in');
   }
});

app.get('/logout',function(req,rees){
    delete req.session.auth;
    res.send('logged out');
});

var pool = new Pool(config);
app.get('/test-db',function (req, res){
    pool.query('SELECT * FROM test',function(err, result){
       if(err){
           res.status(500).send(err.toString());
       }
       else{
            res.send(JSON.stringify(result.rows));
       }
    });
});

var counter = 0;
app.get('/counter', function(req,res){
   counter = counter + 1;
   res.send(counter.toString());
});

var names=[];
app.get('/submit-name',function(req,res){
    //get the name from request
   var name=req.query.name;
   names.push(name);
   //json:javascrit object notation
   res.send(JSON.stringify(names));
});

app.get('/articles/:articleName',function(req,res){
    // /: express framework property
    // articleName === article-one
    // articles.[articleName]=={}
    // select * FROM article WHERE title ='article-one'
    pool.query("SELECT * FROM article WHERE title =$1", [req.params.articleName], function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            if(result.rows.lenght===0){
                res.status(404).send('Article not found');
            }
            else{
                var articleData=result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
