module.exports = {
    api: {
        port: process.env.API_PORT || 3000
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'jwt-secret-token'
    },
    mysql: {
        host: process.env.MYSQL_HOST || "remotemysql.com",
        user:process.env.MYSQL_USER || "k6NDjkhVuo",
        password: process.env.MYSQL_PASSWORD || "Od9MKvzhOw",
        database: process.env.MYSQL_DA || "k6NDjkhVuo",
    }
}
