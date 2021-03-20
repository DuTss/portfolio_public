const findUser = require('./functionTest')
const assert = require('assert')

describe("Trouve l'utilisateur", () => {
    it("Le résultat devrait trouver l'utilisateur avec l'email correspondant dans la base de données", async () => {
        const response = await findUser("emduthy@gmail.com")
       assert.equal(response.message, 'Utilisateur trouvé.')
   })
})