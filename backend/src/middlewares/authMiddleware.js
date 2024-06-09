require('dotenv').config()
const jwt = require('jsonwebtoken');
const { UsersCollection } = require('../database/models/usersModel')

const authMiddleware = async (req, res, next) => {

    try {
        const Authorization = req.header("Authorization")

        const token = Authorization.split("Bearer ")[1]
        console.log('<-----------TOKEN----------->\n',token);

        jwt.verify(token, process.env.JWT_SECRET)
        console.log('\n<-----------VERIFICADO----------->\n', 'LLAVE SECRETA:',process.env.JWT_SECRET);
        

        const { email } = jwt.decode(token)

        ///////////////////////////////////////////////////////////
        const dataPerfil = await UsersCollection.getUserByEmail(email)
        // console.log('dataPerfil____:', dataPerfil);
        const { rol, lenguage} = dataPerfil;    
        ///////////////////////////////////////////////////////////

        req.user = {
            email, rol, lenguage // EN PROCESO
        }
        
        next()

    } catch (error) {
        next(error)
    }
}

module.exports = {
    authMiddleware
}

