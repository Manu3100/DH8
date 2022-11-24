let path = require('path');
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/products.json')
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))
let {validationResult} = require('express-validator')



let productsController = {
    index: (req, res) => {
        products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))
        res.render('index', {p: products});
    },
    
    create: (req,res) => {
        res.render('products/product-create-form');
    },
    
    edit: (req,res) => {
        let idProducto = req.params.id;
        let objProducto;

        for (let p of products){
            if (idProducto == p.id){
                objProducto=p;
                break;
            }
        }
        res.render('products/product-edit-form',{ p: objProducto});
        
    },
    
    detail: (req, res) => {
        res.render('products/productDetail', {p: products});
    },
    
    detailId: (req, res) => {
        let idProducto = req.params.id;
        let objProducto;

        for (let p of products){
            if (idProducto == p.id){
                objProducto=p;
                break;
            }
        }
        res.render('products/productId',{ p: objProducto});
    },
    
    store: (req, res) => {
        const resultValidation = validationResult(req)

        // if(resultValidation.errors.length > 0){
        //     res.render('users/register', {
        //         errors: resultValidation.mapped(),
        //         oldData: req.body
        //     })
        if(resultValidation.errors.length > 0){
            res.render('products/product-create-form', {
                errors: resultValidation.mapped()
            })
        }else{
            let imageName = req.file.filename
            let productoNuevo = {
                id: products[products.length-1].id+1,
                nombre: req.body.nombre,
                precio: req.body.precio,
                descripcion: req.body.descripcion,
                image: imageName
            }
            products.push(productoNuevo);
            fs.writeFileSync(productsFilePath,JSON.stringify(products,null," "));
            res.redirect('/');
        }
    },
    update: (req,res) => {
        let idProducto = req.params.id;
        let imageEdit = req.file.filename;

        for (let p of products){
            if (idProducto == p.id){
                p.nombre = req.body.nombre;
                p.precio = req.body.precio;
                p.descripcion = req.body.descripcion;
                p.image = imageEdit;
                break;
            }
        }
        fs.writeFileSync(productsFilePath,JSON.stringify(products,null," "));
        res.redirect('/');
    },
    delete: (req,res) => {
        let idProducto = req.params.id;
        
        let arrProductos = products.filter(function(elemento){
            return elemento.id!=idProducto;
        })
        
        products = arrProductos ;
        fs.writeFileSync(productsFilePath,JSON.stringify(products,null," "));
        res.redirect('/');
    }
}

module.exports = productsController