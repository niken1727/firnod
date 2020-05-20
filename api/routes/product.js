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

router.get('/:productId', (req, res, next)=>{
    const id = req.params.productId;
    Products.findById(id).exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
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