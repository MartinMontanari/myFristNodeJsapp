const express = require('express');

const secure = require('./secure');
const response = require('../../../network/reponse');
const controller = require('./index');

const router = express.Router();

// Routes
router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', secure('update') , upsert);

// Interntal functions
function list(req, res){
    controller.list()
        .then((list) => {
            response.success(req,res, list, 200);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
    };

function get(req, res){
    controller.get(req.params.id)
        .then((user)=> {
            response.success(req,res, user, 200);
    })
    .catch((err) => {
        response.error(req, res, err.message, 500);
    });
};

function upsert(req,res) {
    controller.upsert(req.body)
    .then((user) => {
        response.success(req, res, user, 201);
    })
    .catch((err)=>{
        response.error(req, res, err.message, 500);
    });
};

module.exports = router;
