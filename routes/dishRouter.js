const express = require('express');
const bodyparser = require('body-parser');

const dishrouter = express.Router();
dishrouter.use(bodyparser.json());

// building up The REST API support for the /dishes endpoint use express route
dishrouter.route('/').all((req, res, next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'Text/Plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the dishes to you!');
})
.post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
    res.end('Deleting all dishes');
});

dishrouter.route('/:dishId').all((req, res, next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'Text/Plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId);
})
.put((req, res, next) => {
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});

module.exports = dishrouter;