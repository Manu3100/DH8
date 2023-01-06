let express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {body} = require('express-validator')
let productsController = require('../controllers/productsController');
const guestMiddleware = require('../../Middlewares/guestMiddleware')
const validationsProducts = require('../../Middlewares/prodValidationMW')
const userLogged = require('../../Middlewares/userLoggedMiddleware')

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

router.get('/productCreate', productsController.create)

router.get('/productEdit/:id', productsController.edit)

router.put('/productEdit/:id', uploadFile.single('imageEdit'), validationsProducts, productsController.update)

router.get('/productDetail', productsController.detail)

router.get('/productDetail/:id', productsController.detailId)

router.post('/productCreate', userLogged, uploadFile.single('image'), validationsProducts ,productsController.store)

router.delete('/delete/:id', productsController.delete)





module.exports = router