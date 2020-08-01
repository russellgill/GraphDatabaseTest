const { initGDB, getDB } = require('../modules/graphDatabase');
const { createData } = require('../modules/mutations/Create');
const express = require('express');
const router = express.Router();

router.get("/is-alive", async(req, res) => {
    const db = getDB();
    res.statusCode = 200;
    res.json({ success: true });
});

router.post("/create-node", async(req, res) => {
    var errorArray = [];
    const db = getDB();
    try{
        await createData(db, {
            uid: '_:questionOne',
            questionName: 'questionOne',
            text: 'Can I ask you a question?',
        });
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