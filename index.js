const express = require('express');
const morgan = require('morgan');
const http = require('http');

const hostname = "localhost";
const port = 3000;

const app = express();

app.use(morgan('dev'));

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