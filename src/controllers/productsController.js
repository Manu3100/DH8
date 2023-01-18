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

    cat: (req, res) => {
        db.producto.findAll({include: [{association: 'productoCategoria'}]})
        .then(function(productos){
        
            let productosGato = []
            
            for (producto of productos){
                if(producto.productoCategoria.id == 2){
                productosGato.push(producto);
            }}
            
            res.render('Products/catProducts', {p: productosGato}
            )}) 
     
        },

    dog: (req, res) => {
        db.producto.findAll({include: [{association: 'productoCategoria'}]})
        .then(function(productos){
        
            let productosPerro = []
            
            for (producto of productos){
                if(producto.productoCategoria.id == 1){
                productosPerro.push(producto);
            }}

            res.render('Products/dogProducts', {p: productosPerro}
        )})  
     
        
    },

    others: (req, res) => {
        db.producto.findAll({include: [{association: 'productoCategoria'}]})
        .then(function(productos){
        
            let otherProducts = []
            
            for (producto of productos){
                if(producto.productoCategoria.id == 3){
                otherProducts.push(producto);
            }}

            res.render('Products/otherProducts', {p: otherProducts}
        )})  
     
        
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
},

    list: (req, res) => {
        db.producto.findAll({include: [{association: 'productoCategoria'}]})
        .then(function(productos){
        
            let listaProductos = []
            
            for (producto of productos){
                let aux = {
                    nombre: producto.nombre,
                    precio: producto.precio,
                    categoria: producto.productoCategoria.nombre,
                }
                listaProductos.push(aux);
            }

            let productosGato = []
            
            for (producto of productos){
                if(producto.productoCategoria.id == 2){
                productosGato.push(producto);
            }}

            let productosPerro = []
            
            for (producto of productos){
                if(producto.productoCategoria.id == 1){
                productosPerro.push(producto);
            }}

            let otherProducts = []
            
            for (producto of productos){
                if(producto.productoCategoria.id == 3){
                otherProducts.push(producto);
            }}

            res.json({descripcion: "Lista de productos",
            codigo:200,
            products: listaProductos,
            count: listaProductos.length,
            countByCategory: {Perros: productosPerro.length, Gatos: productosGato.length, Otros: otherProducts.length}
        })}) 
    },

    categories: (req,res) => {
        db.categoria.findAll()
        .then(function(categorias){
        res.json({descripcion:"Total Categorias",
            codigo:200,
            categories: categorias,
            count: categorias.length
        })
        })
    },

    product: (req,res) => {
        db.producto.findByPk(req.params.id, {include: [{association: 'productoCategoria'}]})
        .then(function(product){
        res.json({descripcion:"Producto",
            codigo:200,
            producto: product
    })  
    })
    }

}

module.exports = productsController