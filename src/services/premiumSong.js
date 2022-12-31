const createConnection = require("../utils/db")
const multer = require('multer')
const upload = multer()

const express = require('express')
const app = express()

const getPremiumSongDetailByPenyanyiId = async (penyanyi_id) => {
    const rows = await createConnection().then(async (conn) => {
        if (penyanyi_id) {
            return await conn.query(`SELECT * FROM "Song" WHERE "penyanyi_id" = ${penyanyi_id}`);
        } else{
            return "INCOMPLETE"
        }  
    });

    if ( rows === "INCOMPLETE" ){ return { status: 400, message: "Field not complete"} }

    return {status: 200 , message: "Success", content: rows.rows ? rows.rows : {}};
}

const getPremiumSongDetailById = async (song_id) => {
    const rows = await createConnection().then(async (conn) => {
        if (song_id) {
            return await conn.query(`SELECT * FROM "Song" WHERE "song_id" = ${song_id}`);
        } else{
            return "INCOMPLETE"
        }  
    });

    if ( rows === "INCOMPLETE" ){ return { status: 400, message: "Field not complete"} }

    return {status: 200 , message: "Success", content: rows.rows[0] ? rows.rows[0] : {}};
  };

const createPremiumSong = async (judul, penyanyi_id, audio_path) => {
    const response = await createConnection().then(async (conn) => {
        if (judul && penyanyi_id && audio_path) {
            return await conn.query(`INSERT INTO "Song" ("judul", "penyanyi_id", "audio_path") VALUES ('${judul}', '${penyanyi_id}', '${audio_path}')`);
        } else {
            return "INCOMPLETE";
        }
    });

    if ( response === "INCOMPLETE" ){ return { status: 400, message: "Field not complete"} }
    if ( response.rowCount == 0) { return { status: 500, message: "Internal DB Error"} }

    return { status: 200, message: "Success" }
};

const updatePremiumSong = async (song_id, judul, audio_path) => {
    const response = await createConnection().then((conn) => {
        if (judul){
            return conn.query(`UPDATE "Song" SET "judul" = '${judul}' WHERE "song_id" = ${song_id}`);
        }
        else if(audio_path){
            return conn.query(`UPDATE "Song" SET "audio_path" = '${audio_path}' WHERE "song_id" = ${song_id}`);
        }
        else if(judul && audio_path){
            return conn.query(`UPDATE "Song" SET "judul" = '${judul}', "audio_path" = '${audio_path}' WHERE "song_id" = ${song_id}`);
        }
        else{
            return "INCOMPLETE";
        }

    });

    if ( response === "INCOMPLETE" ){ return { status: 400, message: "Field not complete"} }
    if ( response.rowCount == 0) { return { status: 500, message: "Internal DB Error"} }

    const multer  = require('multer')
    const upload = multer({ dest: 'assets/'})
    app.post(upload.single(audio_path), function (req, res) {
       // req.file is the name of your file in the form above, here 'uploaded_file'
       // req.body will hold the text fields, if there were any 
       console.log(req.file, req.body);
       console.log("aaaaaaaaaaaaaaaaa");
    });

    return { status: 200, message: "Success" }
}

const deletePremiumSong = async (song_id) => {
    const response = await createConnection().then((conn) => {
        if (song_id) {
            return conn.query(`DELETE FROM "Song" WHERE "song_id" = ${song_id}`);
        } else {
            return "INCOMPLETE";
        }
    });

    if ( response === "INCOMPLETE" ){ return { status: 400, message: "Field not complete"} }
    if ( response.rowCount == 0) { return { status: 500, message: "Internal DB Error"} }

    return { status: 200, message: "Success" }
}

module.exports = { getPremiumSongDetailById, getPremiumSongDetailByPenyanyiId, createPremiumSong, updatePremiumSong, deletePremiumSong };
