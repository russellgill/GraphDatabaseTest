const express = require('express');
const { getDB } = require('../modules/graphDatabase');
const { queryData } = require('../modules/queries/Query');
const { Destroy } = require('../modules/mutations/Destroy');
const { createData } = require('../modules/mutations/Create');
const { createRelation } = require('../modules/mutations/CreateRelation');
const { request } = require('express');

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

router.post("/add-relation", async(req, res) => {
    const requestBody = req.body;
    const questionName = requestBody.questionName;
    const relationName = requestBody.relationName;
    var errorArray = [];
    const db = getDB();
    try {
        const entry = await queryData(db, { questionName });
        const entryObject = entry.all.find(entry => entry.question_name == questionName);
        console.log(entryObject);
        console.log(`Adding relation to object with UID ${entryObject.uid}`);
        console.log(`Existing relations are ${entryObject.answer_paths}`);
        const relation = await queryData(db, { questionName: requestBody.relationName });
        const relationID = relation.all.find(entry => entry.question_name == relationName).uid;
        const response = await createRelation(db, entryObject.uid, relationID, null);
        console.log(response); 
        console.log(`Adding ${relationID} as the relation`);
    } catch (err){
        console.log(err);
        errorArray.push(err);
    }
    if (errorArray.length !== 0){
        res.statusCode = 500;
        res.json({ success: false });
    } else {
        res.statusCode = 200;
        res.json({ success: true });
    }
});

router.post("/create-node", async(req, res) => {
    const requestBody = req.body;
    var errorArray = [];
    const db = getDB();
    console.log(`Creating Entry With Data: ${JSON.stringify(requestBody)}`);
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