const { getListPenyanyi, getListLaguPenyanyi, validateSoap, getDetailPenyanyiById } = require("../services/penyanyi")
const { authenticateToken } = require("../utils/jwt")

const router = require("express").Router()

router.get("/getListPenyanyi", async (req, res) => {
    try{
        const response = await getListPenyanyi();
        res.status(response.status).send(response);
    } catch(err) {
        console.log(err);
    }
});

router.get("/getDetailPenyanyiById", async (req, res) => {
    try{
        const penyanyiId = req.query["penyanyi_id"]
        const response = await getDetailPenyanyiById(penyanyiId);
        res.status(response.status).send(response);
    } catch(err) {
        console.log(err);
    }
});

router.get("/getListLaguPenyanyi", async (req, res) => {
    try{
        const penyanyiId = req.query["penyanyi_id"];
        const userId = req.query["user_id"];
        // validate SOAP, may return true or false
        const soapResponse = await validateSoap(userId, penyanyiId);

        // if SOAP validated proceed to getListLaguPenyanyi
        if (soapResponse) {
            const response = await getListLaguPenyanyi(userId,penyanyiId);
            res.status(response.status).send(response);
        } else{
            res.status(401).send({ status : 401, message : "Unauthorized" });
        }

    } catch(err) {
        res.status(500).json({status: 500, message: "Internal Server Error", error: err.message}); 
    }
});

module.exports = router
