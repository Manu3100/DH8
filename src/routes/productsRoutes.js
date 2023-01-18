const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {body} = require('express-validator')
const guestMiddleware = require('../../Middlewares/guestMiddleware')
const validationsProducts = require('../../Middlewares/prodValidationMW')
const userLogged = require('../../Middlewares/userLoggedMiddleware');
const isAdmin = require('../../Middlewares/isAdminMW');
const authMiddleware = require('../../Middlewares/authMiddleware')
let productsController = require('../controllers/productsController');

const configImage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, path.join(__dirname, '../../public/img/products'))
    },
    filename: (req, file, cb) =>{
        let nombreImagen = Date.now() + file.originalname;
        cb(null, nombreImagen)
    }
})

const uploadFile = multer({storage: configImage})



router.get('/', productsController.index)

router.get('/productCreate', userLogged, isAdmin, productsController.create)

router.get('/productEdit/:id', authMiddleware, isAdmin, productsController.edit)

router.put('/productEdit/:id', isAdmin, uploadFile.single('imageEdit'), validationsProducts, productsController.update)

router.get('/productDetail', userLogged, productsController.detail)

router.get('/productsCat', userLogged, productsController.cat)

router.get('/productsDog', userLogged, productsController.dog)

router.get('/otherProducts', userLogged, productsController.others)

router.get('/productDetail/:id', userLogged, productsController.detailId)

router.post('/productCreate', userLogged, isAdmin, uploadFile.single('image'), validationsProducts ,productsController.store)

router.delete('/delete/:id', authMiddleware, isAdmin, productsController.delete)



module.exports = router