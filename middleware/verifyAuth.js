// AFFICHE MESSAGE FLASH ET REDIRIGES VERS LOGIN SINON CONTINUE
exports.getVerifyAuth = (req,res,next) => {
    if(req.session.user == undefined) {
        req.flash('message', 'Vous devez être connecté')
        return res.redirect('/auth/login')
    } else {
        next()
    }
}