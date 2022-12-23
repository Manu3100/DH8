const { validationResult } = require('express-validator');
let path = require('path');
//const User = require('../../models/User');
const bcryptjs = require('bcryptjs');
// let session = require('express-session')
let db = require('../../database/models')

let usersController = {
    index: (req, res) => {
        res.render('Users/MyAccount')
},
    register: (req, res) => {
        res.render('Users/register')
        
}, profile:(req,res)=>{
    res.render('Users/profile', {
        user: req.session.userLogged // con que igualar para 
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
            admin: 1,
            local_id: req.body.localUsuario 
        })
     
      res.redirect('/login')
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
}}


module.exports = usersController