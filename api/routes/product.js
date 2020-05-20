const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Products = require('../models/products');

router.post('/', (req, res, next) => {
    const products = new Products({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        age: req.body.age
    })
    products.save().then(result => {
        console.log(result);
        res.status(200).json({
            name: "Niken Maharjan",
            age: 20,
            address: "Purnachandi-20, Lalitpur",
            createdProduct: products
        });
    })
    .catch(err => { 
        res.status(500).json({
            error: err
        });
        console.log(err);
    });
 
});


router.get('/', (req, res, next) => {
    Products.find()
    .exec()
    .then(docs => {
        if(docs.length > 0){
            res.status(200).json(docs);
        } else {
            res.status(404).json({"message": "Data not found"});
        }
    })
    .catch(err => {
        res.status(500).json({
            "error": err
        });
    });
});

router.patch("/:productId", (req, res, next)=>{
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Products.updateMany({_id: id}, {
        $set: updateOps
    })
    .exec()
    .then(result => {
        res.status(200).json({"message": "Updated Succesfully"});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({"error": "Cannot update right now"});
    });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Products.remove({_id: req.params.productId})
    .exec()
    .then(result => {
        res.status(200).json({"message": "Deleted successfully"});
    })
    .catch(err => {
        res.status(500).json({"error": err});
    });
});

router.get('/:productId', (req, res, next)=>{
    const id = req.params.productId;
    Products.findById(id).exec()
    .then(doc => {
        if(doc){
            res.status(200).json(doc);
        } else {
            res.status(404).json({"message": "No Value found"});
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
         console.log(err);
    });
    // if(id == 27){
    //     res.status(200).json({
    //         name: "Niken Maharjan",
    //         age: 20,
    //         address: "Purnachandi-20, Lalitpur"
    //     })
    // }
});


module.exports = router;