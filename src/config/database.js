import Sequelize from 'sequelize';

//configuramos nuestra conexion a la bd
export const db = new Sequelize("movies", "root", "", {
    host: "localhost",
    dialect: "mysql",
})

//testeamos la conexion
export const rundb =  async () => {
    try {
        await db.authenticate()
        await db.sync({force: false})
        console.log("Conexion a la base de datos lista")
    } catch (error) {
        console.error("No se pudo conectar a la base de datos:", error)
    }
}