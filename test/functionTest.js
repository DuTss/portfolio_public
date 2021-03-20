const users = require('./userDbTest')

const findUser = (email) => {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            const user = users.find(user => user.email == email)

            if(!user) {
                return reject( new Error(`L'utilisateur est introuvable.`))
            }
            return resolve({
                message: `Utilisateur trouvé.`,
                user
            })
        }, 1000)
    })
}

module.exports = findUser