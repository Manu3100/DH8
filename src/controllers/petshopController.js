let path = require('path');

let petController = {
    aboutUs: (req, res) => {
        res.render('aboutUs')
},

    cart: (req, res) => {
        res.render('cart')
}}


module.exports = petController