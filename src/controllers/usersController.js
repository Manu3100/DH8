const { validationResult } = require('express-validator');
let path = require('path');
const User = require('../../models/User');
const bcryptjs = require('bcryptjs');
// let session = require('express-session')

let usersController = {
    index: (req, res) => {
        res.render('Users/MyAccount')
},
    register: (req, res) => {
        res.render('Users/register')
        
}, profile:(req,res)=>{
    res.render('Users/profile', {
        user: req.session.userLogged
    })
},
    registerProcess: (req,res) => {
      const resultValidation = validationResult(req)

      if(resultValidation.errors.length > 0){
        res.render('Users/register', {
            errors: resultValidation.mapped(),
            oldData: req.body
        })
      }
      let userInDB = User.findByField('emailUsuario', req.body.emailUsuario)

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

      let userToCreate = {
        ...req.body,
        passwordUsuario: bcryptjs.hashSync(req.body.passwordUsuario, 10),
       imageProfile: req.file.filename
      }
     User.create(userToCreate)
      res.redirect('/login')
},

login:(req,res)=>{
    res.render('Users/login')
},
loginProcess: (req,res)=>{
   let userToLogin = User.findByField('emailUsuario', req.body.emailUsuario)

   if(userToLogin){
        let isOkThePassword = bcryptjs.compareSync(req.body.passwordUsuario, userToLogin.passwordUsuario)
        if(isOkThePassword){
            delete userToLogin.passwordUsuario
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