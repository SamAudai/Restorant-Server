const express = require('express');
const bodyparser = require('body-parser');

const mongoose = require('mongoose');
const Favorites = require('../models/favorites');

var authenticate = require('../authenticate');

const favoriterouter = express.Router();
favoriterouter.use(bodyparser.json());

favoriterouter.route('/')
    .get(authenticate.verifyUser, (req, res, next) => {
        Favorites.find({})
            .populate('dishes.dish')
            .populate('user')
            .then((favoritedishes) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favoritedishes);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        Favorites.create(req.body)
            .then((favoritedish) => {
                console.log('Dish Created ', favoritedish);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                favoritedish.user = req.user._id;
                favoritedish.dishes.push(req.body);
                res.json(favoritedish);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Favorites.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

////////////////////////////////////////////////////////////////////////////////

favoriterouter.route('/dishes').all(authenticate.verifyUser)
    .post(function (req, res, next) {
        Favorites.findOne({}, (err, favorite)=> {
            if (err) throw err;
            for(var key in req.body) {
                var index = favorite.dishes.indexOf(req.body[key])
                console.log(index);
                if (index == -1){
                    favorite.dishes.push(req.body)
                    console.log('Favorite added!');
                };
            };	
            favorite.save((err, favorite)=> {
                if (err) throw err;
                console.log('Updated Favorites!');
                res.json(favorite);
            });
        });
    });

///////////////////////////////////////////////////////////////////////////////////

favoriterouter.route('/dishes/:dishId')
    .get(authenticate.verifyUser, (req,res,next) => {
        Favorites.findById(req.params.dishId)
        .populate('user')
        .then((favorite) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        Favorites.create(req.params.dishId)
        .then((favorite) => {
            console.log('Dish Created ', favorite);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            favorite.user = req.user._id;
            favorite.dishes.push(req.body);
            res.json(favorite);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .put(authenticate.verifyUser,(req, res, next) => {
        Favorites.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, { new: true })
        .then((favorite) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .delete(function (req, res, next) {
        Favorites.findOne({}, function (err, favorite) {
            if (err) throw err;
            var index = favorite.dishes.indexOf(req.params.dishObjectId);
            favorite.dishes.splice(index, 1)
            console.log('Favorite deleted!'); 
            favorite.save(function (err, favorite) {
                if (err) throw err;
                console.log('Updated Favorites!'); 
                res.json(favorite);;
            });
        });
    });

module.exports = favoriterouter;