const { initGDB, getDB } = require('./modules/graphDatabase');
const databaseTesting = require('./routes/databaseTesting');
const { Question } = require('./modules/schema/Question');
const { Destroy } = require('./modules/mutations/Destroy');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = 3030;

app.use(bodyParser.json());
app.use("/test-route", databaseTesting);

initGDB(async(err, database) => {
    try {
        await Destroy(database);
        await Question(database);
        app.listen(PORT, (err)=>{
            if (err){
                console.log(err);
                process.exit();
            }
            console.log(`Running Graph API at port ${PORT}`);
        });
    } catch (err){
        console.log(err);
        process.exit();
    }
});
