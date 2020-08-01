const express = require('express');
const { getDB } = require('../modules/graphDatabase');
const { queryData } = require('../modules/queries/Query');
const { createData } = require('../modules/mutations/Create');
const { Destroy } = require('../modules/mutations/Destroy');
const e = require('express');

const router = express.Router();

router.get("/is-alive", async(req, res) => {
    const db = getDB();
    res.statusCode = 200;
    res.json({ success: true });
});


router.get("/destory", async(req, res) => {
    var errorArray = [];
    try{
        const db = getDB();
        await Destroy(db);
    } catch (err){
        console.log(err);
        errorArray.push(err);
    }
    if (errorArray.length !== 0){
        res.statusCode = 500;
        res.json({
            success: false,
        });
    } else {
        res.statusCode = 200;
        res.json({
            success: true,
        });
    }
});

router.get("/view-nodes", async(req, res) => {
    var payload = null;
    const queryParam = req.query.query;
    var errorArray = [];
    const db = getDB();
    try {
        payload = await queryData(db, { questionName: queryParam } );
    } catch (err){
        console.log(err);
        errorArray.push(err);
    }
    if (errorArray.length !== 0) {
        res.statusCode = 500;
        res.json({ success: false });
    } else {
        res.statusCode = 200;
        res.json({
            success: true,
            results: payload,
        });
    }
});

router.post("/create-node", async(req, res) => {
    console.log("Running");
    const requestBody = req.body;
    var errorArray = [];
    const db = getDB();
    console.log(`Creating Entry With Data: ${JSON.stringify(requestBody)}`)
    try{
        const response = await createData(db, {
            uid: `_:${requestBody.questionName.toLowerCase()}`,
            questionName: requestBody.questionName,
            text: requestBody.questionText,
        });
        console.log(`Created Entry with UID: ${
            response
            .getUidsMap()
            .get(
                requestBody
                .questionName
                .toLowerCase()
            )
        }`);
    } catch (err){
        console.log(err);
        errorArray.push(err);
    }
    if (errorArray.length === 0) {
        res.statusCode = 200;
        res.json({ success: true });
    } else {
        res.statusCode = 500;
        res.json({ success: false });
    }

});

module.exports = router;