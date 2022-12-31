const createConnection = require("../utils/db")
const axios = require('axios');
const {hostIP} = require("../utils/getIP");

const getListPenyanyi = async () => {
    const rows = await createConnection().then(async (conn) => {
        return await conn.query(`SELECT * FROM "User" WHERE "isAdmin" = false ORDER BY user_id`);
    })

    if(rows){
        return {status: 200, message: "Success", content: rows.rows}
    } else{
        return {status: 500, message: "Internal DB Error", content: []}
    }

}

const getDetailPenyanyiById = async (user_id) => {
    const rows = await createConnection().then(async  (conn) => {
        return await conn.query(`SELECT * FROM "User" WHERE user_id = ${user_id}`);
    })

    if (rows) {
        return {status: 200, message: "Success", content: rows.rows[0]}
    } else{
        return {status: 500, message: "Internal DB Error", content: []}
    }
}

const getListLaguPenyanyi = async (user_id , penyanyi_id) => {
    const rows = await createConnection().then(async (conn) => {
        return await conn.query(`SELECT * FROM "Song" WHERE penyanyi_id = ${penyanyi_id}`);
    })

    if(rows){
        return {status: 200, message: "Success", content: rows.rows}
    } else{
        return {status: 500, message: "Internal DB Error", content: []}
    }
}


const validateSoap =  async (user_id,penyanyi_id) =>{
    const url = `http://${process.env.SOAP_IP_ADDR}:8080/webservice/services`;
    const sampleHeaders = {
        'Content-Type': 'text/xml',
        'soapAction': 'http://services.epify.java.main.src.webservice/',
        'apiKey' : process.env.API_KEY_REST,
        'clientType' : process.env.CLIENT_TYPE_REST
    };

const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <isSubscriptionValid xmlns="http://services.epify.java.main.src.webservice/">
            <creator_id>${penyanyi_id}</creator_id>
            <subscriber_id>${user_id}</subscriber_id>
        </isSubscriptionValid>
    </soap:Body>
</soap:Envelope>`

    const res = await axios({
        method: 'post',
        url: url,
        data: xml,
        headers : sampleHeaders
    }).then(res=>{
        let soapResponse = res.data;
        let jsonResponse = soapResponse.match(/<return>(.*)<\/return>/)[1];
        let json = JSON.parse(jsonResponse);

        const status = json.status
        const message = json.message

        if (status === 200){
            return true
        } else if (status === 500 || status === 400){
            return false
        }
    }).catch(err=>{console.log(err); return false});

    return res;
}

module.exports = { getListPenyanyi, getListLaguPenyanyi, getDetailPenyanyiById, validateSoap }
