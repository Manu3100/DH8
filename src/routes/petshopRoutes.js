let express = require('express');
const router = express.Router()

let petController = require('../controllers/petshopController')

router.get('/aboutUs', petController.aboutUs)


module.exports = router