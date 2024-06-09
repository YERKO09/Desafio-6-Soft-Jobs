const database = require('../dbConfig');
const { handleHashPassword } = require('../../utils/utils')

const addUser = async (email, password, rol, lenguage) => {

    try {

        const passwordHash = await handleHashPassword(password)

        const consulta = "INSERT INTO usuarios (id, email, password, rol, lenguage) values (DEFAULT, $1, $2, $3, $4) RETURNING *;"
        const values = [email, passwordHash, rol, lenguage]

        const { rowCount } = await database.query(consulta, values)

        if (rowCount) {

            return {
                msg: 'Usuario registrado'
            }

        } else {
            return {
                msg: 'Usuario no registrado'
            }
        }

    } catch (error) {
        const customError = new Error('Error generado en la base de datos en la query de addUser')

        customError.code = 404;
        customError.origin = 'DATABASE'
        customError.type = 'Register User'
        console.log(error);
        

        throw customError
    }

}

const getUserByEmail = async (email) => {
    const consulta = "SELECT * FROM usuarios WHERE email = $1;"
    const values = [email]

    const { rows } = await database.query(consulta, values)

    const user = rows[0];
    // console.log('get user:', user.email, user.rol, user.lenguage);
    return user
}

const getPasswordUserByEmail = async (email) => {
    try {
        const consulta = "SELECT * FROM usuarios WHERE email = $1;"
        const values = [email]

        const { rows } = await database.query(consulta, values)

        const user = rows[0];
    
        return user.password
    } catch (error) {
        const customError = new Error('Error generado en la base de datos en la query de getPasswordUserByEmail')

        throw customError
    }
    
}






const UsersCollection = {
    getPasswordUserByEmail,
    getUserByEmail,
    addUser
}



module.exports = {
    UsersCollection
}