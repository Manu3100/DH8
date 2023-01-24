const { validationResult } = require('express-validator');
let path = require('path');
const bcryptjs = require('bcryptjs');
// let session = require('express-session')
let db = require('../../database/models')
const date = new Date()


let usersController = {
    index: (req, res) => {
        res.render('Users/MyAccount')
},
    register: (req, res) => {
        res.render('Users/register')
        
}, 
    services: (req, res) => {
    res.render('Users/servicesForm')
    
}, 
    servicesProcess: (req, res) => {
        const resultValidation = validationResult(req)
        let user = req.session.userLogged

        if(resultValidation.errors.length > 0){
          res.render('Users/servicesForm', {
              errors: resultValidation.mapped(),
              oldData: req.body
          })
        }
        console.log(req.body.servicioUsuario, req.body.localUsuario)

        db.turno.create({
            fecha_solicitud: Date.now(),
            fecha_turno: req.body.fecha_creacion,
            usuario_id: user.id,
            local_id: req.body.localUsuario,
            servicio_id: req.body.servicioUsuario
        })
     
    .then(res.redirect('/'))
    
},
    profile:(req,res)=>{
    res.render('Users/profile', {
        user: req.session.userLogged 
    })
},
    registerProcess: async (req,res) => {
      const resultValidation = validationResult(req)

      if(resultValidation.errors.length > 0){
        res.render('Users/register', {
            errors: resultValidation.mapped(),
            oldData: req.body
        })
      }
      let userInDB = await db.usuario.findOne({
        where: {email: req.body.emailUsuario}
   })

      if(userInDB){
        return res.render('Users/register',{
            errors: {
                emailUsuario: {
                    msg: 'Este email ya esta registrado'
                }
            },
            oldData: req.body
        })
      } 
        db.usuario.create({
            nombre: req.body.nombreUsuario,
            apellido: req.body.apellidoUsuario,
            email: req.body.emailUsuario,
            clave: bcryptjs.hashSync(req.body.passwordUsuario, 10), 
            imagen: req.file.filename,
            admin: 0,
            local_id: req.body.localUsuario 
        })
     
    .then(res.redirect('/login'))
},

login:(req,res)=>{
    res.render('Users/login')
},
loginProcess: async (req,res)=>{
   let userToLogin = await db.usuario.findOne({
        where: {email: req.body.emailUsuario}
   }) 

   if(userToLogin){
        let isOkThePassword = bcryptjs.compare(req.body.passwordUsuario, userToLogin.clave)
        if(isOkThePassword){
            delete userToLogin.clave
            req.session.userLogged = userToLogin;
        return res.redirect('/profile');
        }
        return res.render('Users/login', {
            errors:{
                passwordUsuario: {
                    msg:'Las credenciales son incorrectas'
                }
            }
        })
 }

    return res.render('Users/login',{
        errors:{
            emailUsuario: {
                msg:'No se encuentra este Email'
            }
        }
   })
},
logout: (req,res)=>{
    req.session.destroy();
    return res.redirect('/')
},

list: (req, res) => {
    db.usuario.findAll()
    .then(function(usuarios){
    
        let listaUsuarios = []
        
        for (usuario of usuarios){
            let aux = {
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                admin: usuario.admin,
                local: usuario.local_id
            }
            listaUsuarios.push(aux);
        }

        res.json({
        codigo:200,
        descripcion: "Lista de usuarios",
        count: listaUsuarios.length,
        users: listaUsuarios})

    }) 
},

user: (req, res) => {
    db.usuario.findByPk(req.params.id)
    .then(function(user){
        let filteredUser = {
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            admin: user.admin,
            local: user.local_id
        }
    res.json({
        codigo:200,
        user: filteredUser
    })})
}
}


module.exports = usersController