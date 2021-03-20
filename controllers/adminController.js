// AFFICHE LA PAGE DES projet ET LE NOMBRE DE projet DANS LE TITRE
exports.getAdmin = async (req, res) => {
    const projetTotal = await querysql('SELECT COUNT(*) AS total FROM projet')
    const session = req.session.user;
    const projetAdmin = await querysql("SELECT projet.titre, projet.image, projet.description, projet.projetId, projet.gitUrl FROM projet")
    const userId = req.session.user.id
    
    res.render('admin/projetsAdmin', {
        session,
        projet: projetAdmin,
        total: projetTotal[0].total,
        userId: userId
    })
}

// AFFICHE LA PAGE AJOUTER UN PROJET
exports.getAjouterProjet = async (req, res) => {
    res.render('admin/ajouterProjet')
}


// AJOUTER UN ARTICLE
exports.postAjouterProjet = async (req, res) => {
    const { titre, description, image, gitUrl} = req.body

    // RECUPERE LE NOM DU FICHIER ENVOYER
    const uploadImage = req.files.image

    let imageName = uploadImage.name


    // SEPARE L'EXTENSION DU NOM
    const mimetype = uploadImage.mimetype.split('/')[1]

    // RECUPERE LE TITRE DE REQ.BODY
    const titreImage = req.body.titre

    // TITRE DE L'IMAGE + L'EXTENSION
    imageName = titreImage + "." + mimetype
    
    // VERIFIE SI L'EXTENSION EST CONFORME A CEUX INDIQUER
    if(uploadImage.mimetype === 'image/png' || uploadImage.mimetype === 'image/gif' || uploadImage.mimetype === 'image/jpeg' || uploadImage.mimetype === 'image/jpg') {
        
        // ENVOI L'IMAGE DANS LE DOSSIER projet
        uploadImage.mv(`public/images/projets/${imageName}`, async(err) => {
            if(err) {
                return res.status(500).send(err)
            }
             // GESTION DES EXCEPTIONS
            try {
                await querysql(
                    "INSERT INTO projet (??,??,??,??) VALUES (?,?,?,?);",
                    ['titre','image', 'description', 'gitUrl', req.body.titre, imageName,  req.body.description, req.body.gitUrl],
                    (err, result) => {
                        if (err) {
                            res.send(err)
                        } else {
                            return res.redirect('/admin')
                        }
                    }
                )
            } catch (err) {
                res.status(400).json({
                    message: err
                })
            }
                })
            } 
}

// AFFICHE LA PAGE EDITER UN PROJET
exports.getEditerProjet = async (req, res) => {
    const projetingle = await querysql("SELECT * FROM projet WHERE projetId = '" + req.params.id + "'; ")
    res.render('admin/editerProjet', {
        projet: projetingle[0]
    })
}

// EDITER UN PROJET
exports.putEditerProjet = async (req, res) => {  
        const { titre, description, gitUrl, image } = req.body

        const Id = req.params.id

        // RECUPERE L'ID
        const projetId = req.params.id;

        // RECUPERE LE NOM DU FICHIER ENVOYER
        const uploadImage = req.files.image
        let imageName = uploadImage.name

        // SEPARE L'EXTENSION DU NOM
        const mimetype = uploadImage.mimetype.split('/')[1]

        // RECUPERE LE TITRE DE REQ.BODY
        const titreImage = req.body.titre

        // TITRE DE L'IMAGE + L'EXTENSION
        imageName = titreImage + "." + mimetype
        
        // VERIFIE SI L'EXTENSION EST CONFORME A CEUX INDIQUER
        if(uploadImage.mimetype === 'image/png' || uploadImage.mimetype === 'image/gif' || uploadImage.mimetype === 'image/jpeg' || uploadImage.mimetype === 'image/jpg') {
            
            // ENVOI L'IMAGE DANS LE DOSSIER projet
            uploadImage.mv(`public/images/projets/${imageName}`, async(err) => {
                if(err) {
                    return res.status(500).send(err)
                }
                // GESTION DES EXCEPTIONS
                try {
                    await querysql(
                        "UPDATE projet SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?",
                        ['titre', req.body.titre,'image', imageName, 'description', req.body.description, 'gitUrl', req.body.gitUrl,'projetId', Id],
                        (err, result) => {
                            if (err) {
                                res.send(err)
                            } else {
                                return res.redirect('/admin')
                            }
                        }
                    )
                } catch (err) {
                    res.status(400).json({
                        message: err
                    })
                }    
                    })
                }
}

// SUPPRIMER UN PROJET
exports.deleteProjet = async (req, res) => {
    const id = req.params.id
    await querysql("DELETE FROM projet WHERE projetId = ?",[id])
    res.redirect('/admin')
}