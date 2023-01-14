let express = require('express');
const userLoggedMiddleware = require('../../Middlewares/userLoggedMiddleware');
const router = express.Router()

let petController = require('../controllers/petshopController')

router.get('/aboutUs', petController.aboutUs)

router.get('/cart', userLoggedMiddleware, petController.cart)

router.get('/error', petController.error)


module.exports = router