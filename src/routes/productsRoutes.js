let express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {body} = require('express-validator')
let productsController = require('../controllers/productsController');
const guestMiddleware = require('../../Middlewares/guestMiddleware')

const configImage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, path.join(__dirname, '../../public/img/products'))
    },
    filename: (req, file, cb) =>{
        let nombreImagen = Date.now() + file.originalname;
        cb(null, nombreImagen)
    }
})

const validationsProducts = [
    body('nombre').notEmpty().withMessage('Debe ingresar un nombre para el producto'),
    body('precio').notEmpty().withMessage('Debe ingresar un Precio para el producto'),
    body('descripcion').notEmpty().withMessage('Debe ingresar una descripcion para su producto'),
    body('image').custom((value, {req})=>{
        let file = req.file; 
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        if(!file){
            throw new Error('Debes subir una imagen')
        }else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }

        return true;
    })
]

const uploadFile = multer({storage: configImage})

router.get('/', productsController.index)

router.get('/productCreate', productsController.create)

router.get('/productEdit/:id', productsController.edit)

router.put('/productEdit/:id', uploadFile.single('imageEdit'), productsController.update)

router.get('/productDetail', productsController.detail)

router.get('/productDetail/:id', productsController.detailId)

router.post('/productCreate', uploadFile.single('image'), validationsProducts ,productsController.store)

router.delete('/delete/:id', productsController.delete)





module.exports = router