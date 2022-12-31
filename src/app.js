const express = require("express");
require("dotenv").config()
const multer = require("multer");
const config = require("./config")
const path = require("path");

config(express()).then(async (app) => {

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname,"./song"));
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })

    const upload = multer({storage : storage})
    app.post("/upload", upload.single("music") , (req , res) => {
        res.status(200).json({
            status : 200,
            message : "success"
        })
    })

    app.use('/api', require('./routes'));
    app.use('/song', express.static(__dirname + '/song'))
    app.listen(8083, async () => {
        console.log(`Epify's Web Service is up and running on port ${8083}`);
        console.log(`Hitting SOAP to ${process.env.SOAP_IP_ADDR}:8080\n......`)
    })
});
