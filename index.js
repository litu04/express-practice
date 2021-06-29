const express = require('express');
const morgan = require('morgan');
const http = require('http');
const bodyparser = require('body-parser');
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

const hostname = "localhost";
const port = 3000;

const app = express();

app.use(morgan('dev'));
app.use(bodyparser.json());

app.use("/dishes",dishRouter);
app.use("/promotions",promoRouter);
app.use("/leaders",leaderRouter);

app.use(express.static(__dirname + '/public'));

// app.use((req,res,next) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type','text/html');
//     res.end("<h2>Express, Hello World</h2>");
// })

const server = http.createServer(app);

server.listen(port,hostname,(err) => {
    if(err){
        console.warn("Error in creating the server: ",err);
        return;
    }
    console.log(`Express server is running on https://${hostname}:${port}`);
})