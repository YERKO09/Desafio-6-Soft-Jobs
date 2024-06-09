const HandleDatabaseLogs = (req, res, next) => {
    const time = new Date()
    const url = req.url
    const queries = req.query
    const params = req.params
    const method = req.method

    console.log(
        `
        Hola Admin el día ${time} se ejecutó una consulta al servidor.\n

        Los datos son: \n
        METHOD: ${method}
        URL: http://localhost:3000/api${url}
        Queries: --> ${Object.entries(queries)}
        Params: --> ${Object.entries(params)}

        Saludos 👏👏;
        `
    )

    next();

}




module.exports = HandleDatabaseLogs