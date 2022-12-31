const { getPremiumSongDetailById, getPremiumSongDetailByPenyanyiId, createPremiumSong, updatePremiumSong, deletePremiumSong } = require("../services/premiumSong");
const {authenticateToken} = require("../utils/jwt");

const router = require("express").Router();

router.get("/getPremiumSongDetailById", async (req, res) => {
  try{
    const id = req.query["song_id"]
    const response = await getPremiumSongDetailById(id);
    res.status(response.status).json(response);
  } catch(err) {
    console.log(err);
  }
});

router.get("/getPremiumSongDetailByPenyanyiId",authenticateToken, async (req, res) => {
  try{
    const id = req.query["penyanyi_id"]
    const response = await getPremiumSongDetailByPenyanyiId(id);
    res.status(response.status).json(response);
  } catch(err) {
    console.log(err);
  }
});

router.post("/createPremiumSong", authenticateToken, async (req, res) => {
  try{  
    const judul = req.body["judul"];
    const penyanyi_id = req.body["penyanyi_id"];
    const audio_path = req.body["audio_path"];
    const response = await createPremiumSong(judul, penyanyi_id, audio_path);
    res.status(response.status).json(response);
  } catch (err) {
    console.log(err);
  }
});

router.put("/updatePremiumSong", authenticateToken, async (req, res) => {
  try{
    console.log("req.body")
    console.log(req.body);
    const song_id = req.body["song_id"];
    const judul = req.body["judul"];
    const audio_path = req.body["audio_path"];

    const response = await updatePremiumSong(song_id, judul, audio_path);
    res.status(response.status).json(response);
  }
  catch(err){
    console.log(err);
  }
});

router.delete("/deletePremiumSong",authenticateToken, async (req, res) => {
  try{
    const song_id = req.body["song_id"];
    const response = await deletePremiumSong(song_id);
    res.status(response.status).json(response);
  }
  catch(err){
    console.log(err)
  }
});

module.exports = router;
