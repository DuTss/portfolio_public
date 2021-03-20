// GET AFFICHE LA LISTE DES ARTICLES
exports.getIndexPage = async (req,res) => {
  const projet = await querysql("SELECT projet.titre, projet.image, projet.description, projet.projetId, projet.gitUrl FROM projet")
  res.render('index', {projet: projet })
}

// AFFICHE UN SEUL ARTICLE
exports.getProjetSingle = async (req,res) => {
  const id = req.params.id
  const projetSingle = await querysql("SELECT projet.titre, projet.image, projet.description, projet.projetId, projet.gitUrl FROM projet WHERE projetId = ?", [id])
  res.render('projetSingle', {projet: projetSingle[0]})
}
