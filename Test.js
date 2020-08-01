const { initGDB, getDB } = require('./modules/graphDatabase');
const databaseTesting = require('./routes/databaseTesting');
const { question } = require('./modules/schema/Question');
const express = require('express');
const app = express();
const PORT = 3030;

app.use("/test-route", databaseTesting);

initGDB((err, database) => {
    try { 
    database.alter(question);
    console.log(`Schema Registered`);
    app.listen(PORT, (err)=>{
        if (err){
            console.log(err);
            process.exit();
        }
        console.log('Running Graph API');
    });
    } catch (err){
        console.log(err);
        process.exit();
    }
});
