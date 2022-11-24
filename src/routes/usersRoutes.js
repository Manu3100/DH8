const express = require('express');
const router = express.Router()
const multer = require('multer');
const path = require('path')
const {body} = require('express-validator')
 const guestMiddleware = require('../../Middlewares/guestMiddleware')
const authMiddleware = require('../../Middlewares/authMiddleware')
const validationsRegister = require('../../Middlewares/validateRegisterFormMW')
const usersController = require('../controllers/usersController');
const storage = multer.diskStorage({

    destination: (req,file,cb) => {
        cb(null, path.join(__dirname, '../../public/img/avatars'))
    },
    filename:(req, file,cb) => {
        let avatarName = Date.now() + file.originalname
        cb(null, avatarName)
    }
})

const uploadAvatar = multer({storage})

router.get('/register', validationsRegister, guestMiddleware ,usersController.register)

router.post('/register', uploadAvatar.single('imageProfile'), validationsRegister ,usersController.registerProcess)

router.get('/login', guestMiddleware, usersController.login)

router.post('/login', usersController.loginProcess)

router.get('/profile', authMiddleware ,usersController.profile)

router.get('/logout/', usersController.logout)




module.exports = router