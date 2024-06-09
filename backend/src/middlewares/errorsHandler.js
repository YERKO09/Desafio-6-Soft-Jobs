const handleErrors = (error, req, res, next) => {

    if (error) {
        console.log("msje error:",error)
        res.status(error.code || 500).send(error)
    }

}


module.exports = { handleErrors }
