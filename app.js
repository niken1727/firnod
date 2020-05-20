const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const detailRoute = require('./api/routes/product');

mongoose.connect("mongodb+srv://niken1727:" + process.env.MONGO_ATLAS_PW + "@node-plfws.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Header', "Origin, X-Requested-With, COntent-Type, Accept, Authorization");
    if(req.method == "OPTIONS"){
        res.header('Access-Control-Allow_methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next();
});

app.use('/details', detailRoute);


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message : error.message
        }
    });
});

module.exports = app;