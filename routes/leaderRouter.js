const express = require('express');
const bodyparser = require('body-parser');

const leaderrouter = express.Router();
leaderrouter.use(bodyparser.json());

// building up The REST API support for the /dishes endpoint use express route
leaderrouter.route('/').all((req, res, next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'Text/Plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the leaders to you!');
})
.post((req, res, next) => {
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req, res, next) => {
    res.end('Deleting all leaders');
});

leaderrouter.route('/:leaderId').all((req, res, next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'Text/Plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send details of the leader: ' + req.params.leaderId +' to you!');
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
})
.put((req, res, next) => {
    res.write('Updating the leader: ' + req.params.leaderId + '\n');
    res.end('Will update the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('Deleting Leader: ' + req.params.leaderId);
});

module.exports = leaderrouter;