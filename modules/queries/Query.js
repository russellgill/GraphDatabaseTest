const { getDB } = require('../graphDatabase');

module.exports.queryData = async function(databaseClient, queryJSON){
    try{
        const question = queryJSON.questionName;
        const query = `query all($questionName: string) {
            all(func: eq(question_name, $questionName)) {
                uid
                question_name
                question_text
                answer_paths {
                    uid
                }
            }
        }`
        const vars = { $questionName: question };
        const response = await databaseClient.newTxn({ readOnly: true }).queryWithVars(query, vars);
        const responseJSON = response.getJson();
        return responseJSON;
    } catch (err){
        console.log(err);
        return false;
    }
}