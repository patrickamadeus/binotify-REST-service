const { subscriptionSoap } = require("../services/subscription")
const { authenticateToken } = require("../utils/jwt")

const router = require("express").Router()

router.post("/acceptSubscriptionSoap", authenticateToken, async (req, res) => {
    try{
        const creator_id = req.body["creator_id"];
        const subscriber_id = req.body["subscriber_id"];
        const response = await subscriptionSoap("acceptSubscription",creator_id, subscriber_id);
        res.status(response.status).send(response);
    } catch(err) {
        console.log(err);
    }
});

router.post("/rejectSubscriptionSoap", authenticateToken, async (req, res) => {
    try{
        const creator_id = req.body["creator_id"];
        const subscriber_id = req.body["subscriber_id"];
        const response = await subscriptionSoap("rejectSubscription",creator_id, subscriber_id);
        res.status(response.status).send(response);
    } catch(err) {
        console.log(err);
    }
});

router.post("/createSubscriptionSoap", async (req, res) => {
    try{
        const creator_id = req.body["creator_id"];
        const subscriber_id = req.body["subscriber_id"];
        const response = await subscriptionSoap("createSubscriptionRequest",creator_id, subscriber_id);
        res.status(response.status).send(response);
    } catch(err) {
        console.log(err);
    }
});

router.post("/listSubscriptionSoap", async (req, res) => {
    try{
        const creator_id = req.body["creator_id"];
        const subscriber_id = req.body["subscriber_id"];
        const response = await subscriptionSoap("listSubscription",creator_id, subscriber_id);
        res.status(response.status).json(response);
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;