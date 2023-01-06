const { body } = require('express-validator');
const path = require('path');


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
    }),
    body('imageEdit').custom((value, {req})=>{
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

module.exports = validationsProducts