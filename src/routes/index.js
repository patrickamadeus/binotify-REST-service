const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/premiumSong", require("./premiumSong"));
router.use("/penyanyi", require("./penyanyi"));
router.use("/subscription", require("./subscription"));

module.exports = router;
