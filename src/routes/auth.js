const { Login, Register} = require('../services/auth.js');
const { authenticateToken } = require('../utils/jwt.js');
const router = require("express").Router();

router.post("/login" , async (req, res) => {
    try{
        const response = await Login(req.body.email, req.body.password);
        if( response.status == 200){
            res.cookie('accessToken', response.token.accessToken , {httpOnly: true, secure: true});
        } 
        res.status(response.status).json(response);
    } catch(err) {
        res.status(500).json({status: 500, message: "Internal Server Error", error: err.message});
    }
})


router.post("/register" , async (req, res) => {
    try{
        const response = await Register(req.body.email, req.body.password, req.body.username, req.body.name);
        res.status(response.status).json(response);
    } catch(err) {
        res.status(500).json({status: 500, message: "Internal Server Error", error: err.message});
    }

})

router.delete('/delete_token', (req, res) => {
    try {
        // set cookie expiration date to past
        res.cookie.set('accessToken', '', { expires: Date.now() });

      return res.json({status : 200, message:'Access token deleted.'});
    } catch (err) {
      res.status(500).json({status: 500, message: "Internal Server Error", error: err.message});
    }
});

module.exports = router;
