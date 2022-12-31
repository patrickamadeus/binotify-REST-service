const createConnection = require("../utils/db")
const { jwtTokens } = require("../utils/jwt")
const bcrypt = require("bcryptjs");

const Login = async (email, pass) => {

    try{
        const rows = await createConnection().then(async (conn) => {
            return conn.query(`SELECT * FROM "User" WHERE email = '${email}'`);
        })
        
        // Email not exist
        if (rows.rowCount == 0) { return { status: 401, message: "INVALID_EMAIL" } }

        // Password hash checking
        const validPass = await bcrypt.compare(pass, rows.rows[0].password);
        if (!validPass) { return { status: 401, message: "INVALID_PASSWORD" } }
        
        return { status: 200, message: "Success", token: jwtTokens(rows.rows[0].user_id ,email, rows.rows[0].isAdmin)}

    } catch (error) {
        return { status: 500, message: "Internal Server Error", error: error.message }
    }
}

const Register = async (email, pass, user, name) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(pass, salt);

        // Get Email check if no same email exist
        let rows = await createConnection().then(async (conn) => {
            return await conn.query(`SELECT * FROM "User" WHERE username = '${user}'`);
        })
        // Username already exist
        if (rows.rowCount > 0) { return { status: 403, message: "USERNAME_EXIST" } }


        // Get Email check if no same email exist
        rows = await createConnection().then(async (conn) => {
            return await conn.query(`SELECT * FROM "User" WHERE email = '${email}'`);
        })

        // Email already exist
        if (rows.rowCount > 0) { return { status: 403, message: "EMAIL_EXIST" } }


        // Register valid user infos
        const response = await createConnection().then( async (conn) => {
            return await conn.query(`INSERT INTO "User" (email,password,username,name) VALUES ('${email}', '${hashedPass}','${user}','${name}')`)
        });

        if ( response.rowCount == 0) { return { status: 500, message: "Internal DB Error (Inserting)"} }

        return { status: 200, message: "Success" }
    } catch (error) {
        return { status: 500, message: "Internal Sini Error", error: error.message }
    }
}

module.exports = { Login, Register }
