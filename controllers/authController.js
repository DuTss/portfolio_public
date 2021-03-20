// BCRYPT
const bcrypt = require('bcrypt');

// AFFICHE LA PAGE LOGIN
exports.getLogin = (req,res) => {
    return res.render('admin/login', {message: req.flash('message')})
}

// SE CONNECTER
exports.postLogin = async (req,res) => {
    const { email, password } = req.body;

    // SI L'EMAIL N'EXISTE PAS
    const findEmail = await querysql('SELECT COUNT(*) AS cnt FROM user WHERE email = ?',email)

    if(!findEmail[0].cnt > 0) {
        // RENVOI UN MESSAGE FLASH
        req.flash('message', "Aucun utilisateur n'est inscrit avec cet email.")
        return res.redirect('/auth/login')
    }

    // SI L'EMAIL EXISTE
    // VERIFIER LE MOT DE PASSE
    const user = await querysql('SELECT userID, pseudo, email, password FROM user WHERE email = ?', email)

    // COMPARE LE MOT DE PASSE AVEC CEUX ENREGISTRER
    const passwordCheck = await bcrypt.compare(password, user[0].password)

    // SI LE MOT DE PASSE EST INCORRECT
    if(!passwordCheck) {

        // RENVOI UN MESSAGE FLASH
        req.flash('message', 'Mot de pase incorrect.')
        return res.redirect('/auth/login')
    } else {
        req.session.userId =  user[0].userID;
        req.session.user = {
            id: user[0].userID,
            pseudo: user[0].pseudo,
            email: user[0].email
        };
        return res.redirect('/admin')
    }

}



// AFFICHE LA PAGE REGISTER
exports.getRegister = (req,res) => {
    return res.render('admin/register', {message: req.flash('message')})
}

// INSCRIPITON DANS REGISTER
exports.postRegister = async (req,res) => {
    const { pseudo, email, password } = req.body

    // SI L'EMAIL EXISTE
    const findEmail = await querysql('SELECT COUNT(*) AS cnt FROM user WHERE email = ?',email)
    //console.log(findEmail[0].cnt);

    if(findEmail[0].cnt > 0) {
        req.flash('message', "L'email est déjà utilisé !")
        return res.redirect('/auth/register')
    }

    // AJOUTER UN UTILISATEUR
    try {         
        // HASHER LE MOT DE PASSE
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        await querysql(
        'INSERT INTO user (pseudo, email, password) VALUES (?,?,?)',
        [pseudo,email,hash],
        (err,result) => {
            if(err) {

                // RENVOI UN MESSAGE FLASH
                req.flash('message' `Il y a une erreur ${err}`)
                return res.redirect('/auth/register')
            }

            // CONTINUE ET ENVOI MESSAGE FLASH SUR PAGE LOGIN
            req.flash('message', 'Inscription avec succès ! Vous pouvez vous connecter dès à présent.')
            return res.redirect('/auth/login')
        }
        )
      // SINON RENVOI MOI UNE ERREUR AU FORMAT JSON  
    } catch(err) {
        res.status(400).json({message: err})
    }
}

// LOGOUT
exports.getLogout = async (req,res) => {
    req.session.destroy(function(err) {
        res.redirect('/auth/login')
    })
}