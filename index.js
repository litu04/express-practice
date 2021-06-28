const express = require('express');
const morgan = require('morgan');
const http = require('http');
const bodyparser = require('body-parser');

const hostname = "localhost";
const port = 3000;

const app = express();

app.use(morgan('dev'));
app.use(bodyparser.json());

app.all('/dishes',(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Conten-Type','text/plain');
    next();
})

app.get('/dishes',(req,res) => {
    res.end("Will send all the dishes to you");
})
app.post("/dishes",(req,res) => {
    res.end("Will add the dish: " + req.body.name + " with details: " + req.body.description);
})
app.put("/dishes",(req,res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /dishes");
})
app.delete("/dishes",(req,res) => {
    res.end("Deleting all dishes");
})

app.get("/dishes/:dishId",(req,res) => {
    res.end("will send details of the dish: " + req.params.dishId);
})
app.post("/dishes/:dishId",(req,res) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /dishes/" + req.params.dishId);
})
app.put("/dishes/:dishId",(req,res) => {
    res.write("Updating the dish: " + req.params.dishId + "\n");
    res.end("Will update the dish: " + req.body.name + " with details: " + req.body.description);
})
app.delete("/dishes/:dishId",(req,res) => {
    res.end("Deleting Dish: " + req.params.dishId);
})

app.use(express.static(__dirname + '/public'));

// app.get('/',(req,res) => {
//     console.warn("headers: ",req.headers);
//     console.warn("url: ",req.url);

//     res.writeHead(200,{'content-type':'text/html'});
//     res.end("<h2>Hello,We are learning Express server</h2>")
// });

app.use((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end("<h2>Express, Hello World</h2>");
})

const server = http.createServer(app);

server.listen(port,hostname,(err) => {
    if(err){
        console.warn("Error in creating the server: ",err);
        return;
    }
    console.log(`Express server is running on https://${hostname}:${port}`);
})