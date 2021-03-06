const express = require('express');
const bodyparser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyparser.json());

dishRouter.route("/")
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Conten-Type','text/plain');
    next();
})
.get((req,res) => {
    res.end("Will send all the dishes to you!");
})
.post((req,res) => {
    res.end("Will add the dish: " + req.body.name + " with details: " + req.body.description);
})
.put((req,res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /dishes");
})
.delete((req,res) => {
    res.end("Deleting all dishes");
})

dishRouter.route("/:dishId")
.get((req,res) => {
    res.end("will send details of the dish: " + req.params.dishId);
})
.post((req,res) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /dishes/" + req.params.dishId);
})
.put((req,res) => {
    res.write("Updating the dish: " + req.params.dishId + "\n");
    res.end("Will update the dish: " + req.body.name + " with details: " + req.body.description);
})
.delete((req,res) => {
    res.end("Deleting Dish: " + req.params.dishId);
})

module.exports = dishRouter;