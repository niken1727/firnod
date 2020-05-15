const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        name: "Niken Maharjan",
        age: 20,
        address: "Purnachandi-20, Lalitpur"
    })
});

router.get('/:productId', (req, res, next)=>{
    const id = req.params.productId;
    if(id == 27){
        res.status(200).json({
            name: "Niken Maharjan",
            age: 20,
            address: "Purnachandi-20, Lalitpur"
        })
    }
});


module.exports = router;