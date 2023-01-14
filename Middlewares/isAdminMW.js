function isAdmin(req,res,next){
    let user =  req.session.userLogged
    if(user.admin == 1){
        next();
    }
    else return res.redirect('/');
}


module.exports = isAdmin