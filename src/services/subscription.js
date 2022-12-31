const axios = require('axios');
const {getIP} = require("../utils/getIP");

const subscriptionSoap = async (method, creator_id , subscriber_id) => {

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
            <${method} xmlns="http://services.epify.java.main.src.webservice/">
                <creator_id>${creator_id}</creator_id>
                <subscriber_id>${subscriber_id}</subscriber_id>
            </${method}>
        </soap:Body>
    </soap:Envelope>`

    const res = await axios({
        method: 'post',
        url: url,
        data: xml,
        headers : sampleHeaders
    }).then(res=>{
        let soapResponse = res.data;
        console.log(soapResponse)
        let jsonResponse = soapResponse.match(/<return>(.*)<\/return>/)[1];
        let json = JSON.parse(jsonResponse);

        return json
    }).catch(err=>{console.log(err); return false});

    return res;

}

module.exports = { subscriptionSoap };
