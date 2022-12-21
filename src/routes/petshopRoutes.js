let express = require('express');
const router = express.Router()

let petController = require('../controllers/petshopController')

router.get('/aboutUs', petController.aboutUs)

router.get('/cart', petController.cart)


module.exports = router