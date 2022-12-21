let path = require('path');
const fs = require('fs');
let {validationResult} = require('express-validator')
let db = require('../../database/models')


let productsController = {
    index: (req, res) => {
        db.producto.findAll()
        .then(function(productos){
        res.render('index', {p: productos}); 
        }) 
        
    },
    
    create: (req,res) => {
        res.render('Products/product-create-form');
    },
    
    edit: (req,res) => {
        db.producto.findByPk(req.params.id)
        .then(function(objProducto){
            res.render('Products/product-edit-form',{ p: objProducto});
        }) 
        },
    
    detail: (req, res) => {
        db.producto.findAll()
        .then(function(productos){
        res.render('Products/productDetail', {p: productos}); 
        }) 
        
    },
    
    detailId: (req, res) => {
        db.producto.findByPk(req.params.id)
        .then(function(detalleProducto){
            res.render('Products/productId',{ p: detalleProducto});  
        })  

    },
    
    store: (req, res) => {
        const resultValidation = validationResult(req)

        
        if(resultValidation.errors.length > 0){
            res.render('Products/product-create-form', {
                errors: resultValidation.mapped()
            })
        }else{
            let imageName = req.file.filename
            db.producto.create({
                nombre: req.body.nombre,
                precio: req.body.precio,
                descripcion: req.body.descripcion,
                fecha_creacion: req.body.fecha_creacion,
                categoria_id: req.body.categoria,
                admin_id: 1,
                imagen: imageName
        })
            res.redirect('/');
        }
    },
    update: (req,res) => {
        const resultValidation = validationResult(req)

        if(resultValidation.errors.length > 0){
            
            db.producto.findByPk(req.params.id)
            .then(function(objProducto){
            res.render('Products/product-edit-form',{ p: objProducto, errors: resultValidation.mapped()});
        }) 

        }else{
            
            let imageEdit = req.file.filename;
             
            db.producto.update({
                nombre: req.body.nombre,
                precio: req.body.precio,
                descripcion: req.body.descripcion,
                fecha_creacion: req.body.fecha_creacion,
                imagen: imageEdit
            }, {
                where: {
                    id: req.params.id
                }
            });
            
            res.redirect('/');
        }
    },
    delete: (req,res) => {
       db.producto.destroy({
        where: {
            id: req.params.id
        }
    })
    res.redirect('/');
}
}

module.exports = productsController