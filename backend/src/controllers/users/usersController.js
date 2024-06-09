const { UsersCollection } = require('../../database/models/usersModel')


const add_user_controller = async (req, res, next) => {

    try {
        const { email, password, rol, lenguage } = req.body

        const response = await UsersCollection.addUser(email, password, rol, lenguage)

        res.send(response)

    } catch (error) {
        next(error)
    }
}

const get_profile_controller = async (req, res, next) => {

    try {
        const { email, rol, lenguage } = req.user

        console.log("\n<-----------RESPUESTA----------->\n", req.user);
        
        res.send({ user: { email, rol, lenguage } })

    } catch (error) {  
        next(error)
    }
}
// const get_profile_controller = async (req, res, next) => {

//     try {
//         console.log(req.user);
//         const { email } = req.user
        
//         res.send({ user: { email } })
        


//     } catch (error) {  
//         next(error)
//     }
// }

const login_controller = async (req, res, next) => {

    try {
        const token = req.token        
        res.send({ token })
        console.log('-----TOKEN-----\n',token);
        

    } catch (error) {
        next(error)
    }
}





module.exports = {
    add_user_controller,
    login_controller,
    get_profile_controller
}